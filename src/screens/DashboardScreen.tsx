import { useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { scenarios } from '../data/scenarios';
import { calculateOverallScore, getNormalizedSkills, getStrongestSkill, getWeakestSkill } from '../lib/utils';
import { SKILL_LABELS, SKILL_ICONS } from '../types/game';
import { getBestNextScenario } from '../engine/scenarioSelector';
import { calculateLevel, detectBehavioralFlags } from '../engine/adaptive';
import { generateInsight } from '../engine/analysis';
import ScoreDisplay from '../components/ui/ScoreDisplay';
import Button from '../components/ui/Button';

export default function DashboardScreen() {
  const player = useGameStore((s) => s.player);
  const completedScenarioIds = useGameStore((s) => s.completedScenarioIds);
  const decisionHistory = useGameStore((s) => s.decisionHistory);
  const behavioralFlags = useGameStore((s) => s.behavioralFlags);
  const currentDifficulty = useGameStore((s) => s.currentDifficulty);
  const lastInsight = useGameStore((s) => s.lastInsight);
  const startScenario = useGameStore((s) => s.startScenario);
  const setScreen = useGameStore((s) => s.setScreen);
  const setInsight = useGameStore((s) => s.setInsight);
  const addBehavioralFlag = useGameStore((s) => s.addBehavioralFlag);
  const updateDifficulty = useGameStore((s) => s.updateDifficulty);

  if (!player) return null;

  const normalizedSkills = getNormalizedSkills(player.skills, scenarios);
  const overallScore = calculateOverallScore(player.skills, scenarios);
  const strongest = getStrongestSkill(player.skills);
  const weakest = getWeakestSkill(player.skills);

  // P1: Adaptive level and difficulty
  const computedLevel = calculateLevel(player.scenariosCompleted, overallScore);

  // P1: Smart scenario selection
  const nextScenario = getBestNextScenario(
    scenarios,
    { ...player, level: computedLevel },
    completedScenarioIds,
    decisionHistory,
    behavioralFlags,
    currentDifficulty
  );
  const allCompleted = nextScenario === null;

  // P1: Trigger AI analysis and behavioral flag detection after scenarios
  useEffect(() => {
    if (decisionHistory.length === 0) return;

    // Update behavioral flags
    const flags = detectBehavioralFlags(decisionHistory);
    flags.forEach((flag) => addBehavioralFlag(flag));

    // Update difficulty
    updateDifficulty(computedLevel);

    // Generate insight
    generateInsight(player, decisionHistory, scenarios).then((insight) => {
      setInsight(insight);
    });
  }, [decisionHistory.length]);

  return (
    <div className="min-h-screen px-4 py-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Welcome, {player.name}
          </h1>
          <div className="flex items-center gap-3 mt-1 text-sm text-slate-400">
            <span className="bg-game-accent/20 text-game-accent-light px-2 py-0.5 rounded-full">
              Level {player.level}
            </span>
            <span>{player.ageGroup}</span>
            <span>•</span>
            <span>{player.scenariosCompleted} scenarios completed</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Column — Scores */}
        <div>
          <h2 className="text-lg font-semibold text-slate-200 mb-4">Your Skills</h2>
          <ScoreDisplay skills={normalizedSkills} overallScore={overallScore} />

          {/* Strongest / Weakest */}
          {player.scenariosCompleted > 0 && (
            <div className="grid grid-cols-2 gap-3 mt-4">
              {strongest && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 text-center">
                  <div className="text-xs text-slate-400 mb-1">Strongest</div>
                  <div className="text-lg">{SKILL_ICONS[strongest]}</div>
                  <div className="text-sm text-emerald-400 font-medium">
                    {SKILL_LABELS[strongest]}
                  </div>
                </div>
              )}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-center">
                <div className="text-xs text-slate-400 mb-1">Needs Work</div>
                <div className="text-lg">{SKILL_ICONS[weakest]}</div>
                <div className="text-sm text-amber-400 font-medium">
                  {SKILL_LABELS[weakest]}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column — Next Scenario + Insight */}
        <div className="space-y-6">
          {/* Next Scenario Card */}
          {nextScenario ? (
            <div className="bg-game-card border border-slate-700 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-slate-200 mb-4">
                Next Challenge
              </h2>
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{SKILL_ICONS[nextScenario.category]}</span>
                  <h3 className="text-white font-semibold text-lg">
                    {nextScenario.title}
                  </h3>
                </div>
                <span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full">
                  {SKILL_LABELS[nextScenario.category]}
                </span>
                <p className="text-slate-400 text-sm mt-3 line-clamp-3">
                  {nextScenario.situation.slice(0, 150)}...
                </p>
                <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                  <span>Difficulty: {'⭐'.repeat(nextScenario.difficulty)}</span>
                  <span>{nextScenario.evidence.length} clues</span>
                  {nextScenario.npcDialogue && <span>💬 NPC Interaction</span>}
                </div>
              </div>
              <Button
                size="lg"
                className="w-full"
                onClick={() => startScenario(nextScenario)}
              >
                Start Scenario
              </Button>
            </div>
          ) : allCompleted ? (
            <div className="bg-game-card border border-slate-700 rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">🎉</div>
              <h2 className="text-lg font-semibold text-white mb-2">
                All Scenarios Complete!
              </h2>
              <p className="text-slate-400 text-sm mb-4">
                You've completed all available challenges. View your final decision profile.
              </p>
              <Button onClick={() => setScreen('finalProfile')}>
                View Final Profile
              </Button>
            </div>
          ) : null}

          {/* AI Insight */}
          {lastInsight && (
            <div className="bg-game-card border border-violet-500/30 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm">🤖</span>
                <h3 className="text-sm font-semibold text-game-accent-light uppercase tracking-wider">
                  Decision Insight
                </h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                {lastInsight.summary}
              </p>
              {lastInsight.patterns.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {lastInsight.patterns.map((p) => (
                    <span
                      key={p}
                      className="text-xs bg-violet-500/20 text-violet-300 px-2 py-1 rounded-full"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              )}
              {lastInsight.recommendedChallenge && (
                <div className="mt-3 text-xs text-slate-400">
                  💡 Recommended: {lastInsight.recommendedChallenge}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
