import { useEffect,useState } from "react";
export type AdminTheme="dark"|"light";
const KEY="akatsuki-admin-theme";
export function useAdminTheme(){const [theme,setTheme]=useState<AdminTheme>(()=>{const saved=localStorage.getItem(KEY);if(saved==="dark"||saved==="light")return saved;return matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";});useEffect(()=>{localStorage.setItem(KEY,theme);},[theme]);return {theme,toggleTheme:()=>setTheme(value=>value==="dark"?"light":"dark")};}
