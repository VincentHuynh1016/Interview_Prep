"use client";
import Image from "next/image";

export default function Home() {
  function handleClick() {
    console.log("Button has been clicked");
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans"
      style={{ backgroundColor: "rgb(43, 48, 59)" }}
    >
      <div className="flex flex-col items-center">
        <Image src="/interview.svg" alt="icon" width={150} height={150} />
        <p className="mt-4 text-white text-5xl font-semibold">INTERVIEW PREP</p>
        <p className="text-lg">
          The tool designed to help you confidently prepare for and ace your
          interviews
        </p>
        <button
          type="button"
          className="bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-lg text-sm px-4 py-2.5 focus:outline-none mt-3"
          style={{ backgroundColor: "rgb(88 196 220)", color: "rgb(64 71 86)"}}
          onClick={handleClick}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
