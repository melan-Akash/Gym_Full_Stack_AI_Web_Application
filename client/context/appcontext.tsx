"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "member" | "trainer" | "admin";
  avatar?: string;
  status?: string;
  membershipTier?: string;
  phone?: string;
  assignedTrainer?: any;
  token?: string;
}

interface AppContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, password: string, role?: string) => Promise<User>;
  logout: () => void;
  setError: (err: string | null) => void;

  // Admin API Helpers
  adminGetStats: () => Promise<any>;
  adminGetMembers: () => Promise<User[]>;
  adminGetMemberById: (id: string) => Promise<User>;
  adminCreateMember: (memberData: any) => Promise<User>;
  adminUpdateMemberStatus: (id: string, status: string) => Promise<User>;
  adminGetTrainers: () => Promise<any[]>;
  adminGetMembershipPlans: () => Promise<any[]>;
  adminCreateMembershipPlan: (planData: any) => Promise<any>;
  adminGetPayments: () => Promise<any[]>;
  adminGetAttendance: () => Promise<any[]>;
  adminRecordCheckIn: (userId?: string, method?: string) => Promise<any>;
  adminGetNotifications: () => Promise<any[]>;
  adminCreateNotification: (notifData: any) => Promise<any>;

  // Trainer API Helpers
  trainerGetStats: () => Promise<any>;
  trainerGetClients: () => Promise<User[]>;
  trainerGetClientById: (id: string) => Promise<User>;
  trainerGetBookings: () => Promise<any[]>;
  trainerGetWorkouts: () => Promise<any[]>;
  trainerCreateWorkout: (workoutData: any) => Promise<any>;
  trainerGetMeals: () => Promise<any[]>;
  trainerCreateMeal: (mealData: any) => Promise<any>;
  trainerGenerateAIPlan: (payload: any) => Promise<any>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api";

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("forged_token");
    const savedUser = localStorage.getItem("forged_user");

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem("forged_token");
        localStorage.removeItem("forged_user");
      }
    }
    setLoading(false);
  }, []);

  const getHeaders = () => {
    const currentToken = token || localStorage.getItem("forged_token");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${currentToken}`,
    };
  };

  const login = async (email: string, password: string): Promise<User> => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Invalid email or password");
      }

      const userData: User = data.data;
      const jwtToken = userData.token || "";

      setUser(userData);
      setToken(jwtToken);

      localStorage.setItem("forged_token", jwtToken);
      localStorage.setItem("forged_user", JSON.stringify(userData));

      setLoading(false);
      return userData;
    } catch (err: any) {
      setLoading(false);
      const errMsg = err.message || "Failed to authenticate with server";
      setError(errMsg);
      throw new Error(errMsg);
    }
  };

  const register = async (name: string, email: string, password: string, role = "member"): Promise<User> => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to create account");
      }

      const userData: User = data.data;
      const jwtToken = userData.token || "";

      setUser(userData);
      setToken(jwtToken);

      localStorage.setItem("forged_token", jwtToken);
      localStorage.setItem("forged_user", JSON.stringify(userData));

      setLoading(false);
      return userData;
    } catch (err: any) {
      setLoading(false);
      const errMsg = err.message || "Registration failed";
      setError(errMsg);
      throw new Error(errMsg);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("forged_token");
    localStorage.removeItem("forged_user");
  };

  // --- ADMIN API CALLS ---
  const adminGetStats = async () => {
    const res = await fetch(`${BACKEND_URL}/admin/stats`, { headers: getHeaders() });
    const data = await res.json();
    return data.success ? data.data : null;
  };

  const adminGetMembers = async () => {
    const res = await fetch(`${BACKEND_URL}/admin/members`, { headers: getHeaders() });
    const data = await res.json();
    return data.success ? data.data : [];
  };

  const adminGetMemberById = async (id: string) => {
    const res = await fetch(`${BACKEND_URL}/admin/members/${id}`, { headers: getHeaders() });
    const data = await res.json();
    return data.success ? data.data : null;
  };

  const adminCreateMember = async (memberData: any) => {
    const res = await fetch(`${BACKEND_URL}/admin/members`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(memberData),
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || "Failed to create member");
    return data.data;
  };

  const adminUpdateMemberStatus = async (id: string, status: string) => {
    const res = await fetch(`${BACKEND_URL}/admin/members/${id}/status`, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || "Failed to update member status");
    return data.data;
  };

  const adminGetTrainers = async () => {
    const res = await fetch(`${BACKEND_URL}/admin/trainers`, { headers: getHeaders() });
    const data = await res.json();
    return data.success ? data.data : [];
  };

  const adminGetMembershipPlans = async () => {
    const res = await fetch(`${BACKEND_URL}/admin/membership-plans`, { headers: getHeaders() });
    const data = await res.json();
    return data.success ? data.data : [];
  };

  const adminCreateMembershipPlan = async (planData: any) => {
    const res = await fetch(`${BACKEND_URL}/admin/membership-plans`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(planData),
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || "Failed to create plan");
    return data.data;
  };

  const adminGetPayments = async () => {
    const res = await fetch(`${BACKEND_URL}/admin/payments`, { headers: getHeaders() });
    const data = await res.json();
    return data.success ? data.data : [];
  };

  const adminGetAttendance = async () => {
    const res = await fetch(`${BACKEND_URL}/admin/attendance`, { headers: getHeaders() });
    const data = await res.json();
    return data.success ? data.data : [];
  };

  const adminRecordCheckIn = async (userId?: string, method = "Mobile App QR") => {
    const res = await fetch(`${BACKEND_URL}/admin/attendance`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ userId, method }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || "Check-in failed");
    return data.data;
  };

  const adminGetNotifications = async () => {
    const res = await fetch(`${BACKEND_URL}/admin/notifications`, { headers: getHeaders() });
    const data = await res.json();
    return data.success ? data.data : [];
  };

  const adminCreateNotification = async (notifData: any) => {
    const res = await fetch(`${BACKEND_URL}/admin/notifications`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(notifData),
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || "Broadcast failed");
    return data.data;
  };

  // --- TRAINER API CALLS ---
  const trainerGetStats = async () => {
    const res = await fetch(`${BACKEND_URL}/trainers/dashboard/stats`, { headers: getHeaders() });
    const data = await res.json();
    return data.success ? data.data : null;
  };

  const trainerGetClients = async () => {
    const res = await fetch(`${BACKEND_URL}/trainers/my-clients`, { headers: getHeaders() });
    const data = await res.json();
    return data.success ? data.data : [];
  };

  const trainerGetClientById = async (id: string) => {
    const res = await fetch(`${BACKEND_URL}/trainers/my-clients/${id}`, { headers: getHeaders() });
    const data = await res.json();
    return data.success ? data.data : null;
  };

  const trainerGetBookings = async () => {
    const res = await fetch(`${BACKEND_URL}/trainers/bookings`, { headers: getHeaders() });
    const data = await res.json();
    return data.success ? data.data : [];
  };

  const trainerGetWorkouts = async () => {
    const res = await fetch(`${BACKEND_URL}/workouts`, { headers: getHeaders() });
    const data = await res.json();
    return data.success ? data.data : [];
  };

  const trainerCreateWorkout = async (workoutData: any) => {
    const res = await fetch(`${BACKEND_URL}/workouts`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(workoutData),
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || "Failed to create workout plan");
    return data.data;
  };

  const trainerGetMeals = async () => {
    const res = await fetch(`${BACKEND_URL}/meals`, { headers: getHeaders() });
    const data = await res.json();
    return data.success ? data.data : [];
  };

  const trainerCreateMeal = async (mealData: any) => {
    const res = await fetch(`${BACKEND_URL}/meals`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(mealData),
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || "Failed to create meal plan");
    return data.data;
  };

  const trainerGenerateAIPlan = async (payload: any) => {
    const res = await fetch(`${BACKEND_URL}/ai/generate`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || "AI generation failed");
    return data;
  };

  return (
    <AppContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        login,
        register,
        logout,
        setError,

        adminGetStats,
        adminGetMembers,
        adminGetMemberById,
        adminCreateMember,
        adminUpdateMemberStatus,
        adminGetTrainers,
        adminGetMembershipPlans,
        adminCreateMembershipPlan,
        adminGetPayments,
        adminGetAttendance,
        adminRecordCheckIn,
        adminGetNotifications,
        adminCreateNotification,

        trainerGetStats,
        trainerGetClients,
        trainerGetClientById,
        trainerGetBookings,
        trainerGetWorkouts,
        trainerCreateWorkout,
        trainerGetMeals,
        trainerCreateMeal,
        trainerGenerateAIPlan,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
