import { useEffect, useRef, useState } from "react";

const GOOGLE_SCRIPT_ID = "google-identity-services-script";

const loadGoogleScript = () => {
  if (window.google?.accounts?.id) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const existing = document.getElementById(GOOGLE_SCRIPT_ID);

    if (existing) {
      existing.addEventListener("load", resolve, { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error("Failed to load Google script.")),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.id = GOOGLE_SCRIPT_ID;
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google script."));
    document.head.appendChild(script);
  });
};

function GoogleAuthButton({ onCredential, onError }) {
  const containerRef = useRef(null);
  const iconContainerRef = useRef(null);
  const [runtimeErrorMessage, setRuntimeErrorMessage] = useState("");
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const statusMessage = !googleClientId
    ? "Google sign-in is disabled: VITE_GOOGLE_CLIENT_ID is missing."
    : runtimeErrorMessage;

  useEffect(() => {
    let isMounted = true;

    if (!googleClientId) {
      return undefined;
    }

    const initializeGoogle = async () => {
      try {
        await loadGoogleScript();

        if (
          !isMounted ||
          !containerRef.current ||
          !window.google?.accounts?.id
        ) {
          return;
        }

        window.google.accounts.id.initialize({
          client_id: googleClientId,
          auto_select: true,
          use_fedcm_for_prompt: true,
          callback: (response) => {
            if (response.credential) {
              onCredential(response.credential);
              return;
            }

            onError?.("Google login did not return a credential.");
          },
        });

        containerRef.current.innerHTML = "";
        if (iconContainerRef.current) {
          iconContainerRef.current.innerHTML = "";
        }

        if (iconContainerRef.current) {
          window.google.accounts.id.renderButton(iconContainerRef.current, {
            type: "icon",
            theme: "outline",
            size: "large",
            shape: "circle",
          });
        }

        window.google.accounts.id.renderButton(containerRef.current, {
          type: "standard",
          theme: "outline",
          size: "large",
          text: "continue_with",
          shape: "pill",
          width: 320,
        });

        window.google.accounts.id.prompt();
      } catch {
        if (!isMounted) {
          return;
        }

        setRuntimeErrorMessage(
          "Google sign-in is unavailable right now. Please try again.",
        );
      }
    };

    initializeGoogle();

    return () => {
      isMounted = false;
    };
  }, [googleClientId, onCredential, onError]);

  return (
    <div className="mt-4">
      <div className="my-4 flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-200" />
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
          Or continue with
        </p>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      {statusMessage ? (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700">
          {statusMessage}
        </p>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2">
            <div ref={iconContainerRef} />
            <p className="text-sm font-semibold text-slate-600">
              Quick sign-in with your Google account
            </p>
          </div>
          <div className="flex justify-center" ref={containerRef} />
        </div>
      )}
    </div>
  );
}

export default GoogleAuthButton;
