import type { Product } from "../../types/storefront";

const motifs: Record<string, { accent: string; label: string }> = {
  games: { accent: "#5d6ad6", label: "PLAY" },
  subscriptions: { accent: "#b52b42", label: "PLUS" },
  "gift-cards": { accent: "#b77927", label: "CREDIT" },
  services: { accent: "#287c70", label: "CLOUD" },
};

export function ProductVisual({ product, compact = false }: { product: Product; compact?: boolean }) {
  const motif = motifs[product.categoryId] ?? motifs.services;
  return (
    <span className={`commerce-visual ${compact ? "commerce-visual--compact" : ""}`} style={{ "--visual-accent": motif.accent } as React.CSSProperties}>
      <span className="commerce-visual__grid" aria-hidden="true" />
      <span className="commerce-visual__label">{motif.label}</span>
      <strong>{product.visual}</strong>
      <small>DIGITAL DELIVERY</small>
    </span>
  );
}
