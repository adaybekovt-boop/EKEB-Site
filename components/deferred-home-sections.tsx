"use client";

import dynamic from "next/dynamic";
import { ComponentType, useEffect, useRef, useState } from "react";

const ProgramsPinned = dynamic(
  () => import("@/components/sections/programs").then((mod) => mod.ProgramsPinned),
  { ssr: false }
);
const Learning = dynamic(
  () => import("@/components/sections/learning").then((mod) => mod.Learning),
  { ssr: false }
);
const Path = dynamic(
  () => import("@/components/sections/path").then((mod) => mod.Path),
  { ssr: false }
);
const Showcase = dynamic(
  () => import("@/components/sections/showcase").then((mod) => mod.Showcase),
  { ssr: false }
);
const Partners = dynamic(
  () => import("@/components/sections/partners").then((mod) => mod.Partners),
  { ssr: false }
);
const Admissions = dynamic(
  () => import("@/components/sections/admissions").then((mod) => mod.Admissions),
  { ssr: false }
);
const Payments = dynamic(
  () => import("@/components/sections/payments").then((mod) => mod.Payments),
  { ssr: false }
);
const GrantCalculator = dynamic(
  () => import("@/components/sections/grant-calculator-experience").then((mod) => mod.GrantCalculatorExperience),
  { ssr: false }
);
const Contact = dynamic(
  () => import("@/components/sections/contact").then((mod) => mod.Contact),
  { ssr: false }
);
const Footer = dynamic(
  () => import("@/components/footer").then((mod) => mod.Footer),
  { ssr: false }
);

function ViewportSection({
  component: Component,
  minHeight = "70vh",
  id,
}: {
  component: ComponentType;
  minHeight?: string;
  id?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || mounted) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setMounted(true);
        observer.disconnect();
      },
      { rootMargin: "500px 0px" }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, [mounted]);

  return (
    <div
      ref={rootRef}
      className="motion-section"
      id={id}
      style={{
        // Reuse the same estimate as the pre-mount placeholder so the
        // content-visibility fallback size (used when this section is
        // first measured) is close to the real height instead of the
        // generic 1200px default — avoids a layout jump on first reveal.
        containIntrinsicSize: `1px ${minHeight}`,
        ...(mounted ? undefined : { minHeight }),
      }}
    >
      {mounted ? <Component /> : null}
    </div>
  );
}

export function DeferredHomeSections() {
  return (
    <>
      <ViewportSection component={ProgramsPinned} minHeight="100vh" id="programs" />
      <ViewportSection component={Learning} />
      <ViewportSection component={Path} minHeight="90vh" />
      <ViewportSection component={Showcase} />
      <ViewportSection component={Partners} minHeight="45vh" />
      <ViewportSection component={Admissions} />
      <ViewportSection component={Payments} />
      <ViewportSection component={GrantCalculator} />
      <ViewportSection component={Contact} id="contact" />
      <ViewportSection component={Footer} minHeight="40vh" />
    </>
  );
}
