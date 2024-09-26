import type { Metadata } from "next";
import {  Manrope } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
} from '@clerk/nextjs' 
import {NextSSRPlugin} from '@uploadthing/react/next-ssr-plugin'
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";


const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Podcaster",
  description: "Generate your podcast using AI",
  icons: [{ rel: "icon", url: "/icons/logo.svg" }],}

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
        logoImageUrl:"/icons/auth-logo.svg",
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
    <html lang="en">
      <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)}/>
      <body className={manrope.className}>{children}
     

      </body>
    </html>
    </ClerkProvider>
  );
}
