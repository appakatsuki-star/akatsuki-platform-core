import { products } from "../../data/store-data";
import { navigate } from "../../hooks/useRoute";
import { useStorefront } from "../../hooks/useStorefront";
import { money, t } from "../../utils/i18n";
import type { Product } from "../../types/storefront";
import { Icon } from "../ui/Icon";
import { ProductVisual } from "./ProductVisual";

export function ProductCard({ product }: { product: Product }) {
  const { locale, state, toggleFavorite } = useStorefront(); const favorite = state.favorites.includes(product.id); const cheapest = [...product.variants].sort((a, b) => a.price - b.price)[0]; const discount = cheapest.oldPrice ? Math.round((1 - cheapest.price / cheapest.oldPrice) * 100) : 0; const category = product.categoryId === "gift-cards" ? (locale === "ar" ? "بطاقات هدايا" : "Gift cards") : product.categoryId === "subscriptions" ? (locale === "ar" ? "اشتراكات" : "Subscriptions") : product.categoryId === "games" ? (locale === "ar" ? "ألعاب" : "Games") : (locale === "ar" ? "خدمات رقمية" : "Digital services"); const popularity = 320 + product.id.length * 47;
  return <article className={`product-card premium-product-card ${!product.available ? "product-card--disabled" : ""}`}>
    <button className={`favorite ${favorite ? "active" : ""}`} aria-label={t(locale, "favorites")} aria-pressed={favorite} onClick={() => toggleFavorite(product.id)}><Icon name="heart" size={18} /></button>
    {discount > 0 && <span className="discount-badge">−{discount}%</span>}
    <button className="product-visual" disabled={!product.available} onClick={() => navigate(`/products/${product.slug}`)} aria-label={`${t(locale, "open")} ${product.name[locale]}`}><ProductVisual product={product} /></button>
    <div className="product-body"><div className="product-category">{category}</div><h3>{product.name[locale]}</h3><div className="product-signals"><span className={`status ${product.available ? "success" : "muted"}`}>{product.available ? (product.execution === "auto" ? (locale === "ar" ? "فوري" : "Instant") : t(locale, "available")) : (locale === "ar" ? "نفد المخزون" : "Out of stock")}</span><span><Icon name="bag" size={14} />{popularity}+ {locale === "ar" ? "طلب" : "orders"}</span></div><div className="product-delivery"><span>{locale === "ar" ? "وقت التنفيذ" : "Delivery"}</span><strong>{product.eta}</strong></div><div className="product-foot"><span><small>{locale === "ar" ? "ابتداءً من" : "From"}</small><strong>{money(cheapest.price, locale)}</strong>{cheapest.oldPrice && <del>{money(cheapest.oldPrice, locale)}</del>}</span><button className="product-open" disabled={!product.available} onClick={() => navigate(`/products/${product.slug}`)} aria-label={t(locale, "open")}><Icon name="arrow" /></button></div></div>
  </article>;
}
export function ProductGrid({ items = products }: { items?: Product[] }) { return <div className="product-grid">{items.map(product => <ProductCard key={product.id} product={product} />)}</div>; }
