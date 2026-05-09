'use client'
import { useState, useRef, useCallback } from 'react'
import Link from 'next/link'

/* ── Types ── */
interface RoadmapStep {
  id: number
  phase: string
  title: string
  subtitle: string
  icon: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime: string
  description: string
  topics: { name: string; link?: string }[]
  tips: string[]
  resources: { channel: string; title: string; url: string }[]
}

/* ── DSA Roadmap Data ── */
const STEPS: RoadmapStep[] = [
  {
    id: 1,
    phase: 'Phase 1',
    title: 'Learn the Basics',
    subtitle: 'Build your programming foundation',
    icon: 'school',
    difficulty: 'beginner',
    estimatedTime: '1–2 weeks',
    description: 'Before diving into data structures, master the fundamentals of any programming language. Understand variables, loops, conditionals, functions, and basic I/O.',
    topics: [
      { name: 'Variables, Data Types & Operators' },
      { name: 'Conditional Statements (if/else, switch)' },
      { name: 'Loops (for, while, do-while)' },
      { name: 'Functions & Recursion basics' },
      { name: 'Input / Output handling' },
      { name: 'Basic Math (modulo, power, factorial)' },
    ],
    tips: [
      'Pick one language and stick with it.',
      'Write code daily, even if it\'s just 30 minutes.',
      'Solve 10–15 easy problems to build confidence.',
    ],
    resources: [
      { channel: 'Coder Army', title: 'C++ & DSA Foundation', url: 'https://www.youtube.com/playlist?list=PLQEaRBV9gAFu4ovJ41PywklqI7IyXwr01' },
      { channel: 'Striver', title: 'A2Z DSA — Basics & Recursion', url: 'https://www.youtube.com/playlist?list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz' },
      { channel: 'Abdul Bari', title: 'Introduction to Algorithms', url: 'https://www.youtube.com/playlist?list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O' },
    ],
  },
  {
    id: 2,
    phase: 'Phase 2',
    title: 'Arrays & Strings',
    subtitle: 'The most fundamental data structures',
    icon: 'data_array',
    difficulty: 'beginner',
    estimatedTime: '2–3 weeks',
    description: 'Arrays and Strings are the backbone of DSA. Learn traversal, manipulation, two-pointer techniques, and sliding window patterns.',
    topics: [
      { name: 'Array traversal & manipulation' },
      { name: 'Linear Search', link: '/visualize/linear-search' },
      { name: 'Binary Search', link: '/visualize/binary-search' },
      { name: 'Two-pointer technique' },
      { name: 'Sliding window pattern' },
      { name: 'String reversal, palindromes, anagrams' },
    ],
    tips: [
      'Master two-pointer and sliding window — they solve 40% of array problems.',
      'Always think about edge cases: empty array, single element, duplicates.',
    ],
    resources: [
      { channel: 'Striver', title: 'Arrays — A2Z DSA Course', url: 'https://www.youtube.com/playlist?list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz' },
      { channel: 'Coder Army', title: 'Arrays & Strings in C++', url: 'https://www.youtube.com/playlist?list=PLQEaRBV9gAFu4ovJ41PywklqI7IyXwr01' },
      { channel: 'Abdul Bari', title: 'Arrays & Searching', url: 'https://www.youtube.com/playlist?list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O' },
    ],
  },
  {
    id: 3,
    phase: 'Phase 3',
    title: 'Sorting Algorithms',
    subtitle: 'Understand how data gets ordered',
    icon: 'swap_vert',
    difficulty: 'beginner',
    estimatedTime: '2 weeks',
    description: 'Sorting teaches you about time complexity, space trade-offs, and divide-and-conquer thinking. Visualize each algorithm to truly understand the logic.',
    topics: [
      { name: 'Bubble Sort', link: '/visualize/bubble-sort' },
      { name: 'Selection Sort', link: '/visualize/selection-sort' },
      { name: 'Insertion Sort', link: '/visualize/insertion-sort' },
      { name: 'Merge Sort', link: '/visualize/merge-sort' },
      { name: 'Quick Sort', link: '/visualize/quick-sort' },
      { name: 'Big O Complexity Analysis' },
    ],
    tips: [
      'Use AlgoFlow to watch each sort animate — it makes the logic click.',
      'Memorize the Big O for each sort. Interviewers love asking this.',
    ],
    resources: [
      { channel: 'Abdul Bari', title: 'Sorting Algorithms Explained', url: 'https://www.youtube.com/playlist?list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O' },
      { channel: 'Striver', title: 'Sorting Techniques — A2Z DSA', url: 'https://www.youtube.com/playlist?list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz' },
      { channel: 'Coder Army', title: 'Sorting Algorithms in C++', url: 'https://www.youtube.com/playlist?list=PLQEaRBV9gAFu4ovJ41PywklqI7IyXwr01' },
    ],
  },
  {
    id: 4,
    phase: 'Phase 4',
    title: 'Stacks & Queues',
    subtitle: 'LIFO and FIFO fundamentals',
    icon: 'stacks',
    difficulty: 'intermediate',
    estimatedTime: '2 weeks',
    description: 'These structures teach you about LIFO/FIFO principles. They are the building blocks for more complex structures like trees and graphs.',
    topics: [
      { name: 'Stack (push, pop, peek)' },
      { name: 'Queue (enqueue, dequeue)' },
      { name: 'Linked Lists (insert, delete, reverse)' },
      { name: 'Monotonic Stack pattern' },
      { name: 'Valid Parentheses, Next Greater Element' },
    ],
    tips: [
      'Draw pointer diagrams on paper for linked lists.',
      'Practice reversing a linked list until you can do it in your sleep.',
    ],
    resources: [
      { channel: 'Striver', title: 'Linked List & Stack/Queue', url: 'https://www.youtube.com/playlist?list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz' },
      { channel: 'Coder Army', title: 'Stacks, Queues & Linked Lists', url: 'https://www.youtube.com/playlist?list=PLQEaRBV9gAFu4ovJ41PywklqI7IyXwr01' },
      { channel: 'Abdul Bari', title: 'Stack & Queue Concepts', url: 'https://www.youtube.com/playlist?list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O' },
    ],
  },
  {
    id: 5,
    phase: 'Phase 5',
    title: 'Trees & BST',
    subtitle: 'Hierarchical data and recursive thinking',
    icon: 'account_tree',
    difficulty: 'intermediate',
    estimatedTime: '3–4 weeks',
    description: 'Trees are where recursion truly shines. Understanding tree traversals and BST properties unlocks a huge category of interview problems.',
    topics: [
      { name: 'Binary Tree concepts' },
      { name: 'Inorder / Preorder / Postorder', link: '/visualize/inorder-traversal' },
      { name: 'Level Order Traversal (BFS on trees)' },
      { name: 'BST Insert & Search', link: '/visualize/bst-insert' },
      { name: 'Height, Depth, Diameter' },
      { name: 'Lowest Common Ancestor' },
    ],
    tips: [
      'Think recursively: "process left, process right, combine".',
      'Visualize BST operations in AlgoFlow to see restructuring.',
    ],
    resources: [
      { channel: 'Striver', title: 'Binary Trees & BST Series', url: 'https://www.youtube.com/playlist?list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz' },
      { channel: 'Abdul Bari', title: 'Trees & BST Algorithms', url: 'https://www.youtube.com/playlist?list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O' },
      { channel: 'Coder Army', title: 'Tree Data Structures', url: 'https://www.youtube.com/playlist?list=PLQEaRBV9gAFu4ovJ41PywklqI7IyXwr01' },
    ],
  },
  {
    id: 6,
    phase: 'Phase 6',
    title: 'Hashing & Hashmaps',
    subtitle: 'O(1) lookups change everything',
    icon: 'tag',
    difficulty: 'intermediate',
    estimatedTime: '1–2 weeks',
    description: 'Hash maps turn brute-force O(n²) solutions into elegant O(n) ones. Master frequency maps, two-sum patterns, and grouping.',
    topics: [
      { name: 'Hash functions & collision handling' },
      { name: 'HashMap / Dictionary operations' },
      { name: 'Frequency counting pattern' },
      { name: 'Two Sum & variations' },
      { name: 'Group Anagrams, Subarray Sum' },
    ],
    tips: [
      'Whenever a problem says "find pair" or "check if exists" — think HashMap.',
      'Hash maps are O(1) average, O(n) worst — know when to mention this.',
    ],
    resources: [
      { channel: 'Striver', title: 'Hashing — A2Z DSA Course', url: 'https://www.youtube.com/playlist?list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz' },
      { channel: 'Abdul Bari', title: 'Hashing Techniques', url: 'https://www.youtube.com/playlist?list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O' },
      { channel: 'Coder Army', title: 'HashMap & HashSet in C++', url: 'https://www.youtube.com/playlist?list=PLQEaRBV9gAFu4ovJ41PywklqI7IyXwr01' },
    ],
  },
  {
    id: 7,
    phase: 'Phase 7',
    title: 'Graph Algorithms',
    subtitle: 'Networks, paths, and connectivity',
    icon: 'hub',
    difficulty: 'advanced',
    estimatedTime: '3–4 weeks',
    description: 'Graphs model real-world relationships. Learning BFS, DFS, and shortest path algorithms opens the door to solving complex connectivity problems.',
    topics: [
      { name: 'Graph representation (adj list / matrix)' },
      { name: 'BFS', link: '/visualize/bfs' },
      { name: 'DFS', link: '/visualize/dfs' },
      { name: "Dijkstra's Shortest Path", link: '/visualize/dijkstra' },
      { name: 'Cycle detection' },
      { name: 'Topological Sort' },
    ],
    tips: [
      'BFS = shortest path (unweighted). DFS = explore deeply first.',
      'Use AlgoFlow\'s graph canvas to watch frontiers expand.',
    ],
    resources: [
      { channel: 'Striver', title: 'Graph Series — Complete Guide', url: 'https://www.youtube.com/playlist?list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn' },
      { channel: 'Abdul Bari', title: 'Graph Algorithms (BFS, DFS, Dijkstra)', url: 'https://www.youtube.com/playlist?list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O' },
      { channel: 'Coder Army', title: 'Graph Algorithms in C++', url: 'https://www.youtube.com/playlist?list=PLQEaRBV9gAFu4ovJ41PywklqI7IyXwr01' },
    ],
  },
  {
    id: 8,
    phase: 'Phase 8',
    title: 'Dynamic Programming',
    subtitle: 'Optimization through memoization',
    icon: 'grid_on',
    difficulty: 'advanced',
    estimatedTime: '4–6 weeks',
    description: 'DP is the most feared interview topic but follows clear patterns. Start with recursion + memoization, then learn tabulation. Focus on recognizing the patterns.',
    topics: [
      { name: 'Recursion + Memoization (Top-Down)' },
      { name: 'Tabulation (Bottom-Up)' },
      { name: 'Fibonacci, Climbing Stairs' },
      { name: '0/1 Knapsack pattern' },
      { name: 'Longest Common Subsequence' },
      { name: 'Coin Change, House Robber' },
    ],
    tips: [
      'Always start with brute-force recursion, then optimize.',
      'Draw the recursion tree — overlapping subproblems = DP.',
      'Solve at least 30 DP problems to build pattern recognition.',
    ],
    resources: [
      { channel: 'Striver', title: 'Dynamic Programming Series', url: 'https://www.youtube.com/playlist?list=PLgUwDviBIf0qUlt5H_kiKYaNSqJ81PMMY' },
      { channel: 'Abdul Bari', title: 'Dynamic Programming Algorithms', url: 'https://www.youtube.com/playlist?list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O' },
      { channel: 'Coder Army', title: 'DP Complete Course', url: 'https://www.youtube.com/playlist?list=PLQEaRBV9gAFu4ovJ41PywklqI7IyXwr01' },
    ],
  },
]

