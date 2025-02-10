"use server";

import { handleUserSignout } from "@/lib/utils/auth/auth.utils";
import { createSSRClient } from "@/lib/utils/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";
import { AuthenticatedNavbar, UnauthenticatedNavbar } from "./navbar.content";

export const Navbar = async () => {
    "use server";

    const supabaseClient: SupabaseClient = await createSSRClient();
    // User session can be spoofed, but we are just using this
    // information to validate user information instead of information protection
    const { data, error } = await supabaseClient.auth.getSession();
    if (error || !data?.session) {
        return <UnauthenticatedNavbar />;
    }

    return <AuthenticatedNavbar handleSignout={handleUserSignout} />;
};
