import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { ContentSection } from "@/components/page-content/section";
import { StatGrid } from "@/components/page-content/stat-strip";
import { FeatureGrid } from "@/components/page-content/feature-card";
import { StepsList } from "@/components/page-content/steps";
import { BigCTA } from "@/components/page-content/big-cta";
import { TourViewer } from "@/components/about/tour-viewer";
import {
  MapPin,
  Headphones,
  Wifi,
  Accessibility,
  Smartphone,
  Camera,
} from "lucide-react";

export const metadata: Metadata = {
  title: "3D-тур по колледжу — ЕКЕБ",
};

const stats = [
  { value: "12", label: "помещений", hint: "в виртуальном туре" },
  { value: "2", label: "корпуса", hint: "общая площадь 7400 м²", warm: true },
  { value: "360°", label: "обзор", hint: "Matterport · WebGL" },
  { value: "5 мин", label: "прохождение", hint: "средняя длительность", warm: true },
];

const features = [
  {
    code: "01",
    title: "Работает на телефоне",
    body:
      "Тур запускается в браузере, без приложений. Поддерживаются iOS Safari 15+ и Chrome на Android 8+. Можно повернуть телефон и идти по аудитории, как по карте.",
  },
  {
    code: "02",
    title: "Аудио-комментарии",
    body:
      "В каждой точке записан короткий комментарий преподавателя — про оборудование, какие занятия идут и что можно делать на самоподготовке.",
  },
  {
    code: "03",
    title: "Текстовая альтернатива",
    body:
      "Все аудиокомментарии и подписи к точкам доступны текстом. Маршрут можно пройти без звука, для пользователей с нарушением слуха.",
  },
  {
    code: "04",
    title: "Lite-режим",
    body:
      "На медленном интернете включается версия с уменьшенными текстурами и без видео-плиток. Загрузка тура — около 1.4 МБ в lite-режиме.",
  },
  {
    code: "05",
    title: "Real-фотографии",
    body:
      "Снимали в марте 2025 — реальные аудитории, столы, доски и стенды. Никаких рендеров и стоковых картинок.",
  },
  {
    code: "06",
    title: "Точная карта",
    body:
      "К каждой точке прикреплено расположение на схеме корпуса, чтобы при оффлайн-визите вы знали, куда идти и через какой подъезд.",
  },
];

const steps = [
  {
    code: "01",
    title: "Нажмите на сектор слева",
    body:
      "В сайдбаре справа от схемы выберите одно из 12 помещений — лабораторию, библиотеку, актовый зал или столовую.",
  },
  {
    code: "02",
    title: "Изучите точки на карте",
    body:
      "На схеме кампуса появятся подсвеченные точки. Каждая — это сектор. Можно щёлкать по ним напрямую, чтобы переключаться.",
  },
  {
    code: "03",
    title: "Запишитесь на оффлайн-тур",
    body:
      "Если хотите посмотреть всё лично — выбирайте дату в форме внизу страницы. Тур проводит студент-волонтёр, бесплатно, любая суббота.",
    hint: "Среднее время оффлайн-тура — 45 минут",
  },
];

export default function TourPage() {
  return (
    <PageShell
      pathname="/about/tour"
      eyebrow="О колледже"
      title="3D-тур по кампусу."
      subtitle="Виртуальная прогулка по 12 лабораториям, аудиториям и общим зонам колледжа. Запускается с телефона, работает на медленном интернете."
      back={{ label: "Назад в «О колледже»", href: "/about" }}
    >
      <ContentSection density="dense">
        <StatGrid items={stats} />
      </ContentSection>

      <ContentSection
        eyebrow="Виртуальный тур"
        title={
          <>
            Двенадцать помещений — <br />
            <span className="text-[var(--muted)]">одна интерактивная схема</span>.
          </>
        }
        intro="Выбирайте сектор на схеме или в списке справа. Для каждой точки — фото, описание и аудио-комментарий преподавателя."
        ambient="indigo"
      >
        <TourViewer />
      </ContentSection>

      <ContentSection
        eyebrow="Возможности"
        title={
          <>
            Что умеет наш тур, <br />
            <span className="text-[var(--muted)]">а что — нет</span>.
          </>
        }
        intro="Сделали честно: без VR-наушников, без 100 МБ загрузки, без излишних спецэффектов. Всё, что нужно — посмотреть, где вы будете учиться."
        ambient="warm"
      >
        <FeatureGrid items={features} cols={3} />
      </ContentSection>

      <ContentSection
        eyebrow="Как пользоваться"
        title={
          <>
            Три шага — <br />
            <span className="text-[var(--muted)]">и вы внутри колледжа</span>.
          </>
        }
        intro="Никаких регистраций и приложений. Открываете эту страницу с телефона или ноутбука — и идёте."
      >
        <StepsList steps={steps} />
      </ContentSection>

      <BigCTA
        eyebrow="Хотите лично?"
        title={
          <>
            Запишитесь на оффлайн-тур <br />
            по выходным.
          </>
        }
        body="Каждую субботу с 11:00 до 14:00 студенты-волонтёры проводят экскурсии для абитуриентов и родителей. Длительность — 45 минут, регистрация не обязательна, но желательна."
        primary={{ label: "Записаться", href: "/contact" }}
        secondary={{ label: "Программы обучения", href: "/learning/programs" }}
      />
    </PageShell>
  );
}