/* ── Difficulty config ── */
const diffConfig = {
  beginner:     { label: 'Beginner',     color: '#4ade80', bg: 'rgba(74,222,128,0.08)',  border: 'rgba(74,222,128,0.2)' },
  intermediate: { label: 'Intermediate', color: '#d7c4a6', bg: 'rgba(215,196,166,0.08)', border: 'rgba(215,196,166,0.2)' },
  advanced:     { label: 'Advanced',     color: '#f87171', bg: 'rgba(248,113,113,0.08)', border: 'rgba(248,113,113,0.2)' },
}

/* ── Milestone badges shown on the opposite side ── */
const MILESTONES: Record<number, { icon: string; label: string; sub: string }> = {
  1: { icon: 'emoji_events', label: 'Milestone', sub: 'You can write basic programs' },
  2: { icon: 'verified', label: 'Checkpoint', sub: 'Array mastery unlocked' },
  3: { icon: 'speed', label: 'Milestone', sub: 'You understand Big O notation' },
  4: { icon: 'psychology', label: 'Checkpoint', sub: 'Linear structures conquered' },
  5: { icon: 'forest', label: 'Milestone', sub: 'Recursive thinking acquired' },
  6: { icon: 'bolt', label: 'Checkpoint', sub: 'O(1) lookup mastery' },
  7: { icon: 'public', label: 'Milestone', sub: 'Graph intuition unlocked' },
  8: { icon: 'military_tech', label: 'Interview Ready', sub: 'DSA journey complete!' },
}

