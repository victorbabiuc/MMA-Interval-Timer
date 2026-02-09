"use client"

import { TimerConfig } from "@/lib/types"
import { formatTime } from "@/lib/presets"
import { useTimer } from "@/hooks/use-timer"
import { ProgressRing } from "./progress-ring"
import { X, Pause, Play } from "lucide-react"
import { useEffect, useCallback } from "react"

interface ActiveTimerProps {
  config: TimerConfig
  onComplete: (stats: ReturnType<ReturnType<typeof useTimer>["getStats"]>) => void
  onStop: (stats: ReturnType<ReturnType<typeof useTimer>["getStats"]>) => void
}

export function ActiveTimer({ config, onComplete, onStop }: ActiveTimerProps) {
  const timer = useTimer(config)

  // Auto-start on mount
  useEffect(() => {
    timer.start()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Handle completion
  useEffect(() => {
    if (timer.isComplete) {
      onComplete(timer.getStats())
    }
  }, [timer.isComplete, timer.getStats, onComplete])

  const handlePauseResume = useCallback(() => {
    if (timer.isPaused) {
      timer.resume()
    } else {
      timer.pause()
    }
  }, [timer])

  const handleEndWorkout = useCallback(() => {
    const stats = timer.getStats()
    timer.stop()
    onStop(stats)
  }, [timer, onStop])

  // Determine gradient class
  const isWarning = timer.phase === "work" && timer.timeRemaining <= 30 && timer.timeRemaining > 10 && config.warn30s
  const isCritical = (timer.phase === "work" || timer.phase === "rest") && timer.timeRemaining <= 10 && config.warn10s

  let gradientClass = "gradient-work"
  if (timer.phase === "rest") gradientClass = "gradient-rest"
  if (timer.phase === "countdown") gradientClass = "gradient-rest"
  if (isWarning) gradientClass = "gradient-warning"
  if (isCritical) gradientClass = "gradient-critical"

  const bgPulse = isCritical ? "animate-bg-pulse" : ""
  const timerPulse = isCritical ? "animate-critical-pulse" : ""

  // Progress calculation
  const progress = timer.phaseTotal > 0 ? timer.timeRemaining / timer.phaseTotal : 0

  // Phase label
  const phaseLabel = timer.phase === "countdown" ? "GET READY" : timer.phase === "work" ? "WORK" : "REST"

  // Next phase hint
  let nextHint = ""
  if (timer.phase === "countdown") {
    nextHint = `Next: ${formatTime(config.roundTime)} work`
  } else if (timer.phase === "work") {
    if (!config.perpetualRounds && timer.currentRound >= config.rounds) {
      nextHint = "Last round!"
    } else {
      nextHint = `Next: ${formatTime(config.restTime)} rest`
    }
  } else if (timer.phase === "rest") {
    nextHint = `Next: Round ${timer.currentRound + 1} work`
  }

  return (
    <div
      className={`fixed inset-0 z-40 flex flex-col ${gradientClass} ${bgPulse} transition-all duration-700`}
    >
      {/* Top bar */}
      <div className="absolute left-0 right-0 top-0 z-50 flex items-center justify-between px-4 pt-4 md:px-6">
        <button
          type="button"
          onClick={handleEndWorkout}
          className="interactive flex h-14 w-14 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-md active:scale-95 focus-visible:ring-2 focus-visible:ring-white"
          aria-label="End workout"
        >
          <X className="h-6 w-6" />
        </button>
        <button
          type="button"
          onClick={handlePauseResume}
          className="interactive flex h-14 w-14 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-md active:scale-95 focus-visible:ring-2 focus-visible:ring-white"
          aria-label={timer.isPaused ? "Resume timer" : "Pause timer"}
        >
          {timer.isPaused ? (
            <Play className="h-6 w-6" />
          ) : (
            <Pause className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Center content */}
      <div className="flex flex-1 flex-col items-center justify-center px-4">
        {/* Round counter */}
        {timer.phase !== "countdown" && (
          <p className="mb-4 text-lg font-semibold uppercase tracking-widest text-white/80">
            {config.perpetualRounds
              ? `Round ${timer.currentRound}`
              : `Round ${timer.currentRound} / ${config.rounds}`}
          </p>
        )}

        {/* Timer with ring */}
        <div className="relative flex items-center justify-center">
          <ProgressRing progress={progress} size={260} strokeWidth={6} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className={`font-mono text-[96px] font-black tabular-nums leading-none text-white md:text-[120px] ${timerPulse}`}
              style={{ textShadow: "0 4px 24px rgba(0,0,0,0.3)" }}
              aria-live="polite"
              aria-atomic="true"
            >
              {formatTime(timer.timeRemaining)}
            </span>
          </div>
        </div>

        {/* Phase label */}
        <p className="mt-6 text-3xl font-extrabold uppercase tracking-widest text-white">
          {phaseLabel}
        </p>

        {/* Next hint */}
        <p className="mt-2 text-sm text-white/60">{nextHint}</p>
      </div>

      {/* Pause overlay */}
      {timer.isPaused && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md animate-fade-in">
          <div className="mx-4 flex w-full max-w-xs flex-col items-center gap-6 rounded-2xl border border-slate-700/50 bg-slate-800/90 p-8 shadow-2xl">
            <h3 className="text-2xl font-extrabold uppercase tracking-widest text-slate-100">
              Paused
            </h3>
            <button
              type="button"
              onClick={() => timer.resume()}
              className="interactive gradient-work w-full rounded-xl py-4 text-lg font-bold text-white shadow-lg active:scale-95 focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              Resume
            </button>
            <button
              type="button"
              onClick={handleEndWorkout}
              className="interactive text-sm font-semibold text-red-400 hover:text-red-300"
            >
              End Workout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
