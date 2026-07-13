export function AuthThemeToggle({ dark, onToggle, label, title }: { dark: boolean; onToggle: () => void; label: string; title: string }) {
  return <button type="button" role="switch" className={`auth-theme-toggle ${dark ? "is-night" : "is-day"}`} onClick={onToggle} aria-label={label} title={title} aria-checked={!dark}>
    <span className="theme-sky" aria-hidden="true"><i className="theme-star one"/><i className="theme-star two"/><i className="theme-star three"/><i className="theme-cloud"/><b className="theme-orb"/></span>
  </button>;
}
