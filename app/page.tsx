"use client"

import { useState, useCallback, useEffect } from "react"
import { TimerConfig, SavedPreset, AppScreen, WorkoutStats } from "@/lib/types"
import { HomeScreen } from "@/components/home-screen"
import { ConfigScreen } from "@/components/config-screen"
import { ActiveTimer } from "@/components/active-timer"
import { CompletionScreen } from "@/components/completion-screen"

const SAVED_PRESETS_KEY = "interval-timer-saved-presets"

function loadSavedPresets(): SavedPreset[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(SAVED_PRESETS_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // ignore
  }
  return []
}

function saveSavedPresets(presets: SavedPreset[]) {
  try {
    localStorage.setItem(SAVED_PRESETS_KEY, JSON.stringify(presets))
  } catch {
    // ignore
  }
}

export default function Page() {
  const [screen, setScreen] = useState<AppScreen>("home")
  const [config, setConfig] = useState<TimerConfig | null>(null)
  const [completionStats, setCompletionStats] = useState<WorkoutStats | null>(
    null
  )
  const [savedPresets, setSavedPresets] = useState<SavedPreset[]>([])

  // Load saved presets on mount
  useEffect(() => {
    setSavedPresets(loadSavedPresets())
  }, [])

  const handleSelectPreset = useCallback((preset: TimerConfig) => {
    setConfig({ ...preset })
    setScreen("config")
  }, [])

  const handleBack = useCallback(() => {
    setScreen("home")
    setConfig(null)
  }, [])

  const handleStart = useCallback(() => {
    setScreen("timer")
  }, [])

  const handleComplete = useCallback((stats: WorkoutStats) => {
    setCompletionStats(stats)
    setScreen("complete")
  }, [])

  const handleStop = useCallback((stats: WorkoutStats) => {
    if (stats.totalRounds > 0) {
      setCompletionStats(stats)
      setScreen("complete")
    } else {
      setScreen("home")
    }
  }, [])

  const handleRestart = useCallback(() => {
    setScreen("timer")
  }, [])

  const handleHome = useCallback(() => {
    setScreen("home")
    setConfig(null)
    setCompletionStats(null)
  }, [])

  const handleSavePreset = useCallback(
    (name: string) => {
      if (!config) return
      const newPreset: SavedPreset = {
        ...config,
        id: `saved-${Date.now()}`,
        name,
        savedAt: Date.now(),
      }
      const updated = [...savedPresets, newPreset]
      setSavedPresets(updated)
      saveSavedPresets(updated)
    },
    [config, savedPresets]
  )

  const handleDeleteSavedPreset = useCallback(
    (id: string) => {
      const updated = savedPresets.filter((p) => p.id !== id)
      setSavedPresets(updated)
      saveSavedPresets(updated)
    },
    [savedPresets]
  )

  return (
    <main className="min-h-screen bg-slate-900">
      {screen === "home" && (
        <HomeScreen
          savedPresets={savedPresets}
          onSelectPreset={handleSelectPreset}
          onDeleteSavedPreset={handleDeleteSavedPreset}
        />
      )}

      {screen === "config" && config && (
        <ConfigScreen
          config={config}
          onUpdateConfig={setConfig}
          onStart={handleStart}
          onBack={handleBack}
          onSave={handleSavePreset}
        />
      )}

      {screen === "timer" && config && (
        <ActiveTimer
          config={config}
          onComplete={handleComplete}
          onStop={handleStop}
        />
      )}

      {screen === "complete" && completionStats && (
        <CompletionScreen
          stats={completionStats}
          onRestart={handleRestart}
          onHome={handleHome}
        />
      )}
    </main>
  )
}
