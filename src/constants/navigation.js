export const PAGE_KEYS = {
  HOME: "home",
  CART: "cart",
  CATEGORIES: "categories",
  DEALS: "deals",
  CONTACT: "contact",
  WISHLIST: "wishlist",
  ACCOUNT: "account",
  HELP: "help",
  SETTINGS: "settings",
  PRODUCT_DETAIL: "productDetail",
};

export const desktopNavItems = [
  { label: "Home", page: PAGE_KEYS.HOME },
  { label: "Categories", page: PAGE_KEYS.CATEGORIES },
  { label: "Deals", page: PAGE_KEYS.DEALS },
  { label: "Contact", page: PAGE_KEYS.CONTACT },
];

export const menuNavItems = [
  {
    icon: "🏠",
    label: "Home",
    page: PAGE_KEYS.HOME,
    description: "Back to homepage",
  },
  {
    icon: "🛒",
    label: "Cart",
    page: PAGE_KEYS.CART,
    description: "View your cart",
  },
  {
    icon: "❤️",
    label: "Wishlist",
    page: PAGE_KEYS.WISHLIST,
    description: "Your saved items",
  },
  {
    icon: "👤",
    label: "Account",
    page: PAGE_KEYS.ACCOUNT,
    description: "Your profile & orders",
  },
  {
    icon: "🎯",
    label: "Categories",
    page: PAGE_KEYS.CATEGORIES,
    description: "Browse by category",
  },
  {
    icon: "📱",
    label: "Deals & Offers",
    page: PAGE_KEYS.DEALS,
    description: "Hot deals this week",
  },
  {
    icon: "💬",
    label: "Help & Support",
    page: PAGE_KEYS.HELP,
    description: "FAQs and support",
  },
  {
    icon: "⚙️",
    label: "Settings",
    page: PAGE_KEYS.SETTINGS,
    description: "App preferences",
  },
];
