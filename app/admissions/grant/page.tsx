import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { GrantCalculatorPage } from "@/components/grant-calculator-page";

export const metadata: Metadata = {
  title: "Калькулятор шансов на грант — ЕКЕБ",
  description:
    "Оцените вероятность получения государственного гранта по среднему баллу, специальности и достижениям. Данные по конкурсу в колледжах Казахстана.",
};

export default function GrantPage() {
  return (
    <PageShell
      pathname="/admissions/grant"
      eyebrow="Абитуриенту · Калькулятор"
      title="Шансы на государственный грант."
      subtitle="Оценка по среднему баллу, базе (9/11 кл.), баллу ЕНТ, достижениям и специальности. Сравнение с другими ТиПО Казахстана."
      back={{ label: "Назад в «Абитуриенту»", href: "/admissions" }}
    >
      <GrantCalculatorPage />
    </PageShell>
  );
}
