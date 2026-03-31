import { useEffect, useMemo, useState } from "react";

const USERS_STORAGE_KEY = "freshshelf-users";
const SESSION_STORAGE_KEY = "freshshelf-session-user";

const readJson = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const writeJson = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

function useAuth() {
  const [users, setUsers] = useState(() => readJson(USERS_STORAGE_KEY, []));
  const [sessionUser, setSessionUser] = useState(() =>
    readJson(SESSION_STORAGE_KEY, null),
  );

  useEffect(() => {
    writeJson(USERS_STORAGE_KEY, users);
  }, [users]);

  useEffect(() => {
    if (sessionUser) {
      writeJson(SESSION_STORAGE_KEY, sessionUser);
      return;
    }

    localStorage.removeItem(SESSION_STORAGE_KEY);
  }, [sessionUser]);

  const isAuthenticated = useMemo(() => Boolean(sessionUser), [sessionUser]);

  const register = ({ fullName, email, phone, password }) => {
    const normalizedEmail = email.trim().toLowerCase();

    if (users.some((user) => user.email === normalizedEmail)) {
      return {
        ok: false,
        message: "An account with this email already exists.",
      };
    }

    const createdUser = {
      id: `user-${Date.now()}`,
      fullName: fullName.trim(),
      email: normalizedEmail,
      phone: phone.trim(),
      password,
    };

    setUsers((previous) => [...previous, createdUser]);
    setSessionUser({
      id: createdUser.id,
      fullName: createdUser.fullName,
      email: createdUser.email,
    });

    return {
      ok: true,
      message: "Account created successfully.",
    };
  };

  const login = ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const matchedUser = users.find(
      (user) => user.email === normalizedEmail && user.password === password,
    );

    if (!matchedUser) {
      return {
        ok: false,
        message: "Invalid email or password.",
      };
    }

    setSessionUser({
      id: matchedUser.id,
      fullName: matchedUser.fullName,
      email: matchedUser.email,
    });

    return {
      ok: true,
      message: "Welcome back.",
    };
  };

  const logout = () => {
    setSessionUser(null);
  };

  return {
    user: sessionUser,
    isAuthenticated,
    login,
    register,
    logout,
  };
}

export default useAuth;
