import { Icon } from "./Icon";

export function ProductCardSkeleton() {
  return <div className="product-card skeleton-card" aria-hidden="true"><span className="skeleton skeleton-visual" /><div className="product-body"><span className="skeleton skeleton-chip" /><span className="skeleton skeleton-title" /><span className="skeleton skeleton-copy" /><span className="skeleton skeleton-price" /></div></div>;
}

export function SectionSkeleton({ cards = 4 }: { cards?: number }) {
  return <section className="section content-section" aria-busy="true" aria-label="Loading"><div className="section-heading"><div><span className="skeleton skeleton-heading" /><span className="skeleton skeleton-copy" /></div></div><div className="product-grid">{Array.from({ length: cards }, (_, index) => <ProductCardSkeleton key={index} />)}</div></section>;
}

export function PageSkeleton() {
  return <div className="page section page-skeleton" aria-busy="true" aria-label="Loading"><span className="skeleton skeleton-heading" /><span className="skeleton skeleton-copy" /><SectionSkeleton /></div>;
}

export function ErrorState({ title, body, retry }: { title: string; body: string; retry?: () => void }) {
  return <div className="feedback-state feedback-state--error" role="alert"><span className="feedback-state__icon">!</span><h2>{title}</h2><p>{body}</p>{retry && <button className="button secondary" onClick={retry}><Icon name="arrow" />Retry</button>}</div>;
}

export function OfflineState({ retry }: { retry?: () => void }) {
  return <div className="feedback-state"><span className="feedback-state__icon">○</span><h2>You're offline</h2><p>Reconnect to continue browsing the store.</p>{retry && <button className="button primary" onClick={retry}>Try again</button>}</div>;
}
