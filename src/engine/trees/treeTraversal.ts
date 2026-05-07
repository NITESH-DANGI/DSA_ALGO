import { TreeStep, TreeNode, AlgoMeta } from '../types'

function buildTree(values: number[]): TreeNode[] {
  const nodes: TreeNode[] = []
  for (const val of values) {
    const id = `n${val}`
    if (nodes.length === 0) { nodes.push({ id, value: val, left: null, right: null }); continue }
    let current = nodes[0]
    while (true) {
      if (val < current.value) {
        if (current.left) { current = nodes.find(n => n.id === current.left)! } else { nodes.push({ id, value: val, left: null, right: null }); current.left = id; break }
      } else {
        if (current.right) { current = nodes.find(n => n.id === current.right)! } else { nodes.push({ id, value: val, left: null, right: null }); current.right = id; break }
      }
    }
  }
  return nodes
}

function generateSteps(input: string): TreeStep[] {
  const parsed = JSON.parse(input) as { values: number[]; order: string }
  const values = parsed.values ?? JSON.parse(input)
  const order = parsed.order ?? 'inorder'
  const nodes = buildTree(Array.isArray(values) ? values : parsed.values)
  const steps: TreeStep[] = []
  const visited: string[] = []

  steps.push({ type: 'tree', nodes: [...nodes.map(n => ({ ...n }))], activeNode: null, visitedNodes: [], highlightLines: [1], explanation: `${order.charAt(0).toUpperCase() + order.slice(1)} traversal starting`, path: [] })

  function findNode(id: string): TreeNode | undefined { return nodes.find(n => n.id === id) }

  function inorder(nodeId: string | null) {
    if (!nodeId) return
    const node = findNode(nodeId)!
    inorder(node.left)
    visited.push(nodeId)
    steps.push({ type: 'tree', nodes: [...nodes.map(n => ({ ...n }))], activeNode: nodeId, visitedNodes: [...visited], highlightLines: [3, 4, 5], explanation: `Visit ${node.value} (inorder: left → node → right)`, path: [...visited] })
    inorder(node.right)
  }

  function preorder(nodeId: string | null) {
    if (!nodeId) return
    const node = findNode(nodeId)!
    visited.push(nodeId)
    steps.push({ type: 'tree', nodes: [...nodes.map(n => ({ ...n }))], activeNode: nodeId, visitedNodes: [...visited], highlightLines: [3, 4, 5], explanation: `Visit ${node.value} (preorder: node → left → right)`, path: [...visited] })
    preorder(node.left)
    preorder(node.right)
  }

  function postorder(nodeId: string | null) {
    if (!nodeId) return
    const node = findNode(nodeId)!
    postorder(node.left)
    postorder(node.right)
    visited.push(nodeId)
    steps.push({ type: 'tree', nodes: [...nodes.map(n => ({ ...n }))], activeNode: nodeId, visitedNodes: [...visited], highlightLines: [3, 4, 5], explanation: `Visit ${node.value} (postorder: left → right → node)`, path: [...visited] })
  }

  if (nodes.length > 0) {
    if (order === 'preorder') preorder(nodes[0].id)
    else if (order === 'postorder') postorder(nodes[0].id)
    else inorder(nodes[0].id)
  }

  steps.push({ type: 'tree', nodes: [...nodes.map(n => ({ ...n }))], activeNode: null, visitedNodes: [...visited], highlightLines: [7], explanation: `Traversal complete! Order: [${visited.map(id => findNode(id)?.value).join(', ')}]`, path: [...visited] })
  return steps
}

export const treeTraversalMeta: AlgoMeta = {
  id: 'tree-traversal', name: 'Tree Traversal', category: 'tree', difficulty: 'easy',
  description: 'Tree traversal visits every node in a binary tree in a specific order: inorder (LNR), preorder (NLR), or postorder (LRN).',
  complexity: { time: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' }, space: 'O(h)' },
  defaultInput: '{"values": [50, 30, 70, 20, 40, 60, 80], "order": "inorder"}',
  code: {
    python: `def inorder(root):\n    if root is None:\n        return []\n    return inorder(root.left) + [root.val] + inorder(root.right)\n\ndef preorder(root):\n    if root is None:\n        return []\n    return [root.val] + preorder(root.left) + preorder(root.right)\n\ndef postorder(root):\n    if root is None:\n        return []\n    return postorder(root.left) + postorder(root.right) + [root.val]`,
    javascript: `function inorder(root) {\n  if (!root) return [];\n  return [...inorder(root.left), root.val, ...inorder(root.right)];\n}\nfunction preorder(root) {\n  if (!root) return [];\n  return [root.val, ...preorder(root.left), ...preorder(root.right)];\n}\nfunction postorder(root) {\n  if (!root) return [];\n  return [...postorder(root.left), ...postorder(root.right), root.val];\n}`,
    java: `void inorder(Node root) {\n    if (root == null) return;\n    inorder(root.left);\n    visit(root.val);\n    inorder(root.right);\n}`,
    cpp: `void inorder(Node* root) {\n    if (!root) return;\n    inorder(root->left);\n    visit(root->val);\n    inorder(root->right);\n}`,
  },
  generate: generateSteps,
}
