import Link from "next/link";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <>
      {/* Header */}
      <header
        className="fixed  top-0  left-0 w-full py-2 md:py-5 backdrop:blur  px-2 md:p-8  flex items-center justify-between border-b border-white/20 bg-black/5 backdrop-blur shadow-md z-50"
        style={{ backgroundImage: "url('/images/banner-bg.png')" }}
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
        <Button asChild className="rounded-full px-6 bg-blue-500 hover:bg-purple-700">
      <Link href="/dashboard">Get Started</Link>
    </Button>
      </header>
    </>
  );
};

export default Header;
