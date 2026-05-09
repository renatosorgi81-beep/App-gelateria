'use client';

interface CreamToggleProps {
  value: boolean;
  onChange: (v: boolean) => void;
}

export default function CreamToggle({ value, onChange }: CreamToggleProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-border">
      <div>
        <p className="font-medium text-text-primary text-sm">Panna</p>
        <p className="text-xs text-text-secondary">+€0,30</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onChange(false)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
            !value ? 'bg-primary text-white' : 'text-text-secondary'
          }`}
        >
          No
        </button>
        <button
          onClick={() => onChange(true)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
            value ? 'bg-primary text-white' : 'text-text-secondary'
          }`}
        >
          Sì
        </button>
      </div>
    </div>
  );
}
