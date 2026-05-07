import { TreeStep, TreeNode, AlgoMeta } from '../types'

function buildTree(values: number[]): TreeNode[] {
  const nodes: TreeNode[] = []
  for (const val of values) {
    const id = `n${val}`
    if (nodes.length === 0) { nodes.push({ id, value: val, left: null, right: null }); continue }
    let current = nodes[0]
    while (true) {
      if (val < current.value) {
        if (current.left) { current = nodes.find(n => n.id === current.left)! } else { const nn: TreeNode = { id, value: val, left: null, right: null }; nodes.push(nn); current.left = id; break }
      } else {
        if (current.right) { current = nodes.find(n => n.id === current.right)! } else { const nn: TreeNode = { id, value: val, left: null, right: null }; nodes.push(nn); current.right = id; break }
      }
    }
  }
  return nodes
}

function generateSteps(input: string): TreeStep[] {
  const parsed = JSON.parse(input) as { values: number[]; target: number }
  const values = parsed.values ?? JSON.parse(input)
  const target = parsed.target ?? values[Math.floor(Math.random() * values.length)]
  const nodes = buildTree(Array.isArray(values) ? values : parsed.values)
  const steps: TreeStep[] = []

  steps.push({ type: 'tree', nodes: [...nodes.map(n => ({ ...n }))], activeNode: null, visitedNodes: [], highlightLines: [1], explanation: `BST Search: looking for ${target}`, path: [] })

  let current: TreeNode | null = nodes[0] || null
  const path: string[] = []

  while (current) {
    path.push(current.id)
    if (current.value === target) {
      steps.push({ type: 'tree', nodes: [...nodes.map(n => ({ ...n }))], activeNode: current.id, visitedNodes: [...path], highlightLines: [4, 5], explanation: `Found ${target} at node ${current.id}!`, path: [...path] })
      return steps
    }
    if (target < current.value) {
      steps.push({ type: 'tree', nodes: [...nodes.map(n => ({ ...n }))], activeNode: current.id, visitedNodes: [...path], highlightLines: [6, 7], explanation: `${target} < ${current.value}, go left`, path: [...path] })
      current = current.left ? nodes.find(n => n.id === current!.left) || null : null
    } else {
      steps.push({ type: 'tree', nodes: [...nodes.map(n => ({ ...n }))], activeNode: current.id, visitedNodes: [...path], highlightLines: [8, 9], explanation: `${target} > ${current.value}, go right`, path: [...path] })
      current = current.right ? nodes.find(n => n.id === current!.right) || null : null
    }
  }

  steps.push({ type: 'tree', nodes: [...nodes.map(n => ({ ...n }))], activeNode: null, visitedNodes: [...path], highlightLines: [10], explanation: `${target} not found in BST.`, path: [...path] })
  return steps
}

export const bstSearchMeta: AlgoMeta = {
  id: 'bst-search', name: 'BST Search', category: 'tree', difficulty: 'easy',
  description: 'Binary Search Tree search finds a value by comparing with each node and going left or right.',
  complexity: { time: { best: 'O(1)', average: 'O(log n)', worst: 'O(n)' }, space: 'O(1)' },
  defaultInput: '{"values": [50, 30, 70, 20, 40, 60, 80], "target": 40}',
  code: {
    python: `def bst_search(root, target):\n    if root is None:\n        return None\n    if target == root.val:\n        return root\n    if target < root.val:\n        return bst_search(root.left, target)\n    return bst_search(root.right, target)`,
    javascript: `function bstSearch(root, target) {\n  if (!root) return null;\n  if (target === root.val) return root;\n  if (target < root.val)\n    return bstSearch(root.left, target);\n  return bstSearch(root.right, target);\n}`,
    java: `Node bstSearch(Node root, int target) {\n    if (root == null) return null;\n    if (target == root.val) return root;\n    if (target < root.val)\n        return bstSearch(root.left, target);\n    return bstSearch(root.right, target);\n}`,
    cpp: `Node* bstSearch(Node* root, int target) {\n    if (!root) return nullptr;\n    if (target == root->val) return root;\n    if (target < root->val)\n        return bstSearch(root->left, target);\n    return bstSearch(root->right, target);\n}`,
  },
  generate: generateSteps,
}
