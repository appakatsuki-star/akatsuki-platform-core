import { useEffect,useState } from "react";
import type { AdminLocale } from "../localization/admin-translations";
const KEY="akatsuki-admin-locale";
export function useAdminLocale(){const [locale,setLocale]=useState<AdminLocale>(()=>localStorage.getItem(KEY)==="en"?"en":"ar");useEffect(()=>{localStorage.setItem(KEY,locale);},[locale]);return {locale,dir:locale==="ar"?"rtl" as const:"ltr" as const,toggleLocale:()=>setLocale(value=>value==="ar"?"en":"ar")};}
