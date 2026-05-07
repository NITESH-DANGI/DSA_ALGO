import { create } from 'zustand'
import { Step } from '@/engine/types'

export type PlaybackStatus = 'idle' | 'playing' | 'paused' | 'finished'
export type Language = 'python' | 'javascript' | 'java' | 'cpp'

interface VisualizerState {
  algoId: string | null
  steps: Step[]
  currentStepIndex: number
  status: PlaybackStatus
  speed: number
  language: Language
  audioEnabled: boolean
  currentStep: Step | null
  totalSteps: number
  progress: number
  loadAlgo: (algoId: string, steps: Step[]) => void
  play: () => void
  pause: () => void
  stepForward: () => void
  stepBack: () => void
  jumpToStep: (index: number) => void
  reset: () => void
  setSpeed: (speed: number) => void
  setLanguage: (lang: Language) => void
  setAudioEnabled: (enabled: boolean) => void
  advanceStep: () => void
}

export const useVisualizerStore = create<VisualizerState>((set, get) => ({
  algoId: null,
  steps: [],
  currentStepIndex: -1,
  status: 'idle',
  speed: 1,
  language: 'python',
  audioEnabled: false,
  get currentStep() {
    const { steps, currentStepIndex } = get()
    return currentStepIndex >= 0 && currentStepIndex < steps.length ? steps[currentStepIndex] : null
  },
  get totalSteps() {
    return get().steps.length
  },
  get progress() {
    const { currentStepIndex, steps } = get()
    return steps.length ? (currentStepIndex + 1) / steps.length : 0
  },
  loadAlgo: (algoId, steps) => set({ algoId, steps, currentStepIndex: 0, status: 'idle' }),
  play: () => set({ status: 'playing' }),
  pause: () => set({ status: 'paused' }),
  stepForward: () =>
    set(state => ({
      currentStepIndex: Math.min(state.currentStepIndex + 1, state.steps.length - 1),
      status: 'paused',
    })),
  stepBack: () =>
    set(state => ({
      currentStepIndex: Math.max(state.currentStepIndex - 1, 0),
      status: 'paused',
    })),
  jumpToStep: (index) => set({ currentStepIndex: index, status: 'paused' }),
  reset: () => set({ currentStepIndex: 0, status: 'idle' }),
  setSpeed: (speed) => set({ speed }),
  setLanguage: (language) => set({ language }),
  setAudioEnabled: (audioEnabled) => set({ audioEnabled }),
  advanceStep: () =>
    set(state => {
      const next = state.currentStepIndex + 1
      if (next >= state.steps.length) return { status: 'finished' }
      return { currentStepIndex: next }
    }),
}))
