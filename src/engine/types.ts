// The state of a single array element at one step
export type ElementState =
  | 'default'
  | 'active'    // currently being compared/processed
  | 'pivot'     // pivot element (quick sort)
  | 'sorted'    // confirmed in final position
  | 'compare'   // being compared against active
  | 'swapping'  // mid-swap
  | 'found'     // search result found

// A single step in a sorting visualization
export interface SortStep {
  type: 'sort'
  array: number[]
  states: Record<number, ElementState> // index → state
  highlightLines: number[]             // which code lines to highlight (1-indexed)
  explanation: string                  // human-readable step description
  comparisons: number
  swaps: number
}

// A single step in a graph visualization
export interface GraphStep {
  type: 'graph'
  visitedNodes: string[]
  visitedEdges: string[]        // "nodeA-nodeB"
  activeNode: string | null
  frontier: string[]            // BFS queue / DFS stack
  highlightLines: number[]
  explanation: string
  distances?: Record<string, number> // for Dijkstra
}

// A single step in a tree visualization
export interface TreeStep {
  type: 'tree'
  nodes: TreeNode[]
  activeNode: string | null
  visitedNodes: string[]
  highlightLines: number[]
  explanation: string
  path: string[]
}

export interface TreeNode {
  id: string
  value: number
  left: string | null
  right: string | null
  x?: number
  y?: number
}

export type Step = SortStep | GraphStep | TreeStep

// Metadata for each algorithm
export interface AlgoMeta {
  id: string                    // e.g. 'bubble-sort'
  name: string                  // e.g. 'Bubble Sort'
  category: 'sorting' | 'searching' | 'graph' | 'tree'
  difficulty: 'easy' | 'medium' | 'hard'
  description: string
  complexity: {
    time: { best: string; average: string; worst: string }
    space: string
  }
  code: Record<'python' | 'javascript' | 'java' | 'cpp', string>
  defaultInput: string          // default input value shown in editor
  generate: (input: string) => Step[] // parse input → produce step array
}
