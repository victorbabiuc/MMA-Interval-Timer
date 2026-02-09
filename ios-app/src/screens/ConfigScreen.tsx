import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import type { TimerConfig } from '../lib/types'
import type { Theme } from '../lib/theme'
import { formatTime } from '../lib/presets'

type Props = {
  theme: Theme
  config: TimerConfig
  onUpdateConfig: (c: TimerConfig) => void
  onStart: () => void
  onBack: () => void
  onSave: (name: string) => void
}

function IncControl({
  theme,
  label,
  value,
  onIncrement,
  onDecrement,
}: {
  theme: Theme
  label: string
  value: string
  onIncrement: () => void
  onDecrement: () => void
}) {
  return (
    <View style={[styles.incRow, { backgroundColor: theme.cardBg, borderColor: theme.cardBorder }]}>
      <Text style={[styles.incLabel, { color: theme.textSecondary }]} numberOfLines={1}>{label}</Text>
      <View style={styles.incButtons}>
        <TouchableOpacity style={styles.incBtn} onPress={onDecrement}>
          <Text style={[styles.incBtnText, { color: theme.textPrimary }]}>−</Text>
        </TouchableOpacity>
        <Text style={[styles.incValue, { color: theme.textPrimary }]} numberOfLines={1}>{value}</Text>
        <TouchableOpacity style={styles.incBtn} onPress={onIncrement}>
          <Text style={[styles.incBtnText, { color: theme.textPrimary }]}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export function ConfigScreen({
  theme,
  config,
  onUpdateConfig,
  onStart,
  onBack,
  onSave,
}: Props) {
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [saveName, setSaveName] = useState(config.name)

  const update = (partial: Partial<TimerConfig>) => {
    onUpdateConfig({ ...config, ...partial })
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={onBack}
            style={styles.headerBtn}
            accessibilityLabel="Go back"
            accessibilityRole="button"
          >
            <Text style={[styles.headerBtnText, { color: theme.textSecondary }]}>← Back</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>Configure Timer</Text>
          <TouchableOpacity
            onPress={() => setShowSaveModal(true)}
            style={styles.headerBtn}
            accessibilityLabel="Save preset"
            accessibilityRole="button"
          >
            <Text style={[styles.headerBtnText, { color: theme.textSecondary }]}>Save</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.presetIcon}>{config.icon}</Text>
        <Text style={[styles.presetName, { color: theme.textPrimary }]}>{config.name}</Text>

        {!config.perpetualRounds && (
          <IncControl
            theme={theme}
            label="Rounds"
            value={String(config.rounds)}
            onIncrement={() => update({ rounds: Math.min(config.rounds + 1, 99) })}
            onDecrement={() => update({ rounds: Math.max(config.rounds - 1, 1) })}
          />
        )}

        <IncControl
          theme={theme}
          label="Round Time"
          value={formatTime(config.roundTime)}
          onIncrement={() => update({ roundTime: Math.min(config.roundTime + 30, 3600) })}
          onDecrement={() => update({ roundTime: Math.max(config.roundTime - 30, 10) })}
        />

        <IncControl
          theme={theme}
          label="Rest"
          value={formatTime(config.restTime)}
          onIncrement={() => update({ restTime: Math.min(config.restTime + 15, 600) })}
          onDecrement={() => update({ restTime: Math.max(config.restTime - 15, 5) })}
        />

        <View style={[styles.toggleBlock, { backgroundColor: theme.cardBg, borderColor: theme.cardBorder }]}>
          <TouchableOpacity
            style={styles.toggleRow}
            onPress={() => update({ perpetualRounds: !config.perpetualRounds })}
          >
            <Text style={[styles.toggleLabel, { color: theme.textPrimary }]}>Perpetual rounds</Text>
            <Text style={styles.toggleValue}>{config.perpetualRounds ? '✓' : '○'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.toggleRow}
            onPress={() => update({ warn30s: !config.warn30s })}
          >
            <Text style={[styles.toggleLabel, { color: theme.textPrimary }]}>30 second warning</Text>
            <Text style={styles.toggleValue}>{config.warn30s ? '✓' : '○'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.toggleRow}
            onPress={() => update({ warn10s: !config.warn10s })}
          >
            <Text style={[styles.toggleLabel, { color: theme.textPrimary }]}>10 second warning</Text>
            <Text style={styles.toggleValue}>{config.warn10s ? '✓' : '○'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.toggleRow}
            onPress={() => update({ countdownBeeps: !config.countdownBeeps })}
          >
            <Text style={[styles.toggleLabel, { color: theme.textPrimary }]}>Countdown beeps (final 10s)</Text>
            <Text style={styles.toggleValue}>{config.countdownBeeps ? '✓' : '○'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.toggleRow}
            onPress={() => update({ soundEnabled: !config.soundEnabled })}
          >
            <Text style={[styles.toggleLabel, { color: theme.textPrimary }]}>Enable sound</Text>
            <Text style={styles.toggleValue}>{config.soundEnabled ? '✓' : '○'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleRow, styles.toggleRowLast]}
            onPress={() => update({ vibrationEnabled: !config.vibrationEnabled })}
          >
            <Text style={[styles.toggleLabel, { color: theme.textPrimary }]}>Vibration</Text>
            <Text style={styles.toggleValue}>{config.vibrationEnabled ? '✓' : '○'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={[styles.savePresetBtn, { borderColor: theme.cardBorder }]} onPress={() => setShowSaveModal(true)}>
          <Text style={[styles.savePresetText, { color: theme.textSecondary }]}>Save as Preset</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.startBtn}
          onPress={onStart}
          accessibilityLabel="Start workout"
          accessibilityRole="button"
        >
          <Text style={styles.startBtnText}>START WORKOUT →</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={showSaveModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSaveModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalBox, { backgroundColor: theme.cardBg, borderColor: theme.cardBorder }]}>
            <Text style={[styles.modalTitle, { color: theme.textPrimary }]}>Save Preset</Text>
            <Text style={[styles.modalLabel, { color: theme.textSecondary }]}>Preset Name</Text>
            <TextInput
              style={[styles.modalInput, { backgroundColor: theme.inputBg, borderColor: theme.cardBorder, color: theme.textPrimary }]}
              value={saveName}
              onChangeText={setSaveName}
              placeholder="My Custom Timer"
              placeholderTextColor="#64748b"
              maxLength={30}
              autoFocus
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalCancel}
                onPress={() => setShowSaveModal(false)}
              >
                <Text style={[styles.modalCancelText, { color: theme.textSecondary }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalSave}
                onPress={() => {
                  onSave(saveName || config.name)
                  setShowSaveModal(false)
                }}
              >
                <Text style={styles.modalSaveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerBtn: { padding: 8 },
  headerBtnText: { fontSize: 16, color: '#94a3b8' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#f1f5f9' },
  presetIcon: { fontSize: 40, textAlign: 'center' },
  presetName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f1f5f9',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 10,
  },
  incRow: {
    marginBottom: 8,
    padding: 10,
    borderRadius: 12,
    backgroundColor: 'rgba(30,41,59,0.6)',
    borderWidth: 1,
    borderColor: 'rgba(71,85,105,0.4)',
  },
  incLabel: { fontSize: 12, color: '#94a3b8', marginBottom: 6 },
  incButtons: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  incBtn: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: 'rgba(71,85,105,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  incBtnText: { fontSize: 22, color: '#f1f5f9', fontWeight: '600' },
  incValue: { fontSize: 18, fontWeight: '700', color: '#f1f5f9', fontVariant: ['tabular-nums'] },
  toggleBlock: {
    marginTop: 4,
    marginBottom: 10,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(30,41,59,0.6)',
    borderWidth: 1,
    borderColor: 'rgba(71,85,105,0.4)',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(71,85,105,0.3)',
  },
  toggleLabel: { fontSize: 14, color: '#e2e8f0' },
  toggleValue: { fontSize: 16, color: '#22d3ee' },
  toggleRowLast: { borderBottomWidth: 0 },
  savePresetBtn: {
    marginBottom: 8,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#475569',
    alignItems: 'center',
  },
  savePresetText: { fontSize: 15, fontWeight: '600', color: '#94a3b8' },
  startBtn: {
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#10b981',
    alignItems: 'center',
  },
  startBtnText: { fontSize: 17, fontWeight: '800', color: '#fff' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalBox: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#334155',
  },
  modalTitle: { fontSize: 18, fontWeight: '700', color: '#f1f5f9', marginBottom: 16 },
  modalLabel: { fontSize: 14, color: '#94a3b8', marginBottom: 8 },
  modalInput: {
    borderWidth: 1,
    borderColor: '#475569',
    borderRadius: 12,
    backgroundColor: 'rgba(51,65,85,0.5)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#f1f5f9',
    marginBottom: 24,
  },
  modalActions: { flexDirection: 'row', gap: 12 },
  modalCancel: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#475569',
    alignItems: 'center',
  },
  modalCancelText: { fontSize: 16, fontWeight: '600', color: '#94a3b8' },
  modalSave: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#22d3ee',
    alignItems: 'center',
  },
  modalSaveText: { fontSize: 16, fontWeight: '700', color: '#0f172a' },
})
