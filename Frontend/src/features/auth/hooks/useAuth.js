import { login, register, getMe, logout } from "../services/auth.api.js";
import { useState, useEffect, useContext, createContext } from "react";
import { AuthContext } from "../auth.context.jsx";

export function useAuth() {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  async function handleRegister({ username, email, password }) {
    try {
      setLoading(true);

      const data = await register({ username, email, password });

      setUser(data.user);

      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin({ username, email, password }) {
    try {
      setLoading(true);

      const data = await login({ username, email, password });

      setUser(data.user);

      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function handleGetMe() {
    try {
      setLoading(true);

      const data = await getMe();

      setUser(data.user);

      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      setLoading(true);
      const data = await logout();
      setUser(null);
      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleGetMe(); //hydrate the user state when the component mounts
  }, []);

  return {
    user,
    loading,
    handleRegister,
    handleLogin,
    handleGetMe,
    handleLogout,
  };
}
