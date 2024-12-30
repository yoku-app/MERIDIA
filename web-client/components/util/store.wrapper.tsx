import { FCWC, Propless } from "@/lib/interfaces/shared/interface";
import { UserStoreProvider } from "../provider/user.provider";

/**
 * Centralised Wrapper Component to Handle all Zustand Store Providers
 */
const StoreProviderWrapper: FCWC<Propless> = ({ children }) => {
    return <UserStoreProvider>{children}</UserStoreProvider>;
};

export default StoreProviderWrapper;
