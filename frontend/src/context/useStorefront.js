import { useContext } from "react";
import { StorefrontContextObject } from "./storefrontContextObject";

export function useStorefront() {
  const context = useContext(StorefrontContextObject);

  if (!context) {
    throw new Error("useStorefront must be used within StorefrontProvider");
  }

  return context;
}
