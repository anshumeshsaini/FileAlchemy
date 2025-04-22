
import React, { useEffect, useState } from "react";
import HeaderSection from "../components/HeaderSection";
import FooterSection from "../components/FooterSection";
import FilterBar from "../components/FilterBar";
import PropertyCard from "../components/PropertyCard";
import { useProperties } from "../contexts/PropertiesContext";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const PropertiesPage: React.FC = () => {
  const { filteredProperties, filterProperties, loading } = useProperties();
  const [visibleProperties, setVisibleProperties] = useState<number>(6);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);

  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleFilter = (filters: Record<string, any>) => {
    setIsFiltering(true);
    filterProperties(filters);
    
    // Reset visible properties count when filtering
    setVisibleProperties(6);
    
    // Simulate delay for loading animation
    setTimeout(() => {
      setIsFiltering(false);
    }, 800);
  };

  const loadMoreProperties = () => {
    setVisibleProperties((prev) => prev + 6);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderSection />
      
      {/* Main content */}
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 animate-fade-in">Find Your Perfect Property</h1>
            <p className="text-gray-600 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Browse our extensive collection of properties and use our powerful filters to find exactly what you're looking for.
            </p>
          </div>
          
          {/* Filter Bar */}
          <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <FilterBar onFilter={handleFilter} />
          </div>
          
          {/* Properties Grid */}
          <div className="min-h-[400px]">
            {isFiltering || loading ? (
              <div className="flex flex-col items-center justify-center h-[400px]">
                <Loader2 className="h-12 w-12 text-purple animate-spin mb-4" />
                <p className="text-gray-600">Finding the perfect properties for you...</p>
              </div>
            ) : filteredProperties.length === 0 ? (
              <div className="text-center py-12">
                <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No properties found</h3>
                <p className="mt-2 text-gray-500">Try adjusting your filters to find more properties.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProperties.slice(0, visibleProperties).map((property, index) => (
                    <div 
                      key={property.id} 
                      className="animate-fade-in" 
                      style={{ animationDelay: `${0.1 * (index % 6)}s` }}
                    >
                      <PropertyCard property={property} />
                    </div>
                  ))}
                </div>
                
                {/* Load More Button */}
                {visibleProperties < filteredProperties.length && (
                  <div className="text-center mt-12">
                    <Button 
                      onClick={loadMoreProperties}
                      className="bg-purple hover:bg-purple-dark"
                    >
                      Load More Properties
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      
      <FooterSection />
    </div>
  );
};

export default PropertiesPage;
