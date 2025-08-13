import React from "react";
import { useMediaQuery } from "react-responsive";
import BackButton from "./backButton";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  stepLabels,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  if (stepLabels.length !== totalSteps) {
    console.warn(
      "stepLabels length debe ser igual a totalSteps para mostrar los textos correctamente."
    );
  }

  if (isMobile) {
    const minProgress = 5;

    const progressPercentMobile = Math.max(
      minProgress,
      ((currentStep - 1) / (totalSteps - 1)) * (100 - minProgress) + minProgress
    );

    return (
      <div className="flex items-center gap-4 px-4 h-18 border-b-2 border-lightBlueGray w-full mx-auto">
        {isMobile && <BackButton />}
        <div className="text-darkBlue1 font-extrabold whitespace-nowrap flex-shrink-0">
          <p className="text-[13px]">
            PASO {currentStep} DE {totalSteps}
          </p>
        </div>

        <div className="flex-grow h-2 bg-lightBlueGray mr-8 rounded-full overflow-hidden min-w-0">
          <div
            className="h-2 bg-blue rounded-full transition-all duration-300"
            style={{ width: `${progressPercentMobile}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-18 flex items-center justify-center gap-4 bg-lightGrayWhite select-none">
      {Array.from({ length: totalSteps }).map((_, i) => {
        const stepIndex = i + 1;
        const isCurrent = stepIndex === currentStep;
        const isNext = stepIndex === currentStep + 1;
        const isPrev = stepIndex < currentStep;

        let circleClasses =
          "w-6 h-6 rounded-full border-2 font-semibold flex items-center justify-center text-xs ";
        let labelClasses = "text-[16px] font-semibold ";

        if (isCurrent) {
          circleClasses += "bg-blue border-blue text-white";
          labelClasses += "text-darkBlue1";
        } else if (isNext) {
          circleClasses += "border-grayBlue text-grayBlue bg-transparent";
          labelClasses += "text-grayBlue";
        } else if (isPrev) {
          circleClasses += "border-grayBlue text-grayBlue bg-transparent";
          labelClasses += "text-grayBlue";
        }

        return (
          <React.Fragment key={i}>
            <div className="flex flex-row items-center gap-4 justify-center min-w-[120px]">
              <div className={circleClasses}>{stepIndex}</div>
              <span className={labelClasses}>{stepLabels[i]}</span>
            </div>

            {stepIndex < totalSteps && (
              <div className="flex gap-1 ml-2 mr-2">
                {[...Array(4)].map((_, dotIndex) => {
                  let dotClass = "w-1 h-1 rounded-full bg-grayBlue";

                  if (stepIndex === currentStep)
                    dotClass = "w-1 h-1 rounded-full bg-blue";

                  return <span key={dotIndex} className={dotClass} />;
                })}
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ProgressBar;
