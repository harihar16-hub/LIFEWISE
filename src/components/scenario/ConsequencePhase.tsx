import { useGameStore } from '../../store/gameStore';
import { getQualityLabel, getQualityColor, getQualityBg } from '../../lib/utils';
import { SKILL_LABELS, SKILL_ICONS, type SkillCategory } from '../../types/game';
import Button from '../ui/Button';

export default function ConsequencePhase() {
  const selectedDecision = useGameStore((s) => s.selectedDecision);
  const lastSkillDeltas = useGameStore((s) => s.lastSkillDeltas);
  const completeScenario = useGameStore((s) => s.completeScenario);

  if (!selectedDecision) return null;

  const { consequence } = selectedDecision;

  return (
    <div className="space-y-6">
      {/* Phase Header */}
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          💥 Consequence
        </h2>
      </div>

      {/* Your Decision */}
      <div className="bg-game-card border border-slate-700 rounded-xl p-4">
        <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">
          Your Decision
        </div>
        <p className="text-white font-medium">{selectedDecision.text}</p>
      </div>

      {/* Decision Quality */}
      <div className={`border rounded-xl p-4 ${getQualityBg(selectedDecision.quality)}`}>
        <div className={`text-lg font-bold ${getQualityColor(selectedDecision.quality)}`}>
          {getQualityLabel(selectedDecision.quality)}
        </div>
      </div>

      {/* What Happened */}
      <div className="bg-game-card border border-slate-700 rounded-xl p-5 space-y-4">
        <div>
          <div className="text-xs text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
            📖 What Happened
          </div>
          <p className="text-slate-300 leading-relaxed">{consequence.immediate}</p>
        </div>

        <hr className="border-slate-700" />

        <div>
          <div className="text-xs text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
            🔍 Why It Happened
          </div>
          <p className="text-slate-300 leading-relaxed">{consequence.explanation}</p>
        </div>

        <hr className="border-slate-700" />

        <div>
          <div className="text-xs text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
            🎯 Skill Involved
          </div>
          <p className="text-game-accent-light font-medium">{consequence.skillInvolved}</p>
        </div>

        <hr className="border-slate-700" />

        <div>
          <div className="text-xs text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
            💡 What You Can Learn
          </div>
          <p className="text-slate-200 leading-relaxed">{consequence.lesson}</p>
        </div>
      </div>

      {/* Score Changes */}
      {Object.keys(lastSkillDeltas).length > 0 && (
        <div className="bg-game-card border border-slate-700 rounded-xl p-4">
          <div className="text-xs text-slate-500 uppercase tracking-wider mb-3">
            📊 Score Impact
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
                  className={`font-bold ${
                    delta > 0 ? 'text-emerald-400' : 'text-slate-500'
                  }`}
                >
                  {delta > 0 ? `+${delta}` : delta === 0 ? '—' : delta}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Continue */}
      <Button size="lg" className="w-full" onClick={completeScenario}>
        Continue →
      </Button>
    </div>
  );
}
