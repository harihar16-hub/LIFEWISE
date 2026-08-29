import { useGameStore } from '../../store/gameStore';
import Button from '../ui/Button';

export default function NpcDialogue() {
  const scenario = useGameStore((s) => s.currentScenario);
  const currentNpcNodeId = useGameStore((s) => s.currentNpcNodeId);
  const npcDialogueHistory = useGameStore((s) => s.npcDialogueHistory);
  const npcCompleted = useGameStore((s) => s.npcCompleted);
  const advanceNpcDialogue = useGameStore((s) => s.advanceNpcDialogue);

  if (!scenario?.npcDialogue) return null;

  const { npcDialogue } = scenario;

  // Get current node
  const currentNode = currentNpcNodeId
    ? npcDialogue.nodes[currentNpcNodeId]
    : null;

  return (
    <div className="bg-game-card border border-slate-700 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">💬</span>
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
          Conversation with {npcDialogue.npcName}
        </h3>
        <span className="text-xs text-slate-500">({npcDialogue.npcRole})</span>
      </div>

      {/* Dialogue History */}
      {npcDialogueHistory.length > 0 && (
        <div className="space-y-3 mb-4">
          {npcDialogueHistory.map((entry, i) => (
            <div
              key={i}
              className={`flex gap-3 ${
                entry.speaker === 'You' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-xl px-4 py-3 text-sm ${
                  entry.speaker === 'You'
                    ? 'bg-game-accent/20 text-violet-200 border border-violet-500/20'
                    : 'bg-slate-700/50 text-slate-200 border border-slate-600'
                }`}
              >
                <div className="text-xs font-semibold mb-1 opacity-70">
                  {entry.speaker}
                </div>
                <p className="leading-relaxed">{entry.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Current NPC Prompt + Player Options */}
      {currentNode && !npcCompleted && (
        <div>
          {/* NPC's current message (only if it's the first node and no history yet) */}
          {npcDialogueHistory.length === 0 && (
            <div className="bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-sm text-slate-200 mb-4">
              <div className="text-xs font-semibold mb-1 opacity-70">
                {currentNode.npcName}
              </div>
              <p className="leading-relaxed">{currentNode.npcText}</p>
            </div>
          )}

          {/* Response Options */}
          <div className="space-y-2">
            <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">
              Choose your response:
            </div>
            {currentNode.options.map((option) => (
              <button
                key={option.id}
                onClick={() => advanceNpcDialogue(option, npcDialogue.npcName)}
                className="w-full text-left bg-slate-800 border border-slate-600 hover:border-game-accent rounded-lg p-3 text-sm text-slate-200 hover:text-white transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span>{option.text}</span>
                  <span className="text-xs text-slate-500 ml-2 flex-shrink-0">
                    {option.tone}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Completed */}
      {npcCompleted && (
        <div className="text-center text-sm text-slate-400 bg-slate-800/50 rounded-lg p-3">
          ✅ Conversation complete. Your responses have been noted.
        </div>
      )}
    </div>
  );
}
