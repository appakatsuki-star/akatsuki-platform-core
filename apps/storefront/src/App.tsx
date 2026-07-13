import { StoreShell } from "./components/layout/StoreShell";
import { Protected } from "./components/ui/Common";
import { useRoute } from "./hooks/useRoute";
import { NotificationsPage, NewTicketPage, ProfilePage, SettingsPage, SupportPage, TicketPage } from "./pages/AccountPages";
import { SystemPage } from "./pages/AuthSystemPages";
import { AuthExperience } from "./components/auth/AuthExperience";
import { AuthFlow } from "./components/auth/AuthFlow";
import { PremiumHomePage as HomePage } from "./components/home/PremiumHome";
import { CheckoutPage, DepositPage, OrderPage, OrdersPage, WalletPage } from "./pages/CommercePages";
import { CategoriesPage, CategoryPage, FavoritesPage, NotFoundPage, OffersPage, ProductPage, SearchPage, StaticPage } from "./pages/PublicPages";

const bare = new Set(["/login", "/register", "/verify", "/forgot-password", "/maintenance", "/offline", "/unauthorized", "/error"]);
export default function App() { const route = useRoute(); let page: React.ReactNode;
  switch (route.path) {
    case "/": page=<HomePage/>; break; case "/categories": page=<CategoriesPage/>; break; case "/categories/:categorySlug": page=<CategoryPage slug={route.params.categorySlug}/>; break; case "/products/:productSlug": page=<ProductPage slug={route.params.productSlug}/>; break; case "/search": page=<SearchPage/>; break; case "/offers": page=<OffersPage/>; break; case "/favorites": page=<FavoritesPage/>; break;
    case "/about": page=<StaticPage kind="about"/>; break; case "/terms": page=<StaticPage kind="terms"/>; break; case "/privacy": page=<StaticPage kind="privacy"/>; break;
    case "/login": page=<AuthExperience mode="login"/>; break; case "/register": page=<AuthExperience mode="register"/>; break; case "/forgot-password": page=<AuthExperience mode="forgot"/>; break; case "/verify": page=<AuthFlow/>; break;
    case "/checkout": page=<Protected><CheckoutPage query={route.query}/></Protected>; break; case "/wallet": page=<Protected><WalletPage/></Protected>; break; case "/wallet/deposit": page=<Protected><DepositPage/></Protected>; break; case "/orders": page=<Protected><OrdersPage/></Protected>; break; case "/orders/:orderId": page=<Protected><OrderPage id={route.params.orderId}/></Protected>; break; case "/notifications": page=<Protected><NotificationsPage/></Protected>; break; case "/support": page=<Protected><SupportPage/></Protected>; break; case "/support/new": page=<Protected><NewTicketPage query={route.query}/></Protected>; break; case "/support/:ticketId": page=<Protected><TicketPage id={route.params.ticketId}/></Protected>; break; case "/profile": page=<Protected><ProfilePage/></Protected>; break; case "/settings": page=<Protected><SettingsPage/></Protected>; break;
    case "/maintenance": page=<SystemPage kind="maintenance"/>; break; case "/offline": page=<SystemPage kind="offline"/>; break; case "/unauthorized": page=<SystemPage kind="unauthorized"/>; break; case "/error": page=<SystemPage kind="error"/>; break; default: page=<NotFoundPage/>;
  }
  return <StoreShell bare={bare.has(route.path)}>{page}</StoreShell>;
}
