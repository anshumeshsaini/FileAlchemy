
import React from "react";
import PropertyCard from "./PropertyCard";
import { useProperties } from "../contexts/PropertiesContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const FeaturedProperties: React.FC = () => {
  const { featuredProperties } = useProperties();

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="section-title mb-6 animate-fade-in">Featured Properties</h2>
          <p className="text-gray-600 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Discover our handpicked selection of the most exceptional properties currently available on the market, 
            each offering unique features and premium locations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property, index) => (
            <div 
              key={property.id} 
              className="animate-fade-in" 
              style={{ animationDelay: `${0.2 * (index + 1)}s` }}
            >
              <PropertyCard property={property} featured={true} />
            </div>
          ))}
        </div>

        <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: '1s' }}>
          <Link to="/properties">
            <Button size="lg" className="bg-purple hover:bg-purple-dark rounded-full px-8">
              View All Properties
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
