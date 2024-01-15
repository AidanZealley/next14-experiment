import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { DeviceHeightProvider } from "@/components/providers/device-height-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "MyApp",
  description: "Web app starter.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <DeviceHeightProvider>
              <div className="grid gap-6 pt-16">
                <div className="fixed top-0 w-full backdrop-blur-sm">
                  <SiteHeader />
                </div>
                {children}
              </div>
              <div className="fixed bottom-0 right-0">
                <Toaster />
              </div>
            </DeviceHeightProvider>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
