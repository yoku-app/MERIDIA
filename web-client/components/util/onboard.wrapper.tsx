"use client";

import { FCWC, Propless } from "@/lib/interfaces/shared/interface";
import { Onboard } from "../feature-modules/onboarding/Onboard";
import { useUserStore } from "../provider/user.provider";

/**
 * Centralised Wrapper Component to Handle all the Onboarding Process for a user once their
 * account is located within the store
 *
 * Will handle the core onboarding with a mandatory flow for the user to complete
 *
 */
export const OnboardWrapper: FCWC<Propless> = ({ children }) => {
    const { user } = useUserStore((state) => state);

    if (!user || user.onboardingCompletion?.core) return <>{children}</>;

    return <Onboard />;
};
