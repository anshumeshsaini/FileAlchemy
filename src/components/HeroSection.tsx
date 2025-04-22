
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Search, Home, Building2, LineChart, Calendar, ArrowDown } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const HeroSection: React.FC = () => {
  const [typedText, setTypedText] = useState("");
  const fullText = "Transform Your Real Estate Experience";
  const [activeIndex, setActiveIndex] = useState(0);
  const backgroundImages = [
    "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e",
    "https://images.unsplash.com/photo-1486718448742-163732cd1544",
    "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb"
  ];
  const taglines = [
    "Find your dream property with our AI-powered platform",
    "Book viewings with ease, all in one place",
    "Discover smart investments for your future"
  ];
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 7000);
    
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2, duration: 0.5 }
    })
  };

  return (
    <motion.div 
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ opacity, scale, y }}
    >
      {/* Background image carousel with crossfade effect */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((image, index) => (
          <motion.div
            key={image}
            className="absolute inset-0 bg-gradient-to-b from-purple-dark/40 via-purple/30 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: activeIndex === index ? 1 : 0,
              transition: { duration: 1.5 } 
            }}
            style={{ 
              backgroundImage: `url(${image})`, 
              backgroundSize: 'cover', 
              backgroundPosition: 'center',
              filter: 'brightness(0.8)'
            }}
          ></motion.div>
        ))}
      </div>

      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-dark/60 via-purple/40 to-transparent animate-pulse-light z-10"></div>
      
      {/* Animated particles/dots in background */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/20 backdrop-blur-sm"
            style={{
              width: Math.random() * 40 + 10,
              height: Math.random() * 40 + 10,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.5, 0.1],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>
      
      {/* Floating shapes for decoration */}
      <motion.div 
        className="absolute -right-20 top-40 w-80 h-80 bg-purple/20 rounded-full blur-3xl z-10"
        animate={{
          y: [0, 30, 0],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div 
        className="absolute -left-20 bottom-40 w-80 h-80 bg-purple-dark/20 rounded-full blur-3xl z-10"
        animate={{
          y: [0, -30, 0],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 8,
          delay: 1,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Content */}
      <div className="container mx-auto px-4 pt-20 z-20">
        <div className="max-w-4xl">
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeInUpVariants}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif text-shadow-lg">
              {typedText}<span className="animate-pulse">|</span>
            </h1>
          </motion.div>
          
          <motion.div
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeInUpVariants}
          >
            <AnimatePresence mode="wait">
              <motion.p 
                key={activeIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl"
              >
                {taglines[activeIndex]}
              </motion.p>
            </AnimatePresence>
          </motion.div>
          
          <motion.div
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeInUpVariants}
            className="flex flex-wrap gap-4 mb-12"
          >
            <Link to="/properties">
              <Button size="lg" className="bg-purple hover:bg-purple-dark text-white rounded-full px-8 group">
                Browse Properties
                <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            
            <Link to="/login">
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/30 rounded-full px-8">
                Sign In
              </Button>
            </Link>
          </motion.div>
          
          {/* Search bar */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={3}
            variants={fadeInUpVariants}
            className="bg-white/10 backdrop-blur-md rounded-full p-2 border border-white/20 max-w-3xl mb-16"
          >
            <div className="flex flex-wrap md:flex-nowrap">
              <div className="flex items-center w-full md:w-auto bg-white/10 rounded-full px-4 py-2 m-1">
                <Search size={18} className="text-white mr-2" />
                <input 
                  type="text" 
                  placeholder="City, neighborhood, or address..." 
                  className="bg-transparent text-white placeholder:text-white/60 focus:outline-none w-full"
                />
              </div>
              
              <div className="hidden md:flex items-center justify-center px-2">
                <div className="h-8 w-px bg-white/20"></div>
              </div>
              
              <div className="flex items-center w-full md:w-auto bg-white/10 rounded-full px-4 py-2 m-1">
                <Home size={18} className="text-white mr-2" />
                <select className="bg-transparent text-white focus:outline-none w-full appearance-none cursor-pointer">
                  <option value="" disabled selected className="text-gray-800">Property type</option>
                  <option value="house" className="text-gray-800">House</option>
                  <option value="apartment" className="text-gray-800">Apartment</option>
                  <option value="condo" className="text-gray-800">Condo</option>
                  <option value="commercial" className="text-gray-800">Commercial</option>
                </select>
              </div>
              
              <div className="hidden md:flex items-center justify-center px-2">
                <div className="h-8 w-px bg-white/20"></div>
              </div>
              
              <div className="flex items-center w-full md:w-auto bg-white/10 rounded-full px-4 py-2 m-1">
                <Building2 size={18} className="text-white mr-2" />
                <select className="bg-transparent text-white focus:outline-none w-full appearance-none cursor-pointer">
                  <option value="" disabled selected className="text-gray-800">For rent/sale</option>
                  <option value="rent" className="text-gray-800">For Rent</option>
                  <option value="sale" className="text-gray-800">For Sale</option>
                </select>
              </div>
              
              <Button size="sm" className="w-full md:w-auto m-1 bg-purple hover:bg-purple-dark text-white font-semibold rounded-full px-6">
                <Search size={18} className="mr-2" />
                Search
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial="hidden"
            animate="visible"
            custom={4}
            variants={fadeInUpVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            <motion.div 
              className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/20 hover:transform hover:scale-105 transition-transform relative overflow-hidden group"
              whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)" }}
            >
              <motion.div 
                className="absolute inset-0 bg-purple/20 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              />
              <h3 className="text-white font-bold text-xl mb-1 relative z-10">500+</h3>
              <p className="text-white/80 text-sm relative z-10">Properties</p>
              <Building2 size={24} className="absolute right-3 bottom-3 text-white/20 group-hover:text-white/40 transition-colors" />
            </motion.div>
            
            <motion.div 
              className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/20 hover:transform hover:scale-105 transition-transform relative overflow-hidden group"
              whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)" }}
            >
              <motion.div 
                className="absolute inset-0 bg-purple/20 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              />
              <h3 className="text-white font-bold text-xl mb-1 relative z-10">300+</h3>
              <p className="text-white/80 text-sm relative z-10">Happy Clients</p>
              <Users size={24} className="absolute right-3 bottom-3 text-white/20 group-hover:text-white/40 transition-colors" />
            </motion.div>
            
            <motion.div 
              className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/20 hover:transform hover:scale-105 transition-transform relative overflow-hidden group"
              whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)" }}
            >
              <motion.div 
                className="absolute inset-0 bg-purple/20 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              />
              <h3 className="text-white font-bold text-xl mb-1 relative z-10">20+</h3>
              <p className="text-white/80 text-sm relative z-10">Cities</p>
              <Building2 size={24} className="absolute right-3 bottom-3 text-white/20 group-hover:text-white/40 transition-colors" />
            </motion.div>
            
            <motion.div 
              className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/20 hover:transform hover:scale-105 transition-transform relative overflow-hidden group"
              whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)" }}
            >
              <motion.div 
                className="absolute inset-0 bg-purple/20 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              />
              <h3 className="text-white font-bold text-xl mb-1 relative z-10">4.9</h3>
              <p className="text-white/80 text-sm relative z-10">User Rating</p>
              <Star size={24} className="absolute right-3 bottom-3 text-white/20 group-hover:text-white/40 transition-colors" />
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop"
        }}
      >
        <span className="text-white text-sm mb-2">Scroll Down</span>
        <ArrowDown className="w-6 h-6 text-white" />
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;
