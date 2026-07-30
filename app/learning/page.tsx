import type { Metadata } from "next";
import { PageShell, ChildIndex } from "@/components/page-shell";
import { SITE_NAV } from "@/lib/site-nav";

export const metadata: Metadata = {
  title: "Обучение — ЕКЕБ",
  description:
    "Дуальная модель, образовательные программы и производственная практика.",
};

const group = SITE_NAV.find((g) => g.href === "/learning")!;

export default function LearningPage() {
  return (
    <PageShell
      pathname="/learning"
      eyebrow="Обучение"
      title="Как устроен учебный процесс."
      subtitle="Половина программы — на рабочем месте у партнёра. Остальное — лаборатории, проекты, чемпионаты и собственные стартапы."
    >
      <ChildIndex items={group.children} />
    </PageShell>
  );
}
