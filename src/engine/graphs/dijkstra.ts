import { GraphStep, AlgoMeta } from '../types'

function generateSteps(input: string): GraphStep[] {
  const parsed = JSON.parse(input) as { graph: Record<string, string[]>; weights: Record<string, number>; start: string }
  const graph = parsed.graph
  const weights = parsed.weights
  const start = parsed.start || Object.keys(graph)[0]
  const steps: GraphStep[] = []
  const visited: string[] = []
  const visitedEdges: string[] = []
  const dist: Record<string, number> = {}
  const nodes = Object.keys(graph)
  for (const n of nodes) dist[n] = Infinity
  dist[start] = 0
  const unvisited = new Set(nodes)

  steps.push({ type: 'graph', visitedNodes: [], visitedEdges: [], activeNode: start, frontier: [...unvisited], highlightLines: [1, 2, 3], explanation: `Dijkstra from ${start}. All distances = ∞ except d[${start}]=0`, distances: { ...dist } })

  while (unvisited.size > 0) {
    let u = '', minD = Infinity
    for (const n of unvisited) { if (dist[n] < minD) { minD = dist[n]; u = n } }
    if (u === '' || minD === Infinity) break
    unvisited.delete(u)
    visited.push(u)

    steps.push({ type: 'graph', visitedNodes: [...visited], visitedEdges: [...visitedEdges], activeNode: u, frontier: [...unvisited], highlightLines: [5, 6], explanation: `Visit ${u} (distance = ${dist[u]})`, distances: { ...dist } })

    for (const v of graph[u] || []) {
      const edgeKey = [u, v].sort().join('-')
      const w = weights[edgeKey] || weights[`${u}-${v}`] || weights[`${v}-${u}`] || 1
      const alt = dist[u] + w
      if (alt < dist[v]) {
        dist[v] = alt
        if (!visitedEdges.includes(edgeKey)) visitedEdges.push(edgeKey)
        steps.push({ type: 'graph', visitedNodes: [...visited], visitedEdges: [...visitedEdges], activeNode: u, frontier: [...unvisited], highlightLines: [8, 9, 10], explanation: `Relaxed ${u}→${v}: d[${v}] = ${alt} (was ${dist[v] === Infinity ? '∞' : dist[v] + w - alt + alt})`, distances: { ...dist } })
      }
    }
  }

  steps.push({ type: 'graph', visitedNodes: [...visited], visitedEdges: [...visitedEdges], activeNode: null, frontier: [], highlightLines: [12], explanation: `Dijkstra complete! Shortest distances: ${nodes.map(n => `${n}:${dist[n]}`).join(', ')}`, distances: { ...dist } })
  return steps
}

export const dijkstraMeta: AlgoMeta = {
  id: 'dijkstra', name: "Dijkstra's Algorithm", category: 'graph', difficulty: 'hard',
  description: "Dijkstra's algorithm finds the shortest path from a source node to all other nodes in a weighted graph.",
  complexity: { time: { best: 'O(V²)', average: 'O(V²)', worst: 'O(V²)' }, space: 'O(V)' },
  defaultInput: '{"graph":{"A":["B","C"],"B":["A","D","E"],"C":["A","F"],"D":["B"],"E":["B","F"],"F":["C","E"]},"weights":{"A-B":4,"A-C":2,"B-D":5,"B-E":1,"C-F":8,"E-F":3},"start":"A"}',
  code: {
    python: `def dijkstra(graph, weights, start):\n    dist = {n: float('inf') for n in graph}\n    dist[start] = 0\n    unvisited = set(graph.keys())\n    while unvisited:\n        u = min(unvisited, key=lambda n: dist[n])\n        unvisited.remove(u)\n        for v in graph[u]:\n            w = weights.get(f"{u}-{v}", weights.get(f"{v}-{u}", 1))\n            if dist[u] + w < dist[v]:\n                dist[v] = dist[u] + w\n    return dist`,
    javascript: `function dijkstra(graph, weights, start) {\n  const dist = {};\n  for (const n in graph) dist[n] = Infinity;\n  dist[start] = 0;\n  const unvisited = new Set(Object.keys(graph));\n  while (unvisited.size > 0) {\n    let u = null, minD = Infinity;\n    for (const n of unvisited)\n      if (dist[n] < minD) { minD = dist[n]; u = n; }\n    unvisited.delete(u);\n    for (const v of graph[u]) {\n      const w = weights[u+"-"+v] || weights[v+"-"+u] || 1;\n      if (dist[u] + w < dist[v])\n        dist[v] = dist[u] + w;\n    }\n  }\n  return dist;\n}`,
    java: `Map<String,Integer> dijkstra(Map<String,List<String>> graph,\n    Map<String,Integer> weights, String start) {\n    Map<String,Integer> dist = new HashMap<>();\n    for (String n : graph.keySet()) dist.put(n, Integer.MAX_VALUE);\n    dist.put(start, 0);\n    Set<String> unvisited = new HashSet<>(graph.keySet());\n    while (!unvisited.isEmpty()) {\n        String u = Collections.min(unvisited,\n            Comparator.comparingInt(dist::get));\n        unvisited.remove(u);\n        for (String v : graph.get(u)) {\n            int w = weights.getOrDefault(u+"-"+v, 1);\n            if (dist.get(u) + w < dist.get(v))\n                dist.put(v, dist.get(u) + w);\n        }\n    }\n    return dist;\n}`,
    cpp: `map<string,int> dijkstra(map<string,vector<string>>& graph,\n    map<string,int>& weights, string start) {\n    map<string,int> dist;\n    for (auto& [k,v] : graph) dist[k] = INT_MAX;\n    dist[start] = 0;\n    set<string> unvisited;\n    for (auto& [k,v] : graph) unvisited.insert(k);\n    while (!unvisited.empty()) {\n        string u = *min_element(unvisited.begin(), unvisited.end(),\n            [&](auto& a, auto& b) { return dist[a] < dist[b]; });\n        unvisited.erase(u);\n        for (auto& v : graph[u]) {\n            int w = weights.count(u+"-"+v) ? weights[u+"-"+v] : 1;\n            if (dist[u] + w < dist[v])\n                dist[v] = dist[u] + w;\n        }\n    }\n    return dist;\n}`,
  },
  generate: generateSteps,
}
