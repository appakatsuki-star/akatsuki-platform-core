import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { StorefrontProvider } from "./hooks/useStorefront";
import "./styles.css";
import "./premium.css";
import "./styles/auth-experience.css";
import "./styles/home-premium.css";

createRoot(document.getElementById("root")!).render(<StrictMode><StorefrontProvider><App /></StorefrontProvider></StrictMode>);
