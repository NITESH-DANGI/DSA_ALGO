import { SortStep, AlgoMeta } from '../types'

function generateSteps(input: string): SortStep[] {
  const parsed = JSON.parse(input) as { array: number[]; target: number }
  const arr = parsed.array ?? JSON.parse(input)
  const target = parsed.target ?? arr[Math.floor(Math.random() * arr.length)]
  const steps: SortStep[] = []
  let comparisons = 0

  steps.push({ type: 'sort', array: [...arr], states: {}, highlightLines: [1], explanation: `Linear Search: looking for ${target} in [${arr.join(', ')}]`, comparisons: 0, swaps: 0 })

  for (let i = 0; i < arr.length; i++) {
    comparisons++
    if (arr[i] === target) {
      steps.push({ type: 'sort', array: [...arr], states: { [i]: 'found' }, highlightLines: [4, 5], explanation: `Found ${target} at index ${i}!`, comparisons, swaps: 0 })
      return steps
    }
    steps.push({ type: 'sort', array: [...arr], states: { [i]: 'active' }, highlightLines: [3, 4], explanation: `Checking index ${i}: ${arr[i]} ≠ ${target}`, comparisons, swaps: 0 })
  }

  steps.push({ type: 'sort', array: [...arr], states: {}, highlightLines: [6], explanation: `${target} not found in the array.`, comparisons, swaps: 0 })
  return steps
}

export const linearSearchMeta: AlgoMeta = {
  id: 'linear-search', name: 'Linear Search', category: 'searching', difficulty: 'easy',
  description: 'Linear Search sequentially checks each element of the list until a match is found or the list is exhausted.',
  complexity: { time: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' }, space: 'O(1)' },
  defaultInput: '{"array": [2, 3, 4, 10, 40], "target": 10}',
  code: {
    python: `def linear_search(arr, target):\n    n = len(arr)\n    for i in range(n):\n        if arr[i] == target:\n            return i\n    return -1`,
    javascript: `function linearSearch(arr, target) {\n  const n = arr.length;\n  for (let i = 0; i < n; i++) {\n    if (arr[i] === target) {\n      return i;\n    }\n  }\n  return -1;\n}`,
    java: `int linearSearch(int[] arr, int target) {\n    for (int i = 0; i < arr.length; i++) {\n        if (arr[i] == target)\n            return i;\n    }\n    return -1;\n}`,
    cpp: `int linearSearch(int arr[], int n, int target) {\n    for (int i = 0; i < n; i++) {\n        if (arr[i] == target)\n            return i;\n    }\n    return -1;\n}`,
  },
  generate: generateSteps,
}
