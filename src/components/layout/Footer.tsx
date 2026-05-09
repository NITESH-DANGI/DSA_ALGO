export default function Footer() {
  const links = ['ARCHITECTURE', 'PRIVACY', 'SYSTEM_STATUS', 'API_V1']

  return (
    <footer
      className="border-t py-6 px-6"
      style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}
    >
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span
          className="text-xs tracking-[0.2em] uppercase"
          style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-space-mono), monospace' }}
        >
          ALGOFLOW
        </span>

        <div className="flex items-center gap-6 flex-wrap justify-center">
          {links.map(label => (
            <a
              key={label}
              href="#"
              className="text-[10px] tracking-[0.15em] uppercase transition-colors hover:text-[var(--accent)]"
              style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-space-mono), monospace' }}
            >
              {label}
            </a>
          ))}
        </div>

        <span
          className="text-[10px] tracking-[0.1em] uppercase"
          style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-space-mono), monospace' }}
        >
          © {new Date().getFullYear()} ALGOFLOW NEURAL SYSTEMS
        </span>
      </div>
    </footer>
  )
}
