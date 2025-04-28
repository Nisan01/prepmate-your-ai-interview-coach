"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import AuthProvider from "./AuthProvider";
import { Suspense } from "react";

// Create the Convex client with a fallback for development
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || "https://agreeable-cardinal-973.convex.cloud";
const convex = new ConvexReactClient(convexUrl);

export default function Providers({ children }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConvexProvider client={convex}>
        <AuthProvider>{children}</AuthProvider>
      </ConvexProvider>
    </Suspense>
  );
}