import { GraphStep, AlgoMeta } from '../types'

function generateSteps(input: string): GraphStep[] {
  const parsed = JSON.parse(input) as { graph: Record<string, string[]>; start: string }
  const graph = parsed.graph
  const start = parsed.start || Object.keys(graph)[0]
  const steps: GraphStep[] = []
  const visited: string[] = []
  const visitedEdges: string[] = []
  const queue: string[] = [start]

  steps.push({ type: 'graph', visitedNodes: [], visitedEdges: [], activeNode: start, frontier: [start], highlightLines: [1, 2], explanation: `BFS starting from node ${start}. Queue: [${start}]` })

  while (queue.length > 0) {
    const node = queue.shift()!
    if (visited.includes(node)) continue
    visited.push(node)

    steps.push({ type: 'graph', visitedNodes: [...visited], visitedEdges: [...visitedEdges], activeNode: node, frontier: [...queue], highlightLines: [4, 5], explanation: `Visiting node ${node}. Queue: [${queue.join(', ')}]` })

    const neighbors = graph[node] || []
    for (const neighbor of neighbors) {
      if (!visited.includes(neighbor)) {
        const edgeKey = [node, neighbor].sort().join('-')
        if (!visitedEdges.includes(edgeKey)) visitedEdges.push(edgeKey)
        if (!queue.includes(neighbor)) {
          queue.push(neighbor)
          steps.push({ type: 'graph', visitedNodes: [...visited], visitedEdges: [...visitedEdges], activeNode: node, frontier: [...queue], highlightLines: [7, 8], explanation: `Added ${neighbor} to queue. Queue: [${queue.join(', ')}]` })
        }
      }
    }
  }

  steps.push({ type: 'graph', visitedNodes: [...visited], visitedEdges: [...visitedEdges], activeNode: null, frontier: [], highlightLines: [10], explanation: `BFS complete! Visited: [${visited.join(', ')}]` })
  return steps
}

export const bfsMeta: AlgoMeta = {
  id: 'bfs', name: 'Breadth-First Search', category: 'graph', difficulty: 'medium',
  description: 'BFS explores a graph level by level, visiting all neighbors of a node before moving to the next level.',
  complexity: { time: { best: 'O(V+E)', average: 'O(V+E)', worst: 'O(V+E)' }, space: 'O(V)' },
  defaultInput: '{"graph":{"A":["B","C"],"B":["A","D","E"],"C":["A","F"],"D":["B"],"E":["B","F"],"F":["C","E"]},"start":"A"}',
  code: {
    python: `def bfs(graph, start):\n    visited = []\n    queue = [start]\n    while queue:\n        node = queue.pop(0)\n        if node not in visited:\n            visited.append(node)\n            for neighbor in graph[node]:\n                if neighbor not in visited:\n                    queue.append(neighbor)\n    return visited`,
    javascript: `function bfs(graph, start) {\n  const visited = [];\n  const queue = [start];\n  while (queue.length > 0) {\n    const node = queue.shift();\n    if (!visited.includes(node)) {\n      visited.push(node);\n      for (const neighbor of graph[node]) {\n        if (!visited.includes(neighbor))\n          queue.push(neighbor);\n      }\n    }\n  }\n  return visited;\n}`,
    java: `void bfs(Map<String,List<String>> graph, String start) {\n    Set<String> visited = new LinkedHashSet<>();\n    Queue<String> queue = new LinkedList<>();\n    queue.add(start);\n    while (!queue.isEmpty()) {\n        String node = queue.poll();\n        if (visited.add(node)) {\n            for (String n : graph.get(node))\n                if (!visited.contains(n))\n                    queue.add(n);\n        }\n    }\n}`,
    cpp: `void bfs(map<string,vector<string>>& graph, string start) {\n    set<string> visited;\n    queue<string> q;\n    q.push(start);\n    while (!q.empty()) {\n        string node = q.front(); q.pop();\n        if (visited.insert(node).second) {\n            for (auto& n : graph[node])\n                if (!visited.count(n))\n                    q.push(n);\n        }\n    }\n}`,
  },
  generate: generateSteps,
}
