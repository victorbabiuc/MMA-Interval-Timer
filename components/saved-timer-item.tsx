"use client"

import { SavedPreset } from "@/lib/types"
import { formatTimeShort } from "@/lib/presets"
import { Pencil, Trash2 } from "lucide-react"

interface SavedTimerItemProps {
  preset: SavedPreset
  onSelect: (preset: SavedPreset) => void
  onDelete: (id: string) => void
}

export function SavedTimerItem({
  preset,
  onSelect,
  onDelete,
}: SavedTimerItemProps) {
  return (
    <div className="interactive flex items-center rounded-lg border border-slate-700/50 bg-slate-800/30 p-4 backdrop-blur-sm">
      <button
        type="button"
        onClick={() => onSelect(preset)}
        className="flex flex-1 items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
        aria-label={`Select ${preset.name}`}
      >
        <span className="text-2xl" role="img" aria-hidden="true">
          {preset.icon}
        </span>
        <div className="flex-1">
          <p className="font-semibold text-slate-100">{preset.name}</p>
          <p className="text-sm text-slate-400">
            {preset.perpetualRounds ? (
              <>
                <span className="text-cyan-400/80">Perpetual</span>{" "}
                {"×"} {formatTimeShort(preset.roundTime)},{" "}
                {formatTimeShort(preset.restTime)} rest
              </>
            ) : (
              <>
                {preset.rounds} rounds {"×"} {formatTimeShort(preset.roundTime)},{" "}
                {formatTimeShort(preset.restTime)} rest
              </>
            )}
          </p>
        </div>
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onDelete(preset.id)
        }}
        className="interactive ml-2 rounded-lg p-2 text-slate-500 hover:bg-red-500/10 hover:text-red-400 focus-visible:ring-2 focus-visible:ring-red-400"
        aria-label={`Delete ${preset.name}`}
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  )
}
