"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Clock } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export interface BlogPost {
  date: string;
  read: string;
  category: string;
  title: string;
  excerpt: string;
  href: string;
  accent?: "indigo" | "warm";
  featured?: boolean;
}

export function BlogFeatured({ post }: { post: BlogPost }) {
  const warm = post.accent === "warm";
  return (
    <motion.a
      href={post.href}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.8, ease: EASE }}
      className="group relative block rounded-3xl border border-white/[0.08] bg-[var(--elevated)] overflow-hidden hover:border-white/[0.16] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
    >
      <div className="grid grid-cols-1 md:grid-cols-12">
        {/* Cover */}
        <div className="relative md:col-span-5 min-h-[220px] md:min-h-[360px] overflow-hidden border-b md:border-b-0 md:border-r border-white/[0.06]">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: warm
                ? "radial-gradient(ellipse at 30% 30%, rgba(212,165,116,0.32) 0%, transparent 55%), radial-gradient(ellipse at 70% 80%, rgba(97,120,245,0.20) 0%, transparent 55%)"
                : "radial-gradient(ellipse at 30% 30%, rgba(97,120,245,0.32) 0%, transparent 55%), radial-gradient(ellipse at 70% 80%, rgba(212,165,116,0.18) 0%, transparent 55%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.22]"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
              maskImage:
                "radial-gradient(ellipse at center, black 30%, transparent 80%)",
            }}
          />
          <div className="relative h-full flex items-end p-6 md:p-8">
            <span
              className={
                "inline-flex items-center px-3 py-1.5 rounded-full border text-[11px] font-mono uppercase tracking-wider " +
                (warm
                  ? "border-[var(--accent-warm)]/30 bg-[var(--accent-warm)]/10 text-[var(--accent-warm)]"
                  : "border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent)]")
              }
            >
              {post.category}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="md:col-span-7 p-6 md:p-10 flex flex-col justify-center">
          <div className="flex items-baseline gap-2 mb-4 text-[11.5px] font-mono uppercase tracking-wider text-[var(--muted)]">
            <span>{post.date}</span>
            <span className="text-[var(--muted)]/50">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3 h-3" strokeWidth={1.5} />
              {post.read}
            </span>
          </div>
          <h3 className="text-2xl md:text-4xl font-medium tracking-tighter leading-[1.1] mb-4 md:mb-5">
            {post.title}
          </h3>
          <p className="text-[14.5px] md:text-[15px] text-[var(--muted)] leading-relaxed max-w-xl mb-6">
            {post.excerpt}
          </p>
          <div className="inline-flex items-center gap-1.5 text-[13px] text-foreground/80 group-hover:text-[var(--accent)] transition-colors">
            Читать пост
            <ArrowUpRight
              className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500"
              strokeWidth={1.75}
            />
          </div>
        </div>
      </div>
    </motion.a>
  );
}

export function BlogGrid({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
      {posts.map((p, i) => {
        const warm = p.accent === "warm";
        return (
          <motion.a
            key={p.title}
            href={p.href}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.7, delay: i * 0.05, ease: EASE }}
            className="group relative flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.16] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          >
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] z-10"
            />
            <div className="p-6 md:p-7 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-5">
                <span
                  className={
                    "inline-flex items-center px-2.5 py-1 rounded-full border text-[10.5px] font-mono uppercase tracking-wider " +
                    (warm
                      ? "border-[var(--accent-warm)]/30 bg-[var(--accent-warm)]/10 text-[var(--accent-warm)]"
                      : "border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent)]")
                  }
                >
                  {p.category}
                </span>
                <ArrowUpRight
                  className="w-4 h-4 text-[var(--muted)] -translate-x-1 translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-[var(--accent)] transition-all duration-500"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-base md:text-lg font-medium tracking-tight leading-snug mb-3">
                {p.title}
              </h3>
              <p className="text-[13.5px] text-[var(--muted)] leading-relaxed flex-1 mb-5">
                {p.excerpt}
              </p>
              <div className="flex items-baseline gap-2 text-[11px] font-mono uppercase tracking-wider text-[var(--muted)]">
                <span>{p.date}</span>
                <span className="text-[var(--muted)]/50">·</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3 h-3" strokeWidth={1.5} />
                  {p.read}
                </span>
              </div>
            </div>
          </motion.a>
        );
      })}
    </div>
  );
}
