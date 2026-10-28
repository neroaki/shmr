// Set this to 'original' to undo image tone adjustments without changing layout.
// Local comparison: /?tone=original or /?tone=balanced (development only).
const defaultImageTone: 'original' | 'balanced' = 'balanced'
const previewTone = import.meta.env.DEV
  ? new URLSearchParams(window.location.search).get('tone')
  : null

export const imageTone = previewTone === 'original' || previewTone === 'balanced'
  ? previewTone
  : defaultImageTone
