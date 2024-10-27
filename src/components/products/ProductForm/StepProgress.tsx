interface StepProgressProps {
  currentStep: number;
}

export function StepProgress({ currentStep }: StepProgressProps) {
  const steps = [
    { title: '基本信息', description: '填写产品基本信息' },
    { title: '接入信息', description: '配置产品接入信息' },
    { title: '法务信息', description: '上传相关资质文件' },
  ];

  return (
    <div className="relative">
      <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200">
        <div
          className="absolute h-full bg-primary transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />
      </div>

      <div className="relative flex justify-between">
        {steps.map((step, index) => {
          const isActive = index + 1 <= currentStep;
          return (
            <div
              key={step.title}
              className="flex flex-col items-center"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-colors ${
                  isActive ? 'bg-primary text-white' : 'bg-gray-200'
                }`}
              >
                {index + 1}
              </div>
              <div className="text-sm font-medium">{step.title}</div>
              <div className="text-xs text-gray-500">{step.description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
