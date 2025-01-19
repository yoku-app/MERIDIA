import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
                pathname: "/u/**",
            },
            {
                protocol: "https",
                hostname: "svmgctkotwmmtbaypfjl.supabase.co",
                pathname: "/storage/**",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                pathname: "/a/**",
            },
        ],
    },
};

export default nextConfig;
