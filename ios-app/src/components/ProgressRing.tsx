import React from 'react'
import { View, StyleSheet } from 'react-native'

const STROKE_RATIO = 6 / 320
const ACCENT = 'rgba(255,255,255,0.9)'

type Props = { progress: number; size: number }

export function ProgressRing({ progress, size }: Props) {
  const p = Math.max(0, Math.min(1, progress))
  const rot1 = -90 + Math.min(p * 360, 180)
  const rot2 = p > 0.5 ? 90 + (p - 0.5) * 360 : 0
  const stroke = Math.max(4, Math.round(size * STROKE_RATIO))
  const box = { width: size, height: size, borderRadius: size / 2 }

  return (
    <View style={[styles.ring, box, { borderWidth: stroke }]}>
      <View style={[styles.track, box, { borderWidth: stroke }]} />
      <View
        style={[
          styles.fillRight,
          box,
          { borderWidth: stroke, transform: [{ rotate: `${rot1}deg` }] },
        ]}
        pointerEvents="none"
      />
      {p > 0.5 && (
        <View
          style={[
            styles.fillLeft,
            box,
            { borderWidth: stroke, transform: [{ rotate: `${rot2}deg` }] },
          ]}
          pointerEvents="none"
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  ring: {
    borderColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  track: {
    position: 'absolute',
    borderColor: 'transparent',
  },
  fillRight: {
    position: 'absolute',
    borderTopColor: 'transparent',
    borderRightColor: ACCENT,
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  fillLeft: {
    position: 'absolute',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: ACCENT,
  },
})
