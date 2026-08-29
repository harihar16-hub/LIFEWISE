// ============================================
// LIFEWISE — Scenario Selector
// ============================================
// Multi-criteria scenario selection:
//   - Targets weakest skill       (40% weight)
//   - Matches difficulty level    (30% weight)
//   - Responds to behavioral flags (20% weight)
//   - Random factor               (10% weight)

import type { Scenario, Player, DecisionRecord, SkillCategory } from '../types/game';
import { ALL_SKILLS } from '../types/game';
import { getWeakestSkill, getNormalizedSkills } from '../lib/utils';
import { getRecommendedDifficulty } from './adaptive';

export interface ScoredScenario {
  scenario: Scenario;
  score: number;
  reasons: string[];
}

/**
 * Select the best next scenario for the player.
 * Returns a sorted list of scored scenarios (best first).
 */
export function selectNextScenarios(
  allScenarios: Scenario[],
  player: Player,
  completedIds: string[],
  decisionHistory: DecisionRecord[],
  behavioralFlags: string[],
  currentDifficulty: number
): ScoredScenario[] {
  // Filter: not completed + matches age group
  const available = allScenarios.filter(
    (s) =>
      !completedIds.includes(s.id) &&
      s.ageGroups.includes(player.ageGroup)
  );

  if (available.length === 0) return [];

  const normalizedSkills = getNormalizedSkills(player.skills, allScenarios);
  const weakest = getWeakestSkill(normalizedSkills);
  const recommendedDiff = getRecommendedDifficulty(
    decisionHistory,
    player.level
  );

  const scored: ScoredScenario[] = available.map((scenario) => {
    let score = 0;
    const reasons: string[] = [];

    // Weight 1: Targets weakest skill (40%)
    if (scenario.category === weakest) {
      score += 40;
      reasons.push('Targets your weakest skill');
    } else {
      // Give partial credit if the skill score is low
      const skillScore = normalizedSkills[scenario.category];
      if (skillScore < 30) {
        score += 25;
        reasons.push('Skill needs improvement');
      } else if (skillScore < 60) {
        score += 15;
        reasons.push('Moderate skill level');
      }
    }

    // Weight 2: Matches difficulty (30%)
    const diffDelta = Math.abs(scenario.difficulty - recommendedDiff);
    if (diffDelta === 0) {
      score += 30;
      reasons.push('Perfect difficulty match');
    } else if (diffDelta === 1) {
      score += 20;
      reasons.push('Close difficulty match');
    } else {
      score += 10;
    }

    // Weight 3: Behavioral flags (20%)
    const flagScore = evaluateFlagMatch(scenario, behavioralFlags);
    score += flagScore.score;
    if (flagScore.reason) reasons.push(flagScore.reason);

    // Weight 4: Random factor (10%)
    score += Math.random() * 10;

    return { scenario, score, reasons };
  });

  // Sort by score (highest first)
  scored.sort((a, b) => b.score - a.score);

  return scored;
}

function evaluateFlagMatch(
  scenario: Scenario,
  flags: string[]
): { score: number; reason: string | null } {
  let score = 0;
  let reason: string | null = null;

  // If player has a weakness in this scenario's skill, prioritize it
  if (flags.includes(`${scenario.category}_weakness`)) {
    score += 20;
    reason = 'Addresses a detected weakness';
  }

  // If player skips investigation, scenarios with more evidence are good practice
  if (flags.includes('skips_investigation') && scenario.evidence.length >= 4) {
    score += 10;
    reason = reason
      ? reason + '; encourages investigation'
      : 'Encourages investigation';
  }

  // If player is struggling, prefer easier scenarios
  if (flags.includes('struggling') && scenario.difficulty <= 2) {
    score += 15;
    reason = reason
      ? reason + '; builds confidence'
      : 'Builds confidence with manageable challenge';
  }

  // If player is excelling, offer NPC scenarios for variety
  if (flags.includes('excelling') && scenario.npcDialogue) {
    score += 10;
    reason = reason
      ? reason + '; adds conversation challenge'
      : 'Adds NPC interaction challenge';
  }

  return { score, reason };
}

/**
 * Get the single best next scenario, or null if all completed.
 */
export function getBestNextScenario(
  allScenarios: Scenario[],
  player: Player,
  completedIds: string[],
  decisionHistory: DecisionRecord[],
  behavioralFlags: string[],
  currentDifficulty: number
): Scenario | null {
  const scored = selectNextScenarios(
    allScenarios,
    player,
    completedIds,
    decisionHistory,
    behavioralFlags,
    currentDifficulty
  );
  return scored.length > 0 ? scored[0].scenario : null;
}
