import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import NavOptions from "./components/layout/NavOptions";
import PageRouter from "./components/pages/PageRouter";
import { StorefrontProvider } from "./context/StorefrontContext";
import { useStorefront } from "./context/useStorefront";
import useScrollToTopOnNavigation from "./hooks/useScrollToTopOnNavigation";
import { APP_ROUTES } from "./constants/navigation";
import { useNavigate } from "react-router-dom";

function StorefrontLayout() {
  const navigate = useNavigate();
  const { ui, auth, cart, actions } = useStorefront();

  useScrollToTopOnNavigation();

  const handleLogout = () => {
    actions.onLogout();
    navigate(APP_ROUTES.HOME);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-slate-900">
      <Navbar
        cartCount={cart.cartCount}
        isAuthenticated={auth.isAuthenticated}
        userName={auth.user?.fullName}
        onLogout={handleLogout}
        onMenuClick={actions.onMenuOpen}
      />
      <main>
        <PageRouter />
      </main>
      {ui.showNavOptions && <NavOptions onClose={actions.onMenuClose} />}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <StorefrontProvider>
      <StorefrontLayout />
    </StorefrontProvider>
  );
}

export default App;
