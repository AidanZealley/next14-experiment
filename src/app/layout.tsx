import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { DeviceHeightProvider } from "@/components/providers/device-height-provider";
import { Toaster } from "@/components/ui/toaster";
import { Sidebar } from "./_components/sidebar";
import { UIProvider } from "@/components/providers/ui-provider";
import { SidePanel } from "./_components/side-panel";
import { MobileHeader } from "./_components/mobile-header";

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
            <UIProvider>
              <DeviceHeightProvider>
                <div className="grid min-h-0 grid-rows-[auto_1fr] md:grid-rows-none">
                  <MobileHeader />
                  <div className="grid min-h-0 md:grid-cols-[theme(spacing.64)_1fr]">
                    <div className="hidden min-h-0 border-r border-slate-200 dark:border-slate-800 md:grid">
                      <Sidebar />
                    </div>
                    <div className="grid overflow-auto">{children}</div>
                  </div>
                </div>
                <SidePanel>
                  <Sidebar />
                </SidePanel>

                <div className="fixed bottom-0 right-0">
                  <Toaster />
                </div>
              </DeviceHeightProvider>
            </UIProvider>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