/* ── Motivational Quotes ── */
const QUOTES = [
  "Bugs are just features you haven't understood yet. 🐛",
  "Every expert was once a beginner who refused to quit. 💪",
  "Your code compiles? Ship it. Fix it in production. 🚀",
  "DSA is like gym — painful today, powerful tomorrow. 🏋️",
  "Recursion: see Recursion. You'll get it eventually. 🔄",
  "O(n²) today, O(n log n) tomorrow. Keep optimizing! ⚡",
  "Stack overflow isn't just a website, it's a lifestyle. 📚",
  "You miss 100% of the edge cases you don't test. 🎯",
  "Arrays start at 0. Your excuses should too. 🔥",
  "Keep calm and console.log everything. 🧘",
]

/* ── Draggable Card Wrapper ── */
function DraggableCard({ children, style, className }: { children: React.ReactNode; style: React.CSSProperties; className?: string }) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)
  const [dragging, setDragging] = useState(false)
  const [quote, setQuote] = useState<string | null>(null)
  const dragRef = useRef<{ startX: number; startY: number; elX: number; elY: number } | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const onDown = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    const el = e.currentTarget as HTMLElement
    const rect = el.getBoundingClientRect()
    dragRef.current = { startX: clientX, startY: clientY, elX: rect.left, elY: rect.top }
    setDragging(true)

    const onMove = (ev: MouseEvent | TouchEvent) => {
      if (!dragRef.current) return
      const cx = 'touches' in ev ? ev.touches[0].clientX : ev.clientX
      const cy = 'touches' in ev ? ev.touches[0].clientY : ev.clientY
      setPos({ x: dragRef.current.elX + (cx - dragRef.current.startX), y: dragRef.current.elY + (cy - dragRef.current.startY) })
    }
    const onUp = () => {
      setDragging(false)
      dragRef.current = null
      setPos(null) // snap back to original position
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
      document.removeEventListener('touchmove', onMove)
      document.removeEventListener('touchend', onUp)
      const q = QUOTES[Math.floor(Math.random() * QUOTES.length)]
      setQuote(q)
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setQuote(null), 7000)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
    document.addEventListener('touchmove', onMove)
    document.addEventListener('touchend', onUp)
  }, [])

  const finalStyle: React.CSSProperties = pos
    ? { ...style, position: 'fixed', left: pos.x, top: pos.y, right: 'auto', bottom: 'auto', animation: 'none', cursor: 'grabbing', zIndex: 50, transition: 'none' }
    : { ...style, cursor: 'grab', transition: 'all 0.4s ease' }

  return (
    <>
      <div className={className} style={finalStyle} onMouseDown={onDown} onTouchStart={onDown}>
        {children}
      </div>
      {quote && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
          animation: 'popIn 0.35s ease-out',
        }} onClick={() => setQuote(null)}>
          <div style={{
            maxWidth: '420px', width: '90%', padding: '32px 36px', borderRadius: '20px',
            background: 'linear-gradient(145deg, rgba(22,24,28,0.95), rgba(12,14,18,0.95))',
            border: '1px solid rgba(243,223,192,0.15)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.5), 0 0 40px rgba(243,223,192,0.06)',
            textAlign: 'center',
          }} onClick={(e) => e.stopPropagation()}>
            <span className="material-symbols-outlined" style={{ fontSize: '36px', color: '#d7c4a6', marginBottom: '16px', display: 'block' }}>auto_awesome</span>
            <p style={{
              fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '17px',
              color: '#f3dfc0', lineHeight: 1.6, margin: '0 0 16px 0', fontStyle: 'italic',
            }}>
              &ldquo;{quote}&rdquo;
            </p>
            <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '11px', color: '#7a756e', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Keep going, legend 🔥
            </span>
            <div style={{ marginTop: '20px' }}>
              <button onClick={() => setQuote(null)} style={{
                padding: '8px 24px', borderRadius: '9999px', border: '1px solid rgba(243,223,192,0.15)',
                background: 'rgba(243,223,192,0.06)', color: '#d7c4a6',
                fontFamily: 'Sora, sans-serif', fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                transition: 'background 0.2s',
              }}>
                Got it ✨
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

