// ============================================
// LIFEWISE — AI Analysis Engine
// ============================================
// Deterministic rule-based analysis as the guaranteed fallback.
// Architecture supports plugging in an LLM/API later.
// This module does NOT claim to be an LLM.
// If no API is configured, the game works normally with these rules.

import type {
  AiInsight,
  DecisionRecord,
  SkillCategory,
  Player,
  Scenario,
} from '../types/game';
import { ALL_SKILLS, SKILL_LABELS } from '../types/game';
import { getStrongestSkill, getWeakestSkill, getNormalizedSkills } from '../lib/utils';

// ============================================
// Analysis Provider Interface
// ============================================
// This interface allows an LLM/API to be plugged in later.

export interface AnalysisProvider {
  generateInsight(
    player: Player,
    history: DecisionRecord[],
    scenarios: Scenario[]
  ): Promise<AiInsight>;
}

// ============================================
// Deterministic Rule-Based Provider (default)
// ============================================

export class RuleBasedAnalysisProvider implements AnalysisProvider {
  async generateInsight(
    player: Player,
    history: DecisionRecord[],
    scenarios: Scenario[]
  ): Promise<AiInsight> {
    return generateDeterministicInsight(player, history, scenarios);
  }
}

// Active provider — swap this to use an LLM API
let activeProvider: AnalysisProvider = new RuleBasedAnalysisProvider();

export function setAnalysisProvider(provider: AnalysisProvider): void {
  activeProvider = provider;
}

export function getAnalysisProvider(): AnalysisProvider {
  return activeProvider;
}

// ============================================
// Public API
// ============================================

export async function generateInsight(
  player: Player,
  history: DecisionRecord[],
  scenarios: Scenario[]
): Promise<AiInsight> {
  return activeProvider.generateInsight(player, history, scenarios);
}

// ============================================
// Deterministic Analysis Logic
// ============================================

function generateDeterministicInsight(
  player: Player,
  history: DecisionRecord[],
  scenarios: Scenario[]
): AiInsight {
  if (history.length === 0) {
    return {
      summary: 'Complete your first scenario to receive personalized feedback on your decision-making patterns.',
      strongestSkill: null,
      weakestSkill: null,
      riskTendency: 'unknown',
      investigationTendency: 'unknown',
      patterns: [],
      recommendedChallenge: null,
    };
  }

  const normalizedSkills = getNormalizedSkills(player.skills, scenarios);
  const strongest = getStrongestSkill(normalizedSkills);
  const weakest = getWeakestSkill(normalizedSkills);

  // Risk analysis
  const highRiskCount = history.filter((d) => d.riskLevel === 'high').length;
  const riskRatio = highRiskCount / history.length;
  const riskTendency =
    riskRatio >= 0.5 ? 'risk-taker' :
    riskRatio >= 0.25 ? 'moderate' :
    'cautious';

  // Investigation analysis
  const avgInvestigation =
    history.reduce((sum, d) => sum + d.investigationCompleteness, 0) /
    history.length;
  const investigationTendency =
    avgInvestigation >= 0.7 ? 'thorough' :
    avgInvestigation >= 0.4 ? 'moderate' :
    'impulsive';

  // Decision quality analysis
  const excellentCount = history.filter((d) => d.quality === 'excellent').length;
  const goodCount = history.filter((d) => d.quality === 'good').length;
  const poorCount = history.filter((d) => d.quality === 'poor').length;
  const excellentRatio = excellentCount / history.length;
  const poorRatio = poorCount / history.length;

  // Build patterns
  const patterns: string[] = [];

  if (riskTendency === 'risk-taker') patterns.push('Risk Taker');
  if (riskTendency === 'cautious') patterns.push('Cautious Thinker');
  if (investigationTendency === 'thorough') patterns.push('Thorough Investigator');
  if (investigationTendency === 'impulsive') patterns.push('Quick Decision-Maker');
  if (excellentRatio >= 0.6) patterns.push('Strategic Thinker');
  if (poorRatio >= 0.5) patterns.push('Needs Practice');
  if (excellentCount > 0 && poorCount === 0) patterns.push('Consistent Performer');

  // Generate summary
  const summary = buildSummary(
    player,
    strongest,
    weakest,
    riskTendency,
    investigationTendency,
    excellentRatio,
    poorRatio,
    history.length,
    normalizedSkills
  );

  // Recommend challenge
  const recommendedChallenge = weakest
    ? `Focus on improving your ${SKILL_LABELS[weakest]} skills.`
    : null;

  return {
    summary,
    strongestSkill: strongest,
    weakestSkill: weakest,
    riskTendency,
    investigationTendency,
    patterns,
    recommendedChallenge,
  };
}

function buildSummary(
  player: Player,
  strongest: SkillCategory | null,
  weakest: SkillCategory,
  riskTendency: string,
  investigationTendency: string,
  excellentRatio: number,
  poorRatio: number,
  totalDecisions: number,
  normalizedSkills: Record<SkillCategory, number>
): string {
  const parts: string[] = [];

  // Opening — performance-based
  if (excellentRatio >= 0.6) {
    parts.push(
      `Impressive, ${player.name}! You've shown strong decision-making across ${totalDecisions} scenario${totalDecisions > 1 ? 's' : ''}.`
    );
  } else if (poorRatio >= 0.5) {
    parts.push(
      `${player.name}, you've faced ${totalDecisions} challenging scenario${totalDecisions > 1 ? 's' : ''}. Each one is a learning opportunity, and your scores will improve as you develop these skills.`
    );
  } else {
    parts.push(
      `${player.name}, you've shown a mix of strengths and growth areas across ${totalDecisions} scenario${totalDecisions > 1 ? 's' : ''}.`
    );
  }

  // Strongest skill
  if (strongest && normalizedSkills[strongest] > 0) {
    parts.push(
      `You excel in ${SKILL_LABELS[strongest]} (${normalizedSkills[strongest]}%).`
    );
  }

  // Weakest skill
  if (weakest && normalizedSkills[weakest] < normalizedSkills[strongest ?? weakest]) {
    parts.push(
      `${SKILL_LABELS[weakest]} is your area for growth (${normalizedSkills[weakest]}%).`
    );
  }

  // Risk behavior
  if (riskTendency === 'risk-taker') {
    parts.push(
      'You tend to take high-risk choices — this shows confidence, but weigh consequences carefully.'
    );
  } else if (riskTendency === 'cautious') {
    parts.push(
      'You lean toward cautious decisions — a solid approach, but sometimes moderate risk is needed for the best outcomes.'
    );
  }

  // Investigation behavior
  if (investigationTendency === 'thorough') {
    parts.push(
      'Your thorough investigation habits give you a real advantage — keep digging for evidence before deciding.'
    );
  } else if (investigationTendency === 'impulsive') {
    parts.push(
      'Consider spending more time investigating before deciding — evidence can significantly improve your outcomes and score.'
    );
  }

  return parts.join(' ');
}
