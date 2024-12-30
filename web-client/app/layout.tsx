import { ThemeProvider } from "@/components/provider/theme.provider";
import { Navbar } from "@/components/ui/nav/navbar";
import AuthenticationWrapper from "@/components/util/auth.wrapper";
import StoreProviderWrapper from "@/components/util/store.wrapper";
import { FCWC, Propless } from "@/lib/interfaces/shared/interface";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const robotoFont = Roboto({
    subsets: ["latin"],
    weight: ["100", "400", "900"],
});

export const metadata: Metadata = {
    title: "Yoku",
    description: "Next Generation Open Sourced Market Research Platform",
};

const RootLayout: FCWC<Propless> = ({ children }) => {
    return (
        <html
            className={robotoFont.className}
            lang="en"
            suppressHydrationWarning
        >
            <body className={`antialiased`}>
                <ThemeProvider
                    attribute={"class"}
                    defaultTheme="theme"
                    enableSystem
                    disableTransitionOnChange
                >
                    <StoreProviderWrapper>
                        <AuthenticationWrapper>
                            <Navbar />
                            {children}
                        </AuthenticationWrapper>
                    </StoreProviderWrapper>
                </ThemeProvider>
                <Toaster richColors />
            </body>
        </html>
    );
};

export default RootLayout;
