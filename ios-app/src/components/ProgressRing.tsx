import React from 'react'
import { View, StyleSheet } from 'react-native'

const SIZE = 260
const STROKE = 6
const ACCENT = 'rgba(255,255,255,0.9)'

export function ProgressRing({ progress }: { progress: number }) {
  const p = Math.max(0, Math.min(1, progress))
  const rot1 = -90 + Math.min(p * 360, 180)
  const rot2 = p > 0.5 ? 90 + (p - 0.5) * 360 : 0

  return (
    <View style={[styles.ring, { width: SIZE, height: SIZE, borderRadius: SIZE / 2 }]}>
      <View
        style={[
          styles.track,
          { width: SIZE, height: SIZE, borderRadius: SIZE / 2 },
        ]}
      />
      <View
        style={[
          styles.fillRight,
          {
            width: SIZE,
            height: SIZE,
            borderRadius: SIZE / 2,
            transform: [{ rotate: `${rot1}deg` }],
          },
        ]}
        pointerEvents="none"
      />
      {p > 0.5 && (
        <View
          style={[
            styles.fillLeft,
            {
              width: SIZE,
              height: SIZE,
              borderRadius: SIZE / 2,
              transform: [{ rotate: `${rot2}deg` }],
            },
          ]}
          pointerEvents="none"
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  ring: {
    borderWidth: STROKE,
    borderColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  track: {
    position: 'absolute',
    borderWidth: STROKE,
    borderColor: 'transparent',
  },
  fillRight: {
    position: 'absolute',
    borderWidth: STROKE,
    borderTopColor: 'transparent',
    borderRightColor: ACCENT,
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  fillLeft: {
    position: 'absolute',
    borderWidth: STROKE,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: ACCENT,
  },
})
