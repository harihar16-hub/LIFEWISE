// ============================================
// LIFEWISE — Adaptive Difficulty Engine
// ============================================
// Adjusts scenario difficulty based on player performance.
// Rules are deterministic — no AI API needed.

import type { SkillCategory, DecisionRecord, Player } from '../types/game';
import { ALL_SKILLS } from '../types/game';

/**
 * Level thresholds — determines which difficulty range is available.
 *
 * Level 1: Start (difficulty 1–3)
 * Level 2: 3+ scenarios completed, avg score >= 40% (difficulty 1–5)
 * Level 3: 5+ scenarios completed, avg score >= 50% (difficulty 1–7)
 */
export function calculateLevel(
  scenariosCompleted: number,
  overallScore: number
): number {
  if (scenariosCompleted >= 5 && overallScore >= 50) return 3;
  if (scenariosCompleted >= 3 && overallScore >= 40) return 2;
  return 1;
}

export function getDifficultyRange(level: number): [number, number] {
  switch (level) {
    case 3: return [1, 7];
    case 2: return [1, 5];
    default: return [1, 3];
  }
}

/**
 * Compute the recommended difficulty for the next scenario
 * based on recent performance.
 */
export function getRecommendedDifficulty(
  decisionHistory: DecisionRecord[],
  level: number
): number {
  const [min, max] = getDifficultyRange(level);

  if (decisionHistory.length === 0) return min;

  // Look at last 3 decisions
  const recent = decisionHistory.slice(-3);

  const excellentCount = recent.filter((d) => d.quality === 'excellent').length;
  const poorCount = recent.filter((d) => d.quality === 'poor').length;

  let difficulty: number;

  if (excellentCount >= 2) {
    // Player is doing well — increase difficulty
    difficulty = Math.min(max, Math.round((min + max) / 2) + 1);
  } else if (poorCount >= 2) {
    // Player is struggling — keep difficulty low
    difficulty = min;
  } else {
    // Mixed performance — moderate difficulty
    difficulty = Math.round((min + max) / 2);
  }

  return Math.max(min, Math.min(max, difficulty));
}

/**
 * Detect behavioral flags from decision history.
 * These are simple string tags used by the scenario selector.
 */
export function detectBehavioralFlags(
  decisionHistory: DecisionRecord[]
): string[] {
  const flags: string[] = [];

  if (decisionHistory.length < 2) return flags;

  // Risk tendency
  const highRiskCount = decisionHistory.filter(
    (d) => d.riskLevel === 'high'
  ).length;
  const riskRatio = highRiskCount / decisionHistory.length;
  if (riskRatio >= 0.5) flags.push('high_risk_tendency');
  if (riskRatio === 0) flags.push('risk_averse');

  // Investigation tendency
  const avgInvestigation =
    decisionHistory.reduce((sum, d) => sum + d.investigationCompleteness, 0) /
    decisionHistory.length;
  if (avgInvestigation < 0.3) flags.push('skips_investigation');
  if (avgInvestigation >= 0.7) flags.push('thorough_investigator');

  // Per-skill weakness detection
  const skillScores: Record<string, number[]> = {};
  for (const record of decisionHistory) {
    const skill = record.category;
    if (!skillScores[skill]) skillScores[skill] = [];
    const qualityScore =
      record.quality === 'excellent' ? 4 :
      record.quality === 'good' ? 3 :
      record.quality === 'average' ? 2 : 1;
    skillScores[skill].push(qualityScore);
  }

  for (const [skill, scores] of Object.entries(skillScores)) {
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    if (avg <= 1.5) {
      flags.push(`${skill}_weakness`);
    }
    if (avg >= 3.5) {
      flags.push(`${skill}_strength`);
    }
  }

  // Specific patterns
  const poorStreak = decisionHistory.slice(-3).every((d) => d.quality === 'poor');
  if (poorStreak) flags.push('struggling');

  const excellentStreak = decisionHistory.slice(-3).every(
    (d) => d.quality === 'excellent'
  );
  if (excellentStreak) flags.push('excelling');

  return flags;
}
