export const APP_ROUTES = {
  HOME: "/",
  ESSENTIALS: "/essentials",
  OFFERS: "/offers",
  CART: "/cart",
  LOGIN: "/login",
  REGISTER: "/register",
  CATEGORIES: "/categories",
  DEALS: "/deals",
  CONTACT: "/contact",
  WISHLIST: "/wishlist",
  ACCOUNT: "/account",
  HELP: "/help",
  SETTINGS: "/settings",
  ADMIN: "/admin",
  PRODUCT_DETAIL: "/products/:productId",
  productDetail: (productId) => `/products/${productId}`,
};

export const desktopNavItems = [
  { label: "Home", path: APP_ROUTES.HOME },
  { label: "Categories", path: APP_ROUTES.CATEGORIES },
  { label: "Deals", path: APP_ROUTES.DEALS },
  { label: "Contact", path: APP_ROUTES.CONTACT },
];

export const menuNavItems = [
  {
    icon: "🏠",
    label: "Home",
    path: APP_ROUTES.HOME,
    description: "Back to homepage",
  },
  {
    icon: "🛒",
    label: "Cart",
    path: APP_ROUTES.CART,
    description: "View your cart",
  },
  {
    icon: "❤️",
    label: "Wishlist",
    path: APP_ROUTES.WISHLIST,
    description: "Your saved items",
  },
  {
    icon: "👤",
    label: "Account",
    path: APP_ROUTES.ACCOUNT,
    description: "Your profile & orders",
  },
  {
    icon: "🔐",
    label: "Login",
    path: APP_ROUTES.LOGIN,
    description: "Sign in to add products to cart",
  },
  {
    icon: "✨",
    label: "Register",
    path: APP_ROUTES.REGISTER,
    description: "Create your Jothi account",
  },
  {
    icon: "🎯",
    label: "Categories",
    path: APP_ROUTES.CATEGORIES,
    description: "Browse by category",
  },
  {
    icon: "📱",
    label: "Deals & Offers",
    path: APP_ROUTES.DEALS,
    description: "Hot deals this week",
  },
  {
    icon: "💬",
    label: "Help & Support",
    path: APP_ROUTES.HELP,
    description: "FAQs and support",
  },
  {
    icon: "⚙️",
    label: "Settings",
    path: APP_ROUTES.SETTINGS,
    description: "App preferences",
  },
  {
    icon: "🛠️",
    label: "Admin Panel",
    path: APP_ROUTES.ADMIN,
    description: "Manage products and categories",
    requiresAdmin: true,
  },
];
