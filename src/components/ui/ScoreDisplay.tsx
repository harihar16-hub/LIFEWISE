import { SKILL_LABELS, SKILL_ICONS, ALL_SKILLS, type SkillCategory } from '../../types/game';
import ProgressBar from './ProgressBar';

interface ScoreDisplayProps {
  skills: Record<SkillCategory, number>;
  overallScore: number;
}

const SKILL_COLORS: Record<SkillCategory, string> = {
  financial: 'bg-amber-500',
  cybersecurity: 'bg-cyan-500',
  criticalThinking: 'bg-violet-500',
  communication: 'bg-emerald-500',
  negotiation: 'bg-rose-500',
};

export default function ScoreDisplay({ skills, overallScore }: ScoreDisplayProps) {
  return (
    <div className="space-y-4">
      {/* Overall Score */}
      <div className="bg-game-card border border-slate-700 rounded-xl p-4">
        <div className="text-center mb-3">
          <div className="text-sm text-slate-400 uppercase tracking-wider">Overall Score</div>
          <div className="text-4xl font-bold text-game-accent-light mt-1">
            {overallScore}%
          </div>
        </div>
        <ProgressBar value={overallScore} color="bg-game-accent" />
      </div>

      {/* Individual Skills */}
      <div className="space-y-3">
        {ALL_SKILLS.map((skill) => (
          <div key={skill} className="flex items-center gap-3">
            <span className="text-xl w-8 text-center">{SKILL_ICONS[skill]}</span>
            <div className="flex-1">
              <ProgressBar
                value={skills[skill]}
                label={SKILL_LABELS[skill]}
                color={SKILL_COLORS[skill]}
                size="sm"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
