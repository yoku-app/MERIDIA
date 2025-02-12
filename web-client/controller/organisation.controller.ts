import { ControllerResponse } from "@/lib/interfaces/shared/interface";
import { allNotNull } from "@/lib/utils/utils";
import { Session } from "@supabase/supabase-js";
import { OrganisationDTO } from "@yoku-app/shared-schemas/dist/types/organisation/dto/organisation-dto";
import { randomUUID } from "crypto";

export const createNewOrganisation = async (
    organisation: Partial<OrganisationDTO>,
    session?: Session
): Promise<ControllerResponse<OrganisationDTO>> => {
    if (!session?.access_token) {
        return { status: 401, error: "Unauthorized" };
    }

    if (
        //If any required fields are missing, return an error
        !allNotNull([
            organisation.name,
            organisation.description,
            organisation.email,
        ])
    ) {
        return { status: 400, error: "Missing required fields" };
    }

    const newOrganisation: OrganisationDTO = {
        id: organisation.id ?? randomUUID(),
        name: organisation.name!,
        description: organisation.description!,
        email: organisation.email!,
        memberCount: 0,
        surveyCreationCount: 0,
        publicStatus: false,
        averageSurveyReviewRating: 0,
        orgType: organisation.orgType ?? "PERSONAL",
    };

    const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + `organisation/`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.access_token}`,
            },
            body: JSON.stringify(newOrganisation),
        }
    );

    if (response.ok) {
        const data = await response.json();
        return { status: response.status, data };
    }

    return { status: response.status, error: response.statusText };
};
