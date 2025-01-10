"use client";

import { Progress } from "@/components/ui/progress";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Propless } from "@/lib/interfaces/shared/interface";
import { FC, useState } from "react";
import { OnboardForm } from "./OnboardForm";

export const Onboard: FC<Propless> = () => {
    const [progress, setOnboardingProgress] = useState<number>(10);

    return (
        <Sheet open={true} modal={true}>
            <SheetContent
                hideClose={true}
                side={"left"}
                className="w-full md:min-w-[50rem] overflow-y-auto flex flex-col p-8 md:px-16 md:py-20"
            >
                <Progress value={progress} className="max-w-md" />
                <OnboardForm setProgress={setOnboardingProgress} />
            </SheetContent>
        </Sheet>
    );
};
