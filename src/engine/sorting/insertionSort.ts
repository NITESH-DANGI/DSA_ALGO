import { SortStep, AlgoMeta } from '../types'

function generateSteps(arr: number[]): SortStep[] {
  const steps: SortStep[] = []
  const a = [...arr]
  let comparisons = 0
  let swaps = 0

  steps.push({
    type: 'sort', array: [...a], states: {}, highlightLines: [1],
    explanation: `Starting Insertion Sort with array [${a.join(', ')}]`,
    comparisons: 0, swaps: 0,
  })

  for (let i = 1; i < a.length; i++) {
    const key = a[i]
    let j = i - 1

    steps.push({
      type: 'sort', array: [...a],
      states: {
        [i]: 'active',
        ...Object.fromEntries(Array.from({ length: i }, (_, idx) => [idx, 'sorted' as const])),
      },
      highlightLines: [3, 4],
      explanation: `Picking key = ${key} at index ${i} to insert into sorted portion`,
      comparisons, swaps,
    })

    while (j >= 0 && a[j] > key) {
      comparisons++
      a[j + 1] = a[j]
      swaps++
      steps.push({
        type: 'sort', array: [...a],
        states: { [j]: 'compare', [j + 1]: 'swapping' },
        highlightLines: [5, 6],
        explanation: `Shifting a[${j}]=${a[j]} right, key=${key}`,
        comparisons, swaps,
      })
      j--
    }
    if (j + 1 !== i) {
      comparisons++
    }
    a[j + 1] = key
    steps.push({
      type: 'sort', array: [...a],
      states: {
        [j + 1]: 'active',
        ...Object.fromEntries(Array.from({ length: i + 1 }, (_, idx) => [idx, 'sorted' as const])),
      },
      highlightLines: [7],
      explanation: `Inserted ${key} at position ${j + 1}`,
      comparisons, swaps,
    })
  }

  steps.push({
    type: 'sort', array: [...a],
    states: Object.fromEntries(a.map((_, idx) => [idx, 'sorted' as const])),
    highlightLines: [8],
    explanation: 'Insertion Sort complete!',
    comparisons, swaps,
  })

  return steps
}

export const insertionSortMeta: AlgoMeta = {
  id: 'insertion-sort',
  name: 'Insertion Sort',
  category: 'sorting',
  difficulty: 'easy',
  description: 'Insertion Sort builds the sorted array one item at a time by inserting each element into its correct position.',
  complexity: {
    time: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    space: 'O(1)',
  },
  defaultInput: '[12, 11, 13, 5, 6]',
  code: {
    python: `def insertion_sort(arr):
    n = len(arr)
    for i in range(1, n):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
    javascript: `function insertionSort(arr) {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
    java: `void insertionSort(int[] arr) {
    int n = arr.length;
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
    cpp: `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
  },
  generate(input: string): SortStep[] {
    const arr = JSON.parse(input) as number[]
    return generateSteps(arr)
  },
}
