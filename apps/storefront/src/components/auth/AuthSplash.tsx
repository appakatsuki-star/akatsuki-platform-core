import { storeConfig } from "../../data/store-data";

export function AuthSplash() {
  return <div className="auth-splash" role="status" aria-label="Loading"><div className="auth-splash-signal"><span className="brand-mark">P</span><i /><i /></div><strong>{storeConfig.name}</strong></div>;
}
