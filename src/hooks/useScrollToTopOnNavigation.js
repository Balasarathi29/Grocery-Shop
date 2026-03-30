import { useLayoutEffect } from "react";

function useScrollToTopOnNavigation(dependencies) {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, dependencies);
}

export default useScrollToTopOnNavigation;
