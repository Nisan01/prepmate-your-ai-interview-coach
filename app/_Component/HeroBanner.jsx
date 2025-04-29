import React from "react";
import { Button } from "@/components/ui/button"; 
import Link from "next/link";
import { PlayCircle, Clipboard, Link2 } from 'lucide-react'; 

const HeroBanner = () => {
  return (
    <>
      {/* Main Section */}
      <main
        className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/banner-bg.png')" }}
      >
        <section className="py-20 max-w-4xl mt-32">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Practice Smarter. Speak Better. Succeed Faster.
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-10">
            <span className="text-white font-bold">PrepMate </span>
            <span className="text-gray-400 text-[0.9em]">
              is your AI-powered interview coach — helping you refine your
              communication skills, simulate real interviews, and build your
              confidence.
            </span>
          </p>

          <Button size="lg" className="rounded-full px-8 py-6 text-lg bg-blue-500">
            Get Started
          </Button>
        </section>
      </main>

      <div
        className="text-white py-10 md:h-[380px] bg-cover bg-center  bg-fixed"
        style={{ backgroundImage: "url('/images/bg_dark.gif')" }}
      >
        <div className="max-w-7xl  mx-auto px-4 py-12 md:py-20">
          <h2 className="text-2xl  -mt-4 font-bold text-white text-center mb-8">
            Why PrepMate?
          </h2>

          <section className="grid grid-cols-1 md:grid-cols-4 gap-8 justify-items-center mb-6">
            {[
              { icon: "🎙️", text: "Automatic Transcription" },
              { icon: "🗣️", text: "Real Voice Interaction" },
              { icon: "📈", text: "Skill Improvement" },
              { icon: "🎯", text: "Personalized Practice" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-black/30 p-6 rounded-xl shadow-lg text-center flex flex-col items-center"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <p className="text-lg font-semibold">{item.text}</p>
              </div>
            ))}
          </section>
        </div>
      </div>

      <div
  className="px-4 py-12 md:py-20 bg-cover bg-center"
  style={{
    backgroundImage: "url('/images/banner-bg.png')",
    backgroundPosition: 'bottom', 
    backgroundSize: 'cover',
  }}
>
      <h2 className="text-2xl font-bold text-white mb-4 text-center">
        How it works?
      </h2>
      <p className="mb-8 text-center text-white">
        Simple steps to prepare for viva and interview
      </p>

      <div className="grid md:h-[390px] grid-cols-1 md:grid-cols-4 gap-4 justify-items-center">
        {/* Robo Image */}
        <div className="mb-4 mt-14">
          <img
            src="/images/robo.png"
            alt="Robo"
            width={200}
            height={200}
            className="card-image mx-auto rounded-3xl shadow-lg animate-floating"
            style={{ width: '200px', height: '35vh' }}
          />
        </div>

        {/* Steps Cards */}
        {[{
            step: "Step 1", 
            text: "Go to Dashboard", 
            icon: <PlayCircle size={40} className="text-sky-500" />
          }, {
            step: "Step 2", 
            text: "Select the option & type your topic", 
            icon: <Clipboard size={40} className="text-sky-500" />
          }, {
            step: "Step 3", 
            text: "Get connected and you are ready to go!", 
            icon: <Link2 size={40} className="text-sky-500" />
          }].map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-lg border-4 p-4 border-sky-500 mt-14 h-[300px] rounded-2xl bg-[url('/images/cardd-bg.png')] bg-cover w-full max-w-xs text-center"
            >
              <div className="mb-4">{item.icon}</div> {/* Icon here */}
              <h3 className="text-xl text-white mt-6 font-bold mb-2">{item.step}</h3>
              <hr className="border-gray-300 mb-4 mt-6" />
              <p className="text-white text-[1.2em] mt-8">{item.text}</p>
            </div>
          ))}
      </div>
    </div>

      {/* Final Section */}
      <section className="flex  flex-col md:flex-row items-center justify-between h-[250px] p-8"      style={{ backgroundImage: "url('/images/bg_dark.gif')" }}>
  {/* Text Section */}
  <div className="text-center md:text-left md:w-1/2 mb-6 md:mb-0 mx-18">
    <h2 className="text-2xl font-bold text-white mb-4">
      Ready to ace your next preparation?
    </h2>
    <Button asChild className="rounded-full px-6 bg-[#5299d9] hover:bg-purple-700">
      <Link href="/get-started">Get Started</Link>
    </Button>
  </div>



</section>

    </>
  );
};

export default HeroBanner;

