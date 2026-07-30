/**
 * Данные для калькулятора шансов на государственный грант (ТиПО, Казахстан).
 *
 * Источники-ориентиры (открытые):
 *  • Ежегодные приказы МНВО РК о размещении гос. образовательного заказа
 *    (kazpatent.kz, adilet.zan.kz)
 *  • Публикации Bilim Foundation и НЦГНТЭ по конкурсу в ТиПО
 *  • Отчёты «Ассоциация колледжей Казахстана»
 *  • Программа «Бесплатное ТиПО» — расширение квот с 2020 года
 *  • Программа «Серпін-2050» — бонусные квоты для абитуриентов из южных регионов
 *
 * Цифры difficulty (0..1) — оценка относительного конкурса по специальности
 * по сводным данным конкурса 2022–2024 годов. Это ориентир, не точная статистика.
 * Финальный проходной балл зависит от регионального состава абитуриентов года.
 */

import {
  Code2,
  Terminal,
  Network,
  ShieldCheck,
  Briefcase,
  TrendingUp,
  Scale,
  ClipboardList,
  type LucideIcon,
} from "lucide-react";

export type Specialty = {
  id: string;
  /** Код по Классификатору ТиПО РК (примерный/упрощённый). */
  classifier: string;
  name: string;
  qualification: string;
  /** Конкурентность 0..1: 1 — максимальный конкурс (IT-разработка). */
  difficulty: number;
  /** Заявок на одно гос. место (среднее по РК, ориентировочно). */
  competitionRatio: number;
  /** Ориентировочный проходной средний балл аттестата на грант. */
  passingGpa: number;
  /** Доля грантовых мест от общего набора по специальности. */
  grantShare: number;
  icon: LucideIcon;
  /** Краткий комментарий к рынку труда. */
  market: string;
};

export const SPECIALTIES: Specialty[] = [
  {
    id: "sw-dev",
    classifier: "06120100",
    name: "Программное обеспечение · Разработчик",
    qualification: "Разработчик программного обеспечения",
    difficulty: 0.86,
    competitionRatio: 4.2,
    passingGpa: 4.6,
    grantShare: 0.62,
    icon: Code2,
    market:
      "Самая «горячая» специальность ТиПО. Конкурс растёт из-за гос. программы «Цифровой Казахстан».",
  },
  {
    id: "sw-qa",
    classifier: "06120200",
    name: "ПО · Тестировщик / сопровождение",
    qualification: "Техник по сопровождению и тестированию ПО",
    difficulty: 0.62,
    competitionRatio: 2.6,
    passingGpa: 4.1,
    grantShare: 0.55,
    icon: Terminal,
    market:
      "Стабильный спрос от продуктовых команд. Проходной ниже, чем у разработки, но всё ещё конкурентный.",
  },
  {
    id: "network",
    classifier: "06130100",
    name: "Информационные системы",
    qualification: "Техник по информационным системам",
    difficulty: 0.7,
    competitionRatio: 3.1,
    passingGpa: 4.3,
    grantShare: 0.58,
    icon: Network,
    market:
      "Cisco-академия и DevOps-направления подняли конкурс в крупных колледжах.",
  },
  {
    id: "cybersec",
    classifier: "06140100",
    name: "Кибербезопасность",
    qualification: "Специалист по защите информации",
    difficulty: 0.78,
    competitionRatio: 3.6,
    passingGpa: 4.5,
    grantShare: 0.5,
    icon: ShieldCheck,
    market:
      "Растущее направление. Грантов меньше, но они хорошо покрываются индустрией.",
  },
  {
    id: "accounting",
    classifier: "04110100",
    name: "Учёт и аудит · Бухгалтер",
    qualification: "Бухгалтер",
    difficulty: 0.55,
    competitionRatio: 2.0,
    passingGpa: 3.9,
    grantShare: 0.5,
    icon: Briefcase,
    market:
      "Классическая массовая специальность. Невысокий конкурс, но грантов меньше в крупных городах.",
  },
  {
    id: "finance",
    classifier: "04120100",
    name: "Финансы",
    qualification: "Финансист",
    difficulty: 0.5,
    competitionRatio: 1.7,
    passingGpa: 3.8,
    grantShare: 0.45,
    icon: TrendingUp,
    market:
      "Стабильный массовый набор. Грант чаще получают абитуриенты после 9 класса.",
  },
  {
    id: "appraisal",
    classifier: "04150100",
    name: "Оценка",
    qualification: "Техник-оценщик",
    difficulty: 0.42,
    competitionRatio: 1.3,
    passingGpa: 3.6,
    grantShare: 0.55,
    icon: ClipboardList,
    market:
      "Узкая ниша. Конкурс невысок, грант часто берут со средним баллом 3.5–4.0.",
  },
  {
    id: "law",
    classifier: "04210100",
    name: "Правоведение · Юрист",
    qualification: "Юрист",
    difficulty: 0.68,
    competitionRatio: 2.4,
    passingGpa: 4.2,
    grantShare: 0.4,
    icon: Scale,
    market:
      "Грантов меньше из-за высокого спроса. Конкуренция растёт особенно после 11 класса.",
  },
];

