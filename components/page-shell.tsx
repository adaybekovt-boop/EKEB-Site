"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { breadcrumbsFor } from "@/lib/site-nav";

const EASE = [0.16, 1, 0.3, 1] as const;

interface PageShellProps {
  /** Current route — used to resolve breadcrumbs. */
  pathname: string;
  /** Small tag shown above the title. */
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Optional back-link (e.g. up to parent section). */
  back?: { label: string; href: string };
  children: ReactNode;
}

/**
 * Shared shell for every internal page. Provides nav, breadcrumbs,
 * an animated page header and a slot for the page body, plus the
 * global footer. Content is the bare skeleton — page body is empty
 * until the user designs the frontend.
 */
export function PageShell({
  pathname,
  eyebrow,
  title,
  subtitle,
  back,
  children,
}: PageShellProps) {
  const crumbs = breadcrumbsFor(pathname);

  return (
    <main className="relative min-h-[100dvh] motion-island">
      <Nav />

      <header className="relative pt-36 md:pt-44 pb-12 md:pb-20 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse at 20% 0%, rgba(97,120,245,0.10) 0%, transparent 55%), radial-gradient(ellipse at 80% 10%, rgba(212,165,116,0.08) 0%, transparent 55%)",
          }}
        />

        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          {/* Breadcrumbs */}
          <motion.nav
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            aria-label="breadcrumb"
            className="flex flex-wrap items-center gap-1.5 text-[12.5px] text-[var(--muted)] mb-6"
          >
            {crumbs.map((c, i) => (
              <span key={c.href} className="inline-flex items-center gap-1.5">
                {i > 0 && (
                  <ChevronRight className="w-3 h-3 opacity-50" strokeWidth={1.75} />
                )}
                {i === crumbs.length - 1 ? (
                  <span className="text-foreground">{c.label}</span>
                ) : (
                  <Link
                    href={c.href}
                    className="hover:text-foreground transition-colors"
                  >
                    {c.label}
                  </Link>
                )}
              </span>
            ))}
          </motion.nav>

          {back && (
            <motion.div
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-5"
            >
              <Link
                href={back.href}
                className="inline-flex items-center gap-1.5 text-[13px] text-[var(--muted)] hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.75} />
                {back.label}
              </Link>
            </motion.div>
          )}

          {eyebrow && (
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
              className="inline-block text-[13px] text-[var(--accent)] mb-4"
            >
              {eyebrow}
            </motion.span>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            className="text-[2.4rem] md:text-6xl lg:text-7xl font-medium tracking-tighter leading-[1.04] max-w-4xl"
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
              className="mt-5 md:mt-6 text-[15px] md:text-lg text-[var(--muted)] leading-relaxed max-w-2xl"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        <div className="hairline mt-12 md:mt-16 mx-auto max-w-[1400px]" />
      </header>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
      >
        {children}
      </motion.div>

      <Footer />
    </main>
  );
}

/**
 * Generic "Этот раздел в разработке" placeholder block. Used inside
 * skeleton subpages so the user can drop their frontend into a
 * predictable container.
 */
export function PagePlaceholder({
  hint = "Контент раздела появится здесь.",
}: {
  hint?: string;
}) {
  return (
    <section className="mx-auto max-w-[1400px] px-5 md:px-10 py-16 md:py-24">
      <div className="rounded-3xl border border-dashed border-white/[0.1] bg-white/[0.015] p-10 md:p-16 flex flex-col items-center text-center">
        <div className="h-12 w-12 rounded-2xl border border-white/[0.1] bg-white/[0.03] flex items-center justify-center text-[var(--accent)] mb-5">
          <span className="text-base font-mono">⋯</span>
        </div>
        <h2 className="text-xl md:text-2xl font-medium tracking-tight mb-2">
          Раздел в подготовке
        </h2>
        <p className="text-[14px] text-[var(--muted)] max-w-md leading-relaxed">
          {hint}
        </p>
      </div>
    </section>
  );
}

/**
 * Child-page index — used on /about, /admissions, /students etc. to
 * link out to each sub-route as a clean card grid.
 */
export function ChildIndex({
  items,
}: {
  items: { label: string; href: string; description?: string }[];
}) {
  return (
    <section className="mx-auto max-w-[1400px] px-5 md:px-10 py-12 md:py-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {items.map((item, i) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}
          >
            <Link
              href={item.href}
              className="group relative block rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.16] p-6 md:p-7 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-[15px] md:text-base font-medium tracking-tight text-foreground">
                  {item.label}
                </h3>
                <ChevronRight
                  className="w-4 h-4 mt-0.5 text-[var(--muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all duration-500"
                  strokeWidth={1.75}
                />
              </div>
              {item.description && (
                <p className="mt-2 text-[13px] text-[var(--muted)] leading-relaxed">
                  {item.description}
                </p>
              )}
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
