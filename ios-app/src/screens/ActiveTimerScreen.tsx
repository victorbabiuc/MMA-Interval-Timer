import React, { useEffect, useCallback, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake'
import type { TimerConfig } from '../lib/types'
import { formatTime } from '../lib/presets'
import { useTimer } from '../hooks/useTimer'
import { ProgressRing } from '../components/ProgressRing'

type Props = {
  config: TimerConfig
  onComplete: (stats: ReturnType<ReturnType<typeof useTimer>['getStats']>) => void
  onStop: (stats: ReturnType<ReturnType<typeof useTimer>['getStats']>) => void
}

const phaseColors: Record<string, string> = {
  countdown: '#0ea5e9',
  work: '#10b981',
  rest: '#3b82f6',
}

export function ActiveTimerScreen({ config, onComplete, onStop }: Props) {
  const timer = useTimer(config)

  useEffect(() => {
    timer.start()
  }, [])

  useEffect(() => {
    activateKeepAwakeAsync()
    return () => {
      deactivateKeepAwake()
    }
  }, [])

  useEffect(() => {
    if (timer.isComplete) {
      onComplete(timer.getStats())
    }
  }, [timer.isComplete])

  const handleEnd = useCallback(() => {
    const stats = timer.getStats()
    timer.stop()
    onStop(stats)
  }, [timer, onStop])

  // One full revolution per minute: fills over 60s, resets, repeat. Consistent speed.
  const phaseElapsed = Math.max(0, timer.phaseTotal - timer.timeRemaining)
  const progress = (phaseElapsed % 60) / 60

  const roundLabel = config.perpetualRounds
    ? `Round ${timer.currentRound}`
    : `Round ${timer.currentRound} of ${config.rounds}`

  const bgColor = phaseColors[timer.phase] || '#0ea5e9'

  const [dimensions, setDimensions] = useState(() => {
    const { width, height } = Dimensions.get('window')
    const size = Math.min(width, height) * 0.9
    return { ringSize: Math.round(size), timeFontSize: Math.round(size * 0.38) }
  })

  useEffect(() => {
    const sub = Dimensions.addEventListener('change', () => {
      const { width, height } = Dimensions.get('window')
      const size = Math.min(width, height) * 0.9
      setDimensions({
        ringSize: Math.round(size),
        timeFontSize: Math.round(size * 0.38),
      })
    })
    return () => sub?.remove()
  }, [])

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]} edges={['top', 'bottom']}>
      <View style={styles.center}>
        <ProgressRing progress={progress} size={dimensions.ringSize} />
        <View style={styles.timeWrap}>
          <Text style={[styles.timeText, { fontSize: dimensions.timeFontSize }]}>
            {formatTime(timer.timeRemaining)}
          </Text>
        </View>
      </View>

      <Text style={styles.roundLabel}>{roundLabel}</Text>

      {timer.phase === 'countdown' && (
        <TouchableOpacity
          style={styles.skipBtn}
          onPress={() => timer.skipCountdown()}
          accessibilityLabel="Skip countdown"
          accessibilityRole="button"
        >
          <Text style={styles.skipBtnText}>Skip</Text>
        </TouchableOpacity>
      )}

      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={styles.bottomBtn}
          onPress={handleEnd}
          accessibilityLabel="End workout"
          accessibilityRole="button"
          accessibilityHint="Double-tap to leave and see summary"
        >
          <Text style={styles.bottomBtnText}>✕ End</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomBtn}
          onPress={() => (timer.isPaused ? timer.resume() : timer.pause())}
          accessibilityLabel={timer.isPaused ? 'Resume timer' : 'Pause timer'}
          accessibilityRole="button"
          accessibilityHint={timer.isPaused ? 'Double-tap to resume' : 'Double-tap to pause'}
        >
          <Text style={styles.bottomBtnText}>{timer.isPaused ? '▶ Resume' : '❚❚ Pause'}</Text>
        </TouchableOpacity>
      </View>

      {timer.isPaused && (
        <View style={styles.pauseOverlay}>
          <View style={styles.pauseBox}>
            <Text style={styles.pauseTitle}>Paused</Text>
            <TouchableOpacity
              style={styles.resumeBtn}
              onPress={() => timer.resume()}
            >
              <Text style={styles.resumeBtnText}>Resume</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeWrap: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    fontWeight: '900',
    color: '#fff',
    fontVariant: ['tabular-nums'],
  },
  roundLabel: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 1,
    marginBottom: 12,
    textAlign: 'center',
    alignSelf: 'center',
  },
  skipBtn: {
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginBottom: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  skipBtnText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  bottomBtn: {
    paddingVertical: 18,
    paddingHorizontal: 36,
    borderRadius: 36,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  bottomBtnText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
  },
  pauseOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pauseBox: {
    backgroundColor: 'rgba(30,41,59,0.95)',
    borderRadius: 28,
    padding: 48,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(71,85,105,0.5)',
    minWidth: 280,
  },
  pauseTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: '#f1f5f9',
    letterSpacing: 2,
    marginBottom: 32,
  },
  resumeBtn: {
    backgroundColor: '#10b981',
    paddingVertical: 20,
    paddingHorizontal: 48,
    borderRadius: 16,
    width: '100%',
    alignItems: 'center',
  },
  resumeBtnText: { fontSize: 24, fontWeight: '700', color: '#fff' },
})
