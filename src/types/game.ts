// ============================================
// LIFEWISE — Core Type Definitions
// ============================================

export type AgeGroup = 'Teen' | 'Young Adult' | 'Adult' | 'Experienced Adult';

export type SkillCategory =
  | 'financial'
  | 'cybersecurity'
  | 'criticalThinking'
  | 'communication'
  | 'negotiation';

export type Screen =
  | 'landing'
  | 'profile'
  | 'dashboard'
  | 'scenario'
  | 'result'
  | 'finalProfile';

export type ScenarioPhase = 'investigation' | 'decision' | 'consequence';

export type DecisionQuality = 'excellent' | 'good' | 'average' | 'poor';

export type RiskLevel = 'low' | 'medium' | 'high';

// ---- Player ----

export interface Player {
  name: string;
  age: number;
  ageGroup: AgeGroup;
  level: number;
  skills: Record<SkillCategory, number>;
  scenariosCompleted: number;
}

// ---- Evidence ----

export interface EvidenceItem {
  id: string;
  title: string;
  content: string;
  isHidden: boolean;
}

// ---- NPC Dialogue ----

export interface NpcDialogueOption {
  id: string;
  text: string;
  tone: 'assertive' | 'empathetic' | 'aggressive' | 'passive';
  nextNodeId: string | null;
  skillImpact: Partial<Record<SkillCategory, number>>;
}

export interface NpcDialogueNode {
  id: string;
  npcName: string;
  npcText: string;
  options: NpcDialogueOption[];
  isTerminal: boolean;
}

export interface NpcDialogue {
  npcName: string;
  npcRole: string;
  startNodeId: string;
  nodes: Record<string, NpcDialogueNode>;
}

// ---- Decisions ----

export interface Consequence {
  immediate: string;
  explanation: string;
  skillInvolved: string;
  lesson: string;
}

export interface DecisionOption {
  id: string;
  text: string;
  quality: DecisionQuality;
  riskLevel: RiskLevel;
  consequence: Consequence;
  skillImpacts: Partial<Record<SkillCategory, number>>;
}

// ---- Scenario ----

export interface Scenario {
  id: string;
  title: string;
  category: SkillCategory;
  difficulty: number;
  ageGroups: AgeGroup[];
  situation: string;
  context: string;
  objective: string;
  evidence: EvidenceItem[];
  decisions: DecisionOption[];
  npcDialogue?: NpcDialogue;
  tags: string[];
}

// ---- Decision History ----

export interface DecisionRecord {
  scenarioId: string;
  scenarioTitle: string;
  category: SkillCategory;
  decisionId: string;
  decisionText: string;
  quality: DecisionQuality;
  riskLevel: RiskLevel;
  skillImpacts: Partial<Record<SkillCategory, number>>;
  investigationCompleteness: number;
  npcScore: Partial<Record<SkillCategory, number>>;
  timestamp: number;
}

// ---- AI Analysis ----

export interface AiInsight {
  summary: string;
  strongestSkill: SkillCategory | null;
  weakestSkill: SkillCategory | null;
  riskTendency: string;
  investigationTendency: string;
  patterns: string[];
  recommendedChallenge: string | null;
}

// ---- Display Constants ----

export const SKILL_LABELS: Record<SkillCategory, string> = {
  financial: 'Financial Decision-Making',
  cybersecurity: 'Cybersecurity Awareness',
  criticalThinking: 'Critical Thinking',
  communication: 'Communication',
  negotiation: 'Negotiation',
};

export const SKILL_ICONS: Record<SkillCategory, string> = {
  financial: '💰',
  cybersecurity: '🔒',
  criticalThinking: '🧠',
  communication: '💬',
  negotiation: '🤝',
};

export const ALL_SKILLS: SkillCategory[] = [
  'financial',
  'cybersecurity',
  'criticalThinking',
  'communication',
  'negotiation',
];
