import { useState } from "react";
import LoginPage from "./components/auth/LoginPage";
import TwoFactorPage from "./components/auth/TwoFactorPage";
import AdminShell from "./components/layout/AdminShell";
import { MOCK_SESSION_KEY } from "./mock-auth";

type View="login"|"two-factor"|"dashboard";

export default function App() {
  // Preview-only session marker. It contains no credential, token, or production identity data.
  const [view,setView]=useState<View>(()=>sessionStorage.getItem(MOCK_SESSION_KEY)==="true"?"dashboard":"login");
  const authenticate=()=>{sessionStorage.setItem(MOCK_SESSION_KEY,"true");setView("dashboard");};
  const logout=()=>{sessionStorage.removeItem(MOCK_SESSION_KEY);setView("login");};
  if(view==="login")return <LoginPage onVerified={()=>setView("two-factor")}/>;
  if(view==="two-factor")return <TwoFactorPage onSuccess={authenticate} onBack={()=>setView("login")}/>;
  return <AdminShell onLogout={logout}/>;
}
