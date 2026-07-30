import type { Metadata } from "next";
import { PageShell, ChildIndex } from "@/components/page-shell";
import { SITE_NAV } from "@/lib/site-nav";

export const metadata: Metadata = {
  title: "О колледже — ЕКЕБ",
  description:
    "История, коллектив, лицензия, достижения, СМИ и 3D-тур по кампусу.",
};

const group = SITE_NAV.find((g) => g.href === "/about")!;

export default function AboutPage() {
  return (
    <PageShell
      pathname="/about"
      eyebrow="О колледже"
      title="Институция, которая готовит людей под индустрию."
      subtitle="Европейский высший колледж цифровых технологий и предпринимательства основан в Актобе в 2018 году. Дуальная модель, WorldSkills, бизнес-инкубатор."
    >
      <ChildIndex items={group.children} />
    </PageShell>
  );
}
