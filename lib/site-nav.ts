/**
 * Canonical site navigation. One source of truth for header nav,
 * footer columns, breadcrumbs and the home-page section cards.
 *
 * Mirrors the structure of the live ekeb.edu.kz site, plus an extra
 * "Калькулятор гранта" entry under Абитуриенту.
 */

export type NavItem = {
  label: string;
  href: string;
  description?: string;
  /** Show this item in the homepage section grid. */
  feature?: boolean;
};

export type NavGroup = {
  label: string;
  href: string;
  /** Short copy for the section card on the homepage. */
  blurb?: string;
  children: NavItem[];
};

export const SITE_NAV: NavGroup[] = [
  {
    label: "О нас",
    href: "/about",
    blurb:
      "История, коллектив, документы, медиа и 3D-тур по кампусу — всё об институции.",
    children: [
      { label: "История колледжа", href: "/about/history" },
      { label: "Коллектив колледжа", href: "/about/staff" },
      { label: "Лицензия", href: "/about/license" },
      { label: "Наши партнёры", href: "/partners" },
      { label: "Контакты", href: "/contact" },
      { label: "Достижения", href: "/about/achievements" },
      { label: "СМИ о нас", href: "/about/media" },
      { label: "3D-тур по колледжу", href: "/about/tour" },
      { label: "Блог директора", href: "/about/blog" },
    ],
  },
  {
    label: "Абитуриенту",
    href: "/admissions",
    blurb:
      "Приёмная комиссия, специальности, онлайн-подача документов и калькулятор гранта.",
    children: [
      { label: "Приёмная комиссия", href: "/admissions/commission" },
      {
        label: "Специальности",
        href: "/admissions/programs",
        feature: true,
      },
      {
        label: "Подать документы онлайн",
        href: "/admissions/apply",
        feature: true,
      },
      { label: "Результаты конкурса", href: "/admissions/results" },
      {
        label: "Калькулятор шансов на грант",
        href: "/admissions/grant",
        description:
          "Оценка вероятности гос. гранта по специальности и среднему баллу.",
        feature: true,
      },
    ],
  },
  {
    label: "Студенту",
    href: "/students",
    blurb:
      "Расписание, библиотека, оплата, трудоустройство, WorldSkills, AIS College SmartNation.",
    children: [
      {
        label: "Правила внутреннего распорядка",
        href: "/students/rules",
      },
      {
        label: "Расписание занятий и звонков",
        href: "/students/schedule",
      },
      {
        label: "Расписание консультаций и экзаменов",
        href: "/students/exams",
      },
      { label: "График учебного процесса", href: "/students/calendar" },
      {
        label: "AIS «College SmartNation»",
        href: "/students/smartnation",
      },
      { label: "Библиотека", href: "/students/library" },
      { label: "Полезные ссылки", href: "/students/links" },
      {
        label: "Электронный ящик доверия",
        href: "/students/trust-box",
      },
      {
        label: "Центр обслуживания студентов",
        href: "/students/service-center",
      },
      { label: "Выпускникам", href: "/students/alumni" },
      { label: "Оплата за обучение", href: "/students/tuition" },
      { label: "Трудоустройство", href: "/students/employment" },
      { label: "WorldSkills", href: "/students/worldskills" },
    ],
  },
  {
    label: "Обучение",
    href: "/learning",
    blurb:
      "Дуальная модель, образовательные программы и производственная практика.",
    children: [
      { label: "Дуальное обучение", href: "/learning/dual" },
      {
        label: "Образовательные программы",
        href: "/learning/programs",
      },
      { label: "Практика", href: "/learning/practice" },
    ],
  },
  {
    label: "Документы",
    href: "/documents",
    blurb:
      "Нормативно-правовая база, аттестация, аккредитация и внутренние положения.",
    children: [
      {
        label: "Нормативно-правовая документация",
        href: "/documents/regulations",
      },
      { label: "Аттестация 2024", href: "/documents/attestation-2024" },
      { label: "Аккредитация", href: "/documents/accreditation" },
      { label: "Правила и положения", href: "/documents/rules" },
    ],
  },
  {
    label: "Международное сотрудничество",
    href: "/international",
    blurb:
      "Зарубежные программы, меморандумы, обмен студентами и совместные проекты.",
    children: [
      { label: "Аккредитация", href: "/international/accreditation" },
      {
        label: "Меморандумы и договора",
        href: "/international/memorandums",
      },
      { label: "Проекты", href: "/international/projects" },
    ],
  },
];

/** Flat list — useful for static-export-time validation. */
export const ALL_ROUTES = [
  "/",
  "/news",
  "/contact",
  "/partners",
  ...SITE_NAV.flatMap((g) => [g.href, ...g.children.map((c) => c.href)]),
];

/** Resolve breadcrumbs for an arbitrary path. */
export function breadcrumbsFor(path: string): { label: string; href: string }[] {
  const crumbs: { label: string; href: string }[] = [
    { label: "Главная", href: "/" },
  ];
  for (const group of SITE_NAV) {
    if (group.href === path) {
      crumbs.push({ label: group.label, href: group.href });
      return crumbs;
    }
    const child = group.children.find((c) => c.href === path);
    if (child) {
      crumbs.push({ label: group.label, href: group.href });
      crumbs.push({ label: child.label, href: child.href });
      return crumbs;
    }
  }
  return crumbs;
}
