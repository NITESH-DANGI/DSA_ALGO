import { AlgoMeta } from './types'
import { bubbleSortMeta } from './sorting/bubbleSort'
import { selectionSortMeta } from './sorting/selectionSort'
import { insertionSortMeta } from './sorting/insertionSort'
import { mergeSortMeta } from './sorting/mergeSort'
import { quickSortMeta } from './sorting/quickSort'
import { heapSortMeta } from './sorting/heapSort'
import { linearSearchMeta } from './searching/linearSearch'
import { binarySearchMeta } from './searching/binarySearch'
import { bfsMeta } from './graphs/bfs'
import { dfsMeta } from './graphs/dfs'
import { dijkstraMeta } from './graphs/dijkstra'
import { bstInsertMeta } from './trees/bstInsert'
import { bstSearchMeta } from './trees/bstSearch'
import { treeTraversalMeta } from './trees/treeTraversal'

export const REGISTRY: Record<string, AlgoMeta> = {
  [bubbleSortMeta.id]: bubbleSortMeta,
  [selectionSortMeta.id]: selectionSortMeta,
  [insertionSortMeta.id]: insertionSortMeta,
  [mergeSortMeta.id]: mergeSortMeta,
  [quickSortMeta.id]: quickSortMeta,
  [heapSortMeta.id]: heapSortMeta,
  [linearSearchMeta.id]: linearSearchMeta,
  [binarySearchMeta.id]: binarySearchMeta,
  [bfsMeta.id]: bfsMeta,
  [dfsMeta.id]: dfsMeta,
  [dijkstraMeta.id]: dijkstraMeta,
  [bstInsertMeta.id]: bstInsertMeta,
  [bstSearchMeta.id]: bstSearchMeta,
  [treeTraversalMeta.id]: treeTraversalMeta,
}

export const CATEGORIES = ['sorting', 'searching', 'graph', 'tree'] as const
