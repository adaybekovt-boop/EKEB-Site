"use client";

import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip as RTooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { year: "2020", rate: 78, salary: 180 },
  { year: "2021", rate: 84, salary: 215 },
  { year: "2022", rate: 89, salary: 245 },
  { year: "2023", rate: 91, salary: 285 },
  { year: "2024", rate: 93, salary: 320 },
  { year: "2025", rate: 94, salary: 360 },
];

const tooltipStyle = {
  background: "rgba(19,20,24,0.95)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 12,
  backdropFilter: "blur(12px)",
  fontSize: 12,
};

export function EmploymentChart({ kind }: { kind: "rate" | "salary" }) {
  if (kind === "rate") {
    return (
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
        <AreaChart data={data} margin={{ top: 6, right: 8, bottom: 0, left: -10 }}>
          <defs>
            <linearGradient id="rateGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6178f5" stopOpacity={0.55} />
              <stop offset="100%" stopColor="#6178f5" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            stroke="rgba(255,255,255,0.05)"
            strokeDasharray="3 6"
            vertical={false}
          />
          <XAxis
            dataKey="year"
            stroke="#8a8f98"
            tick={{ fontSize: 11 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#8a8f98"
            tick={{ fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            domain={[70, 100]}
            tickFormatter={(v) => `${v}%`}
          />
          <RTooltip
            contentStyle={tooltipStyle}
            labelStyle={{ color: "#f7f8f8" }}
            itemStyle={{ color: "#6178f5" }}
            formatter={(v) => [`${v}%`, "Трудоустройство"]}
          />
          <Area
            type="monotone"
            dataKey="rate"
            stroke="#6178f5"
            strokeWidth={2}
            fill="url(#rateGrad)"
            isAnimationActive
            animationDuration={1400}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
      <AreaChart data={data} margin={{ top: 6, right: 8, bottom: 0, left: -10 }}>
        <defs>
          <linearGradient id="salaryGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d4a574" stopOpacity={0.55} />
            <stop offset="100%" stopColor="#d4a574" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          stroke="rgba(255,255,255,0.05)"
          strokeDasharray="3 6"
          vertical={false}
        />
        <XAxis
          dataKey="year"
          stroke="#8a8f98"
          tick={{ fontSize: 11 }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#8a8f98"
          tick={{ fontSize: 11 }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => `${v}K`}
        />
        <RTooltip
          contentStyle={tooltipStyle}
          labelStyle={{ color: "#f7f8f8" }}
          itemStyle={{ color: "#d4a574" }}
          formatter={(v) => [`${v}K ₸`, "Средний оффер"]}
        />
        <Area
          type="monotone"
          dataKey="salary"
          stroke="#d4a574"
          strokeWidth={2}
          fill="url(#salaryGrad)"
          isAnimationActive
          animationDuration={1400}
          animationEasing="ease-out"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
