// ============================================
// LIFEWISE — Zustand Game Store
// ============================================
// Single source of truth for all game state.
// Unidirectional data flow: Action → State Update → UI Re-render.

import { create } from 'zustand';
import type {
  Screen,
  Player,
  Scenario,
  ScenarioPhase,
  DecisionOption,
  DecisionRecord,
  AiInsight,
  SkillCategory,
  NpcDialogueOption,
} from '../types/game';
import { getAgeGroup, createInitialSkills } from '../lib/utils';
import {
  getInvestigationBonus,
  getInvestigationCompleteness,
  calculateSkillDeltas,
  applySkillDeltas,
  mergeNpcSkillImpacts,
} from '../engine/scoring';
import { saveGame, loadGame, clearSave, type SaveData } from '../lib/storage';

export interface GameState {
  // ---- Screen Flow ----
  screen: Screen;

  // ---- Player ----
  player: Player | null;

  // ---- Current Scenario ----
  currentScenario: Scenario | null;
  currentPhase: ScenarioPhase;
  revealedEvidence: string[];
  selectedDecision: DecisionOption | null;
  lastSkillDeltas: Record<string, number>;

  // ---- NPC Dialogue ----
  currentNpcNodeId: string | null;
  npcDialogueHistory: { speaker: string; text: string }[];
  npcAccumulatedScore: Partial<Record<SkillCategory, number>>;
  npcCompleted: boolean;

  // ---- History & Progression ----
  decisionHistory: DecisionRecord[];
  completedScenarioIds: string[];
  behavioralFlags: string[];
  currentDifficulty: number;

  // ---- AI Analysis ----
  lastInsight: AiInsight | null;

  // ---- Actions ----
  setScreen: (screen: Screen) => void;
  createPlayer: (name: string, age: number) => void;
  startScenario: (scenario: Scenario) => void;
  revealEvidence: (evidenceId: string) => void;
  setPhase: (phase: ScenarioPhase) => void;
  makeDecision: (decision: DecisionOption) => void;
  advanceNpcDialogue: (option: NpcDialogueOption, npcName: string) => void;
  completeNpcDialogue: () => void;
  completeScenario: () => void;
  setInsight: (insight: AiInsight) => void;
  addBehavioralFlag: (flag: string) => void;
  updateDifficulty: (difficulty: number) => void;
  resetGame: () => void;
  saveToStorage: () => void;
  loadFromStorage: () => boolean;
}

