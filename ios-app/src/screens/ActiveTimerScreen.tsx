import React, { useEffect, useCallback } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
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
    Alert.alert(
      'End workout?',
      'Your progress will be lost.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'End',
          style: 'destructive',
          onPress: () => {
            const stats = timer.getStats()
            timer.stop()
            onStop(stats)
          },
        },
      ]
    )
  }, [timer, onStop])

  const progress =
    timer.phaseTotal > 0 ? timer.timeRemaining / timer.phaseTotal : 0

  const roundLabel = config.perpetualRounds
    ? `Round ${timer.currentRound}`
    : `Round ${timer.currentRound} of ${config.rounds}`

  const bgColor = phaseColors[timer.phase] || '#0ea5e9'

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]} edges={['top', 'bottom']}>
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={handleEnd}
          accessibilityLabel="End workout"
          accessibilityRole="button"
        >
          <Text style={styles.iconBtnText}>✕</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.center}>
        <ProgressRing progress={progress} />
        <View style={styles.timeWrap}>
          <Text style={styles.timeText}>{formatTime(timer.timeRemaining)}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.pauseBtnWrap}
        onPress={() => (timer.isPaused ? timer.resume() : timer.pause())}
        accessibilityLabel={timer.isPaused ? 'Resume timer' : 'Pause timer'}
        accessibilityRole="button"
      >
        <Text style={styles.pauseBtnText}>{timer.isPaused ? '▶ Resume' : '❚❚ Pause'}</Text>
      </TouchableOpacity>
      <Text style={styles.roundLabel}>{roundLabel}</Text>

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
  container: { flex: 1, paddingTop: 8 },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  iconBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBtnText: { fontSize: 24, color: '#fff' },
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
    fontSize: 72,
    fontWeight: '900',
    color: '#fff',
    fontVariant: ['tabular-nums'],
  },
  pauseBtnWrap: {
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 8,
    borderRadius: 28,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  pauseBtnText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  roundLabel: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 1,
    marginBottom: 40,
    textAlign: 'center',
    alignSelf: 'center',
  },
  pauseOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pauseBox: {
    backgroundColor: 'rgba(30,41,59,0.95)',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(71,85,105,0.5)',
  },
  pauseTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#f1f5f9',
    letterSpacing: 2,
    marginBottom: 24,
  },
  resumeBtn: {
    backgroundColor: '#10b981',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  resumeBtnText: { fontSize: 18, fontWeight: '700', color: '#fff' },
})
