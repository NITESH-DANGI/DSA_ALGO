import { SortStep, AlgoMeta } from '../types'

function generateSteps(input: string): SortStep[] {
  const parsed = JSON.parse(input) as { array: number[]; target: number }
  const arr = [...parsed.array].sort((a, b) => a - b)
  const target = parsed.target
  const steps: SortStep[] = []
  let comparisons = 0
  let lo = 0, hi = arr.length - 1

  steps.push({ type: 'sort', array: [...arr], states: {}, highlightLines: [1], explanation: `Binary Search: looking for ${target} in sorted [${arr.join(', ')}]`, comparisons: 0, swaps: 0 })

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2)
    comparisons++
    const rangeStates: Record<number, 'active' | 'compare' | 'found'> = {}
    for (let i = lo; i <= hi; i++) rangeStates[i] = 'compare'
    rangeStates[mid] = 'active'

    if (arr[mid] === target) {
      rangeStates[mid] = 'found'
      steps.push({ type: 'sort', array: [...arr], states: rangeStates, highlightLines: [5, 6], explanation: `Found ${target} at index ${mid}!`, comparisons, swaps: 0 })
      return steps
    }

    if (arr[mid] < target) {
      steps.push({ type: 'sort', array: [...arr], states: rangeStates, highlightLines: [7, 8], explanation: `a[${mid}]=${arr[mid]} < ${target}, search right half`, comparisons, swaps: 0 })
      lo = mid + 1
    } else {
      steps.push({ type: 'sort', array: [...arr], states: rangeStates, highlightLines: [9, 10], explanation: `a[${mid}]=${arr[mid]} > ${target}, search left half`, comparisons, swaps: 0 })
      hi = mid - 1
    }
  }

  steps.push({ type: 'sort', array: [...arr], states: {}, highlightLines: [11], explanation: `${target} not found.`, comparisons, swaps: 0 })
  return steps
}

export const binarySearchMeta: AlgoMeta = {
  id: 'binary-search', name: 'Binary Search', category: 'searching', difficulty: 'easy',
  description: 'Binary Search finds a target value in a sorted array by repeatedly dividing the search interval in half.',
  complexity: { time: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' }, space: 'O(1)' },
  defaultInput: '{"array": [2, 3, 4, 10, 40, 50, 60, 70], "target": 10}',
  code: {
    python: `def binary_search(arr, target):\n    lo, hi = 0, len(arr) - 1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            lo = mid + 1\n        else:\n            hi = mid - 1\n    return -1`,
    javascript: `function binarySearch(arr, target) {\n  let lo = 0, hi = arr.length - 1;\n  while (lo <= hi) {\n    const mid = Math.floor((lo + hi) / 2);\n    if (arr[mid] === target) return mid;\n    else if (arr[mid] < target) lo = mid + 1;\n    else hi = mid - 1;\n  }\n  return -1;\n}`,
    java: `int binarySearch(int[] arr, int target) {\n    int lo = 0, hi = arr.length - 1;\n    while (lo <= hi) {\n        int mid = (lo + hi) / 2;\n        if (arr[mid] == target) return mid;\n        else if (arr[mid] < target) lo = mid + 1;\n        else hi = mid - 1;\n    }\n    return -1;\n}`,
    cpp: `int binarySearch(int arr[], int n, int target) {\n    int lo = 0, hi = n - 1;\n    while (lo <= hi) {\n        int mid = (lo + hi) / 2;\n        if (arr[mid] == target) return mid;\n        else if (arr[mid] < target) lo = mid + 1;\n        else hi = mid - 1;\n    }\n    return -1;\n}`,
  },
  generate: generateSteps,
}
