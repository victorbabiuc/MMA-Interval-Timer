"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { TimerConfig, TimerPhase, WorkoutStats } from "@/lib/types"

interface UseTimerReturn {
  currentRound: number
  timeRemaining: number
  phase: TimerPhase
  isRunning: boolean
  isPaused: boolean
  isComplete: boolean
  totalElapsed: number
  start: () => void
  pause: () => void
  resume: () => void
  stop: () => void
  getStats: () => WorkoutStats
  phaseTotal: number
}

function createBeep(
  frequency: number,
  duration: number,
  volume: number
): () => void {
  return () => {
    try {
      const ctx = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext)()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.frequency.value = frequency
      osc.type = "sine"
      gain.gain.value = volume
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration)
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + duration)
    } catch {
      // Audio not available
    }
  }
}

const playBeep = createBeep(800, 0.15, 0.3)
const playDoubleBeep = () => {
  playBeep()
  setTimeout(playBeep, 200)
}
const playTripleBeep = () => {
  playBeep()
  setTimeout(playBeep, 200)
  setTimeout(createBeep(1200, 0.3, 0.4), 400)
}

function vibrate(pattern: number | number[]) {
  try {
    if (navigator.vibrate) {
      navigator.vibrate(pattern)
    }
  } catch {
    // Vibration not available
  }
}

export function useTimer(config: TimerConfig): UseTimerReturn {
  const [currentRound, setCurrentRound] = useState(1)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [phase, setPhase] = useState<TimerPhase>("countdown")
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [totalElapsed, setTotalElapsed] = useState(0)

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startTimeRef = useRef(0)
  const phaseRef = useRef<TimerPhase>("countdown")
  const roundRef = useRef(1)
  const timeRef = useRef(0)

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const triggerAlerts = useCallback(
    (time: number, currentPhase: TimerPhase) => {
      if (currentPhase === "countdown") return

      if (config.soundEnabled) {
        if (time === 30 && config.warn30s) playDoubleBeep()
        if (time === 10 && config.warn10s) playDoubleBeep()
        if (time <= 10 && time > 0 && config.countdownBeeps) playBeep()
        if (time === 0) playTripleBeep()
      }

      if (config.vibrationEnabled) {
        if (time === 30 && config.warn30s) vibrate([100, 50, 100])
        if (time === 10 && config.warn10s) vibrate([100, 50, 100])
        if (time <= 3 && time > 0) vibrate(50)
        if (time === 0) vibrate([200, 100, 200, 100, 200])
      }
    },
    [config]
  )

  const tick = useCallback(() => {
    const newTime = timeRef.current - 1
    timeRef.current = newTime
    setTimeRemaining(newTime)
    setTotalElapsed((p) => p + 1)

    triggerAlerts(newTime, phaseRef.current)

    if (newTime <= 0) {
      // Phase complete
      if (phaseRef.current === "countdown") {
        // Start work phase
        phaseRef.current = "work"
        timeRef.current = config.roundTime
        setPhase("work")
        setTimeRemaining(config.roundTime)
      } else if (phaseRef.current === "work") {
        if (!config.perpetualRounds && roundRef.current >= config.rounds) {
          // Workout complete
          clearTimer()
          setIsComplete(true)
          setIsRunning(false)
          return
        }
        // Switch to rest
        phaseRef.current = "rest"
        timeRef.current = config.restTime
        setPhase("rest")
        setTimeRemaining(config.restTime)
      } else if (phaseRef.current === "rest") {
        // Next round - switch to work
        const nextRound = roundRef.current + 1
        roundRef.current = nextRound
        setCurrentRound(nextRound)
        phaseRef.current = "work"
        timeRef.current = config.roundTime
        setPhase("work")
        setTimeRemaining(config.roundTime)
      }
    }
  }, [config, clearTimer, triggerAlerts])

  const start = useCallback(() => {
    clearTimer()
    setIsComplete(false)
    setIsPaused(false)
    setCurrentRound(1)
    roundRef.current = 1
    setTotalElapsed(0)
    startTimeRef.current = Date.now()

    // Start with 10s countdown
    phaseRef.current = "countdown"
    timeRef.current = 10
    setPhase("countdown")
    setTimeRemaining(10)
    setIsRunning(true)

    intervalRef.current = setInterval(tick, 1000)
  }, [clearTimer, tick])

  const pause = useCallback(() => {
    clearTimer()
    setIsPaused(true)
  }, [clearTimer])

  const resume = useCallback(() => {
    setIsPaused(false)
    intervalRef.current = setInterval(tick, 1000)
  }, [tick])

  const stop = useCallback(() => {
    clearTimer()
    setIsRunning(false)
    setIsPaused(false)
    setIsComplete(false)
    setCurrentRound(1)
    roundRef.current = 1
    setTimeRemaining(0)
    setTotalElapsed(0)
    phaseRef.current = "countdown"
    setPhase("countdown")
  }, [clearTimer])

  const getStats = useCallback((): WorkoutStats => {
    const actualRounds = config.perpetualRounds
      ? roundRef.current
      : config.rounds
    const workTime = actualRounds * config.roundTime
    const restTotalTime = Math.max(0, actualRounds - 1) * config.restTime
    return {
      totalRounds: actualRounds,
      roundTime: config.roundTime,
      restTime: config.restTime,
      totalTime: workTime + restTotalTime,
      workTime,
      restTotalTime,
    }
  }, [config])

  // phaseTotal - the total time for the current phase
  const phaseTotal =
    phase === "countdown"
      ? 10
      : phase === "work"
        ? config.roundTime
        : config.restTime

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTimer()
  }, [clearTimer])

  return {
    currentRound,
    timeRemaining,
    phase,
    isRunning,
    isPaused,
    isComplete,
    totalElapsed,
    start,
    pause,
    resume,
    stop,
    getStats,
    phaseTotal,
  }
}
