import { useGameStore } from '../../store/gameStore';
import type { DecisionOption } from '../../types/game';
import { getRiskColor } from '../../lib/utils';
import Button from '../ui/Button';

export default function DecisionPhase() {
  const scenario = useGameStore((s) => s.currentScenario);
  const makeDecision = useGameStore((s) => s.makeDecision);

  if (!scenario) return null;

  const handleDecision = (decision: DecisionOption) => {
    makeDecision(decision);
  };

  return (
    <div className="space-y-6">
      {/* Phase Header */}
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          ⚖️ Decision Phase
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Consider the situation carefully. Your decision will have real consequences.
        </p>
      </div>

      {/* Situation Reminder */}
      <div className="bg-game-card border border-slate-700 rounded-xl p-4">
        <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">
          Situation
        </div>
        <p className="text-slate-300 text-sm leading-relaxed">
          {scenario.situation}
        </p>
      </div>

      {/* Objective */}
      <div className="bg-violet-500/10 border border-violet-500/30 rounded-xl p-4">
        <div className="text-xs text-violet-400 uppercase tracking-wider mb-1">
          🎯 Your Objective
        </div>
        <p className="text-slate-200 text-sm">{scenario.objective}</p>
      </div>

      {/* Decision Cards */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
          What do you do?
        </h3>
        {scenario.decisions.map((decision, index) => (
          <button
            key={decision.id}
            onClick={() => handleDecision(decision)}
            className="w-full text-left bg-game-card border border-slate-700 hover:border-game-accent rounded-xl p-5 transition-all group cursor-pointer hover:bg-game-card-hover"
          >
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-slate-700 group-hover:bg-game-accent rounded-lg flex items-center justify-center text-sm font-bold text-slate-300 group-hover:text-white transition-colors">
                {String.fromCharCode(65 + index)}
              </span>
              <div className="flex-1">
                <p className="text-white font-medium group-hover:text-game-accent-light transition-colors">
                  {decision.text}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <span className={`text-xs ${getRiskColor(decision.riskLevel)}`}>
                    ● {decision.riskLevel.charAt(0).toUpperCase() + decision.riskLevel.slice(1)} Risk
                  </span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
