import { Geist, Geist_Mono } from "next/font/google";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "../stack";
import "./globals.css";
import Providers from "./providers";
import Header from "./_Component/Header";
import Footer from "./_Component/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
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
              <Header/>
              {children}
              <Footer/>
              </Providers>
          </StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}
