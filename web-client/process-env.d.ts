export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            [key: string]: string | undefined;
            NODE_ENV: "development" | "production" | "test";
            PORT: string;
            NEXT_PUBLIC_HOSTED_URL: string;
            NEXT_PUBLIC_API_URL: string;
            NEXT_PUBLIC_IMAGE_API_URL: string;
            NEXT_PUBLIC_SUPABASE_URL: string;
            NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
        }
    }
}
