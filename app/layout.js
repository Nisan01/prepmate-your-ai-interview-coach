import { Geist, Geist_Mono } from "next/font/google";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "../stack";
import "./globals.css";
import Providers from "./providers";
import Footer from "./_Component/Footer";
import { icons } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  icons:{
    icon:"/images/logof.png",
  },
  title: "PrepMate - Your AI Interview Coach",
  description: "Prepare for interviews with AI assistance",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <StackProvider app={stackServerApp}>
          <StackTheme>
            <Providers>
             
              {children}
              <Footer/>
              </Providers>
          </StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}
