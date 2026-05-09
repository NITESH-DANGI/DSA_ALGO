// Color tokens matching the reference design
export const COLORS = {
  bg: '#111317',
  surface: '#111317',
  surfaceContainerLow: '#1a1c20',
  surfaceContainer: '#1e2024',
  surfaceContainerHigh: '#282a2e',
  surfaceBright: '#37393e',
  primary: '#f3dfc0',
  primaryContainer: '#d6c3a5',
  primaryFixedDim: '#d7c4a6',
  onPrimary: '#3a2f1a',
  secondary: '#dec39b',
  secondaryContainer: '#594628',
  tertiary: '#d5e7ca',
  onSurface: '#e2e2e8',
  onSurfaceVariant: '#cfc5b9',
  outline: '#988f85',
  outlineVariant: '#4c463d',

  accent: '#d7c4a6',
  accentLight: '#f3dfc0',
  accentRed: '#C45C5C',
  accentPurple: '#8B7EC8',
  text: '#e2e2e8',
  textMuted: '#988f85',
  codeBg: '#0c0e12',

  // Bar colors
  barDefault: 'rgba(243,223,192,0.3)',
  barActive: '#d6c3a5',
  barSorted: 'rgba(213,231,202,0.45)',
  barPivot: 'rgba(196,92,92,0.5)',
  barCompare: 'rgba(243,223,192,0.6)',
  barSwapping: '#dec39b',
  barFound: '#d6c3a5',

  // Graph colors
  nodeDefault: '#6B6560',
  nodeVisited: '#d6c3a5',
  nodeFrontier: '#dec39b',
  nodeActive: '#d6c3a5',
  edgeDefault: '#4c463d',
  edgeVisited: '#d6c3a5',
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
  easy: '#d6c3a5',
  medium: '#dec39b',
  hard: '#C45C5C',
} as const

// Category labels
export const CATEGORY_LABELS = {
  sorting: 'Sorting',
  searching: 'Searching',
  graph: 'Graph',
  tree: 'Tree',
} as const
