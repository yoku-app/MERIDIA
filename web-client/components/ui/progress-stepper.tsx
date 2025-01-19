"use client";

import { HorizontalPosition } from "@/lib/interfaces/shared/interface";
import { cn } from "@/lib/utils/utils";
import { motion } from "framer-motion";
import { FC } from "react";

interface ProgressStepperProps {
    steps: number;
    activeStep: number;
    setActiveStep: (step: number) => void;
    className?: string;
    textPosition?: HorizontalPosition;
    textHidden?: boolean;
}

export const ProgressStepper: FC<ProgressStepperProps> = ({
    steps,
    activeStep,
    setActiveStep,
    className,
    textPosition = "center",
    textHidden = false,
}) => {
    const textPositionMap: Record<HorizontalPosition, string> = {
        left: "text-left",
        center: "text-center",
        right: "text-right",
    };

    return (
        <div className={cn("w-full max-w-md", className)}>
            <div className="flex h-2  overflow-hidden bg-secondary rounded-md">
                {Array.from({ length: steps }, (_, i) => (
                    <div
                        className="flex-1 border-r-2 border-background overflow-hidden first:rounded-l-md last:rounded-r-md"
                        key={i}
                    >
                        <motion.div
                            className="h-full bg-muted-foreground border-background"
                            initial={{ width: 0 }}
                            animate={{ width: i < activeStep ? "100%" : 0 }}
                            transition={{ duration: 0.4 }}
                        />
                    </div>
                ))}
            </div>
            {!textHidden && (
                <p
                    className={cn(
                        "mt-2 text-sm text-muted-foreground",
                        textPositionMap[textPosition]
                    )}
                >
                    Step {activeStep} of {steps}
                </p>
            )}
        </div>
    );
};
