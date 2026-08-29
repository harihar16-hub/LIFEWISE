import { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import type { EvidenceItem } from '../../types/game';
import Button from '../ui/Button';
import NpcDialogue from './NpcDialogue';

export default function InvestigationPhase() {
  const scenario = useGameStore((s) => s.currentScenario);
  const revealedEvidence = useGameStore((s) => s.revealedEvidence);
  const revealEvidence = useGameStore((s) => s.revealEvidence);
  const setPhase = useGameStore((s) => s.setPhase);
  const npcCompleted = useGameStore((s) => s.npcCompleted);

  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceItem | null>(null);

  if (!scenario) return null;

  const visibleEvidence = scenario.evidence.filter((e) => !e.isHidden);
  const hiddenEvidence = scenario.evidence.filter((e) => e.isHidden);
  const totalEvidence = scenario.evidence.length;
  const revealedCount = revealedEvidence.length;
  const completeness = totalEvidence > 0 ? Math.round((revealedCount / totalEvidence) * 100) : 100;

  const handleReveal = (evidence: EvidenceItem) => {
    revealEvidence(evidence.id);
    setSelectedEvidence(evidence);
  };

  const hasNpc = !!scenario.npcDialogue;

  return (
    <div className="space-y-6">
      {/* Phase Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            🔍 Investigation Phase
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Examine the evidence before making your decision. Investigation is optional but rewarded.
          </p>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-500">Evidence Examined</div>
          <div className="text-lg font-bold text-game-accent-light">
            {completeness}%
          </div>
        </div>
      </div>

      {/* Available Evidence */}
      <div>
        <h3 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">
          Available Information
        </h3>
        <div className="grid gap-3">
          {visibleEvidence.map((evidence) => {
            const isRevealed = revealedEvidence.includes(evidence.id);
            return (
              <button
                key={evidence.id}
                onClick={() => handleReveal(evidence)}
                className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                  isRevealed
                    ? 'bg-violet-500/10 border-violet-500/30'
                    : 'bg-game-card border-slate-700 hover:border-slate-500'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{isRevealed ? '📄' : '📋'}</span>
                  <span className="font-medium text-white">{evidence.title}</span>
                  {isRevealed && (
                    <span className="text-xs text-violet-400 ml-auto">Examined ✓</span>
                  )}
                </div>
                {isRevealed && (
                  <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                    {evidence.content}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Hidden Evidence (Investigate Further) */}
      {hiddenEvidence.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">
            🔎 Investigate Further
          </h3>
          <div className="grid gap-3">
            {hiddenEvidence.map((evidence) => {
              const isRevealed = revealedEvidence.includes(evidence.id);
              return (
                <button
                  key={evidence.id}
                  onClick={() => handleReveal(evidence)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                    isRevealed
                      ? 'bg-cyan-500/10 border-cyan-500/30'
                      : 'bg-game-card border-slate-700 hover:border-cyan-700 border-dashed'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{isRevealed ? '🔓' : '🔒'}</span>
                    <span className="font-medium text-white">
                      {isRevealed ? evidence.title : 'Investigate: ' + evidence.title}
                    </span>
                    {isRevealed && (
                      <span className="text-xs text-cyan-400 ml-auto">Discovered ✓</span>
                    )}
                  </div>
                  {isRevealed && (
                    <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                      {evidence.content}
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* NPC Dialogue (if available) */}
      {hasNpc && <NpcDialogue />}

      {/* Proceed to Decision */}
      <div className="flex items-center justify-between bg-game-card border border-slate-700 rounded-xl p-4">
        <div className="text-sm text-slate-400">
          {completeness < 40
            ? '💡 Tip: Investigating more evidence can improve your score.'
            : completeness < 70
            ? '👍 Good investigation progress. More clues remain.'
            : '⭐ Thorough investigation! You\'re well prepared.'}
        </div>
        <Button onClick={() => setPhase('decision')}>
          Make Your Decision →
        </Button>
      </div>
    </div>
  );
}
