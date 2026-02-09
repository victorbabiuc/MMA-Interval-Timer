"use client"

import React from "react"

interface ToggleSwitchProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  icon?: React.ReactNode
}

export function ToggleSwitch({
  label,
  checked,
  onChange,
  icon,
}: ToggleSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="interactive flex w-full items-center justify-between py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg px-1"
    >
      <span className="flex items-center gap-3">
        {icon && <span className="text-slate-400">{icon}</span>}
        <span className="text-sm font-medium text-slate-200">{label}</span>
      </span>
      <span
        className={`interactive relative inline-flex h-7 w-12 shrink-0 items-center rounded-full ${
          checked ? "bg-emerald-500" : "bg-slate-600"
        }`}
      >
        <span
          className={`interactive inline-block h-5 w-5 rounded-full bg-white shadow-md ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </span>
    </button>
  )
}
