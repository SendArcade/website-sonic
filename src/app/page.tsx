'use client' 

import HeroSection from "./components/HeroSection"
import BlinksSection from "./components/BlinksSection"

export default function Home() {
  return (
    <main className="bg-white h-full min-h-screen">
      <HeroSection />
      <BlinksSection />
    </main>
  )
}
