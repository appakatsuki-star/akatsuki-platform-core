import { useState } from "react";
import { homeProducts } from "../../data/home-data";
import { homeSections } from "../../data/home-sections";
import { useStorefront } from "../../hooks/useStorefront";
import type { HomeSectionConfig } from "../../types/home";
import { HomeBenefits, HomeCategories, HomeFeatured, HomeGreeting, HomeOffers, HomePayments, HomeProductRail, HomeQuickActions, HomeSupport, HomeTrending, HomeWallet } from "./HomeCommerce";
import { HomeHero } from "./HomeHero";
import { HomeSearch } from "./HomeSearch";

export function PremiumHomePage() {
  const { locale } = useStorefront(); const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const toggle = (id: string) => setFavorites((current) => { const next = new Set(current); next.has(id) ? next.delete(id) : next.add(id); return next; });
  const productCopy = (source?: string) => source === "games" ? { title: locale === "ar" ? "الألعاب" : "Games", subtitle: locale === "ar" ? "باقات جاهزة للتنفيذ" : "Packages ready to deliver" } : source === "gift-cards" ? { title: locale === "ar" ? "بطاقات الهدايا" : "Gift cards", subtitle: locale === "ar" ? "رصيد مرن للمنصات التي تستخدمها" : "Flexible credit for the platforms you use" } : { title: locale === "ar" ? "الاشتراكات" : "Subscriptions", subtitle: locale === "ar" ? "ترفيه وأدوات رقمية بوضوح أكبر" : "Entertainment and digital tools, simplified" };
  const render = (section: HomeSectionConfig) => {
    switch (section.type) {
      case "hero": return <HomeHero/>; case "search": return <HomeSearch/>; case "greeting": return <HomeGreeting/>; case "quick-actions": return <HomeQuickActions/>; case "categories": return <HomeCategories/>;
      case "best-sellers": return <HomeProductRail id="home-best" title={locale === "ar" ? "الأكثر مبيعًا" : "Best sellers"} subtitle={locale === "ar" ? "خدمات يختارها العملاء باستمرار" : "Digital services customers return to"} items={homeProducts.filter((product) => product.bestSeller)} favorites={favorites} toggle={toggle}/>;
      case "featured-collection": return <HomeFeatured/>;
      case "product-section": { const copy = productCopy(section.dataSource); return <HomeProductRail title={copy.title} subtitle={copy.subtitle} items={homeProducts.filter((product) => product.categoryId === section.dataSource)} favorites={favorites} toggle={toggle}/>; }
      case "trending": return <HomeTrending/>; case "offers": return <HomeOffers/>;
      case "recently-added": return <HomeProductRail title={locale === "ar" ? "وصل حديثًا" : "Recently added"} subtitle={locale === "ar" ? "أحدث الإضافات إلى الكتالوج" : "Fresh additions to the catalog"} items={homeProducts.filter((product) => product.recentlyAdded)} favorites={favorites} toggle={toggle} compact/>;
      case "wallet": return <HomeWallet/>; case "payment-methods": return <HomePayments/>; case "benefits": return <HomeBenefits/>; case "support": return <HomeSupport/>; default: return null;
    }
  };
  return <div className="premium-home-v2">{homeSections.filter((section) => section.enabled).sort((a, b) => a.order - b.order).map((section) => <div className={`home-section-slot slot-${section.type}`} key={section.id}>{render(section)}</div>)}</div>;
}
