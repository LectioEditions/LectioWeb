import type { Metadata } from "next";
import {  Manrope } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
} from '@clerk/nextjs' 
import {NextSSRPlugin} from '@uploadthing/react/next-ssr-plugin'
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { Providers } from "./providers";


const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LctioEditions",
  description: "Vous donner les moyens d'atteindre l'excellence",
  icons: [{ rel: "icon", url: "/icons/lectio_logo-04.png" }],}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
    appearance={{
      layout:{
        socialButtonsVariant:"iconButton",
        logoImageUrl:"/icons/lectio_logo-04.png",
      },
      signIn: {
      variables:{
                 colorBackground: "#15171c",
                 colorPrimary: "#f9a8d4",
                 colorText: "white",
                 colorInputBackground: "#1b1f29",
                 colorInputText: "white",}},
      signUp: {
       variables:{
                  colorBackground: "#15171c",
                  colorPrimary: "#f9a8d4",
                  colorText: "white",
                  colorInputBackground: "#1b1f29",
                  colorInputText: "white",}}
    }}>
    <html lang="en" suppressHydrationWarning>
      <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)}/>
      <body className={manrope.className}>
      <Providers>
        {children}
        </Providers>

      </body>
    </html>
    </ClerkProvider>
  );
}
