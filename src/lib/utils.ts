import type { AgeGroup, SkillCategory, Player, Scenario, DecisionQuality } from '../types/game';
import { ALL_SKILLS } from '../types/game';

// ---- Age Group ----

export function getAgeGroup(age: number): AgeGroup {
  if (age >= 13 && age <= 17) return 'Teen';
  if (age >= 18 && age <= 25) return 'Young Adult';
  if (age >= 26 && age <= 40) return 'Adult';
  return 'Experienced Adult';
}

// ---- Skill Initialization ----

export function createInitialSkills(): Record<SkillCategory, number> {
  return {
    financial: 0,
    cybersecurity: 0,
    criticalThinking: 0,
    communication: 0,
    negotiation: 0,
  };
}

// ---- Score Normalization ----

export function getMaxPossibleScore(
  skill: SkillCategory,
  scenarios: Scenario[]
): number {
  let max = 0;
  for (const scenario of scenarios) {
    const bestForSkill = Math.max(
      0,
      ...scenario.decisions.map((d) => d.skillImpacts[skill] ?? 0)
    );
    // Include max investigation bonus (25%)
    max += Math.round(bestForSkill * 1.25);
  }
  return max || 1; // avoid division by zero
}

export function normalizeSkill(rawScore: number, maxPossible: number): number {
  return Math.min(100, Math.round((rawScore / maxPossible) * 100));
}

export function calculateOverallScore(
  skills: Record<SkillCategory, number>,
  scenarios: Scenario[]
): number {
  const normalized = ALL_SKILLS.map((skill) =>
    normalizeSkill(skills[skill], getMaxPossibleScore(skill, scenarios))
  );
  const sum = normalized.reduce((a, b) => a + b, 0);
  return Math.round(sum / ALL_SKILLS.length);
}

export function getNormalizedSkills(
  skills: Record<SkillCategory, number>,
  scenarios: Scenario[]
): Record<SkillCategory, number> {
  const result = {} as Record<SkillCategory, number>;
  for (const skill of ALL_SKILLS) {
    result[skill] = normalizeSkill(
      skills[skill],
      getMaxPossibleScore(skill, scenarios)
    );
  }
  return result;
}

// ---- Skill Analysis ----

export function getStrongestSkill(
  skills: Record<SkillCategory, number>
): SkillCategory | null {
  let best: SkillCategory | null = null;
  let bestScore = -1;
  for (const skill of ALL_SKILLS) {
    if (skills[skill] > bestScore) {
      bestScore = skills[skill];
      best = skill;
    }
  }
  return bestScore > 0 ? best : null;
}

export function getWeakestSkill(
  skills: Record<SkillCategory, number>
): SkillCategory {
  let worst: SkillCategory = ALL_SKILLS[0];
  let worstScore = Infinity;
  for (const skill of ALL_SKILLS) {
    if (skills[skill] < worstScore) {
      worstScore = skills[skill];
      worst = skill;
    }
  }
  return worst;
}

// ---- Display Helpers ----

export function getQualityLabel(quality: DecisionQuality): string {
  switch (quality) {
    case 'excellent': return 'Excellent Decision';
    case 'good': return 'Good Decision';
    case 'average': return 'Adequate Decision';
    case 'poor': return 'Poor Decision';
  }
}

export function getQualityColor(quality: DecisionQuality): string {
  switch (quality) {
    case 'excellent': return 'text-emerald-400';
    case 'good': return 'text-blue-400';
    case 'average': return 'text-amber-400';
    case 'poor': return 'text-rose-400';
  }
}

export function getQualityBg(quality: DecisionQuality): string {
  switch (quality) {
    case 'excellent': return 'bg-emerald-500/20 border-emerald-500/40';
    case 'good': return 'bg-blue-500/20 border-blue-500/40';
    case 'average': return 'bg-amber-500/20 border-amber-500/40';
    case 'poor': return 'bg-rose-500/20 border-rose-500/40';
  }
}

export function getRiskColor(risk: string): string {
  switch (risk) {
    case 'high': return 'text-rose-400';
    case 'medium': return 'text-amber-400';
    case 'low': return 'text-emerald-400';
    default: return 'text-slate-400';
  }
}
