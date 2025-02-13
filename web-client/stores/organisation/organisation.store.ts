import {
    OrganisationActions,
    OrganisationState,
} from "@/states/organisation/organisation.state";
import { OrganisationDTO } from "@yoku-app/shared-schemas/dist/types/organisation/dto/organisation-dto";
import { createStore } from "zustand";

export type OrganisationStore = OrganisationState & OrganisationActions;

export const defaultOrganisationInitState: OrganisationState = {
    userOrganisations: [],
};

export const createOrganisationStore = (
    initState: OrganisationState = defaultOrganisationInitState
) => {
    return createStore<OrganisationStore>()((set) => ({
        ...initState,
        setActiveOrganisation: (activeOrganisation?: OrganisationDTO) =>
            set((state) => ({ ...state, activeOrganisation })),
        setUserOrganisations: (userOrganisations: OrganisationDTO[]) =>
            set((state) => ({ ...state, userOrganisations })),
        setDefaultOrganisation: (defaultOrganisation?: OrganisationDTO) =>
            set((state) => ({ ...state, defaultOrganisation })),
    }));
};
