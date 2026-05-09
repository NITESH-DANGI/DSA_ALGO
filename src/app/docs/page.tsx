'use client'
import { useState } from 'react'
import Link from 'next/link'

/* ── Shared inline styles ── */
const pStyle: React.CSSProperties = {
  fontSize: '14px', lineHeight: 1.7, color: '#cfc5b9', margin: '0 0 14px 0',
  fontFamily: 'Hanken Grotesk, sans-serif',
}
const h4Style: React.CSSProperties = {
  fontFamily: 'Sora, sans-serif', fontSize: '15px', fontWeight: 600,
  color: '#e2e2e8', margin: '20px 0 10px 0', letterSpacing: '-0.01em',
}
const linkStyle: React.CSSProperties = { color: '#d7c4a6', textDecoration: 'underline', textUnderlineOffset: '3px' }
const kbdStyle: React.CSSProperties = {
  display: 'inline-block', padding: '2px 8px', borderRadius: '5px', fontSize: '12px',
  fontFamily: 'var(--font-space-mono), monospace', fontWeight: 600,
  background: 'rgba(40,42,46,0.8)', border: '1px solid rgba(243,223,192,0.12)',
  color: '#d7c4a6', boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
}
const codeStyle: React.CSSProperties = {
  fontFamily: 'var(--font-space-mono), monospace', fontSize: '12px',
  padding: '1px 6px', borderRadius: '4px',
  background: 'rgba(12,14,18,0.6)', color: '#d7c4a6',
}
const codeBlockStyle: React.CSSProperties = {
  padding: '14px 18px', borderRadius: '10px', overflow: 'auto',
  background: 'rgba(12,14,18,0.7)', border: '1px solid rgba(243,223,192,0.06)',
  fontSize: '12px', lineHeight: 1.6, marginBottom: '14px',
}
const olStyle: React.CSSProperties = { paddingLeft: '20px', margin: '0 0 14px 0', color: '#cfc5b9', fontSize: '13px', lineHeight: 1.8 }
const ulStyle: React.CSSProperties = { paddingLeft: '20px', margin: '0 0 14px 0', color: '#cfc5b9', fontSize: '13px', lineHeight: 1.8 }
const tableStyle: React.CSSProperties = {
  width: '100%', borderCollapse: 'collapse' as const, marginBottom: '14px',
  fontSize: '12px', fontFamily: 'Hanken Grotesk, sans-serif',
}
const thStyle: React.CSSProperties = {
  textAlign: 'left', padding: '8px 12px', fontWeight: 600, color: '#d7c4a6',
  borderBottom: '1px solid rgba(243,223,192,0.1)', fontSize: '11px',
  letterSpacing: '0.06em', textTransform: 'uppercase' as const,
}
const tdStyle: React.CSSProperties = {
  padding: '8px 12px', color: '#988f85',
  borderBottom: '1px solid rgba(243,223,192,0.04)',
}

/* ── Section data ── */
interface DocSection {
  id: string
  icon: string
  title: string
  content: React.ReactNode
}

