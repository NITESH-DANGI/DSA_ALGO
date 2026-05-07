// Generate a random array of numbers
export function randomArray(size: number = 12, min: number = 5, max: number = 100): number[] {
  return Array.from({ length: size }, () =>
    Math.floor(Math.random() * (max - min + 1)) + min
  )
}

// Generate a random graph as adjacency list
export function randomGraph(): Record<string, string[]> {
  const nodes = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
  const graph: Record<string, string[]> = {}
  for (const node of nodes) {
    graph[node] = []
  }
  // Create a connected graph
  for (let i = 1; i < nodes.length; i++) {
    const parent = nodes[Math.floor(Math.random() * i)]
    graph[parent].push(nodes[i])
    graph[nodes[i]].push(parent)
  }
  // Add a few extra edges
  for (let i = 0; i < 3; i++) {
    const a = nodes[Math.floor(Math.random() * nodes.length)]
    const b = nodes[Math.floor(Math.random() * nodes.length)]
    if (a !== b && !graph[a].includes(b)) {
      graph[a].push(b)
      graph[b].push(a)
    }
  }
  return graph
}

// Generate weighted edges for Dijkstra
export function randomWeightedEdges(): Record<string, number> {
  const graph = randomGraph()
  const edges: Record<string, number> = {}
  for (const [node, neighbors] of Object.entries(graph)) {
    for (const neighbor of neighbors) {
      const key = [node, neighbor].sort().join('-')
      if (!edges[key]) {
        edges[key] = Math.floor(Math.random() * 9) + 1
      }
    }
  }
  return edges
}

// Generate random tree values
export function randomTreeValues(size: number = 7): number[] {
  const values = new Set<number>()
  while (values.size < size) {
    values.add(Math.floor(Math.random() * 95) + 5)
  }
  return Array.from(values)
}

// Clamp a value
export function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max)
}
