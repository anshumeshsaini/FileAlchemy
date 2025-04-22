
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const HeroSection: React.FC = () => {
  const [typedText, setTypedText] = useState("");
  const fullText = "Transform Your Real Estate Experience";
  
  useEffect(() => {
    let index = 0;
    const typingEffect = setInterval(() => {
      if (index < fullText.length) {
        setTypedText((prev) => prev + fullText.charAt(index));
        index++;
      } else {
        clearInterval(typingEffect);
      }
    }, 80);
    
    return () => clearInterval(typingEffect);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-purple-dark/30 via-purple/20 to-transparent"
          style={{ 
            backgroundImage: `url(https://images.unsplash.com/photo-1492321936769-b49830bc1d1e)`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            filter: 'brightness(0.8)'
          }}
        ></div>
      </div>

      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-dark/60 via-purple/40 to-transparent animate-pulse-light"></div>
      
      {/* Floating shapes for decoration */}
      <div className="absolute -right-20 top-40 w-80 h-80 bg-purple/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute -left-20 bottom-40 w-80 h-80 bg-purple-dark/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 pt-20 z-10">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif text-shadow-lg">
            {typedText}<span className="animate-pulse">|</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl animate-fade-in" style={{ animationDelay: '2s' }}>
            Discover, book, and experience premium real estate properties through our AI-powered booking portal.
          </p>
          
          <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '2.5s' }}>
            <Link to="/properties">
              <Button size="lg" className="bg-purple hover:bg-purple-dark text-white rounded-full px-8">
                Browse Properties
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <Link to="/login">
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/30 rounded-full px-8">
                Sign In
              </Button>
            </Link>
          </div>
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in" style={{ animationDelay: '3s' }}>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/20 hover:transform hover:scale-105 transition-transform">
              <h3 className="text-white font-bold text-xl mb-1">500+</h3>
              <p className="text-white/80 text-sm">Properties</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/20 hover:transform hover:scale-105 transition-transform">
              <h3 className="text-white font-bold text-xl mb-1">300+</h3>
              <p className="text-white/80 text-sm">Happy Clients</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/20 hover:transform hover:scale-105 transition-transform">
              <h3 className="text-white font-bold text-xl mb-1">20+</h3>
              <p className="text-white/80 text-sm">Cities</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/20 hover:transform hover:scale-105 transition-transform">
              <h3 className="text-white font-bold text-xl mb-1">4.9</h3>
              <p className="text-white/80 text-sm">User Rating</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-white text-sm mb-2">Scroll Down</span>
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
