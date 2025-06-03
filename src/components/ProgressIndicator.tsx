
import { MapPin, Trash2, Package, FileCheck, Calendar, CreditCard } from 'lucide-react';

interface Step {
  name: string;
  completed: boolean;
  current: boolean;
}

interface ProgressIndicatorProps {
  steps: Step[];
}

const stepIcons = {
  'Postcode': MapPin,
  'Waste Type': Trash2,
  'Select Skip': Package,
  'Permit Check': FileCheck,
  'Choose Date': Calendar,
  'Payment': CreditCard,
};

const ProgressIndicator = ({ steps }: ProgressIndicatorProps) => {
  return (
    <div className="w-full mb-8 sm:mb-12">
      {/* Mobile - Show only current step */}
      <div className="block sm:hidden">
        <div className="flex items-center justify-center">
          {steps.map((step, index) => {
            if (!step.current) return null;
            const IconComponent = stepIcons[step.name as keyof typeof stepIcons];
            return (
              <div key={step.name} className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-500/30 flex items-center justify-center mb-2">
                  <IconComponent size={20} />
                </div>
                <span className="text-blue-400 text-sm font-medium">{step.name}</span>
                <span className="text-gray-400 text-xs">Step {index + 1} of {steps.length}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop - Show all steps */}
      <div className="hidden sm:block">
        <div className="flex items-center justify-between max-w-4xl mx-auto relative">
          {steps.map((step, index) => {
            const IconComponent = stepIcons[step.name as keyof typeof stepIcons];
            return (
              <div key={step.name} className="flex items-center relative flex-1">
                {/* Step circle */}
                <div className="flex flex-col items-center relative z-10 w-full">
                  <div
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 relative z-10
                      ${step.completed 
                        ? 'bg-blue-600 text-white shadow-lg' 
                        : step.current 
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                          : 'bg-gray-700 text-gray-400'
                      }
                    `}
                  >
                    <IconComponent size={20} />
                  </div>
                  <span className={`mt-3 text-sm font-medium text-center ${
                    step.current ? 'text-blue-400' : step.completed ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    {step.name}
                  </span>
                </div>
                
                {/* Connecting line */}
                {index < steps.length - 1 && (
                  <div className="absolute top-6 left-1/2 w-full h-0.5 z-0 -translate-y-1/2">
                    <div className={`h-full transition-all duration-500 ${
                      step.completed ? 'bg-blue-600' : 'bg-gray-700'
                    }`} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
