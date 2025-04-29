import React from "react";
import Link from "next/link";
import { UserButton } from "@stackframe/stack";

const Appheader = () => {
  return (
    <header className="flex justify-between items-center mx-auto px-8 py-4 shadow-lg backdrop:blur" 
    style={{ backgroundImage: "url('/images/extra-bg.png')" }}
    >
      <Link href="/" className="flex items-center gap-3">
        <img
          src="/images/logof.png"
          alt="PrepMate Logo"
          width={40}
          height={40}
        />
        <span className="font-bold text-2xl text-white">
          PrepMate
        </span>
      </Link>
 
      <UserButton className="text-white" />
    </header>
  );
};

export default Appheader;