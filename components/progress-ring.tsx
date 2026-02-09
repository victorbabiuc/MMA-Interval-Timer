"use client"

interface ProgressRingProps {
  progress: number // 0-1
  size?: number
  strokeWidth?: number
  color?: string
  trackColor?: string
}

export function ProgressRing({
  progress,
  size = 240,
  strokeWidth = 6,
  color = "rgba(255,255,255,0.9)",
  trackColor = "rgba(255,255,255,0.1)",
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - progress * circumference

  return (
    <svg
      width={size}
      height={size}
      className="mx-auto"
      aria-hidden="true"
    >
      {/* Track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={trackColor}
        strokeWidth={strokeWidth}
      />
      {/* Progress */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="progress-ring-circle"
      />
    </svg>
  )
}
