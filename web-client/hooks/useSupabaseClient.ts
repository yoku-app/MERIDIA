import { createClient, createSSRClient } from "@/lib/utils/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";

export const useSupabaseClient = (
    component: "server" | "client"
): Promise<SupabaseClient> => {
    if (component === "server") {
        return createSSRClient();
    }

    return createClient();
};
