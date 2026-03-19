'use client';

import React, { useState } from 'react';

interface Step {
  title: string;
  content: React.ReactNode;
}

interface StepperProps {
  steps: Step[];
  initialStep?: number;
}

export default function Stepper({ steps, initialStep = 0 }: StepperProps) {
  const [currentStep, setCurrentStep] = useState(initialStep);

  return (
    <div className="my-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {steps.map((step, index) => (
          <button
            key={index}
            onClick={() => setCurrentStep(index)}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              index === currentStep
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-b-2 border-blue-500'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            {step.title}
          </button>
        ))}
      </div>
      <div className="p-6 bg-white dark:bg-gray-800">
        <div className="prose prose-sm dark:prose-invert max-w-none">
          {steps[currentStep].content}
        </div>
      </div>
    </div>
  );
}
