"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "motion/react";
import { ShieldCheck, Lock, CreditCard } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

type Method = {
  name: string;
  file: string;
  /** Soft background tint that hints at brand identity */
  tint: string;
  /** Logo height in px on desktop */
  size: number;
  /** Optional accent for the inner card sheen */
  rim: string;
};

const methods: Method[] = [
  {
    name: "Visa",
    file: "/payments/visa.svg",
    tint: "linear-gradient(140deg, #f4f6ff 0%, #e2e8ff 60%, #c9d3ff 100%)",
    rim: "rgba(20, 52, 203, 0.35)",
    size: 68,
  },
  {
    name: "Mastercard",
    file: "/payments/mastercard.svg",
    tint: "linear-gradient(140deg, #fff5ec 0%, #ffe5d0 60%, #ffd0a8 100%)",
    rim: "rgba(235, 0, 27, 0.35)",
    size: 72,
  },
  {
    name: "Apple Pay",
    file: "/payments/apple-pay.svg",
    tint: "linear-gradient(140deg, #f7f7f9 0%, #e9eaee 60%, #d4d6dd 100%)",
    rim: "rgba(0, 0, 0, 0.35)",
    size: 56,
  },
  {
    name: "Kaspi.kz",
    file: "/payments/kaspi.svg",
    tint: "linear-gradient(140deg, #fff2f1 0%, #ffd8d4 60%, #ffb9b1 100%)",
    rim: "rgba(241, 70, 53, 0.35)",
    size: 52,
  },
  {
    name: "СБП",
    file: "/payments/sbp.svg",
    tint: "linear-gradient(140deg, #f1faf4 0%, #d8efde 60%, #ffe7b3 100%)",
    rim: "rgba(0, 128, 95, 0.35)",
    size: 72,
  },
];

function PaymentCard({
  method,
  index,
  inView,
}: {
  method: Method;
  index: number;
  inView: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // springs for glassy, weighty tilt
  const rx = useSpring(useTransform(my, [-1, 1], [12, -12]), {
    stiffness: 180,
    damping: 20,
    mass: 0.7,
  });
  const ry = useSpring(useTransform(mx, [-1, 1], [-14, 14]), {
    stiffness: 180,
    damping: 20,
    mass: 0.7,
  });

  // moving specular highlight position
  const sx = useTransform(mx, [-1, 1], [0, 100]);
  const sy = useTransform(my, [-1, 1], [0, 100]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0, rotateX: -22 }}
      animate={
        inView ? { y: 0, opacity: 1, rotateX: 0 } : { y: 50, opacity: 0 }
      }
      transition={{
        duration: 0.95,
        delay: 0.18 + index * 0.09,
        ease: EASE,
      }}
      className="will-change-transform"
      style={{ transformPerspective: 1200 }}
    >
      {/* idle float — independent of cursor tilt */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 5 + index * 0.6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.4,
        }}
        className="will-change-transform"
      >
        <motion.div
          ref={ref}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={{
            rotateX: rx,
            rotateY: ry,
            transformPerspective: 1200,
            boxShadow: `0 24px 60px -32px ${method.rim}`,
          }}
          className="group relative aspect-[7/4.4] rounded-[20px] overflow-hidden cursor-default will-change-transform bg-transparent"
        >
          {/* soft tinted aura — replaces the hard card surface */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background: method.tint,
              WebkitMaskImage:
                "radial-gradient(ellipse 75% 70% at 50% 50%, black 0%, rgba(0,0,0,0.55) 55%, transparent 90%)",
              maskImage:
                "radial-gradient(ellipse 75% 70% at 50% 50%, black 0%, rgba(0,0,0,0.55) 55%, transparent 90%)",
            }}
          />

          {/* cursor-following soft sheen */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 mix-blend-screen opacity-60"
            style={{
              background: useTransform(
                [sx, sy],
                ([x, y]: number[]) =>
                  `radial-gradient(320px circle at ${x}% ${y}%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.06) 35%, transparent 65%)`
              ),
            }}
          />

          {/* logo — sole content */}
          <div className="absolute inset-0 flex items-center justify-center px-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={method.file}
              alt={method.name}
              draggable={false}
              style={{ height: method.size }}
              className="w-auto select-none"
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function Payments() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yHead = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const yCards = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <section
      ref={ref}
      id="payments"
      className="relative py-24 md:py-36 overflow-hidden motion-island"
    >
      {/* aurora glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 20% 30%, rgba(97,120,245,0.14) 0%, transparent 60%), radial-gradient(ellipse 50% 45% at 80% 80%, rgba(212,165,116,0.10) 0%, transparent 65%)",
        }}
      />

      {/* dotted constellation */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.20) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse at center, black 25%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 25%, transparent 80%)",
        }}
      />

      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <motion.div
          style={{ y: yHead }}
          className="grid grid-cols-12 gap-6 md:gap-8 mb-10 md:mb-16"
        >
          <motion.div
            initial={{ y: 28, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1, ease: EASE }}
            className="col-span-12 md:col-span-7"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] idle-glow" />
              <span className="text-[13px] text-[var(--accent)] tracking-wide">
                Оплата обучения
              </span>
            </div>
            <h2 className="text-[2rem] md:text-6xl font-medium tracking-tighter leading-[1.02]">
              Принимаем оплату через{" "}
              <span className="gradient-text">ROBOKASSA</span>.
            </h2>
          </motion.div>

          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.18, ease: EASE }}
            className="col-span-12 md:col-span-5 md:pt-4"
          >
            <p className="text-[var(--muted)] text-[15px] leading-relaxed max-w-md mb-5">
              Платёжный шлюз ROBOKASSA: банковская карта, Apple Pay, Kaspi.kz
              и Система быстрых платежей. Чек приходит на почту, договор —
              в личный кабинет.
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-[var(--muted)]">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent)]" strokeWidth={1.75} />
                PCI DSS Level 1
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[var(--accent)]" strokeWidth={1.75} />
                3-D Secure
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-[var(--accent)]" strokeWidth={1.75} />
                Возврат за 7 дней
              </span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: yCards }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 [perspective:1400px]"
        >
          {methods.map((m, i) => (
            <PaymentCard key={m.name} method={m} index={i} inView={inView} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
