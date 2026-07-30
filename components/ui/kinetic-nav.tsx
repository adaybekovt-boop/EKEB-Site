"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
}

const NAV_LINKS = [
  { label: "О колледже", href: "/about", shape: "1" },
  { label: "Программы", href: "/learning/programs", shape: "2" },
  { label: "Абитуриенту", href: "/admissions", shape: "3" },
  { label: "Студенту", href: "/students", shape: "4" },
  { label: "Контакты", href: "/#contact", shape: "5" },
];

export function KineticNav() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    try {
      if (!gsap.parseEase("main")) {
        CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");
        gsap.defaults({ ease: "main", duration: 0.7 });
      }
    } catch {
      gsap.defaults({ ease: "power2.out", duration: 0.7 });
    }

    const ctx = gsap.context(() => {
      const menuItems = containerRef.current!.querySelectorAll(".menu-list-item[data-shape]");
      const shapesContainer = containerRef.current!.querySelector(".ambient-background-shapes");

      menuItems.forEach((item) => {
        const shapeIndex = item.getAttribute("data-shape");
        const shape = shapesContainer?.querySelector(`.bg-shape-${shapeIndex}`);
        if (!shape) return;
        const shapeEls = shape.querySelectorAll(".shape-element");

        const onEnter = () => {
          shapesContainer?.querySelectorAll(".bg-shape").forEach((s) => s.classList.remove("active"));
          shape.classList.add("active");
          gsap.fromTo(
            shapeEls,
            { scale: 0.5, opacity: 0, rotation: -10 },
            { scale: 1, opacity: 1, rotation: 0, duration: 0.6, stagger: 0.08, ease: "back.out(1.7)", overwrite: "auto" }
          );
        };

        const onLeave = () => {
          gsap.to(shapeEls, {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => shape.classList.remove("active"),
            overwrite: "auto",
          });
        };

        item.addEventListener("mouseenter", onEnter);
        item.addEventListener("mouseleave", onLeave);
        (item as any)._cleanup = () => {
          item.removeEventListener("mouseenter", onEnter);
          item.removeEventListener("mouseleave", onLeave);
        };
      });
    }, containerRef);

    return () => {
      ctx.revert();
      if (containerRef.current) {
        containerRef.current.querySelectorAll(".menu-list-item[data-shape]").forEach((item: any) => item._cleanup?.());
      }
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      const navWrap = containerRef.current!.querySelector(".nav-overlay-wrapper");
      const menu = containerRef.current!.querySelector(".menu-content");
      const overlay = containerRef.current!.querySelector(".overlay");
      const bgPanels = containerRef.current!.querySelectorAll(".backdrop-layer");
      const menuLinks = containerRef.current!.querySelectorAll(".nav-link");
      const fadeTargets = containerRef.current!.querySelectorAll("[data-menu-fade]");

      const tl = gsap.timeline();
      if (isMenuOpen) {
        navWrap?.setAttribute("data-nav", "open");
        tl.set(navWrap, { display: "block" })
          .set(menu, { xPercent: 0 }, "<");
        tl.fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, "<")
          .fromTo(bgPanels, { xPercent: 101 }, { xPercent: 0, stagger: 0.12, duration: 0.575 }, "<")
          .fromTo(menuLinks, { yPercent: 140, rotate: 10 }, { yPercent: 0, rotate: 0, stagger: 0.05 }, "<+=0.35");
        if (fadeTargets.length) {
          tl.fromTo(fadeTargets, { autoAlpha: 0, yPercent: 50 }, { autoAlpha: 1, yPercent: 0, stagger: 0.04, clearProps: "all" }, "<+=0.2");
        }
      } else {
        navWrap?.setAttribute("data-nav", "closed");
        tl.to(overlay, { autoAlpha: 0 })
          .to(menu, { xPercent: 120 }, "<");
        tl.set(navWrap, { display: "none" });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isMenuOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isMenuOpen]);

  useEffect(() => {
    const previousOverflow = document.documentElement.style.overflow;
    if (isMenuOpen) {
      document.documentElement.style.overflow = "hidden";
    }
    return () => {
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((p) => !p);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div ref={containerRef}>
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <header className="w-full px-4">
          <nav className="flex items-center justify-between py-5">
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <div className="relative h-9 w-9">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#6178f5] via-[#a8b5ff] to-[#d4a574] opacity-90" />
                <div className="absolute inset-[1.5px] rounded-[7px] bg-[var(--background)] flex items-center justify-center">
                  <span className="text-[15px] font-semibold tracking-tight bg-gradient-to-br from-white to-[#a8b5ff] bg-clip-text text-transparent">E</span>
                </div>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[15px] font-semibold tracking-tight">ЕКЕБ</span>
                <span className="text-[10.5px] text-[var(--muted)] tracking-wide">European College</span>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <span className="hidden" onClick={toggleMenu}>
                Меню
              </span>
              <button
                type="button"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                className="nav-close-btn relative h-14 w-14 md:h-16 md:w-16 shrink-0 rounded-full border border-white/[0.16] bg-black/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/[0.08] hover:border-white/[0.3] transition-colors"
                onClick={toggleMenu}
              >
                <span className="relative block h-[18px] w-7" aria-hidden>
                  <span className={`absolute left-0 h-[2px] w-7 rounded-full bg-current transition-all duration-300 ${isMenuOpen ? "top-2 rotate-45" : "top-0"}`} />
                  <span className={`absolute left-0 top-2 h-[2px] w-7 rounded-full bg-current transition-all duration-300 ${isMenuOpen ? "opacity-0 scale-x-50" : "opacity-100"}`} />
                  <span className={`absolute left-0 h-[2px] w-7 rounded-full bg-current transition-all duration-300 ${isMenuOpen ? "top-2 -rotate-45" : "top-4"}`} />
                </span>
              </button>
            </div>
          </nav>
        </header>
      </div>

      {/* Right-side menu drawer */}
      <section className={`fixed inset-0 z-40 h-[100dvh] w-screen ${isMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        <div data-nav="closed" className="nav-overlay-wrapper fixed inset-0 h-[100dvh] w-screen hidden">
          <div className="overlay fixed inset-0 h-[100dvh] w-screen bg-black/45 backdrop-blur-[2px]" onClick={closeMenu} />
          <nav className="menu-content fixed right-0 top-0 h-[100dvh] w-[88vw] sm:w-[72vw] md:w-[46vw] lg:w-1/3 overflow-hidden border-l border-white/[0.08] shadow-[-24px_0_80px_rgba(0,0,0,0.38)]">
            <div className="menu-bg absolute inset-0">
              <div className="backdrop-layer first absolute inset-0 bg-[var(--background)]" />
              <div className="backdrop-layer second absolute inset-0 bg-[var(--elevated)]" />
              <div className="backdrop-layer absolute inset-0 bg-[var(--background)]" />

              <div className="ambient-background-shapes absolute inset-0 overflow-hidden pointer-events-none">
                <svg className="bg-shape bg-shape-1 absolute inset-0 w-full h-full" viewBox="0 0 400 400" fill="none">
                  <circle className="shape-element" cx="80" cy="120" r="40" fill="rgba(97,120,245,0.15)" />
                  <circle className="shape-element" cx="300" cy="80" r="60" fill="rgba(168,181,255,0.12)" />
                  <circle className="shape-element" cx="200" cy="300" r="80" fill="rgba(212,165,116,0.1)" />
                  <circle className="shape-element" cx="350" cy="280" r="30" fill="rgba(97,120,245,0.15)" />
                </svg>
                <svg className="bg-shape bg-shape-2 absolute inset-0 w-full h-full" viewBox="0 0 400 400" fill="none">
                  <path className="shape-element" d="M0 200 Q100 100, 200 200 T 400 200" stroke="rgba(97,120,245,0.2)" strokeWidth="60" fill="none" />
                  <path className="shape-element" d="M0 280 Q100 180, 200 280 T 400 280" stroke="rgba(168,181,255,0.15)" strokeWidth="40" fill="none" />
                </svg>
                <svg className="bg-shape bg-shape-3 absolute inset-0 w-full h-full" viewBox="0 0 400 400" fill="none">
                  <circle className="shape-element" cx="50" cy="50" r="8" fill="rgba(97,120,245,0.3)" />
                  <circle className="shape-element" cx="150" cy="50" r="8" fill="rgba(168,181,255,0.3)" />
                  <circle className="shape-element" cx="250" cy="50" r="8" fill="rgba(212,165,116,0.3)" />
                  <circle className="shape-element" cx="350" cy="50" r="8" fill="rgba(97,120,245,0.3)" />
                  <circle className="shape-element" cx="100" cy="150" r="12" fill="rgba(168,181,255,0.25)" />
                  <circle className="shape-element" cx="200" cy="150" r="12" fill="rgba(212,165,116,0.25)" />
                  <circle className="shape-element" cx="300" cy="150" r="12" fill="rgba(97,120,245,0.25)" />
                  <circle className="shape-element" cx="50" cy="250" r="10" fill="rgba(212,165,116,0.3)" />
                  <circle className="shape-element" cx="150" cy="250" r="10" fill="rgba(97,120,245,0.3)" />
                  <circle className="shape-element" cx="250" cy="250" r="10" fill="rgba(168,181,255,0.3)" />
                  <circle className="shape-element" cx="350" cy="250" r="10" fill="rgba(212,165,116,0.3)" />
                  <circle className="shape-element" cx="100" cy="350" r="6" fill="rgba(97,120,245,0.3)" />
                  <circle className="shape-element" cx="200" cy="350" r="6" fill="rgba(168,181,255,0.3)" />
                  <circle className="shape-element" cx="300" cy="350" r="6" fill="rgba(212,165,116,0.3)" />
                </svg>
                <svg className="bg-shape bg-shape-4 absolute inset-0 w-full h-full" viewBox="0 0 400 400" fill="none">
                  <path className="shape-element" d="M100 100 Q150 50, 200 100 Q250 150, 200 200 Q150 250, 100 200 Q50 150, 100 100" fill="rgba(97,120,245,0.12)" />
                  <path className="shape-element" d="M250 200 Q300 150, 350 200 Q400 250, 350 300 Q400 250, 350 300 Q300 350, 250 300 Q200 250, 250 200" fill="rgba(212,165,116,0.1)" />
                </svg>
                <svg className="bg-shape bg-shape-5 absolute inset-0 w-full h-full" viewBox="0 0 400 400" fill="none">
                  <line className="shape-element" x1="0" y1="100" x2="300" y2="400" stroke="rgba(97,120,245,0.15)" strokeWidth="30" />
                  <line className="shape-element" x1="100" y1="0" x2="400" y2="300" stroke="rgba(168,181,255,0.12)" strokeWidth="25" />
                  <line className="shape-element" x1="200" y1="0" x2="400" y2="200" stroke="rgba(212,165,116,0.1)" strokeWidth="20" />
                </svg>
              </div>
            </div>

            <div className="menu-content-wrapper relative z-10 flex items-center justify-center h-full px-5">
              <ul className="menu-list w-full space-y-3 md:space-y-5">
                {NAV_LINKS.map((link) => (
                  <li key={link.href} className="menu-list-item" data-shape={link.shape}>
                    <Link href={link.href} className="nav-link group relative block overflow-hidden" onClick={closeMenu}>
                      <p className="nav-link-text relative z-10 text-3xl sm:text-4xl xl:text-5xl font-medium tracking-tighter text-white/90 group-hover:text-white transition-colors">
                        {link.label}
                      </p>
                      <div className="nav-link-hover-bg absolute inset-0 bg-white/[0.03] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </section>

      <style jsx global>{`
        .bg-shape {
          position: absolute;
          inset: 0;
          opacity: 0;
          pointer-events: none;
        }
        .bg-shape.active {
          opacity: 1;
        }
        .shape-element {
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
