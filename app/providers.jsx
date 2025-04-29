"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import AuthProvider from "./AuthProvider";
import { Suspense } from "react";

// Create the Convex client with a fallback for development
const convexUrl =
  process.env.NEXT_PUBLIC_CONVEX_URL ||
  "https://agreeable-cardinal-973.convex.cloud";
const convex = new ConvexReactClient(convexUrl);

// Create a simple bouncing dots loader
function LoadingAnimation() {
  return (
    <div
    className="relative flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: "url('/images/banner-bg.png')" }}
  >
   
  
      {/* Dark overlay to dim the background */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Dots with shrinking and growing animation */}
      <div className="relative z-10 flex gap-4">
        <div className="w-5 h-5 bg-blue-500 rounded-full animate-ping"></div>
        <div className="w-5 h-5 bg-blue-500 rounded-full animate-ping [animation-delay:-0.2s]"></div>
        <div className="w-5 h-5 bg-blue-500 rounded-full animate-ping [animation-delay:-0.4s]"></div>
      </div>

      {/* Text message */}
      <p className="text-white text-xl font-semibold mt-4 animate-pulse">
        Loading...
      </p>
    </div>
  );
}

export default function Providers({ children }) {
  return (
    <Suspense fallback={<LoadingAnimation />}>
      <ConvexProvider client={convex}>
        <AuthProvider>{children}</AuthProvider>
      </ConvexProvider>
    </Suspense>
  );
}