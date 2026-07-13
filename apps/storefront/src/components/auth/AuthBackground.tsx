import { useEffect, useRef, type ReactNode } from "react";

export function AuthBackground({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => { const node = root.current; if (!node || matchMedia("(prefers-reduced-motion: reduce)").matches || matchMedia("(pointer: coarse)").matches) return; const move = (event: PointerEvent) => { const x = (event.clientX / innerWidth - .5) * 8; const y = (event.clientY / innerHeight - .5) * 8; node.style.setProperty("--auth-x", `${x}px`); node.style.setProperty("--auth-y", `${y}px`); }; addEventListener("pointermove", move); return () => removeEventListener("pointermove", move); }, []);
  return <div ref={root} className="auth-experience-bg"><div className="auth-grid" /><div className="auth-glow" /><div className="auth-particles" aria-hidden="true">{Array.from({ length: 7 }, (_, index) => <i key={index} />)}</div><div className="auth-fragments" aria-hidden="true"><i /><i /><i /></div>{children}</div>;
}
