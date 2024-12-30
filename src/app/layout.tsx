import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Layout from "@/components/Layout";
import { UserProvider } from "@/utils/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vercera 4.0",
  description: "College Technical Event Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <UserProvider>
<<<<<<< Updated upstream
          <Layout>
            {children}
          </Layout>
=======
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Layout>{children}</Layout>
          </ThemeProvider>
>>>>>>> Stashed changes
        </UserProvider>
      </body>
    </html>
  );
}
