import { SortStep, AlgoMeta } from '../types'

function generateSteps(arr: number[]): SortStep[] {
  const steps: SortStep[] = []
  let comparisons = 0, swaps = 0
  const a = [...arr]
  const sorted = new Set<number>()

  steps.push({ type: 'sort', array: [...a], states: {}, highlightLines: [1], explanation: `Starting Quick Sort with [${a.join(', ')}]`, comparisons: 0, swaps: 0 })

  function quickSort(lo: number, hi: number) {
    if (lo >= hi) { if (lo === hi) sorted.add(lo); return }
    const pivotVal = a[hi]
    steps.push({ type: 'sort', array: [...a], states: { [hi]: 'pivot', ...Object.fromEntries([...sorted].map(k => [k, 'sorted' as const])) }, highlightLines: [3], explanation: `Pivot = ${pivotVal} at index ${hi}`, comparisons, swaps })
    let i = lo - 1
    for (let j = lo; j < hi; j++) {
      comparisons++
      steps.push({ type: 'sort', array: [...a], states: { [hi]: 'pivot', [j]: 'compare', ...(i >= lo ? { [i]: 'active' } : {}), ...Object.fromEntries([...sorted].map(k => [k, 'sorted' as const])) }, highlightLines: [5, 6], explanation: `Comparing a[${j}]=${a[j]} with pivot ${pivotVal}`, comparisons, swaps })
      if (a[j] < pivotVal) {
        i++
        ;[a[i], a[j]] = [a[j], a[i]]
        swaps++
        steps.push({ type: 'sort', array: [...a], states: { [i]: 'swapping', [j]: 'swapping', [hi]: 'pivot', ...Object.fromEntries([...sorted].map(k => [k, 'sorted' as const])) }, highlightLines: [7, 8], explanation: `Swapped a[${i}] and a[${j}]`, comparisons, swaps })
      }
    }
    ;[a[i + 1], a[hi]] = [a[hi], a[i + 1]]
    swaps++
    const pi = i + 1
    sorted.add(pi)
    steps.push({ type: 'sort', array: [...a], states: { [pi]: 'sorted', ...Object.fromEntries([...sorted].map(k => [k, 'sorted' as const])) }, highlightLines: [9, 10], explanation: `Pivot ${pivotVal} placed at index ${pi}`, comparisons, swaps })
    quickSort(lo, pi - 1)
    quickSort(pi + 1, hi)
  }

  quickSort(0, a.length - 1)
  steps.push({ type: 'sort', array: [...a], states: Object.fromEntries(a.map((_, i) => [i, 'sorted' as const])), highlightLines: [11], explanation: 'Quick Sort complete!', comparisons, swaps })
  return steps
}

export const quickSortMeta: AlgoMeta = {
  id: 'quick-sort', name: 'Quick Sort', category: 'sorting', difficulty: 'medium',
  description: 'Quick Sort picks a pivot element and partitions the array around it, recursively sorting the sub-arrays.',
  complexity: { time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' }, space: 'O(log n)' },
  defaultInput: '[10, 80, 30, 90, 40, 50, 70]',
  code: {
    python: `def quick_sort(arr, lo, hi):\n    if lo < hi:\n        pi = partition(arr, lo, hi)\n        quick_sort(arr, lo, pi - 1)\n        quick_sort(arr, pi + 1, hi)\n\ndef partition(arr, lo, hi):\n    pivot = arr[hi]\n    i = lo - 1\n    for j in range(lo, hi):\n        if arr[j] < pivot:\n            i += 1\n            arr[i], arr[j] = arr[j], arr[i]\n    arr[i+1], arr[hi] = arr[hi], arr[i+1]\n    return i + 1`,
    javascript: `function quickSort(arr, lo = 0, hi = arr.length - 1) {\n  if (lo < hi) {\n    const pi = partition(arr, lo, hi);\n    quickSort(arr, lo, pi - 1);\n    quickSort(arr, pi + 1, hi);\n  }\n}\nfunction partition(arr, lo, hi) {\n  const pivot = arr[hi];\n  let i = lo - 1;\n  for (let j = lo; j < hi; j++) {\n    if (arr[j] < pivot) {\n      i++;\n      [arr[i], arr[j]] = [arr[j], arr[i]];\n    }\n  }\n  [arr[i+1], arr[hi]] = [arr[hi], arr[i+1]];\n  return i + 1;\n}`,
    java: `int partition(int[] arr, int lo, int hi) {\n    int pivot = arr[hi], i = lo - 1;\n    for (int j = lo; j < hi; j++) {\n        if (arr[j] < pivot) {\n            i++;\n            int t = arr[i]; arr[i] = arr[j]; arr[j] = t;\n        }\n    }\n    int t = arr[i+1]; arr[i+1] = arr[hi]; arr[hi] = t;\n    return i + 1;\n}`,
    cpp: `int partition(int arr[], int lo, int hi) {\n    int pivot = arr[hi], i = lo - 1;\n    for (int j = lo; j < hi; j++) {\n        if (arr[j] < pivot) {\n            swap(arr[++i], arr[j]);\n        }\n    }\n    swap(arr[i+1], arr[hi]);\n    return i + 1;\n}`,
  },
  generate(input: string): SortStep[] { return generateSteps(JSON.parse(input) as number[]) },
}
