import { GraphStep, AlgoMeta } from '../types'

function generateSteps(input: string): GraphStep[] {
  const parsed = JSON.parse(input) as { graph: Record<string, string[]>; start: string }
  const graph = parsed.graph
  const start = parsed.start || Object.keys(graph)[0]
  const steps: GraphStep[] = []
  const visited: string[] = []
  const visitedEdges: string[] = []
  const stack: string[] = [start]

  steps.push({ type: 'graph', visitedNodes: [], visitedEdges: [], activeNode: start, frontier: [start], highlightLines: [1, 2], explanation: `DFS starting from node ${start}. Stack: [${start}]` })

  while (stack.length > 0) {
    const node = stack.pop()!
    if (visited.includes(node)) continue
    visited.push(node)

    steps.push({ type: 'graph', visitedNodes: [...visited], visitedEdges: [...visitedEdges], activeNode: node, frontier: [...stack], highlightLines: [4, 5], explanation: `Visiting node ${node}. Stack: [${stack.join(', ')}]` })

    const neighbors = (graph[node] || []).slice().reverse()
    for (const neighbor of neighbors) {
      if (!visited.includes(neighbor)) {
        const edgeKey = [node, neighbor].sort().join('-')
        if (!visitedEdges.includes(edgeKey)) visitedEdges.push(edgeKey)
        stack.push(neighbor)
        steps.push({ type: 'graph', visitedNodes: [...visited], visitedEdges: [...visitedEdges], activeNode: node, frontier: [...stack], highlightLines: [7, 8], explanation: `Pushed ${neighbor} to stack. Stack: [${stack.join(', ')}]` })
      }
    }
  }

  steps.push({ type: 'graph', visitedNodes: [...visited], visitedEdges: [...visitedEdges], activeNode: null, frontier: [], highlightLines: [10], explanation: `DFS complete! Visited: [${visited.join(', ')}]` })
  return steps
}

export const dfsMeta: AlgoMeta = {
  id: 'dfs', name: 'Depth-First Search', category: 'graph', difficulty: 'medium',
  description: 'DFS explores a graph by going as deep as possible along each branch before backtracking.',
  complexity: { time: { best: 'O(V+E)', average: 'O(V+E)', worst: 'O(V+E)' }, space: 'O(V)' },
  defaultInput: '{"graph":{"A":["B","C"],"B":["A","D","E"],"C":["A","F"],"D":["B"],"E":["B","F"],"F":["C","E"]},"start":"A"}',
  code: {
    python: `def dfs(graph, start):\n    visited = []\n    stack = [start]\n    while stack:\n        node = stack.pop()\n        if node not in visited:\n            visited.append(node)\n            for neighbor in reversed(graph[node]):\n                if neighbor not in visited:\n                    stack.append(neighbor)\n    return visited`,
    javascript: `function dfs(graph, start) {\n  const visited = [];\n  const stack = [start];\n  while (stack.length > 0) {\n    const node = stack.pop();\n    if (!visited.includes(node)) {\n      visited.push(node);\n      for (const n of graph[node].reverse())\n        if (!visited.includes(n))\n          stack.push(n);\n    }\n  }\n  return visited;\n}`,
    java: `void dfs(Map<String,List<String>> graph, String start) {\n    Set<String> visited = new LinkedHashSet<>();\n    Stack<String> stack = new Stack<>();\n    stack.push(start);\n    while (!stack.isEmpty()) {\n        String node = stack.pop();\n        if (visited.add(node))\n            for (String n : graph.get(node))\n                if (!visited.contains(n))\n                    stack.push(n);\n    }\n}`,
    cpp: `void dfs(map<string,vector<string>>& graph, string start) {\n    set<string> visited;\n    stack<string> s;\n    s.push(start);\n    while (!s.empty()) {\n        string node = s.top(); s.pop();\n        if (visited.insert(node).second)\n            for (auto& n : graph[node])\n                if (!visited.count(n))\n                    s.push(n);\n    }\n}`,
  },
  generate: generateSteps,
}