/* ── Curved SVG connector ── */
function CurveConnector({ direction }: { direction: 'left-to-right' | 'right-to-left' }) {
  const d = direction === 'left-to-right'
    ? 'M 120 0 C 120 35, 480 35, 480 70'
    : 'M 480 0 C 480 35, 120 35, 120 70'
  return (
    <div style={{ width: '100%', height: '70px', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 0 }}>
      <svg width="600" height="70" viewBox="0 0 600 70" fill="none" style={{ maxWidth: '100%' }}>
        <path d={d} stroke="url(#curveGrad)" strokeWidth="2" fill="none" strokeDasharray="6 4" />
        <circle
          cx={direction === 'left-to-right' ? 480 : 120}
          cy={70}
          r="4"
          fill="#d7c4a6"
          opacity="0.6"
        />
        <defs>
          <linearGradient id="curveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(243,223,192,0.3)" />
            <stop offset="100%" stopColor="rgba(243,223,192,0.08)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

/* ── Component ── */
export default function RoadmapPage() {
  const [expandedId, setExpandedId] = useState<number | null>(1)

  return (
    <div style={{ minHeight: '100vh', paddingTop: '80px', paddingBottom: '80px', overflow: 'hidden', position: 'relative' }}>

      {/* ── Floating animation keyframes ── */}
      <style>{`
        @keyframes floatUp { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
        @keyframes floatDown { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(6px); } }
        @keyframes popIn { 0% { opacity:0; transform:scale(0.8) translateY(8px); } 100% { opacity:1; transform:scale(1) translateY(0); } }
        .float-card { backdrop-filter: blur(12px); transition: opacity 0.3s; }
        @media (max-width: 1400px) { .float-card { display: none !important; } }
      `}</style>

      {/* ── LEFT SIDE floating cards ── */}

      {/* Stats Card */}
      <DraggableCard className="float-card" style={{
        position: 'fixed', left: '24px', top: '120px', zIndex: 10,
        width: '180px', padding: '20px', borderRadius: '16px',
        background: 'rgba(17,19,23,0.85)', border: '1px solid rgba(243,223,192,0.08)',
        animation: 'floatUp 6s ease-in-out infinite',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { icon: 'school', value: '8', label: 'Phases', color: '#4ade80' },
            { icon: 'checklist', value: '40+', label: 'Topics', color: '#d7c4a6' },
            { icon: 'code', value: '200+', label: 'Problems', color: '#f3dfc0' },
          ].map(s => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `${s.color}12`, border: `1px solid ${s.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '18px', color: s.color }}>{s.icon}</span>
              </div>
              <div>
                <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '18px', fontWeight: 600, color: '#e2e2e8', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '11px', color: '#7a756e' }}>{s.label}</div>
              </div>
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '4px', borderTop: '1px solid rgba(243,223,192,0.06)' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#d7c4a6' }}>all_inclusive</span>
            <div>
              <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '14px', fontWeight: 600, color: '#d7c4a6', lineHeight: 1 }}>∞</div>
              <div style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '11px', color: '#7a756e' }}>Possibilities</div>
            </div>
          </div>
        </div>
      </DraggableCard>

      {/* Recommended Path Card */}
      <DraggableCard className="float-card" style={{
        position: 'fixed', left: '24px', bottom: '60px', zIndex: 10,
        width: '190px', padding: '18px', borderRadius: '16px',
        background: 'rgba(17,19,23,0.85)', border: '1px solid rgba(243,223,192,0.08)',
        animation: 'floatDown 7s ease-in-out infinite',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '13px', fontWeight: 600, color: '#e2e2e8' }}>Recommended Path</span>
          <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#7a756e' }}>route</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { text: 'Start from Phase 1', color: '#4ade80' },
            { text: 'Follow the order', color: '#988f85' },
            { text: 'Practice consistently', color: '#988f85' },
            { text: 'Revise regularly', color: '#988f85' },
            { text: 'Build & apply', color: '#988f85' },
            { text: 'Crack interviews', color: '#988f85' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color, flexShrink: 0 }} />
              <span style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '12px', color: item.color }}>{item.text}</span>
            </div>
          ))}
        </div>
      </DraggableCard>

      {/* ── RIGHT SIDE floating cards ── */}

      {/* Algorithm Mindset Card */}
      <DraggableCard className="float-card" style={{
        position: 'fixed', right: '24px', top: '120px', zIndex: 10,
        width: '210px', padding: '18px', borderRadius: '16px',
        background: 'rgba(12,14,18,0.9)', border: '1px solid rgba(243,223,192,0.08)',
        animation: 'floatDown 5.5s ease-in-out infinite',
      }}>
        <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '13px', fontWeight: 600, color: '#e2e2e8', display: 'block', marginBottom: '12px' }}>Algorithm Mindset</span>
        <div style={{
          padding: '12px', borderRadius: '10px',
          background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(243,223,192,0.05)',
          fontFamily: 'var(--font-space-mono), monospace', fontSize: '11px', lineHeight: 1.7,
        }}>
          <span style={{ color: '#c792ea' }}>while</span><span style={{ color: '#988f85' }}> (learning) {'{'}</span><br />
          <span style={{ color: '#988f85' }}>  </span><span style={{ color: '#82aaff' }}>practice</span><span style={{ color: '#988f85' }}>();</span><br />
          <span style={{ color: '#988f85' }}>  </span><span style={{ color: '#82aaff' }}>fail</span><span style={{ color: '#988f85' }}>();</span><br />
          <span style={{ color: '#988f85' }}>  </span><span style={{ color: '#82aaff' }}>learn</span><span style={{ color: '#988f85' }}>();</span><br />
          <span style={{ color: '#988f85' }}>  </span><span style={{ color: '#82aaff' }}>improve</span><span style={{ color: '#988f85' }}>();</span><br />
          <span style={{ color: '#988f85' }}>  </span><span style={{ color: '#c792ea' }}>repeat</span><span style={{ color: '#988f85' }}>();</span><br />
          <span style={{ color: '#988f85' }}>{'}'}</span><br />
          <br />
          <span style={{ color: '#546e7a' }}>{'// You got this! 💪'}</span>
        </div>
      </DraggableCard>

      {/* Pro Tips Card */}
      <DraggableCard className="float-card" style={{
        position: 'fixed', right: '24px', bottom: '60px', zIndex: 10,
        width: '210px', padding: '18px', borderRadius: '16px',
        background: 'rgba(17,19,23,0.85)', border: '1px solid rgba(243,223,192,0.08)',
        animation: 'floatUp 6.5s ease-in-out infinite',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#f3dfc0' }}>tips_and_updates</span>
          <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '13px', fontWeight: 600, color: '#e2e2e8' }}>Pro Tips</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { icon: 'edit', text: 'Pick one language and stick with it.' },
            { icon: 'schedule', text: 'Write code daily, even if just 30 mins.' },
            { icon: 'trending_up', text: 'Solve 10–15 easy problems to build confidence.' },
            { icon: 'replay', text: 'Revise and revisit important topics.' },
            { icon: 'record_voice_over', text: 'Explain concepts out loud to others.' },
          ].map((tip, i) => (
            <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '14px', color: '#4ade80', marginTop: '2px', flexShrink: 0 }}>{tip.icon}</span>
              <span style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '11px', color: '#988f85', lineHeight: 1.45 }}>{tip.text}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid rgba(243,223,192,0.06)', textAlign: 'center' }}>
          <span style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '11px', color: '#7a756e', fontStyle: 'italic' }}>Small steps, big results. 🚀</span>
        </div>
      </DraggableCard>

      {/* ── Hero ── */}
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 56px auto', padding: '0 24px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '6px 16px', borderRadius: '9999px',
          background: 'rgba(243,223,192,0.06)', border: '1px solid rgba(243,223,192,0.12)',
          marginBottom: '20px',
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#d7c4a6' }}>route</span>
          <span style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '11px', fontWeight: 600, color: '#f3dfc0', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            DSA Learning Roadmap
          </span>
        </div>

        <h1 style={{
          fontFamily: 'Sora, sans-serif', fontSize: '44px', fontWeight: 600,
          color: '#e2e2e8', margin: '0 0 16px 0', letterSpacing: '-0.03em', lineHeight: 1.15,
        }}>
          How to Start <span style={{ color: '#d7c4a6' }}>DSA</span> from Zero
        </h1>

        <p style={{
          fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '17px',
          color: '#cfc5b9', lineHeight: 1.65, margin: '0 0 28px 0',
        }}>
          A structured, step-by-step path from complete beginner to interview-ready.
          Follow each phase in order, practice consistently, and use AlgoFlow to
          visualize every algorithm along the way.
        </p>

        {/* Progress indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}>
          <span style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '12px', color: '#7a756e' }}>8 Phases</span>
          <div style={{ width: '200px', height: '4px', borderRadius: '2px', background: 'rgba(243,223,192,0.08)' }}>
            <div style={{ width: '100%', height: '100%', borderRadius: '2px', background: 'linear-gradient(90deg, #4ade80, #d7c4a6, #f87171)' }} />
          </div>
          <span style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '12px', color: '#7a756e' }}>Beginner → Advanced</span>
        </div>
      </div>

      {/* ── Zigzag Timeline ── */}
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 24px' }}>
        {STEPS.map((step, index) => {
          const isLeft = index % 2 === 0
          const isExpanded = expandedId === step.id
          const diff = diffConfig[step.difficulty]
          const isLast = index === STEPS.length - 1

          const milestone = MILESTONES[step.id]

          return (
            <div key={step.id}>
              {/* Card row with milestone on opposite side */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '20px',
                flexDirection: isLeft ? 'row' : 'row-reverse',
              }}>
                {/* Main Card */}                <div
                  onClick={() => setExpandedId(isExpanded ? null : step.id)}
                  style={{
                    flex: '0 0 62%',
                    minWidth: '320px',
                    background: isExpanded ? 'rgba(22,24,28,0.75)' : 'rgba(22,24,28,0.45)',
                    border: `1px solid ${isExpanded ? 'rgba(243,223,192,0.14)' : 'rgba(243,223,192,0.06)'}`,
                    borderRadius: '16px',
                    padding: isExpanded ? '28px' : '22px 28px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    backdropFilter: 'blur(8px)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.borderColor = 'rgba(243,223,192,0.3)'
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.4), 0 0 0 1px rgba(243,223,192,0.15)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.borderColor = isExpanded ? 'rgba(243,223,192,0.14)' : 'rgba(243,223,192,0.06)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  {/* Node circle on the inner edge */}
                  <div style={{
                    position: 'absolute',
                    top: '24px',
                    [isLeft ? 'right' : 'left']: '-22px',
                    width: '44px', height: '44px', borderRadius: '50%',
                    background: '#111317',
                    border: `2px solid ${diff.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 0 18px ${diff.bg}`,
                    zIndex: 2,
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '20px', color: diff.color }}>{step.icon}</span>
                  </div>

                  {/* Header */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px', flexWrap: 'wrap' }}>
                        <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '11px', fontWeight: 600, color: diff.color, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                          {step.phase}
                        </span>
                        <div style={{
                          padding: '2px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 600,
                          fontFamily: 'Hanken Grotesk, sans-serif',
                          color: diff.color, background: diff.bg, border: `1px solid ${diff.border}`,
                        }}>
                          {diff.label}
                        </div>
                        <span style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '11px', color: '#7a756e' }}>
                          ~{step.estimatedTime}
                        </span>
                      </div>
                      <h2 style={{
                        fontFamily: 'Sora, sans-serif', fontSize: '20px', fontWeight: 600,
                        color: '#e2e2e8', margin: 0, letterSpacing: '-0.02em',
                      }}>
                        {step.title}
                      </h2>
                      {!isExpanded && (
                        <p style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '13px', color: '#988f85', margin: '4px 0 0 0' }}>
                          {step.subtitle}
                        </p>
                      )}
                    </div>
                    <span className="material-symbols-outlined" style={{
                      fontSize: '22px', color: '#7a756e', flexShrink: 0,
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform 0.3s ease',
                    }}>
                      expand_more
                    </span>
                  </div>

                  {/* Expanded content */}
                  {isExpanded && (
                    <div style={{ marginTop: '20px' }}>
                      <p style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '14px', color: '#cfc5b9', lineHeight: 1.7, margin: '0 0 20px 0' }}>
                        {step.description}
                      </p>

                      {/* Topics */}
                      <h4 style={{ fontFamily: 'Sora, sans-serif', fontSize: '13px', fontWeight: 600, color: '#e2e2e8', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#d7c4a6' }}>checklist</span>
                        Topics to Cover
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '18px' }}>
                        {step.topics.map((topic, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '7px 12px', borderRadius: '8px', background: 'rgba(12,14,18,0.5)', border: '1px solid rgba(243,223,192,0.04)' }}>
                            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: diff.color, opacity: 0.5, flexShrink: 0 }} />
                            {topic.link ? (
                              <Link href={topic.link} onClick={(e) => e.stopPropagation()} style={{
                                fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '13px', color: '#d7c4a6',
                                textDecoration: 'underline', textUnderlineOffset: '3px',
                                transition: 'color 0.2s ease',
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.color = '#f3dfc0'}
                              onMouseLeave={(e) => e.currentTarget.style.color = '#d7c4a6'}
                              >
                                {topic.name}
                                <span className="material-symbols-outlined" style={{ fontSize: '11px', marginLeft: '4px', verticalAlign: 'middle' }}>open_in_new</span>
                              </Link>
                            ) : (
                              <span style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '13px', color: '#cfc5b9' }}>{topic.name}</span>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Tips */}
                      <h4 style={{ fontFamily: 'Sora, sans-serif', fontSize: '13px', fontWeight: 600, color: '#e2e2e8', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#f3dfc0' }}>lightbulb</span>
                        Pro Tips
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        {step.tips.map((tip, i) => (
                          <div key={i} style={{ display: 'flex', gap: '10px', padding: '8px 12px', borderRadius: '8px', background: 'rgba(243,223,192,0.03)', borderLeft: '2px solid rgba(243,223,192,0.12)' }}>
                            <span style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '13px', color: '#988f85', lineHeight: 1.5 }}>{tip}</span>
                          </div>
                        ))}
                      </div>
                      {/* YouTube Resources */}
                      <h4 style={{ fontFamily: 'Sora, sans-serif', fontSize: '13px', fontWeight: 600, color: '#e2e2e8', margin: '18px 0 10px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#ff4444' }}>play_circle</span>
                        Watch & Learn
                      </h4>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '8px' }}>
                        {step.resources.map((res, i) => (
                          <a
                            key={i}
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            style={{
                              display: 'flex', alignItems: 'center', gap: '10px',
                              padding: '10px 14px', borderRadius: '10px',
                              background: 'rgba(255,68,68,0.04)',
                              border: '1px solid rgba(255,68,68,0.1)',
                              textDecoration: 'none', transition: 'all 0.2s',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = 'rgba(255,68,68,0.25)'
                              e.currentTarget.style.background = 'rgba(255,68,68,0.08)'
                              e.currentTarget.style.transform = 'translateY(-2px)'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = 'rgba(255,68,68,0.1)'
                              e.currentTarget.style.background = 'rgba(255,68,68,0.04)'
                              e.currentTarget.style.transform = 'translateY(0)'
                            }}
                          >
                            <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'rgba(255,68,68,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#ff4444' }}>smart_display</span>
                            </div>
                            <div style={{ minWidth: 0 }}>
                              <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '12px', fontWeight: 600, color: '#e2e2e8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{res.channel}</div>
                              <div style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '11px', color: '#7a756e', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{res.title}</div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Milestone Badge on opposite side */}
                <div style={{
                  flex: 1, display: 'flex', alignItems: 'center',
                  justifyContent: isLeft ? 'flex-start' : 'flex-end',
                  paddingTop: '16px',
                }}>
                  <div style={{
                    padding: '16px 20px', borderRadius: '12px',
                    background: 'rgba(22,24,28,0.4)',
                    border: '1px solid rgba(243,223,192,0.06)',
                    textAlign: isLeft ? 'left' : 'right',
                    maxWidth: '220px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', justifyContent: isLeft ? 'flex-start' : 'flex-end' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '18px', color: diff.color }}>{milestone.icon}</span>
                      <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '11px', fontWeight: 600, color: diff.color, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{milestone.label}</span>
                    </div>
                    <p style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '13px', color: '#988f85', margin: 0, lineHeight: 1.4 }}>{milestone.sub}</p>
                  </div>
                </div>
              </div>

              {/* Curved connector between cards */}
              {!isLast && (
                <CurveConnector direction={isLeft ? 'left-to-right' : 'right-to-left'} />
              )}
            </div>
          )
        })}

        {/* ── Bottom CTA ── */}
        <div style={{
          marginTop: '56px', padding: '32px', borderRadius: '16px', textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(215,196,166,0.06), rgba(243,223,192,0.03))',
          border: '1px solid rgba(243,223,192,0.1)',
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: '36px', color: '#d7c4a6', marginBottom: '12px' }}>emoji_events</span>
          <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: '22px', fontWeight: 600, color: '#e2e2e8', margin: '0 0 8px 0' }}>
            Ready to Begin?
          </h3>
          <p style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '15px', color: '#cfc5b9', margin: '0 0 20px 0', maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6 }}>
            Start with Phase 1 and work your way up. Use AlgoFlow to visualize every algorithm as you learn.
          </p>
          <Link href="/algorithms" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '12px 28px', borderRadius: '9999px',
            background: 'linear-gradient(135deg, #f3dfc0 0%, #d7c4a6 100%)',
            color: '#111317', fontFamily: 'Sora, sans-serif', fontSize: '14px', fontWeight: 600,
            textDecoration: 'none', boxShadow: '0 4px 14px rgba(243,223,192,0.25)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)'
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(243,223,192,0.4)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 4px 14px rgba(243,223,192,0.25)'
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>play_arrow</span>
            Explore Algorithms
          </Link>
        </div>

        {/* ── Footer Quote ── */}
        <div style={{ marginTop: '48px', textAlign: 'center', padding: '0 24px' }}>
          <p style={{
            fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '15px',
            color: '#988f85', fontStyle: 'italic', lineHeight: 1.6, margin: '0 0 8px 0',
          }}>
            {'"I don\'t always mass array, but when I do, I forget to handle the edge case at index 0."'}
          </p>
          <span style={{
            fontFamily: 'Sora, sans-serif', fontSize: '12px', fontWeight: 600,
            color: '#d7c4a6', letterSpacing: '0.04em',
          }}>
            — Nitesh Dangi
          </span>
        </div>
      </div>
    </div>
  )
}
