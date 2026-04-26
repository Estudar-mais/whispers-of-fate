import heroBg from "@/assets/hero-bg.jpg";
import { MysticParticles } from "@/components/MysticParticles";

/**
 * Plano de fundo cósmico fixo + véu — usado em todas as páginas.
 */
export function CosmicBackdrop() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-10">
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover opacity-30"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/80 to-background" />
        <div className="absolute inset-0 bg-arcane-radial opacity-50" />
      </div>
      <div className="fixed inset-0 -z-10">
        <MysticParticles count={50} />
      </div>
    </>
  );
}
