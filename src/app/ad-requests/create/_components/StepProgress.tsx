"use client";

import { CheckCircle, Circle } from "lucide-react";

interface StepProgressProps {
  step: number;
}

const StepProgress: React.FC<StepProgressProps> = ({ step }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-4">
          {/* 1단계 */}
          <div className="flex items-center">
            {step > 1 ? (
              <CheckCircle className="h-8 w-8 text-green-500" />
            ) : step === 1 ? (
              <CheckCircle className="text-primary h-8 w-8" />
            ) : (
              <Circle className="text-muted-foreground h-8 w-8" />
            )}
            <span
              className={`
                ml-2 text-sm font-medium
                ${
                  step > 1
                    ? "text-green-500"
                    : step === 1
                    ? "text-primary"
                    : "text-muted-foreground"
                }
              `}
            >
              캠페인
            </span>
          </div>

          {/* 구분선 */}
          <div className={`bg-muted-foreground h-px w-16`} />

          {/* 2단계 */}
          <div className="flex items-center">
            {step === 2 ? (
              <CheckCircle className="text-primary h-8 w-8" />
            ) : (
              <Circle className="text-muted-foreground h-8 w-8" />
            )}
            <span
              className={`
                ml-2 text-sm font-medium
                ${step === 2 ? "text-primary" : "text-muted-foreground"}
              `}
            >
              광고
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepProgress;
