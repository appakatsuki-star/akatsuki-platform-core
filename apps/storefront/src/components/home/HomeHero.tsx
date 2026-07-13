import { useEffect, useState } from "react";
import { homeHeroSlides } from "../../data/home-data";
import { navigate } from "../../hooks/useRoute";
import { useStorefront } from "../../hooks/useStorefront";
import { Icon } from "../ui/Icon";

export function HomeHero() {
  const { locale } = useStorefront(); const [active, setActive] = useState(0); const [paused, setPaused] = useState(false); const slide = homeHeroSlides[active];
  useEffect(() => { if (paused || matchMedia("(prefers-reduced-motion: reduce)").matches) return; const timer = setInterval(() => { if (!document.hidden) setActive((value) => (value + 1) % homeHeroSlides.length); }, 6200); return () => clearInterval(timer); }, [paused]);
  const move = (direction: number) => setActive((active + direction + homeHeroSlides.length) % homeHeroSlides.length);
  return <section className="home-hero" aria-roledescription="carousel" aria-label={locale === "ar" ? "عروض المتجر" : "Store highlights"} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={() => setPaused(false)}>
    <div className="home-hero-mesh" aria-hidden="true"/><div className="home-hero-copy" key={`${slide.id}-copy`}><span className="home-eyebrow">{slide.eyebrow[locale]}</span><h1>{slide.title[locale]}</h1><p>{slide.description[locale]}</p><div className="home-hero-actions"><button className="home-button primary" onClick={() => navigate(slide.path)}>{slide.primary[locale]}<Icon name="arrow" size={17}/></button>{slide.secondary && <button className="home-button ghost" onClick={() => document.getElementById("home-best")?.scrollIntoView()}>{slide.secondary[locale]}</button>}</div></div>
    <div className={`home-hero-visual visual-${slide.visual}`} key={`${slide.id}-visual`} aria-hidden="true"><div className="visual-orbit one"/><div className="visual-orbit two"/><div className="hero-product-object"><span>{slide.visual === "game" ? "G/01" : slide.visual === "stream" ? "S+" : slide.visual === "card" ? "CARD" : "PRO"}</span><strong>{slide.metric[locale]}</strong><i/></div><div className="hero-mini-stat">{String(active + 1).padStart(2,"0")}<small>/ {String(homeHeroSlides.length).padStart(2,"0")}</small></div></div>
    <div className="home-hero-controls"><button onClick={() => move(-1)} aria-label={locale === "ar" ? "الشريحة السابقة" : "Previous slide"}><Icon name="arrow"/></button><div>{homeHeroSlides.map((item,index)=><button key={item.id} className={active===index?"active":""} aria-label={`${locale === "ar" ? "الشريحة" : "Slide"} ${index+1}`} aria-current={active===index} onClick={()=>setActive(index)}><i/></button>)}</div><button onClick={() => move(1)} aria-label={locale === "ar" ? "الشريحة التالية" : "Next slide"}><Icon name="arrow"/></button></div>
  </section>;
}
