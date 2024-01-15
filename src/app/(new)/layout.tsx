import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { DeviceHeightProvider } from "@/components/providers/device-height-provider";
import { Toaster } from "@/components/ui/toaster";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { AuthMenu } from "@/components/auth-menu";
import { MainNav } from "./_components/main-nav";
import { Suspense } from "react";
import { GroupSwitcher } from "./_components/group-switcher";
import { GroupSwitcherFallback } from "./_components/group-switcher/group-switcher-fallback";
import { SiteLogo } from "@/components/site-logo";

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
              <div className="grid min-h-0 grid-cols-[theme(spacing.64)_1fr]">
                <div className="grid min-h-0 grid-rows-[auto_1fr_auto] gap-1 border-r border-slate-200 dark:border-slate-800">
                  <div className="px-3 pt-6">
                    <div className="grid gap-3">
                      <div className="px-3">
                        <SiteLogo />
                      </div>
                      <Suspense fallback={<GroupSwitcherFallback />}>
                        <GroupSwitcher />
                      </Suspense>
                    </div>
                  </div>

                  <div className="relative overflow-auto px-3">
                    <div className="pointer-events-none sticky top-0 z-10 h-5 w-full bg-gradient-to-b from-white to-transparent"></div>
                    <div className="relative z-0">
                      <MainNav />
                    </div>
                    <div className="pointer-events-none sticky bottom-0 z-10 h-5 w-full bg-gradient-to-t from-white to-transparent"></div>
                  </div>

                  <div className="px-6">
                    <Separator />

                    <div className="flex justify-between gap-3 py-3">
                      <ModeToggle />
                      <AuthMenu />
                    </div>
                  </div>
                </div>
                <div className="grid overflow-auto bg-slate-50 dark:bg-slate-900">
                  {children}
                </div>
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