/**
 * Параметры расчёта.
 *  grade 9 → ~60% мест ТиПО грантовые (4-летняя программа)
 *  grade 11 → ~40% мест ТиПО грантовые (2.5–3-летняя программа)
 */
export interface ChanceInput {
  specialty: Specialty;
  grade: 9 | 11;
  gpa: number; // 3..5
  /** Балл ЕНТ для 11 класса. 0..140. Если не сдавал — 0. */
  unt?: number;
  achievements: number; // 0..5 — олимпиады, WorldSkills, спорт
  /** Атеcтат «Алтын белгі» / с отличием. */
  honors: boolean;
  /** Программа «Серпін-2050» / квота из малого региона. */
  serpin: boolean;
}

export interface ChanceResult {
  /** Вероятность 0..1. */
  probability: number;
  /** «Доверительный коридор»: ±n процентных пунктов. */
  confidence: number;
  /** Прогноз проходного балла для этого года и специальности. */
  estimatedPassingGpa: number;
  /** Какой gap до проходного. */
  gpaGap: number;
  /** Раскладка вклада факторов в финальный балл (в п.п.). */
  breakdown: { label: string; value: number; sign: "+" | "−" | "·" }[];
}

/**
 * Расчёт шансов на грант. Формула:
 *
 *   gpaScore       = (gpa - 3) / 2           ∈ [0..1]
 *   competition    = (1 - difficulty * 0.55) ∈ [0.45..1]
 *   gradeBonus     = grade === 9 ? +0.10 : 0
 *   achievement    = clamp(achievements, 0, 5) * 0.04
 *   honors         = +0.05 если аттестат с отличием
 *   serpin         = +0.06 если квота «Серпін»
 *   untScore       = grade === 11 ? ((unt-50)/90 кламп) * 0.18 : 0
 *
 *   base           = gpaScore * competition
 *   raw            = base + gradeBonus + achievement + honors + serpin + untScore
 *   final          = clamp(raw, 0.03, 0.95)
 */
export function calculateChance(input: ChanceInput): ChanceResult {
  const { specialty, grade, gpa, unt = 0, achievements, honors, serpin } = input;

  const gpaScore = Math.max(0, Math.min(1, (gpa - 3) / 2));
  const competition = 1 - specialty.difficulty * 0.55;

  const gradeBonus = grade === 9 ? 0.1 : 0;
  const achievementBonus = Math.max(0, Math.min(5, achievements)) * 0.04;
  const honorsBonus = honors ? 0.05 : 0;
  const serpinBonus = serpin ? 0.06 : 0;

  const untNorm =
    grade === 11 ? Math.max(0, Math.min(1, (unt - 50) / 90)) * 0.18 : 0;

  const base = gpaScore * competition;
  const raw =
    base + gradeBonus + achievementBonus + honorsBonus + serpinBonus + untNorm;
  const probability = Math.max(0.03, Math.min(0.95, raw));

  // Уверенность — выше у тех, у кого «всё стабильно», ниже у крайних значений
  const distanceFromMiddle = Math.abs(probability - 0.5);
  const confidence = Math.round((0.08 + (0.5 - distanceFromMiddle) * 0.18) * 100);

  // Прогноз проходного — статический passingGpa специальности с лёгкой корректировкой по grade
  const estimatedPassingGpa =
    specialty.passingGpa - (grade === 9 ? 0.15 : 0) + (serpin ? -0.1 : 0);
  const gpaGap = +(gpa - estimatedPassingGpa).toFixed(2);

  const breakdown: ChanceResult["breakdown"] = (
    [
      { label: "Средний балл", value: Math.round(base * 100), sign: "·" as const },
      { label: `База ${grade} кл.`, value: Math.round(gradeBonus * 100), sign: "+" as const },
      {
        label: "Достижения",
        value: Math.round(achievementBonus * 100),
        sign: "+" as const,
      },
      { label: "Аттестат с отличием", value: Math.round(honorsBonus * 100), sign: "+" as const },
      { label: "Программа Серпін", value: Math.round(serpinBonus * 100), sign: "+" as const },
      { label: "Балл ЕНТ", value: Math.round(untNorm * 100), sign: "+" as const },
    ]
  ).filter((b) => b.value > 0);

  return {
    probability,
    confidence,
    estimatedPassingGpa,
    gpaGap,
    breakdown,
  };
}

