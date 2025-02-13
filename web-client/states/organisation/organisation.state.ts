import { OrganisationDTO } from "@yoku-app/shared-schemas/dist/types/organisation/dto/organisation-dto";

export type OrganisationState = {
    activeOrganisation?: OrganisationDTO;
    userOrganisations: OrganisationDTO[];
    defaultOrganisation?: OrganisationDTO;
};

export type OrganisationActions = {
    setActiveOrganisation: (organisation?: OrganisationDTO) => void;
    setUserOrganisations: (organisations: OrganisationDTO[]) => void;
    setDefaultOrganisation: (organisation?: OrganisationDTO) => void;
};
