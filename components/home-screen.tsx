"use client"

import { TimerConfig, SavedPreset } from "@/lib/types"
import { DEFAULT_CUSTOM, ORDERED_PRESETS } from "@/lib/presets"
import { PresetCard } from "./preset-card"
import { SavedTimerItem } from "./saved-timer-item"
import { Timer } from "lucide-react"

interface HomeScreenProps {
  savedPresets: SavedPreset[]
  onSelectPreset: (preset: TimerConfig) => void
  onDeleteSavedPreset: (id: string) => void
}

export function HomeScreen({
  savedPresets,
  onSelectPreset,
  onDeleteSavedPreset,
}: HomeScreenProps) {
  return (
    <div className="animate-fade-in flex h-dvh flex-col px-4 pb-6 pt-8 md:px-6">
      {/* Header */}
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-black tracking-tight text-slate-100 md:text-4xl">
          INTERVAL TIMER
        </h1>
        <p className="mt-1.5 text-sm text-slate-400">
          Choose your sport or create custom
        </p>
      </header>

      {/* Horizontal scrolling presets */}
      <section aria-label="Sport presets" className="shrink-0">
        <div
          className="scrollbar-hide -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 md:-mx-6 md:px-6"
          role="list"
        >
          <div role="listitem">
            <PresetCard
              preset={DEFAULT_CUSTOM}
              onSelect={onSelectPreset}
              isCustom
            />
          </div>
          {ORDERED_PRESETS.map((preset) => (
            <div key={preset.id} role="listitem">
              <PresetCard preset={preset} onSelect={onSelectPreset} />
            </div>
          ))}
        </div>
      </section>

      {/* Saved Timers - always visible, scrollable */}
      <section
        className="mt-6 flex min-h-0 flex-1 flex-col"
        aria-label="Saved timers"
      >
        <div className="mb-3 flex items-center gap-2">
          <Timer className="h-4 w-4 text-slate-500" />
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            My Saved Timers
            {savedPresets.length > 0 && (
              <span className="ml-1.5 text-slate-500">
                ({savedPresets.length})
              </span>
            )}
          </h2>
        </div>

        {savedPresets.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700/50 bg-slate-800/20">
            <p className="text-sm text-slate-500">
              No saved timers yet
            </p>
            <p className="mt-1 text-xs text-slate-600">
              Configure a timer and save it for quick access
            </p>
          </div>
        ) : (
          <div className="scrollbar-hide flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto rounded-2xl">
            {savedPresets.map((preset) => (
              <SavedTimerItem
                key={preset.id}
                preset={preset}
                onSelect={onSelectPreset}
                onDelete={onDeleteSavedPreset}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
