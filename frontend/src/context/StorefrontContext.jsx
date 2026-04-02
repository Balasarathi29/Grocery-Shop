import useStorefrontController from "../hooks/useStorefrontController";
import { StorefrontContextObject } from "./storefrontContextObject";

export function StorefrontProvider({ children }) {
  const storefront = useStorefrontController();

  return (
    <StorefrontContextObject.Provider value={storefront}>
      {children}
    </StorefrontContextObject.Provider>
  );
}
