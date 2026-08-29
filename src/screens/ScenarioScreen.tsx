import { useGameStore } from '../store/gameStore';
import { SKILL_ICONS, SKILL_LABELS } from '../types/game';
import InvestigationPhase from '../components/scenario/InvestigationPhase';
import DecisionPhase from '../components/scenario/DecisionPhase';
import ConsequencePhase from '../components/scenario/ConsequencePhase';

export default function ScenarioScreen() {
  const scenario = useGameStore((s) => s.currentScenario);
  const currentPhase = useGameStore((s) => s.currentPhase);

  if (!scenario) return null;

  const phases = [
    { key: 'investigation', label: 'Investigate', icon: '🔍' },
    { key: 'decision', label: 'Decide', icon: '⚖️' },
    { key: 'consequence', label: 'Consequence', icon: '💥' },
  ];
  const currentIndex = phases.findIndex((p) => p.key === currentPhase);

  return (
    <div className="min-h-screen px-4 py-6 max-w-3xl mx-auto">
      {/* Scenario Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">{SKILL_ICONS[scenario.category]}</span>
          <span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full uppercase tracking-wider">
            {SKILL_LABELS[scenario.category]}
          </span>
          <span className="text-xs text-slate-500 ml-auto">
            Difficulty: {'⭐'.repeat(scenario.difficulty)}
          </span>
        </div>
        <h1 className="text-2xl font-bold text-white">{scenario.title}</h1>
      </div>

      {/* Phase Progress */}
      <div className="flex items-center gap-2 mb-8">
        {phases.map((phase, i) => (
          <div key={phase.key} className="flex items-center gap-2 flex-1">
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                i === currentIndex
                  ? 'bg-game-accent text-white'
                  : i < currentIndex
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-slate-800 text-slate-500'
              }`}
            >
              <span>{i < currentIndex ? '✓' : phase.icon}</span>
              <span className="hidden sm:inline">{phase.label}</span>
            </div>
            {i < phases.length - 1 && (
              <div
                className={`flex-1 h-0.5 ${
                  i < currentIndex ? 'bg-emerald-500/40' : 'bg-slate-700'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Situation Context (shown during investigation) */}
      {currentPhase === 'investigation' && (
        <div className="bg-game-card border border-slate-700 rounded-xl p-5 mb-6">
          <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">
            📋 Situation
          </div>
          <p className="text-slate-300 leading-relaxed mb-3">
            {scenario.situation}
          </p>
          {scenario.context && (
            <p className="text-slate-400 text-sm leading-relaxed italic">
              {scenario.context}
            </p>
          )}
        </div>
      )}

      {/* Phase Content */}
      {currentPhase === 'investigation' && <InvestigationPhase />}
      {currentPhase === 'decision' && <DecisionPhase />}
      {currentPhase === 'consequence' && <ConsequencePhase />}
    </div>
  );
}
