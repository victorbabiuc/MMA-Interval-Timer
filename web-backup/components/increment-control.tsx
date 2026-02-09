"use client"

import { Minus, Plus } from "lucide-react"

interface IncrementControlProps {
  label: string
  value: string
  onIncrement: () => void
  onDecrement: () => void
  incrementLabel?: string
  decrementLabel?: string
  accentColor?: "emerald" | "blue"
}

export function IncrementControl({
  label,
  value,
  onIncrement,
  onDecrement,
  incrementLabel,
  decrementLabel,
  accentColor = "emerald",
}: IncrementControlProps) {
  const plusBg =
    accentColor === "blue"
      ? "bg-blue-600 hover:bg-blue-500 active:bg-blue-700"
      : "bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700"

  return (
    <div className="rounded-2xl border border-slate-700/60 bg-slate-800/50 p-6 backdrop-blur-sm">
      <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
        {label}
      </p>
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onDecrement}
          className="interactive flex h-14 w-14 items-center justify-center rounded-full bg-slate-700 text-slate-200 hover:bg-slate-600 active:scale-95 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          aria-label={decrementLabel || `Decrease ${label}`}
        >
          <Minus className="h-5 w-5" />
        </button>

        <span className="min-w-[100px] text-center font-mono text-5xl font-bold tabular-nums text-slate-100">
          {value}
        </span>

        <button
          type="button"
          onClick={onIncrement}
          className={`interactive flex h-14 w-14 items-center justify-center rounded-full text-white active:scale-95 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${plusBg}`}
          aria-label={incrementLabel || `Increase ${label}`}
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
