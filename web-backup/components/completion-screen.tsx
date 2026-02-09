"use client"

import { WorkoutStats } from "@/lib/types"
import { formatTime } from "@/lib/presets"
import { RotateCcw, Home, Check } from "lucide-react"
import { useEffect, useState, useMemo } from "react"

interface CompletionScreenProps {
  stats: WorkoutStats
  onRestart: () => void
  onHome: () => void
}

const CONFETTI_COLORS = [
  "#10b981",
  "#06b6d4",
  "#3b82f6",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
]

export function CompletionScreen({
  stats,
  onRestart,
  onHome,
}: CompletionScreenProps) {
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(t)
  }, [])

  const confettiPieces = useMemo(
    () =>
      Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 1}s`,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        rotation: Math.random() * 360,
        size: 6 + Math.random() * 8,
      })),
    []
  )

  return (
    <div className="animate-fade-in relative mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-4">
      {/* Confetti */}
      {showConfetti && (
        <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
          {confettiPieces.map((p) => (
            <div
              key={p.id}
              className="confetti-piece"
              style={{
                left: p.left,
                animationDelay: p.delay,
                backgroundColor: p.color,
                borderRadius: p.id % 3 === 0 ? "50%" : "2px",
                width: p.size,
                height: p.size,
                transform: `rotate(${p.rotation}deg)`,
              }}
            />
          ))}
        </div>
      )}

      {/* Checkmark */}
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/20">
        <Check className="h-12 w-12 text-emerald-400" strokeWidth={3} />
      </div>

      {/* Title */}
      <h2 className="mb-2 text-4xl font-extrabold text-slate-100">
        Workout Complete!
      </h2>
      <p className="mb-8 text-slate-400">Great job pushing through!</p>

      {/* Stats Card */}
      <div className="mb-8 w-full rounded-2xl border border-slate-700/60 bg-slate-800/50 p-6 backdrop-blur-sm">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Rounds
            </p>
            <p className="mt-1 font-mono text-2xl font-bold tabular-nums text-slate-100">
              {stats.totalRounds}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Round Time
            </p>
            <p className="mt-1 font-mono text-2xl font-bold tabular-nums text-slate-100">
              {formatTime(stats.roundTime)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Total Time
            </p>
            <p className="mt-1 font-mono text-2xl font-bold tabular-nums text-emerald-400">
              {formatTime(stats.totalTime)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Work / Rest
            </p>
            <p className="mt-1 font-mono text-2xl font-bold tabular-nums text-slate-100">
              {formatTime(stats.workTime)}{" "}
              <span className="text-slate-500">/</span>{" "}
              {formatTime(stats.restTotalTime)}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex w-full flex-col gap-3">
        <button
          type="button"
          onClick={onRestart}
          className="interactive gradient-work flex h-14 items-center justify-center gap-2 rounded-xl text-lg font-bold text-white shadow-lg shadow-emerald-500/20 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-400"
        >
          <RotateCcw className="h-5 w-5" />
          Restart Timer
        </button>
        <button
          type="button"
          onClick={onHome}
          className="interactive flex items-center justify-center gap-2 py-3 text-sm font-semibold text-slate-400 hover:text-slate-200"
        >
          <Home className="h-4 w-4" />
          Back to Home
        </button>
      </div>
    </div>
  )
}
