// Color tokens
export const COLORS = {
  bg: '#080c10',
  surface: '#0e1318',
  surface2: '#141c24',
  accent: '#00ffb4',
  accentRed: '#ff4e6a',
  accentPurple: '#7c6fff',
  text: '#e8f0f8',
  textMuted: '#6a7f94',
  codeBg: '#0a1520',

  // Bar colors
  barDefault: 'rgba(0, 255, 180, 0.2)',
  barActive: '#00ffb4',
  barSorted: 'rgba(124, 111, 255, 0.45)',
  barPivot: 'rgba(255, 78, 106, 0.5)',
  barCompare: 'rgba(255, 208, 80, 0.5)',
  barSwapping: '#ff9f43',
  barFound: '#00ffb4',

  // Graph colors
  nodeDefault: '#6a7f94',
  nodeVisited: '#00ffb4',
  nodeFrontier: '#ffd080',
  nodeActive: '#00ffb4',
  edgeDefault: '#2a3a4a',
  edgeVisited: '#00ffb4',
} as const

// Speed presets
export const SPEED_PRESETS = [0.25, 0.5, 1, 2, 4] as const

export const SPEED_TO_MS: Record<number, number> = {
  0.25: 2000,
  0.5: 1200,
  1: 700,
  2: 350,
  4: 150,
}

// Difficulty colors
export const DIFFICULTY_COLORS = {
  easy: '#00ffb4',
  medium: '#ffd080',
  hard: '#ff4e6a',
} as const

// Category labels
export const CATEGORY_LABELS = {
  sorting: 'Sorting',
  searching: 'Searching',
  graph: 'Graph',
  tree: 'Tree',
} as const
