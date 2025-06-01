import { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4"; // À créer ou placeholder

export default function StepVerification() {
  const [currentStep, setCurrentStep] = useState(1);

  const goToNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const goToPrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="p-8">
      {currentStep === 1 && <Step1 onNext={goToNext} />}
      {currentStep === 2 && <Step2 onNext={goToNext} onBack={goToPrevious} />}
      {currentStep === 3 && <Step3 onNext={goToNext} onBack={goToPrevious} />}
      {currentStep === 4 && <Step4 onBack={goToPrevious} />}
    </div>
  );
}
