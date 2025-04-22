
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "../contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Home, User, ChevronDown } from "lucide-react";

const HeaderSection: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path ? "text-purple" : "text-gray-700";
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white bg-opacity-90 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <Home className="h-8 w-8 text-purple" />
          <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-purple to-purple-dark bg-clip-text text-transparent">
            RealtyAlchemy
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className={`font-medium hover:text-purple transition-colors ${isActive(
              "/"
            )}`}
          >
            Home
          </Link>
          <Link
            to="/properties"
            className={`font-medium hover:text-purple transition-colors ${isActive(
              "/properties"
            )}`}
          >
            Properties
          </Link>
          <Link
            to="/about"
            className={`font-medium hover:text-purple transition-colors ${isActive(
              "/about"
            )}`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`font-medium hover:text-purple transition-colors ${isActive(
              "/contact"
            )}`}
          >
            Contact
          </Link>
        </nav>

        {/* User Menu */}
        <div className="flex items-center space-x-4">
          {!isAuthenticated ? (
            <>
              <Link to="/login">
                <Button variant="outline">Log In</Button>
              </Link>
              <Link to="/register">
                <Button>Sign Up</Button>
              </Link>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-purple flex items-center justify-center text-white">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-5 h-5" />
                    )}
                  </div>
                  <span className="hidden md:inline">{user?.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="w-full cursor-pointer">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="w-full cursor-pointer">
                    Profile
                  </Link>
                </DropdownMenuItem>
                {user?.role === "admin" && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin" className="w-full cursor-pointer">
                      Admin Panel
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logout}
                  className="text-red-500 cursor-pointer"
                >
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderSection;
