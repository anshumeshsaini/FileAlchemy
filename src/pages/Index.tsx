
import React, { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import FeaturedProperties from "../components/FeaturedProperties";
import HeaderSection from "../components/HeaderSection";
import FooterSection from "../components/FooterSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index: React.FC = () => {
  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <HeaderSection />
      <HeroSection />

      <FeaturedProperties />

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="section-title mb-6 animate-fade-in">How It Works</h2>
            <p className="text-gray-600 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Our platform makes it easy to find, book, and manage your real estate journey 
              with an intuitive process designed for simplicity and efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-md text-center hover-scale animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="w-16 h-16 bg-purple-light rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Search Properties</h3>
              <p className="text-gray-600">
                Browse our extensive collection of properties using advanced filters to find your perfect match.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md text-center hover-scale animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <div className="w-16 h-16 bg-purple-light rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Schedule Visits</h3>
              <p className="text-gray-600">
                Book property viewings with our interactive calendar and get instant confirmations.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md text-center hover-scale animate-fade-in" style={{ animationDelay: '0.7s' }}>
              <div className="w-16 h-16 bg-purple-light rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Finalize Deals</h3>
              <p className="text-gray-600">
                Complete your real estate transaction with our secure process and digital documentation.
              </p>
            </div>
          </div>

          <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: '0.9s' }}>
            <Link to="/properties">
              <Button variant="outline" className="rounded-full border-purple text-purple hover:bg-purple hover:text-white transition-all">
                Explore the Process
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-purple-light to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="section-title mb-6 animate-fade-in">What Our Clients Say</h2>
            <p className="text-gray-600 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Hear from our satisfied users who have found their perfect properties through our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-md animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden mr-4">
                  <img src="https://images.unsplash.com/photo-1472396961693-142e6e269027" alt="User" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold">Sarah Johnson</h4>
                  <p className="text-gray-500 text-sm">New York, NY</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "I found my dream apartment in less than a week using this platform. The AI recommendations were spot on, and the booking process was incredibly smooth."
              </p>
              <div className="flex mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-500 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden mr-4">
                  <img src="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb" alt="User" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold">Michael Chen</h4>
                  <p className="text-gray-500 text-sm">San Francisco, CA</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "As a property owner, this platform has simplified my rental process tremendously. The dashboard gives me all the insights I need, and the automated scheduling saves me hours."
              </p>
              <div className="flex mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-500 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md animate-fade-in" style={{ animationDelay: '0.7s' }}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden mr-4">
                  <img src="https://images.unsplash.com/photo-1433086966358-54859d0ed716" alt="User" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold">Emily Rodriguez</h4>
                  <p className="text-gray-500 text-sm">Miami, FL</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The AI assistant helped me narrow down my options based on my specific needs. I was able to find a commercial space that perfectly fits my business requirements."
              </p>
              <div className="flex mt-4">
                {[1, 2, 3, 4].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-500 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
                <svg className="w-5 h-5 text-gray-300 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-purple text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 animate-fade-in">Ready to Find Your Perfect Property?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Join thousands of satisfied users who have discovered their ideal real estate matches through our platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Link to="/properties">
              <Button size="lg" className="bg-white text-purple hover:bg-gray-100 rounded-full px-8">
                Browse Properties
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple rounded-full px-8">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default Index;
