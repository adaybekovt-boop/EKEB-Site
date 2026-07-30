import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { About } from "@/components/sections/about";
import { ProgramsShowcase } from "@/components/sections/programs-showcase";
import { DeferredHomeSections } from "@/components/deferred-home-sections";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <div className="motion-section" id="about">
        <About />
      </div>
      <ProgramsShowcase />
      <DeferredHomeSections />
    </main>
  );
}
