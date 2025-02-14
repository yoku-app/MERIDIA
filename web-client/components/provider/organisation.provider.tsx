"use client";

import {
    createOrganisationStore,
    OrganisationStore,
} from "@/stores/organisation/organisation.store";
import { createContext, ReactNode, useContext, useRef } from "react";
import { useStore } from "zustand";

export type OrganisationStoreApi = ReturnType<typeof createOrganisationStore>;

export const OrganisationStoreContext = createContext<
    OrganisationStoreApi | undefined
>(undefined);

export interface OrganisationStoreProviderProps {
    children: ReactNode;
}

export const OrganisationStoreProvider = ({
    children,
}: OrganisationStoreProviderProps) => {
    const store = useRef<OrganisationStoreApi>();

    if (!store.current) {
        store.current = createOrganisationStore();
    }
    return (
        <OrganisationStoreContext.Provider value={store.current}>
            {children}
        </OrganisationStoreContext.Provider>
    );
};

export const useOrganisationStore = <T,>(
    selector: (store: OrganisationStore) => T
) => {
    const organisationStoreContext = useContext(OrganisationStoreContext);

    if (!organisationStoreContext) {
        throw new Error(
            "useOrganisationStore must be used within a OrganisationStoreProvider"
        );
    }

    return useStore(organisationStoreContext, selector);
};
