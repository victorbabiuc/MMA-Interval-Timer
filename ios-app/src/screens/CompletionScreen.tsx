import React, { useEffect, useState, useRef } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import type { WorkoutStats } from '../lib/types'
import type { Theme } from '../lib/theme'
import { formatTime } from '../lib/presets'

const AUTO_GO_HOME_SECONDS = 5

type Props = {
  theme: Theme
  stats: WorkoutStats
  onRestart: () => void
  onHome: () => void
}

export function CompletionScreen({ theme, stats, onRestart, onHome }: Props) {
  const [countdown, setCountdown] = useState(AUTO_GO_HOME_SECONDS)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      onHome()
    }, AUTO_GO_HOME_SECONDS * 1000)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [onHome])

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCountdown((c) => (c > 1 ? c - 1 : 1))
    }, 1000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const clearAutoRedirect = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const handleRestart = () => {
    clearAutoRedirect()
    onRestart()
  }

  const handleHome = () => {
    clearAutoRedirect()
    onHome()
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['top', 'bottom']}>
      <View style={styles.checkWrap}>
        <Text style={styles.checkText}>✓</Text>
      </View>
      <Text style={[styles.title, { color: theme.textPrimary }]}>Workout Complete!</Text>
      <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Great job pushing through!</Text>

      <View style={[styles.card, { backgroundColor: theme.cardBg, borderColor: theme.cardBorder }]}>
        <View style={styles.grid}>
          <View style={styles.stat}>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Rounds</Text>
            <Text style={[styles.statValue, { color: theme.textPrimary }]}>{stats.totalRounds}</Text>
          </View>
          <View style={styles.stat}>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Round Time</Text>
            <Text style={[styles.statValue, { color: theme.textPrimary }]}>{formatTime(stats.roundTime)}</Text>
          </View>
          <View style={styles.stat}>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Total Time</Text>
            <Text style={[styles.statValue, styles.statHighlight]}>
              {formatTime(stats.totalTime)}
            </Text>
          </View>
          <View style={styles.stat}>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Work / Rest</Text>
            <Text style={[styles.statValue, { color: theme.textPrimary }]}>
              {formatTime(stats.workTime)} / {formatTime(stats.restTotalTime)}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.restartBtn}
        onPress={handleRestart}
        accessibilityLabel="Restart timer"
        accessibilityRole="button"
      >
        <Text style={styles.restartBtnText}>↺ Restart Timer</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.homeBtn}
        onPress={handleHome}
        accessibilityLabel="Back to home"
        accessibilityRole="button"
      >
        <Text style={[styles.homeBtnText, { color: theme.textSecondary }]}>⌂ Back to Home</Text>
      </TouchableOpacity>
      <Text style={[styles.countdown, { color: theme.textSecondary }]}>
        Returning home in {countdown}…
      </Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    alignItems: 'center',
  },
  checkWrap: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(16,185,129,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkText: { fontSize: 48, color: '#34d399' },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#f1f5f9',
    marginBottom: 8,
  },
  subtitle: { fontSize: 16, color: '#94a3b8', marginBottom: 32 },
  card: {
    width: '100%',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(71,85,105,0.5)',
    backgroundColor: 'rgba(30,41,59,0.5)',
    padding: 24,
    marginBottom: 32,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -12,
  },
  stat: {
    width: '50%',
    paddingHorizontal: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    letterSpacing: 0.5,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#f1f5f9',
    marginTop: 4,
    fontVariant: ['tabular-nums'],
  },
  statHighlight: { color: '#34d399' },
  restartBtn: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 12,
    backgroundColor: '#10b981',
    alignItems: 'center',
    marginBottom: 12,
  },
  restartBtnText: { fontSize: 18, fontWeight: '700', color: '#fff' },
  homeBtn: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#64748b',
    backgroundColor: 'rgba(100,116,139,0.15)',
    alignItems: 'center',
    marginBottom: 12,
  },
  homeBtnText: { fontSize: 18, fontWeight: '700', color: '#94a3b8' },
  countdown: { fontSize: 14, marginTop: 16 },
})
