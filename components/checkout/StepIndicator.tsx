import { CheckoutStep } from '@/types';

const STEPS: { key: CheckoutStep; label: string; num: number }[] = [
  { key: 'customer', label: 'Dati', num: 1 },
  { key: 'delivery', label: 'Consegna', num: 2 },
  { key: 'payment', label: 'Pagamento', num: 3 },
  { key: 'summary', label: 'Riepilogo', num: 4 },
];

interface StepIndicatorProps {
  currentStep: CheckoutStep;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  const currentIdx = STEPS.findIndex((s) => s.key === currentStep);

  return (
    <div className="flex items-center justify-between px-2">
      {STEPS.map((step, idx) => {
        const isCompleted = idx < currentIdx;
        const isActive = idx === currentIdx;
        return (
          <div key={step.key} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                isCompleted
                  ? 'bg-primary text-white'
                  : isActive
                    ? 'bg-primary text-white ring-4 ring-primary/20'
                    : 'bg-surface-alt text-text-secondary'
              }`}>
                {isCompleted ? '✓' : step.num}
              </div>
              <span className={`text-[10px] mt-1 font-medium ${isActive ? 'text-primary' : 'text-text-secondary'}`}>
                {step.label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-1 mb-4 transition-colors ${isCompleted ? 'bg-primary' : 'bg-border'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
