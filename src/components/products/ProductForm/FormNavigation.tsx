interface FormNavigationProps {
  currentStep: number;
  onStepChange: (step: number) => void;
}

export function FormNavigation({ currentStep, onStepChange }: FormNavigationProps) {
  const steps = [
    { id: 1, name: 'Basic Info' },
    { id: 2, name: 'Access Info' },
    { id: 3, name: 'Legal Info' },
  ];

  return (
    <nav className="flex justify-between mb-8">
      {steps.map((step) => (
        <button
          key={step.id}
          onClick={() => onStepChange(step.id)}
          className={`px-4 py-2 rounded-md ${
            currentStep === step.id
              ? 'bg-primary text-white'
              : 'bg-gray-100'
          }`}
        >
          {step.name}
        </button>
      ))}
    </nav>
  );
} 