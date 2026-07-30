import type { Metadata } from "next";
import { PageShell, ChildIndex } from "@/components/page-shell";
import { SITE_NAV } from "@/lib/site-nav";

export const metadata: Metadata = {
  title: "Международное сотрудничество — ЕКЕБ",
  description:
    "Зарубежные аккредитации, меморандумы и совместные проекты с европейскими колледжами.",
};

const group = SITE_NAV.find((g) => g.href === "/international")!;

export default function InternationalPage() {
  return (
    <PageShell
      pathname="/international"
      eyebrow="Международное"
      title="Международное сотрудничество."
      subtitle="Аккредитации зарубежных агентств, меморандумы с европейскими колледжами и совместные проекты по обмену."
    >
      <ChildIndex items={group.children} />
    </PageShell>
  );
}
