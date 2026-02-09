import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import type { TimerConfig, SavedPreset } from '../lib/types'
import type { Theme } from '../lib/theme'
import { DEFAULT_CUSTOM, ORDERED_PRESETS } from '../lib/presets'

type Props = {
  theme: Theme
  savedPresets: SavedPreset[]
  onSelectPreset: (preset: TimerConfig) => void
  onDeleteSavedPreset: (id: string) => void
}

export function HomeScreen({
  theme,
  savedPresets,
  onSelectPreset,
  onDeleteSavedPreset,
}: Props) {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['top', 'bottom']}>
      {/* Top half: vertically scrollable (title + subtitle + preset boxes) */}
      <View style={styles.topHalf}>
        <ScrollView
          style={styles.topScroll}
          contentContainerStyle={styles.topScrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.title, { color: theme.textPrimary }]}>INTERVAL TIMER</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Choose your sport or create custom</Text>

          <View style={styles.presetRow}>
            <TouchableOpacity
              style={[styles.presetCard, { backgroundColor: theme.cardBg, borderColor: theme.cardBorder }]}
              onPress={() => onSelectPreset(DEFAULT_CUSTOM)}
              activeOpacity={0.8}
              accessibilityLabel={`Select ${DEFAULT_CUSTOM.name}`}
              accessibilityRole="button"
            >
              <Text style={styles.presetIcon}>{DEFAULT_CUSTOM.icon}</Text>
              <Text style={[styles.presetName, { color: theme.textPrimary }]}>{DEFAULT_CUSTOM.name}</Text>
            </TouchableOpacity>
            {ORDERED_PRESETS.map((preset) => (
              <TouchableOpacity
                key={preset.id}
                style={[styles.presetCard, { backgroundColor: theme.cardBg, borderColor: theme.cardBorder }]}
                onPress={() => onSelectPreset(preset)}
                activeOpacity={0.8}
                accessibilityLabel={`Select ${preset.name}`}
                accessibilityRole="button"
              >
                <Text style={styles.presetIcon}>{preset.icon}</Text>
                <Text style={[styles.presetName, { color: theme.textPrimary }]}>{preset.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Bottom half: My Saved Timers (fixed underneath) */}
      <Text style={[styles.sectionLabel, { color: theme.sectionLabel }]}>
        My Saved Timers{savedPresets.length > 0 ? ` (${savedPresets.length})` : ''}
      </Text>

      {savedPresets.length === 0 ? (
        <View style={[styles.empty, { backgroundColor: theme.cardBg, borderColor: theme.cardBorder }]}>
          <Text style={[styles.emptyText, { color: theme.emptyText }]}>No saved timers yet</Text>
          <Text style={[styles.emptySubtext, { color: theme.emptySubtext }]}>
            Configure a timer and save it for quick access
          </Text>
        </View>
      ) : (
        <ScrollView style={styles.savedList} showsVerticalScrollIndicator={false}>
          {savedPresets.map((preset) => (
            <Swipeable
              key={preset.id}
              renderRightActions={() => (
                <TouchableOpacity
                  style={styles.deleteAction}
                  accessibilityLabel={`Delete ${preset.name}`}
                  accessibilityRole="button"
                  onPress={() => {
                    Alert.alert(
                      'Delete timer?',
                      `Remove "${preset.name}" from your saved timers?`,
                      [
                        { text: 'Cancel', style: 'cancel' },
                        {
                          text: 'Delete',
                          style: 'destructive',
                          onPress: () => onDeleteSavedPreset(preset.id),
                        },
                      ]
                    )
                  }}
                >
                  <Text style={styles.deleteActionText}>Delete</Text>
                </TouchableOpacity>
              )}
            >
              <TouchableOpacity
                style={[styles.savedCard, { backgroundColor: theme.cardBg, borderColor: theme.cardBorder }]}
                onPress={() => onSelectPreset(preset)}
                activeOpacity={0.8}
                accessibilityLabel={`Start saved timer ${preset.name}`}
                accessibilityRole="button"
              >
                <Text style={styles.savedIcon}>{preset.icon}</Text>
                <Text style={[styles.savedName, { color: theme.textPrimary }]}>{preset.name}</Text>
              </TouchableOpacity>
            </Swipeable>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 16, paddingBottom: 16 },
  topHalf: { flex: 1 },
  topScroll: { flex: 1 },
  topScrollContent: { paddingBottom: 16 },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#f1f5f9',
    textAlign: 'center',
    letterSpacing: 1,
  },
  subtitle: { fontSize: 14, color: '#94a3b8', textAlign: 'center', marginTop: 6 },
  presetRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 16,
    paddingVertical: 4,
    justifyContent: 'flex-start',
  },
  presetCard: {
    width: 88,
    height: 88,
    borderRadius: 12,
    backgroundColor: 'rgba(30,41,59,0.8)',
    borderWidth: 1,
    borderColor: 'rgba(71,85,105,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  presetIcon: { fontSize: 28 },
  presetName: {
    fontSize: 11,
    fontWeight: '700',
    color: '#f1f5f9',
    marginTop: 4,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    marginTop: 16,
    marginBottom: 8,
    letterSpacing: 1,
  },
  empty: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(71,85,105,0.5)',
    borderStyle: 'dashed',
    backgroundColor: 'rgba(30,41,59,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: { fontSize: 14, color: '#64748b' },
  emptySubtext: { fontSize: 12, color: '#475569', marginTop: 4 },
  savedList: { flex: 1 },
  savedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(30,41,59,0.6)',
    borderWidth: 1,
    borderColor: 'rgba(71,85,105,0.4)',
  },
  savedIcon: { fontSize: 24, marginRight: 12 },
  savedName: { fontSize: 16, fontWeight: '600', color: '#f1f5f9' },
  deleteAction: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dc2626',
    paddingHorizontal: 24,
    marginBottom: 8,
    borderRadius: 12,
  },
  deleteActionText: { fontSize: 16, fontWeight: '600', color: '#fff' },
})
