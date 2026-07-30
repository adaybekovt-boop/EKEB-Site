import type { Metadata } from "next";
import { PageShell, ChildIndex } from "@/components/page-shell";
import { SITE_NAV } from "@/lib/site-nav";

export const metadata: Metadata = {
  title: "Абитуриенту — ЕКЕБ",
  description:
    "Приёмная комиссия, специальности, онлайн-подача документов, результаты конкурса и калькулятор шансов на грант.",
};

const group = SITE_NAV.find((g) => g.href === "/admissions")!;

export default function AdmissionsPage() {
  return (
    <PageShell
      pathname="/admissions"
      eyebrow="Абитуриенту"
      title="Поступление в ЕКЕБ."
      subtitle="Дуальная модель, 5 специальностей, государственный грант и платное обучение. Документы принимаются с 1 июня по 15 августа."
    >
      <ChildIndex items={group.children} />
    </PageShell>
  );
}
