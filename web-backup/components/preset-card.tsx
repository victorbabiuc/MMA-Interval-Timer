"use client"

import { TimerConfig } from "@/lib/types"

interface PresetCardProps {
  preset: TimerConfig
  onSelect: (preset: TimerConfig) => void
  isCustom?: boolean
}

export function PresetCard({ preset, onSelect, isCustom }: PresetCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(preset)}
      className={`interactive group relative flex w-28 shrink-0 flex-col items-center rounded-xl border px-3 py-3.5 text-left backdrop-blur-sm active:scale-95 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 md:w-32 ${
        isCustom
          ? "border-cyan-500/30 bg-slate-800/40 hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-500/20"
          : "border-slate-700 bg-slate-800/40 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20"
      }`}
      aria-label={`Select ${preset.name}`}
    >
      {isCustom && (
        <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/10 to-indigo-500/10" />
      )}
      <span
        className="mb-1.5 text-2xl transition-transform duration-200 group-hover:scale-110 md:text-3xl"
        role="img"
        aria-hidden="true"
      >
        {preset.icon}
      </span>
      <span className="text-xs font-bold text-slate-100">{preset.name}</span>
    </button>
  )
}
