import { FCWC, Propless } from "@/lib/interfaces/shared/interface";
import { OrganisationStoreProvider } from "../provider/organisation.provider";
import { UserStoreProvider } from "../provider/user.provider";

/**
 * Centralised Wrapper Component to Handle all Zustand Store Providers
 */
const StoreProviderWrapper: FCWC<Propless> = ({ children }) => {
    return (
        <>
            <UserStoreProvider>
                <OrganisationStoreProvider>
                    {children}
                </OrganisationStoreProvider>
            </UserStoreProvider>
            ;
        </>
    );
};

export default StoreProviderWrapper;
