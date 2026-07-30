import type { Metadata } from "next";
import { PageShell, ChildIndex } from "@/components/page-shell";
import { SITE_NAV } from "@/lib/site-nav";

export const metadata: Metadata = {
  title: "Документы — ЕКЕБ",
  description:
    "Нормативно-правовая база, аттестация, аккредитация и внутренние положения колледжа.",
};

const group = SITE_NAV.find((g) => g.href === "/documents")!;

export default function DocumentsPage() {
  return (
    <PageShell
      pathname="/documents"
      eyebrow="Документы"
      title="Документы и положения."
      subtitle="Учредительные документы, регуляторные акты, аттестация, аккредитация и внутренние правила — в открытом доступе."
    >
      <ChildIndex items={group.children} />
    </PageShell>
  );
}
