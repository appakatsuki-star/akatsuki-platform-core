import { useEffect, useState } from "react";
import { navigate } from "../../hooks/useRoute";
import { useStorefront } from "../../hooks/useStorefront";
import { Icon } from "../ui/Icon";

const slides = [
  { eyebrow: { en: "Digital essentials", ar: "احتياجاتك الرقمية" }, title: { en: "The simple way to buy digital.", ar: "طريقة أبسط لشراء كل ما هو رقمي." }, body: { en: "Clear packages, wallet-first checkout, and an order history that keeps you informed.", ar: "باقات واضحة، دفع من المحفظة، وسجل طلبات يبقيك على اطلاع." }, action: "/categories", actionLabel: { en: "Browse products", ar: "تصفح المنتجات" }, tone: "crimson", code: "01" },
  { eyebrow: { en: "Fast delivery", ar: "تسليم سريع" }, title: { en: "Game credit, delivered with clarity.", ar: "رصيد ألعاب بتسليم واضح وسريع." }, body: { en: "Choose the right package, add your player details, and track every step.", ar: "اختر الباقة، أضف بيانات اللاعب، وتابع كل خطوة." }, action: "/categories/games", actionLabel: { en: "Explore games", ar: "استكشف الألعاب" }, tone: "indigo", code: "02" },
  { eyebrow: { en: "One useful balance", ar: "رصيد واحد مفيد" }, title: { en: "Fund once. Purchase when you need.", ar: "اشحن مرة، واشترِ وقتما تحتاج." }, body: { en: "A transparent wallet with flexible deposit methods and complete transaction history.", ar: "محفظة شفافة مع طرق إيداع مرنة وسجل معاملات كامل." }, action: "/wallet", actionLabel: { en: "Open wallet", ar: "افتح المحفظة" }, tone: "teal", code: "03" },
];

export function HeroCarousel() {
  const { locale } = useStorefront(); const [active, setActive] = useState(0); const [paused, setPaused] = useState(false); const slide = slides[active];
  useEffect(() => { if (paused || matchMedia("(prefers-reduced-motion: reduce)").matches) return; const timer = setInterval(() => setActive(index => (index + 1) % slides.length), 7000); return () => clearInterval(timer); }, [paused]);
  return <section className={`store-hero store-hero--${slide.tone}`} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={() => setPaused(false)} onTouchStart={() => setPaused(true)} aria-roledescription="carousel" aria-label={locale === "ar" ? "عروض المتجر" : "Store highlights"}>
    <div className="store-hero__copy" key={active}><span className="eyebrow">{slide.eyebrow[locale]}</span><h1>{slide.title[locale]}</h1><p>{slide.body[locale]}</p><div className="store-hero__actions"><button className="button primary" onClick={() => navigate(slide.action)}>{slide.actionLabel[locale]}<Icon name="arrow" /></button><button className="button hero-secondary" onClick={() => navigate("/offers")}>{locale === "ar" ? "شاهد العروض" : "See offers"}</button></div></div>
    <div className="store-hero__art" aria-hidden="true"><span className="hero-ticket"><small>PLATFORM / DIGITAL</small><strong>{slide.code}</strong><i>READY TO DELIVER</i></span><span className="hero-disc"><b>P</b></span><span className="hero-art-caption">COMMERCE<br />WITHOUT<br />THE NOISE</span></div>
    <div className="store-hero__controls">{slides.map((item, index) => <button key={item.code} aria-label={`${locale === "ar" ? "الشريحة" : "Slide"} ${index + 1}`} aria-current={active === index} onClick={() => setActive(index)}><span /></button>)}</div>
  </section>;
}
