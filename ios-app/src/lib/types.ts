export interface TimerConfig {
  id: string
  name: string
  icon: string
  rounds: number
  roundTime: number
  restTime: number
  perpetualRounds: boolean
  warn30s: boolean
  warn10s: boolean
  countdownBeeps: boolean
  soundEnabled: boolean
  vibrationEnabled: boolean
}

export interface SavedPreset extends TimerConfig {
  savedAt: number
}

export type AppScreen = 'home' | 'config' | 'timer' | 'complete'

export type TimerPhase = 'countdown' | 'work' | 'rest'

export interface WorkoutStats {
  totalRounds: number
  roundTime: number
  restTime: number
  totalTime: number
  workTime: number
  restTotalTime: number
}
