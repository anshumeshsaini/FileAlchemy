
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import HeaderSection from "../components/HeaderSection";
import FooterSection from "../components/FooterSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setLoading(true);
    
    // Add a small delay to simulate API call
    setTimeout(() => {
      const success = login(email, password);
      
      if (success) {
        navigate("/dashboard");
      }
      
      setLoading(false);
    }, 1000);
  };

  const handleDemoLogin = (role: string) => {
    setLoading(true);
    
    let demoEmail;
    let demoPassword = "password123";
    
    switch (role) {
      case "buyer":
        demoEmail = "john@example.com";
        break;
      case "seller":
        demoEmail = "jane@example.com";
        break;
      case "admin":
        demoEmail = "admin@example.com";
        demoPassword = "admin123";
        break;
      default:
        demoEmail = "john@example.com";
    }
    
    // Add a small delay to simulate API call
    setTimeout(() => {
      const success = login(demoEmail, demoPassword);
      
      if (success) {
        navigate("/dashboard");
      }
      
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderSection />
      
      <main className="flex-grow pt-24 flex items-center justify-center">
        <div className="container max-w-md p-8 bg-white rounded-xl shadow-xl animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-gray-600 mt-2">Sign in to continue to your account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-sm text-purple hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <Button
              type="submit"
              className="w-full bg-purple hover:bg-purple-dark"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with demo accounts
                </span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-3 gap-3">
              <Button
                type="button"
                variant="outline"
                className="border-purple text-purple hover:bg-purple hover:text-white"
                onClick={() => handleDemoLogin("buyer")}
              >
                Buyer
              </Button>
              <Button
                type="button"
                variant="outline"
                className="border-purple text-purple hover:bg-purple hover:text-white"
                onClick={() => handleDemoLogin("seller")}
              >
                Seller
              </Button>
              <Button
                type="button"
                variant="outline"
                className="border-purple text-purple hover:bg-purple hover:text-white"
                onClick={() => handleDemoLogin("admin")}
              >
                Admin
              </Button>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-purple hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
      
      <FooterSection />
    </div>
  );
};

export default Login;
