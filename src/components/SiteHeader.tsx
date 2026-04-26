import { Link } from "@tanstack/react-router";

const NAV = [
  { to: "/", label: "Carta do Dia", exact: true },
  { to: "/tiragem", label: "Tiragem" },
  { to: "/oraculo", label: "Oráculo" },
  { to: "/biblioteca", label: "Biblioteca" },
  { to: "/sobre", label: "Sobre" },
] as const;

export function SiteHeader() {
  return (
    <header className="relative z-20 flex items-center justify-between px-6 py-6 md:px-14 md:py-8">
      <Link to="/" className="flex items-center gap-3 group">
        <div className="relative h-9 w-9">
          <div className="absolute inset-0 rounded-full border border-gold/50 animate-orbit-slow">
            <div className="absolute -top-0.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-gold shadow-[0_0_10px_var(--gold)]" />
          </div>
          <div className="absolute inset-2 rounded-full bg-arcane/30 blur-sm" />
          <div className="absolute inset-[14px] rounded-full bg-gold/80" />
        </div>
        <div className="leading-tight">
          <div className="font-serif italic text-lg text-foreground transition-colors group-hover:text-gold">
            Portal Arcano
          </div>
          <div className="font-sans text-[10px] tracking-ritual uppercase text-gold/60">
            véu · oráculo · destino
          </div>
        </div>
      </Link>

      <nav className="hidden items-center gap-7 font-sans text-[11px] tracking-arcane uppercase text-muted-foreground md:flex">
        {NAV.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            activeOptions={{ exact: item.exact ?? false }}
            className="relative py-1 transition-colors hover:text-foreground data-[status=active]:text-gold"
          >
            {({ isActive }) => (
              <>
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
                )}
              </>
            )}
          </Link>
        ))}
      </nav>
    </header>
  );
}
