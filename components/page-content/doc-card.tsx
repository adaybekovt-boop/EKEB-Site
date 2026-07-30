"use client";

import { motion } from "motion/react";
import { FileText, Download, ArrowUpRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export interface DocItem {
  title: string;
  kind?: string;
  size?: string;
  updated?: string;
  href?: string;
  format?: "PDF" | "DOCX" | "XLSX" | "ZIP" | string;
}

export function DocCard({ doc, index = 0 }: { doc: DocItem; index?: number }) {
  const isLink = !!doc.href;
  const Tag: any = isLink ? "a" : "div";
  const props = isLink
    ? { href: doc.href, target: "_blank", rel: "noreferrer" }
    : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.55, delay: index * 0.04, ease: EASE }}
    >
      <Tag
        {...props}
        className="group block rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.16] p-5 md:p-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
      >
        <div className="flex items-start gap-4">
          <div className="h-10 w-10 rounded-xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-[var(--accent)] shrink-0 group-hover:border-white/[0.16] transition">
            <FileText className="w-4 h-4" strokeWidth={1.5} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-2 mb-1">
              {doc.format && (
                <span className="text-[10.5px] font-mono text-[var(--muted)] uppercase tracking-wider">
                  {doc.format}
                </span>
              )}
              {doc.size && (
                <span className="text-[10.5px] font-mono text-[var(--muted)]/60">
                  · {doc.size}
                </span>
              )}
            </div>
            <h4 className="text-[14px] font-medium tracking-tight text-foreground leading-snug mb-1">
              {doc.title}
            </h4>
            {(doc.kind || doc.updated) && (
              <div className="text-[12px] text-[var(--muted)]">
                {doc.kind}
                {doc.kind && doc.updated ? " · " : ""}
                {doc.updated && <span>обновлено {doc.updated}</span>}
              </div>
            )}
          </div>
          {isLink && (
            <Download
              className="w-4 h-4 text-[var(--muted)] group-hover:text-[var(--accent)] opacity-60 group-hover:opacity-100 transition-all duration-500 shrink-0 mt-1"
              strokeWidth={1.5}
            />
          )}
        </div>
      </Tag>
    </motion.div>
  );
}

export function DocGrid({ items }: { items: DocItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
      {items.map((d, i) => (
        <DocCard key={i} doc={d} index={i} />
      ))}
    </div>
  );
}
