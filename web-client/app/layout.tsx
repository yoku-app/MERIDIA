import { ThemeProvider } from "@/components/provider/theme-provider";
import { Navbar } from "@/components/ui/navbar";
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
        <html lang="en" suppressHydrationWarning>
            <body className={`antialiased`}>
                <ThemeProvider
                    attribute={"class"}
                    defaultTheme="theme"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Navbar />
                    {children}
                </ThemeProvider>
                <Toaster />
            </body>
        </html>
    );
};

export default RootLayout;
