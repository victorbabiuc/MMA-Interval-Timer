import { TimerConfig } from './types'

export const DEFAULT_PRESETS: TimerConfig[] = [
  { id: 'boxing', name: 'Boxing', icon: '🥊', rounds: 3, roundTime: 180, restTime: 60, perpetualRounds: false, warn30s: true, warn10s: true, countdownBeeps: true, soundEnabled: true, vibrationEnabled: true },
  { id: 'jiujitsu', name: 'Jiu-Jitsu', icon: '🥋', rounds: 5, roundTime: 300, restTime: 60, perpetualRounds: false, warn30s: true, warn10s: true, countdownBeeps: true, soundEnabled: true, vibrationEnabled: true },
  { id: 'kickboxing', name: 'Kickboxing', icon: '🦵', rounds: 5, roundTime: 180, restTime: 60, perpetualRounds: false, warn30s: true, warn10s: true, countdownBeeps: true, soundEnabled: true, vibrationEnabled: true },
  { id: 'mma', name: 'MMA', icon: '🤼', rounds: 3, roundTime: 300, restTime: 60, perpetualRounds: false, warn30s: true, warn10s: true, countdownBeeps: true, soundEnabled: true, vibrationEnabled: true },
  { id: 'hiit', name: 'HIIT', icon: '⚡', rounds: 8, roundTime: 30, restTime: 15, perpetualRounds: false, warn30s: false, warn10s: true, countdownBeeps: true, soundEnabled: true, vibrationEnabled: true },
]

export const DEFAULT_CUSTOM: TimerConfig = {
  id: 'custom',
  name: 'Custom Timer',
  icon: '⚙️',
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

const jiujitsu = DEFAULT_PRESETS.find((p) => p.id === 'jiujitsu')!
const rest = DEFAULT_PRESETS.filter((p) => p.id !== 'jiujitsu')
export const ORDERED_PRESETS: TimerConfig[] = [jiujitsu, ...rest]

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}
