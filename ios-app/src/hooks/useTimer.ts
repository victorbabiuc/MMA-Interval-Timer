import { useState, useRef, useCallback, useEffect } from 'react'
import { Audio } from 'expo-av'
import { Vibration, Platform } from 'react-native'
import type { TimerConfig, TimerPhase, WorkoutStats } from '../lib/types'

const BEEP_URI = 'https://assets.mixkit.co/active_storage/sfx/2869-magical-chime.mp3'

// Bundled opening bell (round start) – e.g. boxing style
// eslint-disable-next-line @typescript-eslint/no-require-imports
const OPENING_BELL_ASSET = require('../../assets/sounds/opening-bell.mp3')

let cachedChime: Awaited<ReturnType<typeof Audio.Sound.createAsync>>['sound'] | null = null
let cachedBell: Awaited<ReturnType<typeof Audio.Sound.createAsync>>['sound'] | null = null

async function ensureChimeLoaded() {
  if (cachedChime) return cachedChime
  try {
    const { sound } = await Audio.Sound.createAsync({ uri: BEEP_URI })
    cachedChime = sound
    sound.setOnPlaybackStatusUpdate((s) => {
      if (s.isLoaded && s.didJustFinish) sound.setPositionAsync(0)
    })
    return sound
  } catch {
    return null
  }
}

async function ensureBellLoaded() {
  if (cachedBell) return cachedBell
  try {
    const { sound } = await Audio.Sound.createAsync(OPENING_BELL_ASSET)
    cachedBell = sound
    sound.setOnPlaybackStatusUpdate((s) => {
      if (s.isLoaded && s.didJustFinish) sound.setPositionAsync(0)
    })
    return sound
  } catch {
    return null
  }
}

async function playBeep() {
  try {
    const sound = await ensureChimeLoaded()
    if (sound) {
      await sound.setPositionAsync(0)
      await sound.playAsync()
    }
  } catch {
    // ignore
  }
}

async function playOpeningBell() {
  try {
    const sound = await ensureBellLoaded()
    if (sound) {
      await sound.setPositionAsync(0)
      await sound.playAsync()
    }
  } catch {
    // ignore
  }
}

async function playDoubleBeep() {
  await playBeep()
  setTimeout(playBeep, 200)
}

async function playTripleBeep() {
  await playBeep()
  setTimeout(playBeep, 200)
  setTimeout(playBeep, 400)
}

function vibrate(pattern: number | number[]) {
  if (Platform.OS === 'ios') {
    if (typeof pattern === 'number') Vibration.vibrate(pattern)
    else Vibration.vibrate(pattern)
  } else {
    try {
      if (typeof pattern === 'number') Vibration.vibrate(pattern)
      else Vibration.vibrate(pattern)
    } catch {}
  }
}

export function useTimer(config: TimerConfig) {
  const [currentRound, setCurrentRound] = useState(1)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [phase, setPhase] = useState<TimerPhase>('countdown')
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [totalElapsed, setTotalElapsed] = useState(0)

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const phaseRef = useRef<TimerPhase>('countdown')
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
      if (currentPhase === 'countdown') return
      if (config.soundEnabled) {
        if (time === 30 && config.warn30s) playDoubleBeep()
        if (time === 10 && config.warn10s) playDoubleBeep()
        if (time <= 10 && time > 0 && config.countdownBeeps) playBeep()
        if (time === 0) {
          if (currentPhase === 'rest') {
            playOpeningBell()
          } else {
            playTripleBeep()
          }
        }
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
      if (phaseRef.current === 'countdown') {
        phaseRef.current = 'work'
        timeRef.current = config.roundTime
        setPhase('work')
        setTimeRemaining(config.roundTime)
        if (config.soundEnabled) playOpeningBell()
        if (config.vibrationEnabled) vibrate(50)
      } else if (phaseRef.current === 'work') {
        if (!config.perpetualRounds && roundRef.current >= config.rounds) {
          clearTimer()
          setIsComplete(true)
          setIsRunning(false)
          return
        }
        phaseRef.current = 'rest'
        timeRef.current = config.restTime
        setPhase('rest')
        setTimeRemaining(config.restTime)
        if (config.vibrationEnabled) vibrate(50)
      } else if (phaseRef.current === 'rest') {
        const nextRound = roundRef.current + 1
        roundRef.current = nextRound
        setCurrentRound(nextRound)
        phaseRef.current = 'work'
        timeRef.current = config.roundTime
        setPhase('work')
        setTimeRemaining(config.roundTime)
        if (config.vibrationEnabled) vibrate(50)
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
    phaseRef.current = 'countdown'
    timeRef.current = 10
    setPhase('countdown')
    setTimeRemaining(10)
    setIsRunning(true)
    if (config.soundEnabled) {
      ensureChimeLoaded()
      ensureBellLoaded()
    }
    intervalRef.current = setInterval(tick, 1000)
  }, [clearTimer, tick, config.soundEnabled])

  const skipCountdown = useCallback(() => {
    if (phaseRef.current !== 'countdown') return
    phaseRef.current = 'work'
    timeRef.current = config.roundTime
    setPhase('work')
    setTimeRemaining(config.roundTime)
    if (config.soundEnabled) playOpeningBell()
    if (config.vibrationEnabled) vibrate([200, 100, 200])
  }, [config])

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
    phaseRef.current = 'countdown'
    setPhase('countdown')
  }, [clearTimer])

  const getStats = useCallback((): WorkoutStats => {
    const actualRounds = config.perpetualRounds ? roundRef.current : config.rounds
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

  const phaseTotal =
    phase === 'countdown' ? 10 : phase === 'work' ? config.roundTime : config.restTime

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
    skipCountdown,
    pause,
    resume,
    stop,
    getStats,
    phaseTotal,
  }
}
