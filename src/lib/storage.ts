// ============================================
// LIFEWISE — LocalStorage Persistence
// ============================================

import type { SkillCategory } from '../types/game';

const STORAGE_KEY = 'lifewise_save';
const STORAGE_VERSION = 1;

export interface SaveData {
  version: number;
  player: {
    name: string;
    age: number;
    ageGroup: string;
    level: number;
    skills: Record<SkillCategory, number>;
    scenariosCompleted: number;
  };
  completedScenarioIds: string[];
  decisionHistory: Array<{
    scenarioId: string;
    scenarioTitle: string;
    category: string;
    decisionId: string;
    decisionText: string;
    quality: string;
    riskLevel: string;
    skillImpacts: Record<string, number>;
    investigationCompleteness: number;
    npcScore: Record<string, number>;
    timestamp: number;
  }>;
  behavioralFlags: string[];
  currentDifficulty: number;
}

/**
 * Save game state to localStorage.
 */
export function saveGame(data: SaveData): boolean {
  try {
    const serialized = JSON.stringify({ ...data, version: STORAGE_VERSION });
    localStorage.setItem(STORAGE_KEY, serialized);
    return true;
  } catch (e) {
    console.warn('Failed to save game:', e);
    return false;
  }
}

/**
 * Load game state from localStorage.
 * Returns null if no save exists or data is corrupted.
 */
export function loadGame(): SaveData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const data = JSON.parse(raw) as SaveData;

    // Version check
    if (data.version !== STORAGE_VERSION) {
      console.warn('Save data version mismatch. Clearing old save.');
      clearSave();
      return null;
    }

    // Basic validation
    if (!data.player || !data.player.name || !data.player.skills) {
      console.warn('Save data is corrupted. Clearing.');
      clearSave();
      return null;
    }

    return data;
  } catch (e) {
    console.warn('Failed to load game:', e);
    return null;
  }
}

/**
 * Check if a save exists.
 */
export function hasSave(): boolean {
  return localStorage.getItem(STORAGE_KEY) !== null;
}

/**
 * Delete the saved game.
 */
export function clearSave(): void {
  localStorage.removeItem(STORAGE_KEY);
}
