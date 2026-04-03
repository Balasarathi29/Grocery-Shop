import { Navigate, Route, Routes, useParams } from "react-router-dom";
import HomePage from "./HomePage";
import CategoriesPage from "./CategoriesPage";
import EssentialsPage from "./EssentialsPage";
import OffersPage from "./OffersPage";
import ContactPage from "./ContactPage";
import WishlistPage from "./WishlistPage";
import AccountPage from "./AccountPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import HelpPage from "./HelpPage";
import SettingsPage from "./SettingsPage";
import AdminPage from "./AdminPage";
import CartPage from "../cart/CartPage";
import ProductDetailsPage from "../product/ProductDetailsPage";
import { APP_ROUTES } from "../../constants/navigation";
import { useStorefront } from "../../context/useStorefront";
import { useLocation } from "react-router-dom";

function ProductDetailsRoute() {
  const { productId } = useParams();
  const { catalog } = useStorefront();

  const product = catalog.allProducts.find(
    (item) => String(item.id) === String(productId),
  );

  if (!product) {
    return <Navigate to={APP_ROUTES.HOME} replace />;
  }

  return <ProductDetailsPage product={product} />;
}

function AdminRoute() {
  const location = useLocation();
  const { auth } = useStorefront();

  if (!auth.isAuthenticated) {
    return (
      <Navigate
        to={APP_ROUTES.LOGIN}
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return <AdminPage />;
}

function PageRouter() {
  return (
    <Routes>
      <Route path={APP_ROUTES.HOME} element={<HomePage />} />
      <Route path={APP_ROUTES.ESSENTIALS} element={<EssentialsPage />} />
      <Route path={APP_ROUTES.OFFERS} element={<OffersPage />} />
      <Route path={APP_ROUTES.CART} element={<CartPage />} />
      <Route path={APP_ROUTES.CATEGORIES} element={<CategoriesPage />} />
      <Route
        path={APP_ROUTES.DEALS}
        element={<Navigate to={APP_ROUTES.OFFERS} replace />}
      />
      <Route path={APP_ROUTES.CONTACT} element={<ContactPage />} />
      <Route path={APP_ROUTES.WISHLIST} element={<WishlistPage />} />
      <Route path={APP_ROUTES.ACCOUNT} element={<AccountPage />} />
      <Route path={APP_ROUTES.ADMIN} element={<AdminRoute />} />
      <Route path={APP_ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={APP_ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={APP_ROUTES.HELP} element={<HelpPage />} />
      <Route path={APP_ROUTES.SETTINGS} element={<SettingsPage />} />
      <Route
        path={APP_ROUTES.PRODUCT_DETAIL}
        element={<ProductDetailsRoute />}
      />
      <Route path="*" element={<Navigate to={APP_ROUTES.HOME} replace />} />
    </Routes>
  );
}

export default PageRouter;
