import { TimerConfig } from "./types"

export const DEFAULT_PRESETS: TimerConfig[] = [
  {
    id: "boxing",
    name: "Boxing",
    icon: "\u{1F94A}",
    rounds: 3,
    roundTime: 180,
    restTime: 60,
    perpetualRounds: false,
    warn30s: true,
    warn10s: true,
    countdownBeeps: true,
    soundEnabled: true,
    vibrationEnabled: true,
  },
  {
    id: "jiujitsu",
    name: "Jiu-Jitsu",
    icon: "\u{1F94B}",
    rounds: 5,
    roundTime: 300,
    restTime: 60,
    perpetualRounds: false,
    warn30s: true,
    warn10s: true,
    countdownBeeps: true,
    soundEnabled: true,
    vibrationEnabled: true,
  },
  {
    id: "kickboxing",
    name: "Kickboxing",
    icon: "\u{1F9B5}",
    rounds: 5,
    roundTime: 180,
    restTime: 60,
    perpetualRounds: false,
    warn30s: true,
    warn10s: true,
    countdownBeeps: true,
    soundEnabled: true,
    vibrationEnabled: true,
  },
  {
    id: "mma",
    name: "MMA",
    icon: "\u{1F93C}",
    rounds: 3,
    roundTime: 300,
    restTime: 60,
    perpetualRounds: false,
    warn30s: true,
    warn10s: true,
    countdownBeeps: true,
    soundEnabled: true,
    vibrationEnabled: true,
  },
  {
    id: "hiit",
    name: "HIIT",
    icon: "\u26A1",
    rounds: 8,
    roundTime: 30,
    restTime: 15,
    perpetualRounds: false,
    warn30s: false,
    warn10s: true,
    countdownBeeps: true,
    soundEnabled: true,
    vibrationEnabled: true,
  },
]

export const DEFAULT_CUSTOM: TimerConfig = {
  id: "custom",
  name: "Custom Timer",
  icon: "\u2699\uFE0F",
  rounds: 3,
  roundTime: 180,
  restTime: 60,
  perpetualRounds: false,
  warn30s: true,
  warn10s: true,
  countdownBeeps: true,
  soundEnabled: true,
  vibrationEnabled: true,
}

// Jiu-Jitsu first, then the rest in order
const jiujitsu = DEFAULT_PRESETS.find((p) => p.id === "jiujitsu")!
const rest = DEFAULT_PRESETS.filter((p) => p.id !== "jiujitsu")
export const ORDERED_PRESETS: TimerConfig[] = [jiujitsu, ...rest]

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, "0")}`
}

export function formatTimeShort(seconds: number): string {
  if (seconds < 60) return `0:${seconds.toString().padStart(2, "0")}`
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return s === 0 ? `${m}:00` : `${m}:${s.toString().padStart(2, "0")}`
}
