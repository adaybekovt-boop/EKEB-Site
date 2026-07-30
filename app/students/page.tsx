import type { Metadata } from "next";
import { PageShell, ChildIndex } from "@/components/page-shell";
import { SITE_NAV } from "@/lib/site-nav";

export const metadata: Metadata = {
  title: "Студенту — ЕКЕБ",
  description:
    "Расписание, библиотека, оплата, трудоустройство, WorldSkills, AIS College SmartNation и другие сервисы для студента.",
};

const group = SITE_NAV.find((g) => g.href === "/students")!;

export default function StudentsPage() {
  return (
    <PageShell
      pathname="/students"
      eyebrow="Студенту"
      title="Сервисы для студента."
      subtitle="Всё, что нужно для учёбы: расписание, библиотека, AIS, ящик доверия, центр обслуживания, оплата, трудоустройство, WorldSkills."
    >
      <ChildIndex items={group.children} />
    </PageShell>
  );
}
