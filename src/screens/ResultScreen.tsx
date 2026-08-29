import { useGameStore } from '../store/gameStore';
import { scenarios } from '../data/scenarios';
import { calculateOverallScore, getNormalizedSkills, getQualityLabel, getQualityColor } from '../lib/utils';
import { SKILL_LABELS, SKILL_ICONS, type SkillCategory } from '../types/game';
import Button from '../components/ui/Button';

export default function ResultScreen() {
  const player = useGameStore((s) => s.player);
  const selectedDecision = useGameStore((s) => s.selectedDecision);
  const lastSkillDeltas = useGameStore((s) => s.lastSkillDeltas);
  const currentScenario = useGameStore((s) => s.currentScenario);
  const completedScenarioIds = useGameStore((s) => s.completedScenarioIds);
  const setScreen = useGameStore((s) => s.setScreen);

  if (!player || !selectedDecision || !currentScenario) return null;

  const normalizedSkills = getNormalizedSkills(player.skills, scenarios);
  const overallScore = calculateOverallScore(player.skills, scenarios);

  const hasMoreScenarios = scenarios.some(
    (s) =>
      !completedScenarioIds.includes(s.id) &&
      s.ageGroups.includes(player.ageGroup)
  );

  return (
    <div className="min-h-screen px-4 py-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Scenario Complete</h1>
        <p className="text-slate-400">{currentScenario.title}</p>
      </div>

      {/* Decision Summary */}
      <div className="bg-game-card border border-slate-700 rounded-xl p-5 mb-6">
        <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">
          Your Decision
        </div>
        <p className="text-white font-medium mb-3">{selectedDecision.text}</p>
        <div className={`text-sm font-semibold ${getQualityColor(selectedDecision.quality)}`}>
          {getQualityLabel(selectedDecision.quality)}
        </div>
      </div>

      {/* Points Earned */}
      <div className="bg-game-card border border-slate-700 rounded-xl p-5 mb-6">
        <div className="text-xs text-slate-500 uppercase tracking-wider mb-3">
          Points Earned
        </div>
        <div className="space-y-2">
          {Object.entries(lastSkillDeltas).map(([skill, delta]) => (
            <div key={skill} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span>{SKILL_ICONS[skill as SkillCategory]}</span>
                <span className="text-slate-300 text-sm">
                  {SKILL_LABELS[skill as SkillCategory]}
                </span>
              </div>
              <span
                className={`font-bold text-lg ${
                  delta > 0 ? 'text-emerald-400' : 'text-slate-500'
                }`}
              >
                {delta > 0 ? `+${delta}` : '0'}
              </span>
            </div>
          ))}
          {Object.keys(lastSkillDeltas).length === 0 && (
            <p className="text-slate-500 text-sm text-center">
              No points earned — but the consequence itself is an important lesson.
            </p>
          )}
        </div>
      </div>

      {/* Updated Overall Score */}
      <div className="bg-game-card border border-slate-700 rounded-xl p-5 mb-6 text-center">
        <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">
          Overall Score
        </div>
        <div className="text-4xl font-bold text-game-accent-light">
          {overallScore}%
        </div>
        <div className="text-sm text-slate-400 mt-1">
          {player.scenariosCompleted} scenario{player.scenariosCompleted !== 1 ? 's' : ''} completed
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        {hasMoreScenarios ? (
          <Button size="lg" className="w-full" onClick={() => setScreen('dashboard')}>
            Continue to Dashboard →
          </Button>
        ) : (
          <Button size="lg" className="w-full" onClick={() => setScreen('finalProfile')}>
            View Final Profile →
          </Button>
        )}
      </div>
    </div>
  );
}
