"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, AuthResponse, LoginDto, RegisterDto } from "@/types/api.types";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (dto: LoginDto) => Promise<{ success: boolean; message: string }>;
  register: (dto: RegisterDto) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedUser) {
        try {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          document.cookie = `token=${storedToken}; path=/; max-age=604800; SameSite=Lax`;
        } catch (e) {
          console.error("Failed to parse stored user", e);
          localStorage.removeItem("user");
        }
      }
      setIsLoading(false);
    }
  }, []);

  const handleAuthSuccess = (authData: AuthResponse) => {
    const userData: User = {
      userId: authData.userId,
      email: authData.email,
      firstName: authData.firstName,
      lastName: authData.lastName,
      roles: authData.roles || [],
    };

    setToken(authData.token);
    setUser(userData);

    localStorage.setItem("token", authData.token);
    localStorage.setItem("refreshToken", authData.refreshToken);
    localStorage.setItem("user", JSON.stringify(userData));
    document.cookie = `token=${authData.token}; path=/; max-age=604800; SameSite=Lax`;
  };

  const login = async (dto: LoginDto) => {
    try {
      const response = await authService.login(dto);
      if (response.success && response.data) {
        handleAuthSuccess(response.data);
        return { success: true, message: response.message || "Login successful" };
      }
      return { success: false, message: response.message || "Login failed" };
    } catch (err: any) {
      return {
        success: false,
        message: err.response?.data?.message || err.message || "An error occurred during login",
      };
    }
  };

  const register = async (dto: RegisterDto) => {
    try {
      const response = await authService.register(dto);
      if (response.success && response.data) {
        handleAuthSuccess(response.data);
        return { success: true, message: response.message || "Registration successful" };
      }
      return { success: false, message: response.message || "Registration failed" };
    } catch (err: any) {
      return {
        success: false,
        message: err.response?.data?.message || err.message || "An error occurred during registration",
      };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      document.cookie = "token=; path=/; max-age=0";
    }
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
