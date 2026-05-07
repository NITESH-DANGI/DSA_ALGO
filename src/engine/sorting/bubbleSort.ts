import { SortStep, AlgoMeta } from '../types'

function generateSteps(arr: number[]): SortStep[] {
  const steps: SortStep[] = []
  const a = [...arr]
  let comparisons = 0
  let swaps = 0
  const sorted = new Set<number>()

  // Initial state
  steps.push({
    type: 'sort',
    array: [...a],
    states: {},
    highlightLines: [1],
    explanation: `Starting Bubble Sort with array [${a.join(', ')}]`,
    comparisons: 0,
    swaps: 0,
  })

  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      comparisons++
      steps.push({
        type: 'sort',
        array: [...a],
        states: {
          [j]: 'active',
          [j + 1]: 'compare',
          ...Object.fromEntries([...sorted].map(k => [k, 'sorted' as const])),
        },
        highlightLines: [4, 5],
        explanation: `Comparing a[${j}]=${a[j]} with a[${j + 1}]=${a[j + 1]}`,
        comparisons,
        swaps,
      })

      if (a[j] > a[j + 1]) {
        ;[a[j], a[j + 1]] = [a[j + 1], a[j]]
        swaps++
        steps.push({
          type: 'sort',
          array: [...a],
          states: {
            [j]: 'swapping',
            [j + 1]: 'swapping',
            ...Object.fromEntries([...sorted].map(k => [k, 'sorted' as const])),
          },
          highlightLines: [6, 7],
          explanation: `Swapped: a[${j}] and a[${j + 1}] → [${a[j]}, ${a[j + 1]}]`,
          comparisons,
          swaps,
        })
      }
    }
    sorted.add(a.length - 1 - i)
    steps.push({
      type: 'sort',
      array: [...a],
      states: {
        [a.length - 1 - i]: 'sorted',
        ...Object.fromEntries([...sorted].map(k => [k, 'sorted' as const])),
      },
      highlightLines: [3],
      explanation: `Pass ${i + 1} complete. Element ${a[a.length - 1 - i]} is now in its final position.`,
      comparisons,
      swaps,
    })
  }

  return steps
}

export const bubbleSortMeta: AlgoMeta = {
  id: 'bubble-sort',
  name: 'Bubble Sort',
  category: 'sorting',
  difficulty: 'easy',
  description:
    'Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.',
  complexity: {
    time: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    space: 'O(1)',
  },
  defaultInput: '[64, 34, 25, 12, 22, 11, 90]',
  code: {
    python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`,
    javascript: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
    java: `void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`,
    cpp: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}`,
  },
  generate(input: string): SortStep[] {
    const arr = JSON.parse(input) as number[]
    return generateSteps(arr)
  },
}
