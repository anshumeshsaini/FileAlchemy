
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import usersData from "../data/users.json";

type User = {
  id: number;
  name: string;
  email: string;
  role: "buyer" | "seller" | "admin";
  avatar: string;
  phone: string;
  savedProperties?: number[];
  listedProperties?: number[];
  bookings?: {
    propertyId: number;
    date: string;
    status: string;
  }[];
  bookingRequests?: {
    propertyId: number;
    buyerId: number;
    date: string;
    status: string;
  }[];
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  registerUser: (userData: Omit<User, "id" | "savedProperties" | "bookings">) => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check if user is logged in from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    // Find user with matching email and password
    const foundUser = usersData.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      // Remove password from user object before storing
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword as User);
      setIsAuthenticated(true);
      
      // Store user in localStorage
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      
      toast.success(`Welcome back, ${foundUser.name}!`);
      return true;
    } else {
      toast.error("Invalid email or password");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    toast.info("You have been logged out");
  };

  const registerUser = (userData: Omit<User, "id" | "savedProperties" | "bookings">): boolean => {
    // Check if user with email already exists
    const existingUser = usersData.find((u) => u.email === userData.email);
    if (existingUser) {
      toast.error("User with this email already exists");
      return false;
    }

    // Simulate user registration (in a real app, this would call an API)
    const newUser = {
      ...userData,
      id: usersData.length + 1,
      savedProperties: [],
      bookings: []
    };

    // In a real app, we would add the user to the database
    // For now, we'll just log them in
    const { password, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword as User);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userWithoutPassword));
    
    toast.success(`Welcome, ${newUser.name}!`);
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
