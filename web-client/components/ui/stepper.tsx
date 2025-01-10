interface StepperProps extends ClassNameProps {
    steps: string[];
    activeStep: number;
    setActiveStep: (step: number) => void;
    showTitle?: boolean;
    controlAccess?: boolean;
}

import { ClassNameProps, FCWC } from "@/lib/interfaces/shared/interface";
import { cn } from "@/lib/utils/utils";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FC } from "react";
import { Button } from "./button";

export const Stepper: FC<StepperProps> = ({
    steps,
    activeStep,
    setActiveStep,
    showTitle = true,
    controlAccess = false,
    className,
}) => {
    const progress = ((activeStep + 1) / steps.length) * 100 - 5;

    return (
        <div
            className={cn("w-full flex items-center mx-auto mt-10", className)}
        >
            <StepperControl
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                display={controlAccess}
                direction="previous"
                stepCount={steps.length}
            >
                <ChevronLeft className="w-6 h-6" />
            </StepperControl>
            {/* Progress Bar */}
            <section
                className={cn(
                    "relative w-full",
                    controlAccess ? "mx-4" : "mx-0"
                )}
            >
                <div className="w-full h-[0.1px] bg-border rounded">
                    <motion.div
                        className="h-[0.1px] bg-muted-foreground rounded"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.4 }}
                    />
                </div>

                <div className="flex absolute w-3/4 right-0 -top-1/2 -translate-y-[35%] justify-between mb-6">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={`flex flex-col items-center px-2 last:pr-0 bg-background ${
                                index <= activeStep
                                    ? "text-primary"
                                    : "text-muted"
                            }`}
                        >
                            <div
                                className={`w-6 h-6 flex border-2 items-center relative justify-center transition-colors duration-300 rounded-full ${
                                    index <= activeStep
                                        ? "bg-muted-foreground border-muted-foreground text-foreground delay-300"
                                        : "bg-background"
                                }`}
                            >
                                {showTitle && index + 1}
                            </div>
                            {showTitle && (
                                <span className="mt-2 text-sm">{step}</span>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            <StepperControl
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                display={controlAccess}
                direction="next"
                stepCount={steps.length}
            >
                <ChevronRight className="w-6 h-6" />
            </StepperControl>
        </div>
    );
};

type StepControlDirection = "next" | "previous";

interface StepperControlProps
    extends Pick<StepperProps, "activeStep" | "setActiveStep"> {
    display: boolean;
    direction: StepControlDirection;
    stepCount: number;
}

const StepperControl: FCWC<StepperControlProps> = ({
    activeStep,
    setActiveStep,
    display,
    children,
    direction,
    stepCount,
}) => {
    if (!display) {
        return null;
    }

    const handleNext = () => {
        if (activeStep < stepCount - 1) {
            setActiveStep(activeStep + 1);
        }
    };

    const handlePrevious = () => {
        if (activeStep > 0) {
            setActiveStep(activeStep - 1);
        }
    };

    const stepDirectionRecord: Record<StepControlDirection, () => void> = {
        next: handleNext,
        previous: handlePrevious,
    };

    const isDisabled: boolean =
        direction === "next" ? activeStep === stepCount - 1 : activeStep === 0;

    return (
        <Button
            variant={"ghost"}
            className="w-auto h-auto p-1 [&_svg]:size-8 flex"
            onClick={stepDirectionRecord[direction]}
            disabled={isDisabled}
        >
            {children}
        </Button>
    );
};
