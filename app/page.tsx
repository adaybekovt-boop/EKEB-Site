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
      {/* No content-visibility here: About is always mounted and sits right
          after the hero, so the user reaches it almost immediately — the
          skip-then-reveal of content-visibility would just cause an early,
          highly-visible layout jump for a section that's never really
          "far below the fold". */}
      <div id="about">
        <About />
      </div>
      <ProgramsShowcase />
      <DeferredHomeSections />
    </main>
  );
}
