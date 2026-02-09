export type Theme = {
  background: string
  textPrimary: string
  textSecondary: string
  cardBg: string
  cardBorder: string
  sectionLabel: string
  emptyText: string
  emptySubtext: string
  inputBg: string
}

export function getTheme(isDark: boolean): Theme {
  if (isDark) {
    return {
      background: '#0f172a',
      textPrimary: '#f1f5f9',
      textSecondary: '#94a3b8',
      cardBg: 'rgba(30,41,59,0.8)',
      cardBorder: 'rgba(71,85,105,0.6)',
      sectionLabel: '#64748b',
      emptyText: '#64748b',
      emptySubtext: '#475569',
      inputBg: 'rgba(51,65,85,0.5)',
    }
  }
  return {
    background: '#f8fafc',
    textPrimary: '#0f172a',
    textSecondary: '#64748b',
    cardBg: '#ffffff',
    cardBorder: '#e2e8f0',
    sectionLabel: '#64748b',
    emptyText: '#64748b',
    emptySubtext: '#94a3b8',
    inputBg: '#f1f5f9',
  }
}
