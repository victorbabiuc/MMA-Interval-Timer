import React, { useState, useCallback, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { View, StyleSheet, useColorScheme } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { getTheme } from './src/lib/theme'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { HomeScreen } from './src/screens/HomeScreen'
import { ConfigScreen } from './src/screens/ConfigScreen'
import { ActiveTimerScreen } from './src/screens/ActiveTimerScreen'
import { CompletionScreen } from './src/screens/CompletionScreen'
import type { TimerConfig, SavedPreset, AppScreen, WorkoutStats } from './src/lib/types'
import { Audio, InterruptionModeIOS } from 'expo-av'

const SAVED_PRESETS_KEY = 'interval-timer-saved-presets'

async function loadSavedPresets(): Promise<SavedPreset[]> {
  try {
    const raw = await AsyncStorage.getItem(SAVED_PRESETS_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return []
}

async function saveSavedPresets(presets: SavedPreset[]) {
  try {
    await AsyncStorage.setItem(SAVED_PRESETS_KEY, JSON.stringify(presets))
  } catch {}
}

export default function App() {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'
  const theme = getTheme(isDark)

  const [screen, setScreen] = useState<AppScreen>('home')
  const [config, setConfig] = useState<TimerConfig | null>(null)
  const [completionStats, setCompletionStats] = useState<WorkoutStats | null>(null)
  const [savedPresets, setSavedPresets] = useState<SavedPreset[]>([])

  useEffect(() => {
    loadSavedPresets().then(setSavedPresets)
  }, [])

  useEffect(() => {
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
      // MixWithOthers so timer sounds route to headphones / current output instead of only speaker
      interruptionModeIOS: InterruptionModeIOS.MixWithOthers,
    }).catch(() => {})
  }, [])

  const handleSelectPreset = useCallback((preset: TimerConfig) => {
    setConfig({ ...preset })
    setScreen('config')
  }, [])

  const handleBack = useCallback(() => {
    setScreen('home')
    setConfig(null)
  }, [])

  const handleStart = useCallback(() => {
    setScreen('timer')
  }, [])

  const handleComplete = useCallback((stats: WorkoutStats) => {
    setCompletionStats(stats)
    setScreen('complete')
  }, [])

  const handleStop = useCallback((stats: WorkoutStats) => {
    if (stats.totalRounds > 0) {
      setCompletionStats(stats)
      setScreen('complete')
    } else {
      setScreen('home')
    }
  }, [])

  const handleRestart = useCallback(() => {
    setScreen('timer')
  }, [])

  const handleHome = useCallback(() => {
    setScreen('home')
    setConfig(null)
    setCompletionStats(null)
  }, [])

  const handleSavePreset = useCallback((name: string) => {
    if (!config) return
    const newPreset: SavedPreset = {
      ...config,
      id: `saved-${Date.now()}`,
      name,
      savedAt: Date.now(),
    }
    const updated = [...savedPresets, newPreset]
    setSavedPresets(updated)
    saveSavedPresets(updated)
  }, [config, savedPresets])

  const handleDeleteSavedPreset = useCallback((id: string) => {
    const updated = savedPresets.filter((p) => p.id !== id)
    setSavedPresets(updated)
    saveSavedPresets(updated)
  }, [savedPresets])

  return (
    <GestureHandlerRootView style={styles.wrapper}>
      <SafeAreaProvider>
        <View style={[styles.container, { backgroundColor: theme.background }]}>
          <StatusBar style={isDark ? 'light' : 'dark'} />
      {screen === 'home' && (
        <HomeScreen
          theme={theme}
          savedPresets={savedPresets}
          onSelectPreset={handleSelectPreset}
          onDeleteSavedPreset={handleDeleteSavedPreset}
        />
      )}
      {screen === 'config' && config && (
        <ConfigScreen
          theme={theme}
          config={config}
          onUpdateConfig={setConfig}
          onStart={handleStart}
          onBack={handleBack}
          onSave={handleSavePreset}
        />
      )}
      {screen === 'timer' && config && (
        <ActiveTimerScreen
          config={config}
          onComplete={handleComplete}
          onStop={handleStop}
        />
      )}
      {screen === 'complete' && completionStats && (
        <CompletionScreen
          theme={theme}
          stats={completionStats}
          onRestart={handleRestart}
          onHome={handleHome}
        />
      )}
        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
})
