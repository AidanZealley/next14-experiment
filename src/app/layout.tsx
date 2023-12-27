import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteWrap } from "@/components/site-wrap";
import { DeviceHeightProvider } from "@/components/providers/device-height-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
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
                <div className="grid">{children}</div>
              </div>
            </DeviceHeightProvider>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
