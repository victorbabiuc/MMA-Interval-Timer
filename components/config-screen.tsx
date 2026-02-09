"use client"

import { TimerConfig } from "@/lib/types"
import { formatTime } from "@/lib/presets"
import { IncrementControl } from "./increment-control"
import { ToggleSwitch } from "./toggle-switch"
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  Clock,
  Infinity,
  Smartphone,
  Volume2,
  Save,
} from "lucide-react"
import { useState } from "react"

interface ConfigScreenProps {
  config: TimerConfig
  onUpdateConfig: (config: TimerConfig) => void
  onStart: () => void
  onBack: () => void
  onSave: (name: string) => void
}

export function ConfigScreen({
  config,
  onUpdateConfig,
  onStart,
  onBack,
  onSave,
}: ConfigScreenProps) {
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [saveName, setSaveName] = useState(config.name)

  const update = (partial: Partial<TimerConfig>) => {
    onUpdateConfig({ ...config, ...partial })
  }

  return (
    <div className="animate-fade-in mx-auto min-h-screen max-w-2xl px-4 pb-12 pt-4 md:px-6">
      {/* Header */}
      <header className="mb-6 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="interactive flex h-11 w-11 items-center justify-center rounded-xl text-slate-300 hover:bg-slate-800 hover:text-slate-100 active:scale-95 focus-visible:ring-2 focus-visible:ring-cyan-400"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h2 className="text-lg font-bold text-slate-100">Configure Timer</h2>
        <button
          type="button"
          onClick={() => setShowSaveModal(true)}
          className="interactive flex h-11 w-11 items-center justify-center rounded-xl text-slate-300 hover:bg-slate-800 hover:text-cyan-400 active:scale-95 focus-visible:ring-2 focus-visible:ring-cyan-400"
          aria-label="Save timer preset"
        >
          <Save className="h-5 w-5" />
        </button>
      </header>

      {/* Preset Name */}
      <div className="mb-6 text-center">
        <span className="text-3xl" role="img" aria-hidden="true">
          {config.icon}
        </span>
        <h3 className="mt-2 text-xl font-bold text-slate-100">
          {config.name}
        </h3>
      </div>

      {/* Settings */}
      <div className="flex flex-col gap-4">
        {/* Rounds - only show when not perpetual */}
        {!config.perpetualRounds && (
          <IncrementControl
            label="Rounds"
            value={String(config.rounds)}
            onIncrement={() =>
              update({ rounds: Math.min(config.rounds + 1, 99) })
            }
            onDecrement={() =>
              update({ rounds: Math.max(config.rounds - 1, 1) })
            }
            incrementLabel="Add round"
            decrementLabel="Remove round"
          />
        )}

        {/* Round Time */}
        <IncrementControl
          label="Round Time"
          value={formatTime(config.roundTime)}
          onIncrement={() =>
            update({ roundTime: Math.min(config.roundTime + 30, 3600) })
          }
          onDecrement={() =>
            update({ roundTime: Math.max(config.roundTime - 30, 10) })
          }
          incrementLabel="Add 30 seconds to round"
          decrementLabel="Remove 30 seconds from round"
        />

        {/* Rest */}
        <IncrementControl
          label="Rest"
          value={formatTime(config.restTime)}
          onIncrement={() =>
            update({ restTime: Math.min(config.restTime + 15, 600) })
          }
          onDecrement={() =>
            update({ restTime: Math.max(config.restTime - 15, 5) })
          }
          incrementLabel="Add 15 seconds to rest"
          decrementLabel="Remove 15 seconds from rest"
          accentColor="blue"
        />

        {/* Perpetual Rounds Toggle */}
        <div className="rounded-2xl border border-slate-700/60 bg-slate-800/50 p-6 backdrop-blur-sm">
          <ToggleSwitch
            label="Perpetual rounds"
            checked={config.perpetualRounds}
            onChange={(v) => update({ perpetualRounds: v })}
            icon={<Infinity className="h-4 w-4" />}
          />
          <p className="mt-2 pl-8 text-xs text-slate-500">
            Rounds repeat indefinitely until you end the workout manually
          </p>
        </div>

        {/* Alerts & Sound */}
        <div className="rounded-2xl border border-slate-700/60 bg-slate-800/50 p-6 backdrop-blur-sm">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Alerts & Sound
          </p>
          <div className="flex flex-col divide-y divide-slate-700/30">
            <ToggleSwitch
              label="30 second warning"
              checked={config.warn30s}
              onChange={(v) => update({ warn30s: v })}
              icon={<Clock className="h-4 w-4" />}
            />
            <ToggleSwitch
              label="10 second warning"
              checked={config.warn10s}
              onChange={(v) => update({ warn10s: v })}
              icon={<Bell className="h-4 w-4" />}
            />
            <ToggleSwitch
              label="Countdown beeps (final 10s)"
              checked={config.countdownBeeps}
              onChange={(v) => update({ countdownBeeps: v })}
              icon={<Bell className="h-4 w-4" />}
            />
            <ToggleSwitch
              label="Enable sound"
              checked={config.soundEnabled}
              onChange={(v) => update({ soundEnabled: v })}
              icon={<Volume2 className="h-4 w-4" />}
            />
            <ToggleSwitch
              label="Vibration"
              checked={config.vibrationEnabled}
              onChange={(v) => update({ vibrationEnabled: v })}
              icon={<Smartphone className="h-4 w-4" />}
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-col gap-3">
        <button
          type="button"
          onClick={() => setShowSaveModal(true)}
          className="interactive rounded-xl border border-slate-600 px-6 py-3 text-sm font-semibold text-slate-300 hover:border-cyan-500/50 hover:text-cyan-400 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-cyan-400"
        >
          Save as Preset
        </button>
        <button
          type="button"
          onClick={onStart}
          className="interactive gradient-work flex h-14 items-center justify-center gap-2 rounded-xl text-lg font-bold text-white shadow-lg shadow-emerald-500/20 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
        >
          START WORKOUT
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
          <div
            className="mx-4 w-full max-w-sm rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-2xl animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-label="Save preset"
          >
            <h4 className="mb-4 text-lg font-bold text-slate-100">
              Save Preset
            </h4>
            <label className="block">
              <span className="text-sm text-slate-400">Preset Name</span>
              <input
                type="text"
                value={saveName}
                onChange={(e) => setSaveName(e.target.value)}
                className="interactive mt-2 w-full rounded-xl border border-slate-600 bg-slate-700/50 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                placeholder="My Custom Timer"
                autoFocus
                maxLength={30}
              />
            </label>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setShowSaveModal(false)}
                className="interactive flex-1 rounded-xl border border-slate-600 py-3 text-sm font-semibold text-slate-300 hover:bg-slate-700 active:scale-95"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  onSave(saveName || config.name)
                  setShowSaveModal(false)
                }}
                className="interactive flex-1 rounded-xl bg-cyan-500 py-3 text-sm font-bold text-slate-900 hover:bg-cyan-400 active:scale-95"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
