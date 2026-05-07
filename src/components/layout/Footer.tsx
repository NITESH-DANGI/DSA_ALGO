export default function Footer() {
  return (
    <footer
      className="border-t py-8 px-6 text-center"
      style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded flex items-center justify-center font-mono text-xs font-bold"
            style={{ background: 'var(--accent)', color: 'var(--bg)' }}
          >
            AF
          </div>
          <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
            AlgoFlow
          </span>
        </div>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          Built for learning. Open source DSA visualizer.
        </p>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          © {new Date().getFullYear()} AlgoFlow
        </p>
      </div>
    </footer>
  )
}
