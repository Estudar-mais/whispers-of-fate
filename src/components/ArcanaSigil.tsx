type Props = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Selo arcano com runa central — placeholder visual elegante para cartas
 * enquanto não há ilustração própria.
 */
export function ArcanaSigil({ children, className = "" }: Props) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <div className="absolute inset-0 rounded-full bg-arcane-radial blur-2xl opacity-70" />
      <div className="absolute inset-0 rounded-full border border-gold/40 animate-orbit-slow">
        <div className="absolute -top-0.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-gold shadow-[0_0_10px_var(--gold)]" />
        <div className="absolute top-1/2 -right-0.5 h-1 w-1 -translate-y-1/2 rounded-full bg-accent" />
        <div className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gold/70" />
      </div>
      <div className="absolute inset-3 rounded-full border border-gold/20" />
      <div className="absolute inset-6 rounded-full border border-gold/10" />
      <span className="relative font-serif text-4xl gradient-text-gold">{children}</span>
    </div>
  );
}
