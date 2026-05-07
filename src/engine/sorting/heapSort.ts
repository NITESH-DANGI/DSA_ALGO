import { SortStep, AlgoMeta } from '../types'

function generateSteps(arr: number[]): SortStep[] {
  const steps: SortStep[] = []
  let comparisons = 0, swaps = 0
  const a = [...arr]
  const n = a.length

  steps.push({ type: 'sort', array: [...a], states: {}, highlightLines: [1], explanation: `Starting Heap Sort with [${a.join(', ')}]`, comparisons: 0, swaps: 0 })

  function heapify(size: number, i: number) {
    let largest = i
    const l = 2 * i + 1, r = 2 * i + 2
    if (l < size) { comparisons++; if (a[l] > a[largest]) largest = l }
    if (r < size) { comparisons++; if (a[r] > a[largest]) largest = r }
    if (largest !== i) {
      ;[a[i], a[largest]] = [a[largest], a[i]]
      swaps++
      steps.push({ type: 'sort', array: [...a], states: { [i]: 'swapping', [largest]: 'swapping' }, highlightLines: [6, 7], explanation: `Heapify: swapped a[${i}]=${a[i]} and a[${largest}]=${a[largest]}`, comparisons, swaps })
      heapify(size, largest)
    }
  }

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    steps.push({ type: 'sort', array: [...a], states: { [i]: 'active' }, highlightLines: [3], explanation: `Building heap: heapify at index ${i}`, comparisons, swaps })
    heapify(n, i)
  }

  // Extract elements
  for (let i = n - 1; i > 0; i--) {
    ;[a[0], a[i]] = [a[i], a[0]]
    swaps++
    steps.push({ type: 'sort', array: [...a], states: { [0]: 'swapping', [i]: 'sorted' }, highlightLines: [9, 10], explanation: `Extracted max ${a[i]}, placed at index ${i}`, comparisons, swaps })
    heapify(i, 0)
  }

  steps.push({ type: 'sort', array: [...a], states: Object.fromEntries(a.map((_, i) => [i, 'sorted' as const])), highlightLines: [11], explanation: 'Heap Sort complete!', comparisons, swaps })
  return steps
}

export const heapSortMeta: AlgoMeta = {
  id: 'heap-sort', name: 'Heap Sort', category: 'sorting', difficulty: 'hard',
  description: 'Heap Sort builds a max heap from the array, then repeatedly extracts the maximum element to build the sorted array.',
  complexity: { time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' }, space: 'O(1)' },
  defaultInput: '[12, 11, 13, 5, 6, 7]',
  code: {
    python: `def heap_sort(arr):\n    n = len(arr)\n    for i in range(n // 2 - 1, -1, -1):\n        heapify(arr, n, i)\n    for i in range(n - 1, 0, -1):\n        arr[0], arr[i] = arr[i], arr[0]\n        heapify(arr, i, 0)\n\ndef heapify(arr, n, i):\n    largest = i\n    l, r = 2*i+1, 2*i+2\n    if l < n and arr[l] > arr[largest]: largest = l\n    if r < n and arr[r] > arr[largest]: largest = r\n    if largest != i:\n        arr[i], arr[largest] = arr[largest], arr[i]\n        heapify(arr, n, largest)`,
    javascript: `function heapSort(arr) {\n  const n = arr.length;\n  for (let i = Math.floor(n/2)-1; i >= 0; i--)\n    heapify(arr, n, i);\n  for (let i = n-1; i > 0; i--) {\n    [arr[0], arr[i]] = [arr[i], arr[0]];\n    heapify(arr, i, 0);\n  }\n}\nfunction heapify(arr, n, i) {\n  let largest = i;\n  const l = 2*i+1, r = 2*i+2;\n  if (l < n && arr[l] > arr[largest]) largest = l;\n  if (r < n && arr[r] > arr[largest]) largest = r;\n  if (largest !== i) {\n    [arr[i], arr[largest]] = [arr[largest], arr[i]];\n    heapify(arr, n, largest);\n  }\n}`,
    java: `void heapSort(int[] arr) {\n    int n = arr.length;\n    for (int i = n/2-1; i >= 0; i--) heapify(arr, n, i);\n    for (int i = n-1; i > 0; i--) {\n        int t = arr[0]; arr[0] = arr[i]; arr[i] = t;\n        heapify(arr, i, 0);\n    }\n}`,
    cpp: `void heapSort(int arr[], int n) {\n    for (int i = n/2-1; i >= 0; i--) heapify(arr, n, i);\n    for (int i = n-1; i > 0; i--) {\n        swap(arr[0], arr[i]);\n        heapify(arr, i, 0);\n    }\n}`,
  },
  generate(input: string): SortStep[] { return generateSteps(JSON.parse(input) as number[]) },
}