export const useGameStore = create<GameState>((set, get) => ({
  // ---- Initial State ----
  screen: 'landing',
  player: null,

  currentScenario: null,
  currentPhase: 'investigation',
  revealedEvidence: [],
  selectedDecision: null,
  lastSkillDeltas: {},

  currentNpcNodeId: null,
  npcDialogueHistory: [],
  npcAccumulatedScore: {},
  npcCompleted: false,

  decisionHistory: [],
  completedScenarioIds: [],
  behavioralFlags: [],
  currentDifficulty: 1,

  lastInsight: null,

  // ---- Actions ----

  setScreen: (screen) => set({ screen }),

  createPlayer: (name, age) => {
    const player: Player = {
      name,
      age,
      ageGroup: getAgeGroup(age),
      level: 1,
      skills: createInitialSkills(),
      scenariosCompleted: 0,
    };
    set({ player, screen: 'dashboard' });
  },

  startScenario: (scenario) => {
    set({
      currentScenario: scenario,
      currentPhase: 'investigation',
      revealedEvidence: [],
      selectedDecision: null,
      lastSkillDeltas: {},
      currentNpcNodeId: scenario.npcDialogue?.startNodeId ?? null,
      npcDialogueHistory: [],
      npcAccumulatedScore: {},
      npcCompleted: !scenario.npcDialogue, // mark complete if no NPC
      screen: 'scenario',
    });
  },

  revealEvidence: (evidenceId) => {
    const { revealedEvidence } = get();
    if (!revealedEvidence.includes(evidenceId)) {
      set({ revealedEvidence: [...revealedEvidence, evidenceId] });
    }
  },

  setPhase: (phase) => set({ currentPhase: phase }),

  makeDecision: (decision) => {
    const { currentScenario, revealedEvidence, npcAccumulatedScore, player } = get();
    if (!currentScenario || !player) return;

    // Calculate investigation bonus
    const totalEvidence = currentScenario.evidence.length;
    const bonus = getInvestigationBonus(revealedEvidence.length, totalEvidence);
    const completeness = getInvestigationCompleteness(
      revealedEvidence.length,
      totalEvidence
    );

    // Calculate skill deltas from the decision
    const decisionDeltas = calculateSkillDeltas(decision, bonus);

    // Merge NPC dialogue score
    const mergedDeltas = { ...decisionDeltas };
    for (const [skill, pts] of Object.entries(npcAccumulatedScore)) {
      if (pts && pts > 0) {
        mergedDeltas[skill] = (mergedDeltas[skill] ?? 0) + pts;
      }
    }

    // Apply to player skills
    const updatedSkills = applySkillDeltas(player.skills, mergedDeltas);

    // Create decision record
    const record: DecisionRecord = {
      scenarioId: currentScenario.id,
      scenarioTitle: currentScenario.title,
      category: currentScenario.category,
      decisionId: decision.id,
      decisionText: decision.text,
      quality: decision.quality,
      riskLevel: decision.riskLevel,
      skillImpacts: mergedDeltas,
      investigationCompleteness: completeness,
      npcScore: npcAccumulatedScore,
      timestamp: Date.now(),
    };

    set({
      selectedDecision: decision,
      lastSkillDeltas: mergedDeltas,
      currentPhase: 'consequence',
      player: {
        ...player,
        skills: updatedSkills,
      },
      decisionHistory: [...get().decisionHistory, record],
    });
  },

  advanceNpcDialogue: (option, npcName) => {
    const { npcDialogueHistory, npcAccumulatedScore } = get();

    // Add player's choice to history
    const updatedHistory = [
      ...npcDialogueHistory,
      { speaker: 'You', text: option.text },
    ];

    // Accumulate NPC skill impacts
    const updatedScore = mergeNpcSkillImpacts(
      npcAccumulatedScore,
      option.skillImpact
    );

    // If terminal (nextNodeId is null), mark completed
    if (option.nextNodeId === null) {
      set({
        npcDialogueHistory: updatedHistory,
        npcAccumulatedScore: updatedScore,
        npcCompleted: true,
        currentNpcNodeId: null,
      });
    } else {
      // Load next NPC node text into history
      const { currentScenario } = get();
      const nextNode = currentScenario?.npcDialogue?.nodes[option.nextNodeId];
      const historyWithNpc = nextNode
        ? [...updatedHistory, { speaker: npcName, text: nextNode.npcText }]
        : updatedHistory;

      set({
        npcDialogueHistory: historyWithNpc,
        npcAccumulatedScore: updatedScore,
        currentNpcNodeId: option.nextNodeId,
      });
    }
  },

  completeNpcDialogue: () => set({ npcCompleted: true }),

  completeScenario: () => {
    const { player, currentScenario, completedScenarioIds } = get();
    if (!player || !currentScenario) return;

    set({
      player: {
        ...player,
        scenariosCompleted: player.scenariosCompleted + 1,
      },
      completedScenarioIds: [...completedScenarioIds, currentScenario.id],
      screen: 'result',
    });

    // Auto-save after each scenario
    setTimeout(() => get().saveToStorage(), 0);
  },

  setInsight: (insight) => set({ lastInsight: insight }),

  addBehavioralFlag: (flag) => {
    const { behavioralFlags } = get();
    if (!behavioralFlags.includes(flag)) {
      set({ behavioralFlags: [...behavioralFlags, flag] });
    }
  },

  updateDifficulty: (difficulty) => set({ currentDifficulty: difficulty }),

  resetGame: () => {
    clearSave();
    set({
      screen: 'landing',
      player: null,
      currentScenario: null,
      currentPhase: 'investigation',
      revealedEvidence: [],
      selectedDecision: null,
      lastSkillDeltas: {},
      currentNpcNodeId: null,
      npcDialogueHistory: [],
      npcAccumulatedScore: {},
      npcCompleted: false,
      decisionHistory: [],
      completedScenarioIds: [],
      behavioralFlags: [],
      currentDifficulty: 1,
      lastInsight: null,
    });
  },

  saveToStorage: () => {
    const state = get();
    if (!state.player) return;
    saveGame({
      version: 1,
      player: state.player,
      completedScenarioIds: state.completedScenarioIds,
      decisionHistory: state.decisionHistory as SaveData['decisionHistory'],
      behavioralFlags: state.behavioralFlags,
      currentDifficulty: state.currentDifficulty,
    });
  },

  loadFromStorage: () => {
    const data = loadGame();
    if (!data) return false;
    set({
      player: data.player as GameState['player'],
      completedScenarioIds: data.completedScenarioIds,
      decisionHistory: data.decisionHistory as GameState['decisionHistory'],
      behavioralFlags: data.behavioralFlags,
      currentDifficulty: data.currentDifficulty,
      screen: 'dashboard',
    });
    return true;
  },
}));
