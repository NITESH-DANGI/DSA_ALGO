import { SortStep, AlgoMeta } from '../types'

function generateSteps(arr: number[]): SortStep[] {
  const steps: SortStep[] = []
  let comparisons = 0
  let swaps = 0
  const a = [...arr]

  steps.push({ type: 'sort', array: [...a], states: {}, highlightLines: [1], explanation: `Starting Merge Sort with [${a.join(', ')}]`, comparisons: 0, swaps: 0 })

  function mergeSort(start: number, end: number) {
    if (start >= end) return
    const mid = Math.floor((start + end) / 2)
    steps.push({ type: 'sort', array: [...a], states: Object.fromEntries(Array.from({ length: end - start + 1 }, (_, i) => [start + i, 'active' as const])), highlightLines: [2, 3], explanation: `Dividing [${start}..${end}] at mid=${mid}`, comparisons, swaps })
    mergeSort(start, mid)
    mergeSort(mid + 1, end)
    merge(start, mid, end)
  }

  function merge(start: number, mid: number, end: number) {
    const left = a.slice(start, mid + 1), right = a.slice(mid + 1, end + 1)
    let i = 0, j = 0, k = start
    steps.push({ type: 'sort', array: [...a], states: {}, highlightLines: [5, 6], explanation: `Merging [${left}] and [${right}]`, comparisons, swaps })
    while (i < left.length && j < right.length) {
      comparisons++
      if (left[i] <= right[j]) { a[k] = left[i]; i++ } else { a[k] = right[j]; j++ }
      swaps++
      steps.push({ type: 'sort', array: [...a], states: { [k]: 'swapping' }, highlightLines: [7, 8], explanation: `Placed ${a[k]} at position ${k}`, comparisons, swaps })
      k++
    }
    while (i < left.length) { a[k] = left[i]; swaps++; steps.push({ type: 'sort', array: [...a], states: { [k]: 'swapping' }, highlightLines: [11], explanation: `Copy ${left[i]} from left`, comparisons, swaps }); i++; k++ }
    while (j < right.length) { a[k] = right[j]; swaps++; steps.push({ type: 'sort', array: [...a], states: { [k]: 'swapping' }, highlightLines: [13], explanation: `Copy ${right[j]} from right`, comparisons, swaps }); j++; k++ }
  }

  mergeSort(0, a.length - 1)
  steps.push({ type: 'sort', array: [...a], states: Object.fromEntries(a.map((_, i) => [i, 'sorted' as const])), highlightLines: [15], explanation: 'Merge Sort complete!', comparisons, swaps })
  return steps
}

export const mergeSortMeta: AlgoMeta = {
  id: 'merge-sort', name: 'Merge Sort', category: 'sorting', difficulty: 'medium',
  description: 'Merge Sort divides the array into halves, sorts each half, and merges them back together.',
  complexity: { time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' }, space: 'O(n)' },
  defaultInput: '[38, 27, 43, 3, 9, 82, 10]',
  code: {
    python: `def merge_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    mid = len(arr) // 2\n    left = merge_sort(arr[:mid])\n    right = merge_sort(arr[mid:])\n    return merge(left, right)\n\ndef merge(left, right):\n    result = []\n    i = j = 0\n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]:\n            result.append(left[i]); i += 1\n        else:\n            result.append(right[j]); j += 1\n    result.extend(left[i:])\n    result.extend(right[j:])\n    return result`,
    javascript: `function mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  const mid = Math.floor(arr.length / 2);\n  const left = mergeSort(arr.slice(0, mid));\n  const right = mergeSort(arr.slice(mid));\n  return merge(left, right);\n}\nfunction merge(left, right) {\n  const result = [];\n  let i = 0, j = 0;\n  while (i < left.length && j < right.length) {\n    if (left[i] <= right[j]) result.push(left[i++]);\n    else result.push(right[j++]);\n  }\n  return [...result, ...left.slice(i), ...right.slice(j)];\n}`,
    java: `void mergeSort(int[] arr, int l, int r) {\n    if (l < r) {\n        int m = (l + r) / 2;\n        mergeSort(arr, l, m);\n        mergeSort(arr, m + 1, r);\n        merge(arr, l, m, r);\n    }\n}`,
    cpp: `void mergeSort(int arr[], int l, int r) {\n    if (l < r) {\n        int m = (l + r) / 2;\n        mergeSort(arr, l, m);\n        mergeSort(arr, m + 1, r);\n        merge(arr, l, m, r);\n    }\n}`,
  },
  generate(input: string): SortStep[] { return generateSteps(JSON.parse(input) as number[]) },
}
