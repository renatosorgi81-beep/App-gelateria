'use client';

interface FlavorSelectorProps {
  flavors: string[];
  selected: string[];
  maxFlavors: number;
  onChange: (flavors: string[]) => void;
}

export default function FlavorSelector({ flavors, selected, maxFlavors, onChange }: FlavorSelectorProps) {
  const toggle = (flavor: string) => {
    if (selected.includes(flavor)) {
      onChange(selected.filter((f) => f !== flavor));
    } else if (selected.length < maxFlavors) {
      onChange([...selected, flavor]);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-text-secondary">
          {selected.length}/{maxFlavors} gusti selezionati
        </p>
        {selected.length === maxFlavors && (
          <span className="text-xs text-primary font-medium">Massimo raggiunto</span>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {flavors.map((flavor) => {
          const isSelected = selected.includes(flavor);
          const isDisabled = !isSelected && selected.length >= maxFlavors;
          return (
            <button
              key={flavor}
              onClick={() => toggle(flavor)}
              disabled={isDisabled}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all active:scale-95 ${
                isSelected
                  ? 'bg-primary text-white'
                  : isDisabled
                    ? 'bg-surface-alt text-text-secondary/40 cursor-not-allowed'
                    : 'bg-surface-alt text-text-secondary border border-border hover:border-primary/40'
              }`}
            >
              {flavor}
            </button>
          );
        })}
      </div>
    </div>
  );
}
