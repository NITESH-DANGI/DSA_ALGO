import { TreeStep, TreeNode, AlgoMeta } from '../types'

function generateSteps(input: string): TreeStep[] {
  const values = JSON.parse(input) as number[]
  const steps: TreeStep[] = []
  const nodes: TreeNode[] = []

  steps.push({ type: 'tree', nodes: [], activeNode: null, visitedNodes: [], highlightLines: [1], explanation: `BST Insert: inserting values [${values.join(', ')}]`, path: [] })

  for (const val of values) {
    const id = `n${val}`
    if (nodes.length === 0) {
      nodes.push({ id, value: val, left: null, right: null })
      steps.push({ type: 'tree', nodes: [...nodes.map(n => ({ ...n }))], activeNode: id, visitedNodes: [id], highlightLines: [3, 4], explanation: `Inserted ${val} as root`, path: [id] })
      continue
    }

    let current = nodes[0]
    const path: string[] = [current.id]
    steps.push({ type: 'tree', nodes: [...nodes.map(n => ({ ...n }))], activeNode: current.id, visitedNodes: [], highlightLines: [6], explanation: `Inserting ${val}: starting at root ${current.value}`, path: [...path] })

    while (true) {
      if (val < current.value) {
        steps.push({ type: 'tree', nodes: [...nodes.map(n => ({ ...n }))], activeNode: current.id, visitedNodes: path, highlightLines: [7, 8], explanation: `${val} < ${current.value}, go left`, path: [...path] })
        if (current.left) {
          current = nodes.find(n => n.id === current.left)!
          path.push(current.id)
        } else {
          const newNode: TreeNode = { id, value: val, left: null, right: null }
          nodes.push(newNode)
          current.left = id
          path.push(id)
          steps.push({ type: 'tree', nodes: [...nodes.map(n => ({ ...n }))], activeNode: id, visitedNodes: path, highlightLines: [9, 10], explanation: `Inserted ${val} as left child of ${current.value}`, path: [...path] })
          break
        }
      } else {
        steps.push({ type: 'tree', nodes: [...nodes.map(n => ({ ...n }))], activeNode: current.id, visitedNodes: path, highlightLines: [11, 12], explanation: `${val} >= ${current.value}, go right`, path: [...path] })
        if (current.right) {
          current = nodes.find(n => n.id === current.right)!
          path.push(current.id)
        } else {
          const newNode: TreeNode = { id, value: val, left: null, right: null }
          nodes.push(newNode)
          current.right = id
          path.push(id)
          steps.push({ type: 'tree', nodes: [...nodes.map(n => ({ ...n }))], activeNode: id, visitedNodes: path, highlightLines: [13, 14], explanation: `Inserted ${val} as right child of ${current.value}`, path: [...path] })
          break
        }
      }
    }
  }

  steps.push({ type: 'tree', nodes: [...nodes.map(n => ({ ...n }))], activeNode: null, visitedNodes: nodes.map(n => n.id), highlightLines: [15], explanation: 'BST construction complete!', path: [] })
  return steps
}

export const bstInsertMeta: AlgoMeta = {
  id: 'bst-insert', name: 'BST Insert', category: 'tree', difficulty: 'medium',
  description: 'Binary Search Tree insertion places each new value by comparing it with existing nodes and going left (smaller) or right (larger).',
  complexity: { time: { best: 'O(log n)', average: 'O(log n)', worst: 'O(n)' }, space: 'O(n)' },
  defaultInput: '[50, 30, 70, 20, 40, 60, 80]',
  code: {
    python: `class Node:\n    def __init__(self, val):\n        self.val = val\n        self.left = self.right = None\n\ndef insert(root, val):\n    if root is None:\n        return Node(val)\n    if val < root.val:\n        root.left = insert(root.left, val)\n    else:\n        root.right = insert(root.right, val)\n    return root`,
    javascript: `function insert(root, val) {\n  if (!root) return { val, left: null, right: null };\n  if (val < root.val)\n    root.left = insert(root.left, val);\n  else\n    root.right = insert(root.right, val);\n  return root;\n}`,
    java: `Node insert(Node root, int val) {\n    if (root == null) return new Node(val);\n    if (val < root.val)\n        root.left = insert(root.left, val);\n    else\n        root.right = insert(root.right, val);\n    return root;\n}`,
    cpp: `Node* insert(Node* root, int val) {\n    if (!root) return new Node(val);\n    if (val < root->val)\n        root->left = insert(root->left, val);\n    else\n        root->right = insert(root->right, val);\n    return root;\n}`,
  },
  generate: generateSteps,
}