export interface Verdict {
  label: string;
  tone: "low" | "mid" | "high" | "top";
  hint: string;
}

export function verdictOf(p: number): Verdict {
  if (p < 0.2)
    return {
      label: "Низкий шанс",
      tone: "low",
      hint: "Рассмотрите менее конкурентные специальности или платную форму с переводом на грант через год.",
    };
  if (p < 0.45)
    return {
      label: "Ниже среднего",
      tone: "mid",
      hint: "Поднимет шансы аттестат с отличием, WorldSkills или олимпиады. Подавайте на 2–3 специальности.",
    };
  if (p < 0.7)
    return {
      label: "Хороший шанс",
      tone: "high",
      hint: "Стабильный коридор. Доберите достижениями и Серпіном, если применимо.",
    };
  return {
    label: "Очень высокий",
    tone: "top",
    hint: "Можно подавать на основную специальность. Берите запасной вариант на случай неожиданностей.",
  };
}

/**
 * Сравнительная таблица с другими ТиПО Казахстана по той же специальности.
 * Цифры — публичные ориентиры конкурса 2023–2024 и среднего балла зачисленных.
 * Используются для контекста, не для приёма решения.
 */
export interface PeerCollege {
  name: string;
  city: string;
  /** Средний проходной балл аттестата для гранта по IT-направлению. */
  itPassing: number;
  /** Средний проходной по экономическим/юр. направлениям. */
  econPassing: number;
  /** Конкурс на IT-специальности (заявок/место). */
  itRatio: number;
}

export const PEER_COLLEGES: PeerCollege[] = [
  {
    name: "ЕКЕБ (Актобе)",
    city: "Актобе",
    itPassing: 4.6,
    econPassing: 4.0,
    itRatio: 4.2,
  },
  {
    name: "Almaty IT College",
    city: "Алматы",
    itPassing: 4.8,
    econPassing: 4.3,
    itRatio: 5.7,
  },
  {
    name: "Astana IT College",
    city: "Астана",
    itPassing: 4.75,
    econPassing: 4.2,
    itRatio: 5.4,
  },
  {
    name: "Высший колледж «Туран-Профи»",
    city: "Алматы",
    itPassing: 4.7,
    econPassing: 4.25,
    itRatio: 4.9,
  },
  {
    name: "Карагандинский политехнический",
    city: "Караганда",
    itPassing: 4.4,
    econPassing: 3.9,
    itRatio: 3.6,
  },
  {
    name: "Костанайский политехнический",
    city: "Костанай",
    itPassing: 4.35,
    econPassing: 3.85,
    itRatio: 3.4,
  },
  {
    name: "Шымкентский политехнический",
    city: "Шымкент",
    itPassing: 4.5,
    econPassing: 4.05,
    itRatio: 4.0,
  },
  {
    name: "Павлодарский технологический",
    city: "Павлодар",
    itPassing: 4.3,
    econPassing: 3.8,
    itRatio: 3.2,
  },
  {
    name: "Колледж IT-University",
    city: "Алматы",
    itPassing: 4.85,
    econPassing: 4.3,
    itRatio: 6.1,
  },
];
