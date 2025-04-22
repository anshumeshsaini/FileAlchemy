
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import HeaderSection from "../components/HeaderSection";
import FooterSection from "../components/FooterSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("buyer");
  const [loading, setLoading] = useState(false);
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword || !phone) {
      toast.error("Please fill in all fields");
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    setLoading(true);
    
    // Add a small delay to simulate API call
    setTimeout(() => {
      const success = registerUser({
        name,
        email,
        password,
        role: role as "buyer" | "seller" | "admin",
        phone,
        avatar: "https://images.unsplash.com/photo-1472396961693-142e6e269027"
      });
      
      if (success) {
        navigate("/dashboard");
      }
      
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderSection />
      
      <main className="flex-grow pt-24 flex items-center justify-center py-12">
        <div className="container max-w-md p-8 bg-white rounded-xl shadow-xl animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Create an Account</h1>
            <p className="text-gray-600 mt-2">Join our platform to start your real estate journey</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
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
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(123) 456-7890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">I am a</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buyer">Buyer/Tenant</SelectItem>
                  <SelectItem value="seller">Seller/Landlord</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            
            <div className="text-sm text-gray-600">
              By creating an account, you agree to our{" "}
              <Link to="/terms" className="text-purple hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-purple hover:underline">
                Privacy Policy
              </Link>
              .
            </div>
            
            <Button
              type="submit"
              className="w-full bg-purple hover:bg-purple-dark"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-purple hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>
      
      <FooterSection />
    </div>
  );
};

export default Register;
