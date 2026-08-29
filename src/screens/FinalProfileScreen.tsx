import { useGameStore } from '../store/gameStore';
import { scenarios } from '../data/scenarios';
import {
  calculateOverallScore,
  getNormalizedSkills,
  getStrongestSkill,
  getWeakestSkill,
  getQualityLabel,
} from '../lib/utils';
import { SKILL_LABELS, SKILL_ICONS, ALL_SKILLS, type SkillCategory } from '../types/game';
import ScoreDisplay from '../components/ui/ScoreDisplay';
import Button from '../components/ui/Button';

export default function FinalProfileScreen() {
  const player = useGameStore((s) => s.player);
  const decisionHistory = useGameStore((s) => s.decisionHistory);
  const lastInsight = useGameStore((s) => s.lastInsight);
  const resetGame = useGameStore((s) => s.resetGame);

  if (!player) return null;

  const normalizedSkills = getNormalizedSkills(player.skills, scenarios);
  const overallScore = calculateOverallScore(player.skills, scenarios);
  const strongest = getStrongestSkill(normalizedSkills);
  const weakest = getWeakestSkill(normalizedSkills);

  // Decision stats
  const totalDecisions = decisionHistory.length;
  const excellentCount = decisionHistory.filter((d) => d.quality === 'excellent').length;
  const poorCount = decisionHistory.filter((d) => d.quality === 'poor').length;
  const highRiskCount = decisionHistory.filter((d) => d.riskLevel === 'high').length;
  const avgInvestigation = totalDecisions > 0
    ? Math.round(
        (decisionHistory.reduce((sum, d) => sum + d.investigationCompleteness, 0) /
          totalDecisions) *
          100
      )
    : 0;

  return (
    <div className="min-h-screen px-4 py-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="text-5xl mb-4">🏆</div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-2">
          LIFEWISE JOURNEY COMPLETE
        </h1>
        <p className="text-slate-400 text-lg">
          Here's your complete decision profile, {player.name}.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Column — Scores */}
        <div>
          <h2 className="text-lg font-semibold text-slate-200 mb-4">Skill Breakdown</h2>
          <ScoreDisplay skills={normalizedSkills} overallScore={overallScore} />
        </div>

        {/* Right Column — Stats */}
        <div className="space-y-6">
          {/* Decision Stats */}
          <div className="bg-game-card border border-slate-700 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">
              Decision Profile
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-800 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-white">{totalDecisions}</div>
                <div className="text-xs text-slate-400">Decisions Made</div>
              </div>
              <div className="bg-slate-800 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-emerald-400">{excellentCount}</div>
                <div className="text-xs text-slate-400">Excellent Choices</div>
              </div>
              <div className="bg-slate-800 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-amber-400">{highRiskCount}</div>
                <div className="text-xs text-slate-400">High-Risk Choices</div>
              </div>
              <div className="bg-slate-800 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-cyan-400">{avgInvestigation}%</div>
                <div className="text-xs text-slate-400">Avg Investigation</div>
              </div>
            </div>
          </div>

          {/* Strongest / Weakest */}
          <div className="grid grid-cols-2 gap-3">
            {strongest && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 text-center">
                <div className="text-xs text-slate-400 mb-2">Strongest Skill</div>
                <div className="text-2xl mb-1">{SKILL_ICONS[strongest]}</div>
                <div className="text-sm text-emerald-400 font-semibold">
                  {SKILL_LABELS[strongest]}
                </div>
                <div className="text-lg font-bold text-white mt-1">
                  {normalizedSkills[strongest]}%
                </div>
              </div>
            )}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-center">
              <div className="text-xs text-slate-400 mb-2">Needs Improvement</div>
              <div className="text-2xl mb-1">{SKILL_ICONS[weakest]}</div>
              <div className="text-sm text-amber-400 font-semibold">
                {SKILL_LABELS[weakest]}
              </div>
              <div className="text-lg font-bold text-white mt-1">
                {normalizedSkills[weakest]}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decision History */}
      <div className="mt-8 bg-game-card border border-slate-700 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">
          Decision History
        </h3>
        <div className="space-y-3">
          {decisionHistory.map((record, i) => (
            <div key={i} className="bg-slate-800 rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span>{SKILL_ICONS[record.category]}</span>
                <div>
                  <div className="text-sm text-white font-medium">{record.scenarioTitle}</div>
                  <div className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                    {record.decisionText}
                  </div>
                </div>
              </div>
              <span className={`text-xs font-semibold ${
                record.quality === 'excellent' ? 'text-emerald-400' :
                record.quality === 'good' ? 'text-blue-400' :
                record.quality === 'average' ? 'text-amber-400' :
                'text-rose-400'
              }`}>
                {getQualityLabel(record.quality)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insight */}
      {lastInsight && (
        <div className="mt-6 bg-game-card border border-violet-500/30 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <span>🤖</span>
            <h3 className="text-sm font-semibold text-game-accent-light uppercase tracking-wider">
              Personalized Feedback
            </h3>
          </div>
          <p className="text-slate-300 leading-relaxed">{lastInsight.summary}</p>
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
        </div>
      )}

      {/* Restart */}
      <div className="mt-8 text-center">
        <Button variant="secondary" onClick={resetGame}>
          Start a New Journey
        </Button>
      </div>
    </div>
  );
}
