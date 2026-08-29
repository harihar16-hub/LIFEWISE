import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { getAgeGroup } from '../lib/utils';
import Button from '../components/ui/Button';

export default function ProfileScreen() {
  const createPlayer = useGameStore((s) => s.createPlayer);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState('');

  const ageNum = parseInt(age, 10);
  const ageGroup = !isNaN(ageNum) && ageNum >= 13 ? getAgeGroup(ageNum) : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (isNaN(ageNum) || ageNum < 13 || ageNum > 99) {
      setError('Please enter a valid age (13–99).');
      return;
    }
    createPlayer(name.trim(), ageNum);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create Your Profile</h1>
          <p className="text-slate-400">Tell us about yourself to personalize your experience.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(''); }}
              placeholder="Enter your name"
              className="w-full px-4 py-3 bg-game-card border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-game-accent focus:ring-1 focus:ring-game-accent transition-colors"
              maxLength={30}
              autoFocus
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Your Age
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => { setAge(e.target.value); setError(''); }}
              placeholder="Enter your age"
              className="w-full px-4 py-3 bg-game-card border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-game-accent focus:ring-1 focus:ring-game-accent transition-colors"
              min={13}
              max={99}
            />
          </div>

          {/* Age Group Preview */}
          {ageGroup && (
            <div className="bg-violet-500/10 border border-violet-500/30 rounded-xl p-4 text-center">
              <div className="text-sm text-slate-400 mb-1">Your Age Group</div>
              <div className="text-lg font-semibold text-game-accent-light">{ageGroup}</div>
              <div className="text-xs text-slate-500 mt-1">
                Scenarios will be tailored to your age group
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="text-rose-400 text-sm text-center bg-rose-500/10 border border-rose-500/30 rounded-lg p-3">
              {error}
            </div>
          )}

          {/* Submit */}
          <Button type="submit" size="lg" className="w-full">
            Start Playing
          </Button>
        </form>
      </div>
    </div>
  );
}
