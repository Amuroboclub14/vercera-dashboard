import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";
import { UserProvider } from "@/utils/UserContext";
import { ToastProvider } from "@/components/ui/toast";

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
          <ToastProvider>
            <Layout>{children}</Layout>
          </ToastProvider>
        </UserProvider>
      </body>
    </html>
  );
}
