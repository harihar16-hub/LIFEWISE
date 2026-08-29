interface ProgressBarProps {
  value: number; // 0–100
  label?: string;
  color?: string;
  size?: 'sm' | 'md';
}

export default function ProgressBar({
  value,
  label,
  color = 'bg-game-accent',
  size = 'md',
}: ProgressBarProps) {
  const height = size === 'sm' ? 'h-2' : 'h-3';
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between mb-1 text-sm">
          <span className="text-slate-300">{label}</span>
          <span className="text-slate-400">{clamped}%</span>
        </div>
      )}
      <div className={`w-full ${height} bg-slate-700 rounded-full overflow-hidden`}>
        <div
          className={`${height} ${color} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
