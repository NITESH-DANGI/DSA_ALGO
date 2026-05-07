import { SortStep, AlgoMeta } from '../types'

function generateSteps(arr: number[]): SortStep[] {
  const steps: SortStep[] = []
  const a = [...arr]
  let comparisons = 0
  let swaps = 0
  const sorted = new Set<number>()

  steps.push({
    type: 'sort', array: [...a], states: {}, highlightLines: [1],
    explanation: `Starting Selection Sort with array [${a.join(', ')}]`,
    comparisons: 0, swaps: 0,
  })

  for (let i = 0; i < a.length - 1; i++) {
    let minIdx = i
    steps.push({
      type: 'sort', array: [...a],
      states: { [i]: 'active', ...Object.fromEntries([...sorted].map(k => [k, 'sorted' as const])) },
      highlightLines: [3, 4],
      explanation: `Pass ${i + 1}: Setting minimum index to ${i} (value ${a[i]})`,
      comparisons, swaps,
    })

    for (let j = i + 1; j < a.length; j++) {
      comparisons++
      steps.push({
        type: 'sort', array: [...a],
        states: {
          [minIdx]: 'pivot', [j]: 'compare',
          ...Object.fromEntries([...sorted].map(k => [k, 'sorted' as const])),
        },
        highlightLines: [5, 6],
        explanation: `Comparing a[${j}]=${a[j]} with current min a[${minIdx}]=${a[minIdx]}`,
        comparisons, swaps,
      })
      if (a[j] < a[minIdx]) {
        minIdx = j
        steps.push({
          type: 'sort', array: [...a],
          states: { [minIdx]: 'pivot', ...Object.fromEntries([...sorted].map(k => [k, 'sorted' as const])) },
          highlightLines: [7],
          explanation: `New minimum found: a[${minIdx}]=${a[minIdx]}`,
          comparisons, swaps,
        })
      }
    }

    if (minIdx !== i) {
      ;[a[i], a[minIdx]] = [a[minIdx], a[i]]
      swaps++
      steps.push({
        type: 'sort', array: [...a],
        states: { [i]: 'swapping', [minIdx]: 'swapping', ...Object.fromEntries([...sorted].map(k => [k, 'sorted' as const])) },
        highlightLines: [8, 9],
        explanation: `Swapping a[${i}] and a[${minIdx}] → placed ${a[i]} at position ${i}`,
        comparisons, swaps,
      })
    }
    sorted.add(i)
  }
  sorted.add(a.length - 1)

  steps.push({
    type: 'sort', array: [...a],
    states: Object.fromEntries(a.map((_, idx) => [idx, 'sorted' as const])),
    highlightLines: [10],
    explanation: `Selection Sort complete! Array is sorted.`,
    comparisons, swaps,
  })

  return steps
}

export const selectionSortMeta: AlgoMeta = {
  id: 'selection-sort',
  name: 'Selection Sort',
  category: 'sorting',
  difficulty: 'easy',
  description: 'Selection Sort divides the array into sorted and unsorted regions, repeatedly finding the minimum element from the unsorted region.',
  complexity: {
    time: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
    space: 'O(1)',
  },
  defaultInput: '[64, 25, 12, 22, 11]',
  code: {
    python: `def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
    javascript: `function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}`,
    java: `void selectionSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        int temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
    }
}`,
    cpp: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        swap(arr[i], arr[minIdx]);
    }
}`,
  },
  generate(input: string): SortStep[] {
    const arr = JSON.parse(input) as number[]
    return generateSteps(arr)
  },
}
