'use client';

import React from 'react';

interface Step {
  label: string;
  status: 'completed' | 'active' | 'pending';
}

interface CheckoutStepsProps {
  steps?: Step[];
  currentStep?: number;
}

const defaultSteps: Step[] = [
  { label: 'Cart', status: 'completed' },
  { label: 'Shipping', status: 'active' },
  { label: 'Payment', status: 'pending' },
  { label: 'Confirmation', status: 'pending' },
];

export function CheckoutSteps({ steps = defaultSteps, currentStep }: CheckoutStepsProps) {
  const processedSteps = currentStep !== undefined
    ? steps.map((step, index) => ({
        ...step,
        status: index < currentStep ? 'completed' : index === currentStep ? 'active' : 'pending',
      } as Step))
    : steps;

  return (
    <div className="checkout-steps mb-12">
      {processedSteps.map((step, index) => (
        <React.Fragment key={step.label}>
          <div className="checkout-step">
            <span className={`step-number step-number-${step.status}`}>
              {step.status === 'completed' ? (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                index + 1
              )}
            </span>
            <span className={`step-label ${step.status === 'pending' ? 'step-label-pending' : ''}`}>
              {step.label}
            </span>
          </div>
          {index < processedSteps.length - 1 && (
            <div className={`step-divider ${step.status === 'completed' ? 'step-divider-completed' : ''}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default CheckoutSteps;