const SECTIONS: DocSection[] = [
  {
    id: 'getting-started',
    icon: 'rocket_launch',
    title: 'Getting Started',
    content: (
      <>
        <p style={pStyle}>
          Welcome to <strong>AlgoFlow</strong>, the premium visual algorithm laboratory. AlgoFlow is designed to help you <strong>watch algorithms think</strong> by stepping through sorting, graph traversal, and tree operations with beautiful animated visuals and synchronized code highlighting.
        </p>
        <h4 style={h4Style}>Quick Start Guide</h4>
        <ol style={olStyle}>
          <li>Navigate to the <Link href="/algorithms" style={linkStyle}>Algorithm Library</Link> by clicking <strong>Explore</strong> or <strong>Start Coding</strong> in the navbar.</li>
          <li>Choose an algorithm you want to learn about, such as Bubble Sort, Breadth-First Search (BFS), or Binary Search Tree Insertion.</li>
          <li>Once in the visualizer, press <kbd style={kbdStyle}>Space</kbd> to start the automated playback, or use the play button in the bottom control bar.</li>
          <li>To step through the algorithm manually and understand each individual operation, use the <kbd style={kbdStyle}>←</kbd> and <kbd style={kbdStyle}>→</kbd> arrow keys or the step buttons.</li>
        </ol>
        <h4 style={h4Style}>Custom Inputs & Experimentation</h4>
        <p style={pStyle}>
          AlgoFlow is fully interactive. Each visualizer includes a custom input editor at the top of the screen.
        </p>
        <ul style={ulStyle}>
          <li><strong>Sorting:</strong> Enter a comma-separated list of numbers (e.g., <code style={codeStyle}>5, 2, 9, 1, 5, 6</code>).</li>
          <li><strong>Searching:</strong> Provide an array of numbers and a specific target to find.</li>
          <li><strong>Graphs:</strong> Build a custom graph by defining nodes and the edges connecting them.</li>
        </ul>
        <p style={pStyle}>
          After entering your data, hit the <strong>Visualize</strong> button or press <kbd style={kbdStyle}>Enter</kbd> to run the algorithm on your custom input.
        </p>
      </>
    ),
  },
  {
    id: 'architecture',
    icon: 'apartment',
    title: 'Architecture',
    content: (
      <>
        <p style={pStyle}>
          AlgoFlow is built on modern web technologies to ensure high performance and a buttery-smooth user experience. The stack includes <strong>Next.js 16</strong> (App Router), React 19, TypeScript, and Zustand for state management. A key architectural decision is the strict decoupling of the visualizer engine from the user interface.
        </p>
        <h4 style={h4Style}>Core Layers</h4>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Layer</th>
              <th style={thStyle}>Path</th>
              <th style={thStyle}>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={tdStyle}>Engine</td><td style={tdStyle}><code style={codeStyle}>/engine</code></td><td style={tdStyle}>Pure JavaScript/TypeScript step-generation functions for each algorithm. No UI or React dependencies exist here.</td></tr>
            <tr><td style={tdStyle}>Registry</td><td style={tdStyle}><code style={codeStyle}>/engine/registry.ts</code></td><td style={tdStyle}>The central hub exporting all <code style={codeStyle}>AlgoMeta</code> objects, containing metadata, default inputs, and code snippets.</td></tr>
            <tr><td style={tdStyle}>Store</td><td style={tdStyle}><code style={codeStyle}>/store</code></td><td style={tdStyle}>Zustand store managing global playback state, the array of computed steps, speed, and selected language.</td></tr>
            <tr><td style={tdStyle}>Canvas</td><td style={tdStyle}><code style={codeStyle}>/components/canvas</code></td><td style={tdStyle}>React components responsible for rendering the visual state: SortingCanvas, GraphCanvas, etc.</td></tr>
            <tr><td style={tdStyle}>Shell</td><td style={tdStyle}><code style={codeStyle}>/components/visualizer</code></td><td style={tdStyle}>The layout wrappers including VisualizerShell, ControlBar, Sidebar, and InputEditor.</td></tr>
          </tbody>
        </table>
        <h4 style={h4Style}>Data Flow Lifecycle</h4>
        <div style={codeBlockStyle}>
          <code style={{ color: '#d7c4a6', whiteSpace: 'pre' }}>
{`1. User submits custom input via InputEditor.
2. The UI calls the specific algorithm's generate(input) function.
3. The engine computes the entire execution synchronously, returning Step[].
4. These steps are loaded into the Zustand store.
5. The usePlayback hook increments currentStepIndex based on speed.
6. The Canvas component subscribes to the step and re-renders.`}
          </code>
        </div>
      </>
    ),
  },
  {
    id: 'algorithms',
    icon: 'functions',
    title: 'Algorithms',
    content: (
      <>
        <p style={pStyle}>
          AlgoFlow currently supports a variety of fundamental computer science algorithms, categorized by their data structure and primary operation. Every algorithm strictly implements the <code style={codeStyle}>AlgoMeta</code> interface.
        </p>
        <h4 style={h4Style}>Available Categories</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '12px' }}>
          {[
            { icon: 'swap_vert', cat: 'Sorting', items: 'Bubble, Selection, Insertion, Merge, Quick Sort', desc: 'Visualized using dynamic bar charts with distinct colors for comparisons, swaps, and sorted elements.' },
            { icon: 'search', cat: 'Searching', items: 'Linear Search, Binary Search', desc: 'Step-by-step array traversal with boundary highlights.' },
            { icon: 'hub', cat: 'Graph', items: 'BFS, DFS, Dijkstra', desc: 'Force-directed graph layouts showing node frontiers and visited paths.' },
            { icon: 'account_tree', cat: 'Tree', items: 'BST Insertion, BST Search, Inorder Traversal', desc: 'Hierarchical tree rendering demonstrating recursive operations.' },
          ].map(c => (
            <div key={c.cat} style={{ padding: '16px', borderRadius: '12px', background: 'rgba(30,32,36,0.5)', border: '1px solid rgba(243,223,192,0.08)', transition: 'all 0.3s ease' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.borderColor = 'rgba(243,223,192,0.25)'
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3), 0 0 0 1px rgba(243,223,192,0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderColor = 'rgba(243,223,192,0.08)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#d7c4a6' }}>{c.icon}</span>
                <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '15px', fontWeight: 600, color: '#e2e2e8' }}>{c.cat}</span>
              </div>
              <p style={{ fontSize: '13px', color: '#cfc5b9', lineHeight: 1.5, margin: '0 0 8px 0' }}>{c.items}</p>
              <p style={{ fontSize: '11px', color: '#7a756e', lineHeight: 1.4, margin: 0 }}><em>{c.desc}</em></p>
            </div>
          ))}
        </div>
        <h4 style={h4Style}>Understanding Step Types</h4>
        <p style={pStyle}>The engine generates abstract step objects that are agnostic to the UI. The canvases interpret these steps:</p>
        <ul style={ulStyle}>
          <li><code style={codeStyle}>SortStep</code>: Contains the array snapshot, indices being compared or swapped, and the indices of fully sorted elements.</li>
          <li><code style={codeStyle}>GraphStep</code>: Defines the current active node, the frontier (queue/stack), the set of visited nodes, and active edges.</li>
          <li><code style={codeStyle}>TreeStep</code>: Represents the tree structure, the actively evaluated node, and the path taken from the root.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'api-reference',
    icon: 'code',
    title: 'API Reference',
    content: (
      <>
        <h4 style={h4Style}>The AlgoMeta Interface</h4>
        <p style={pStyle}>This is the core contract every algorithm must fulfill to be integrated into AlgoFlow.</p>
        <div style={codeBlockStyle}>
          <code style={{ color: '#d7c4a6', whiteSpace: 'pre' }}>{`export interface AlgoMeta {
  id: string; // Unique identifier (e.g., 'bubble-sort')
  name: string; // Display name
  description: string; // Short summary
  category: 'sorting' | 'searching' | 'graph' | 'tree';
  difficulty: 'easy' | 'medium' | 'hard';
  complexity: {
    time: { best: string; average: string; worst: string };
    space: string;
  };
  defaultInput: string; // Default input state for the editor
  code: Record<Language, string>; // Source code snippets
  generate: (input: string) => Step[]; // The generator function
}`}</code>
        </div>

        <h4 style={h4Style}>Zustand Store Actions (<code style={codeStyle}>useVisualizerStore</code>)</h4>
        <table style={tableStyle}>
          <thead>
            <tr><th style={thStyle}>Action</th><th style={thStyle}>Signature</th><th style={thStyle}>Description</th></tr>
          </thead>
          <tbody>
            <tr><td style={tdStyle}>loadAlgo</td><td style={tdStyle}><code style={codeStyle}>(id: string, steps: any[]) → void</code></td><td style={tdStyle}>Initializes the store with new algorithm steps.</td></tr>
            <tr><td style={tdStyle}>play / pause</td><td style={tdStyle}><code style={codeStyle}>() → void</code></td><td style={tdStyle}>Toggles the active playback state.</td></tr>
            <tr><td style={tdStyle}>stepForward</td><td style={tdStyle}><code style={codeStyle}>() → void</code></td><td style={tdStyle}>Advances to the next step, pausing playback.</td></tr>
            <tr><td style={tdStyle}>stepBack</td><td style={tdStyle}><code style={codeStyle}>() → void</code></td><td style={tdStyle}>Returns to the previous step, pausing playback.</td></tr>
            <tr><td style={tdStyle}>setSpeed</td><td style={tdStyle}><code style={codeStyle}>(speed: number) → void</code></td><td style={tdStyle}>Updates playback interval. Higher = faster.</td></tr>
            <tr><td style={tdStyle}>setLanguage</td><td style={tdStyle}><code style={codeStyle}>(lang: Language) → void</code></td><td style={tdStyle}>Updates selected programming language globally.</td></tr>
          </tbody>
        </table>
      </>
    ),
  },
  {
    id: 'customization',
    icon: 'palette',
    title: 'Customization & Theming',
    content: (
      <>
        <p style={pStyle}>
          AlgoFlow employs a strict design system driven by CSS custom properties (variables) defined in <code style={codeStyle}>src/app/globals.css</code>. This approach makes global theming incredibly straightforward.
        </p>
        <h4 style={h4Style}>Global Design Tokens</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {[
            { token: '--bg', value: '#111317', label: 'Main Background' },
            { token: '--primary', value: '#f3dfc0', label: 'Primary Highlights (Gold)' },
            { token: '--accent', value: '#d7c4a6', label: 'Secondary Accents' },
            { token: '--on-surface', value: '#e2e2e8', label: 'Primary Text' },
            { token: '--outline', value: '#988f85', label: 'Muted Text / Icons' },
            { token: '--border', value: 'rgba(243,223,192,0.1)', label: 'Panel Borders' },
          ].map(t => (
            <div key={t.token} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '8px', background: 'rgba(30,32,36,0.5)', border: '1px solid rgba(243,223,192,0.06)', transition: 'all 0.2s ease' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(30,32,36,0.8)'
                e.currentTarget.style.borderColor = 'rgba(243,223,192,0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(30,32,36,0.5)'
                e.currentTarget.style.borderColor = 'rgba(243,223,192,0.06)'
              }}
            >
              <div style={{ width: '18px', height: '18px', borderRadius: '4px', background: t.value, border: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }} />
              <div>
                <code style={{ ...codeStyle, fontSize: '12px' }}>{t.token}</code>
                <span style={{ display: 'block', fontSize: '11px', color: '#7a756e', marginTop: '2px' }}>{t.label}</span>
              </div>
            </div>
          ))}
        </div>
        <h4 style={h4Style}>Extending the Application</h4>
        <p style={pStyle}>To add a new algorithm to AlgoFlow, follow these steps:</p>
        <ol style={olStyle}>
          <li>Create a new TypeScript file in the appropriate category folder (e.g., <code style={codeStyle}>/src/engine/sorting/mySort.ts</code>).</li>
          <li>Write your <code style={codeStyle}>generate(input)</code> function that returns an array of standard steps.</li>
          <li>Define the <code style={codeStyle}>AlgoMeta</code> object export, ensuring all required fields are populated.</li>
          <li>Import and add your algorithm to the <code style={codeStyle}>ALGO_REGISTRY</code> array inside <code style={codeStyle}>/src/engine/registry.ts</code>.</li>
          <li>The application dynamically handles the rest—your algorithm will immediately appear on the Explore page!</li>
        </ol>
      </>
    ),
  },
  {
    id: 'keyboard-shortcuts',
    icon: 'keyboard',
    title: 'Keyboard Shortcuts',
    content: (
      <>
        <p style={pStyle}>Enhance your workflow and navigate algorithms faster using these global keyboard shortcuts. These shortcuts are active anywhere within the visualizer interface.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {[
            { key: 'Space', action: 'Toggle Play / Pause' },
            { key: '→', action: 'Step Forward' },
            { key: '←', action: 'Step Back' },
            { key: 'Home', action: 'Reset to Start (Step 0)' },
            { key: 'End', action: 'Jump to Last Step' },
            { key: 'Enter', action: 'Visualize Custom Input' },
          ].map(s => (
            <div key={s.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: '8px', background: 'rgba(30,32,36,0.5)', border: '1px solid rgba(243,223,192,0.06)', transition: 'all 0.2s ease' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(30,32,36,0.8)'
                e.currentTarget.style.borderColor = 'rgba(243,223,192,0.15)'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(30,32,36,0.5)'
                e.currentTarget.style.borderColor = 'rgba(243,223,192,0.06)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <kbd style={kbdStyle}>{s.key}</kbd>
              <span style={{ fontSize: '13px', color: '#988f85', fontWeight: 500 }}>{s.action}</span>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: 'troubleshooting',
    icon: 'build',
    title: 'Troubleshooting & FAQ',
    content: (
      <>
        <h4 style={h4Style}>Common Issues</h4>
        <ul style={ulStyle}>
          <li style={{ marginBottom: '12px' }}>
            <strong style={{ color: '#e2e2e8', display: 'block', marginBottom: '4px' }}>The visualizer is lagging or skipping steps.</strong>
            Try reducing the playback speed using the slider in the control bar. Very large custom inputs can generate thousands of steps, which may cause rendering delays on older hardware.
          </li>
          <li style={{ marginBottom: '12px' }}>
            <strong style={{ color: '#e2e2e8', display: 'block', marginBottom: '4px' }}>My custom graph input isn't rendering correctly.</strong>
            Ensure your JSON format is strictly correct. It must be an object containing a <code>nodes</code> array and a <code>links</code> array. Missing commas or quotes will cause parsing errors.
          </li>
          <li>
            <strong style={{ color: '#e2e2e8', display: 'block', marginBottom: '4px' }}>The Code Panel isn't updating during playback.</strong>
            Ensure you haven't scrolled manually within the code panel. If you scroll, the auto-follow feature might temporarily disable so you can read freely. Pause and play again or click on a step to re-sync.
          </li>
        </ul>
        <h4 style={h4Style}>Browser Support</h4>
        <p style={pStyle}>AlgoFlow is optimized for modern browsers (Chrome, Firefox, Safari, Edge) that support ES6 modules, CSS Custom Properties, and Backdrop Filters. Older browsers may lack smooth animations or glass-morphism effects.</p>
      </>
    )
  }
];




/* ── Page Component ── */
export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('getting-started')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredSections = searchQuery.trim()
    ? SECTIONS.filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : SECTIONS

  const currentSection = SECTIONS.find(s => s.id === activeSection) || SECTIONS[0]

  return (
    <div style={{ marginTop: '56px', display: 'flex', minHeight: 'calc(100vh - 56px)' }}>
      {/* Sidebar */}
      <aside style={{
        width: '260px', flexShrink: 0, padding: '24px 16px',
        borderRight: '1px solid rgba(243,223,192,0.06)',
        background: 'rgba(26,28,32,0.5)', display: 'flex', flexDirection: 'column', gap: '6px',
        position: 'sticky', top: '56px', height: 'calc(100vh - 56px)', overflowY: 'auto',
      }}>
        {/* Search */}
        <div style={{ position: 'relative', marginBottom: '12px' }}>
          <span className="material-symbols-outlined" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px', color: '#7a756e' }}>search</span>
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search docs…"
            style={{
              width: '100%', padding: '8px 10px 8px 32px', borderRadius: '8px',
              border: '1px solid rgba(243,223,192,0.08)', background: 'rgba(12,14,18,0.5)',
              color: '#e2e2e8', fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '12px',
              outline: 'none',
            }}
          />
        </div>

        <span style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7a756e', padding: '0 10px', marginBottom: '4px' }}>
          DOCUMENTATION
        </span>

        {filteredSections.map(section => {
          const isActive = activeSection === section.id
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '9px 12px', borderRadius: '8px', border: 'none',
                cursor: 'pointer', width: '100%', textAlign: 'left',
                fontFamily: 'Sora, sans-serif', fontSize: '13px', fontWeight: 500,
                color: isActive ? '#f3dfc0' : '#988f85',
                background: isActive ? 'rgba(243,223,192,0.06)' : 'transparent',
                borderLeft: isActive ? '2px solid #d7c4a6' : '2px solid transparent',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.background = 'rgba(243,223,192,0.03)'
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.background = 'transparent'
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px', color: isActive ? '#d7c4a6' : '#7a756e' }}>{section.icon}</span>
              {section.title}
            </button>
          )
        })}

        {/* Bottom link */}
        <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid rgba(243,223,192,0.06)' }}>
          <a href="https://github.com/NITESH-DANGI/DSA_ALGO" target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', borderRadius: '8px', textDecoration: 'none', fontSize: '12px', color: '#7a756e', fontFamily: 'Hanken Grotesk, sans-serif', transition: 'all 0.2s ease' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#f3dfc0'
              e.currentTarget.style.background = 'rgba(243,223,192,0.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#7a756e'
              e.currentTarget.style.background = 'transparent'
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>code</span>
            View on GitHub
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '32px 48px', maxWidth: '820px' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '24px', fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '12px', color: '#7a756e' }}>
          <Link href="/" style={{ color: '#7a756e', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <span style={{ color: '#988f85' }}>Docs</span>
          <span>/</span>
          <span style={{ color: '#d7c4a6' }}>{currentSection.title}</span>
        </div>

        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
          <div style={{
            width: '42px', height: '42px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(135deg, rgba(215,196,166,0.12), rgba(243,223,192,0.06))',
            border: '1px solid rgba(243,223,192,0.1)',
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: '22px', color: '#d7c4a6' }}>{currentSection.icon}</span>
          </div>
          <div>
            <h1 style={{ fontFamily: 'Sora, sans-serif', fontSize: '28px', fontWeight: 600, color: '#e2e2e8', margin: 0, letterSpacing: '-0.02em' }}>
              {currentSection.title}
            </h1>
            <p style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '12px', color: '#7a756e', margin: '2px 0 0' }}>
              AlgoFlow Documentation
            </p>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(243,223,192,0.08)', marginBottom: '28px' }} />

        {/* Content */}
        <article>
          {currentSection.content}
        </article>

        {/* Prev / Next nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '48px', paddingTop: '20px', borderTop: '1px solid rgba(243,223,192,0.06)' }}>
          {(() => {
            const idx = SECTIONS.findIndex(s => s.id === activeSection)
            const prev = idx > 0 ? SECTIONS[idx - 1] : null
            const next = idx < SECTIONS.length - 1 ? SECTIONS[idx + 1] : null
            return (
              <>
                {prev ? (
                  <button onClick={() => setActiveSection(prev.id)} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', color: '#988f85', fontFamily: 'Sora, sans-serif', fontSize: '13px', padding: 0, transition: 'color 0.2s ease' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#f3dfc0'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#988f85'}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
                    {prev.title}
                  </button>
                ) : <div />}
                {next ? (
                  <button onClick={() => setActiveSection(next.id)} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', color: '#d7c4a6', fontFamily: 'Sora, sans-serif', fontSize: '13px', padding: 0, transition: 'color 0.2s ease' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#f3dfc0'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#d7c4a6'}
                  >
                    {next.title}
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
                  </button>
                ) : <div />}
              </>
            )
          })()}
        </div>
      </main>
    </div>
  )
}
