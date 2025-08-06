import { ThemeProvider } from "../components/ui/theme";
import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "@/react-query";
import { Manrope } from "next/font/google";

type Props = {
    children: React.ReactNode;
};

const manrope = Manrope({
    subsets: ['latin']

})
export const metadata: Metadata = {
    title: "Dost - Transform Your Communication with Instant Video",
    description:
        "Experience the future of engagement with our AI-powered video sharing platform. Effortlessly record and share personalized videos that captivate your audience and drive results.",
};
export default function Layout({ children }: Props) {
    return (
        <html lang="en">
            <body className={`${manrope.className}`}>
                <ClerkProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        disableTransitionOnChange
                    >
                        <ReactQueryProvider>
                            {children}

                        </ReactQueryProvider>

                        {/* hellow */}
                    </ThemeProvider>
                </ClerkProvider>
            </body>
        </html>
    );
}
