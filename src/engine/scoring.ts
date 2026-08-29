// ============================================
// LIFEWISE — Skill Scoring Engine
// ============================================
// Scores NEVER decrease. Positive progression only.
// Poor decisions = 0 points (no penalty), but consequences still shown.

import type { DecisionOption, SkillCategory } from '../types/game';

/**
 * Calculate investigation bonus multiplier based on how much
 * evidence the player examined before making their decision.
 *
 * >= 70% examined → +25% bonus
 * >= 40% examined → +10% bonus
 * < 40%           → no bonus
 */
export function getInvestigationBonus(
  revealedCount: number,
  totalEvidence: number
): number {
  if (totalEvidence === 0) return 0;
  const completeness = revealedCount / totalEvidence;
  if (completeness >= 0.7) return 0.25;
  if (completeness >= 0.4) return 0.1;
  return 0;
}

/**
 * Calculate investigation completeness as a 0–1 ratio.
 */
export function getInvestigationCompleteness(
  revealedCount: number,
  totalEvidence: number
): number {
  if (totalEvidence === 0) return 1;
  return revealedCount / totalEvidence;
}

/**
 * Calculate the actual skill point deltas for a decision,
 * applying investigation bonus.
 *
 * Each DecisionOption has pre-defined skillImpacts that encode
 * the quality tier's point values:
 *   excellent → primary: 20, secondary: 5
 *   good      → primary: 12, secondary: 3
 *   average   → primary: 5,  secondary: 1
 *   poor      → primary: 0,  secondary: 0
 *
 * The investigation bonus multiplies these values.
 * Scores never go negative.
 */
export function calculateSkillDeltas(
  decision: DecisionOption,
  investigationBonus: number
): Record<string, number> {
  const result: Record<string, number> = {};

  for (const [skill, points] of Object.entries(decision.skillImpacts)) {
    if (points !== undefined && points > 0) {
      result[skill] = Math.round(points * (1 + investigationBonus));
    }
  }

  return result;
}

/**
 * Apply skill deltas to a player's skill record.
 * Scores only increase — deltas are always >= 0.
 */
export function applySkillDeltas(
  currentSkills: Record<SkillCategory, number>,
  deltas: Record<string, number>
): Record<SkillCategory, number> {
  const updated = { ...currentSkills };
  for (const [skill, delta] of Object.entries(deltas)) {
    const key = skill as SkillCategory;
    if (key in updated) {
      updated[key] = updated[key] + delta;
    }
  }
  return updated;
}

/**
 * Merge NPC dialogue skill impacts into a running accumulator.
 */
export function mergeNpcSkillImpacts(
  accumulated: Partial<Record<SkillCategory, number>>,
  newImpact: Partial<Record<SkillCategory, number>>
): Partial<Record<SkillCategory, number>> {
  const result = { ...accumulated };
  for (const [skill, points] of Object.entries(newImpact)) {
    if (points !== undefined && points > 0) {
      const key = skill as SkillCategory;
      result[key] = (result[key] ?? 0) + points;
    }
  }
  return result;
}
