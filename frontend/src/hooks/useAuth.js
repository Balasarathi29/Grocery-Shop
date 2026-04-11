import { useEffect, useMemo, useState } from "react";
import { requestJson } from "../utils/api";

const AUTH_TOKEN_STORAGE_KEY = "freshshelf-auth-token";

const getStoredToken = () => localStorage.getItem(AUTH_TOKEN_STORAGE_KEY) || "";

const setStoredToken = (token) => {
  if (!token) {
    localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
    return;
  }

  localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
};

function useAuth() {
  const [sessionUser, setSessionUser] = useState(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const restoreSession = async () => {
      const token = getStoredToken();

      if (!token) {
        if (isMounted) {
          setSessionUser(null);
          setIsBootstrapping(false);
        }
        return;
      }

      try {
        const result = await requestJson("/api/auth/me");

        if (!isMounted) {
          return;
        }

        setSessionUser(result.user || null);
      } catch {
        if (!isMounted) {
          return;
        }

        setStoredToken("");
        setSessionUser(null);
      } finally {
        if (isMounted) {
          setIsBootstrapping(false);
        }
      }
    };

    restoreSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const isAuthenticated = useMemo(() => Boolean(sessionUser), [sessionUser]);
  const isAdmin = useMemo(() => sessionUser?.role === "admin", [sessionUser]);

  const register = async ({ fullName, email, phone, password }) => {
    try {
      const result = await requestJson("/api/auth/register", {
        method: "POST",
        body: {
          fullName,
          email,
          phone,
          password,
        },
        auth: false,
      });

      setStoredToken(result.token || "");
      setSessionUser(result.user || null);

      return {
        ok: true,
        message: "Account created successfully.",
        user: result.user,
      };
    } catch (error) {
      return {
        ok: false,
        message: error.message || "Unable to register right now.",
      };
    }
  };

  const login = async ({ email, password }) => {
    try {
      const result = await requestJson("/api/auth/login", {
        method: "POST",
        body: {
          email,
          password,
        },
        auth: false,
      });

      setStoredToken(result.token || "");
      setSessionUser(result.user || null);

      return {
        ok: true,
        message: "Welcome back.",
        user: result.user,
      };
    } catch (error) {
      return {
        ok: false,
        message: error.message || "Invalid email or password.",
      };
    }
  };

  const logout = () => {
    setStoredToken("");
    setSessionUser(null);
  };

  const loginWithGoogle = async (credential) => {
    try {
      const result = await requestJson("/api/auth/google", {
        method: "POST",
        body: {
          credential,
        },
        auth: false,
      });

      setStoredToken(result.token || "");
      setSessionUser(result.user || null);

      return {
        ok: true,
        message: "Signed in with Google.",
        user: result.user,
      };
    } catch (error) {
      return {
        ok: false,
        message: error.message || "Google sign-in failed.",
      };
    }
  };

  return {
    user: sessionUser,
    isAuthenticated,
    isAdmin,
    isBootstrapping,
    login,
    register,
    loginWithGoogle,
    logout,
  };
}

export default useAuth;
