// Global, always-on ambient background — four slowly drifting color blobs,
// rendered once in the root layout so every page (not just the Hero) feels
// alive. Pure CSS transforms only, so it costs nothing on the main thread.
export default function AnimatedBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <div className="absolute -left-[10%] -top-[10%] h-[50vw] max-h-[600px] w-[50vw] max-w-[600px] animate-drift rounded-full bg-cyan-glow/25 blur-3xl dark:bg-cyan-glow/15" />
      <div className="absolute -right-[10%] top-[8%] h-[45vw] max-h-[560px] w-[45vw] max-w-[560px] animate-drift rounded-full bg-violet-glow/25 blur-3xl [animation-delay:-8s] dark:bg-violet-glow/15" />
      <div className="absolute -bottom-[15%] left-[18%] h-[42vw] max-h-[520px] w-[42vw] max-w-[520px] animate-drift rounded-full bg-amber-glow/20 blur-3xl [animation-delay:-14s] dark:bg-amber-glow/10" />
      <div className="absolute bottom-[5%] right-[4%] h-[38vw] max-h-[480px] w-[38vw] max-w-[480px] animate-drift rounded-full bg-pink-500/20 blur-3xl [animation-delay:-4s] dark:bg-pink-500/10" />
    </div>
  );
}
