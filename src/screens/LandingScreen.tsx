import { useGameStore } from '../store/gameStore';
import { hasSave } from '../lib/storage';
import Button from '../components/ui/Button';

export default function LandingScreen() {
  const setScreen = useGameStore((s) => s.setScreen);
  const loadFromStorage = useGameStore((s) => s.loadFromStorage);
  const savedExists = hasSave();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      {/* Hero Section */}
      <div className="text-center max-w-2xl">
        {/* Logo / Title */}
        <div className="mb-2">
          <span className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
            LIFEWISE
          </span>
        </div>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-slate-400 font-medium tracking-wide mb-8">
          Learn. Decide. Experience.
        </p>

        {/* Description */}
        <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-12 max-w-lg mx-auto">
          An AI-powered real-life decision simulation. Face real scenarios.
          Make real choices. See real consequences. Build skills that matter.
        </p>

        {/* Core Loop Visual */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-slate-500 mb-12">
          <span className="bg-slate-800 px-3 py-1 rounded-full">🔍 Investigate</span>
          <span>→</span>
          <span className="bg-slate-800 px-3 py-1 rounded-full">⚖️ Decide</span>
          <span>→</span>
          <span className="bg-slate-800 px-3 py-1 rounded-full">💥 Consequence</span>
          <span>→</span>
          <span className="bg-slate-800 px-3 py-1 rounded-full">📊 Learn</span>
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-3 items-center">
          <Button size="lg" onClick={() => setScreen('profile')}>
            Begin New Journey
          </Button>
          {savedExists && (
            <Button size="lg" variant="secondary" onClick={() => loadFromStorage()}>
              Continue Your Journey
            </Button>
          )}
        </div>

        {/* Skill Categories Preview */}
        <div className="mt-16 grid grid-cols-5 gap-3 max-w-md mx-auto">
          {[
            { icon: '💰', label: 'Finance' },
            { icon: '🔒', label: 'Cyber' },
            { icon: '🧠', label: 'Thinking' },
            { icon: '💬', label: 'Comms' },
            { icon: '🤝', label: 'Negotiate' },
          ].map((skill) => (
            <div key={skill.label} className="text-center">
              <div className="text-2xl mb-1">{skill.icon}</div>
              <div className="text-xs text-slate-500">{skill.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
