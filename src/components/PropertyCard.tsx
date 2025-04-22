
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Property } from "../contexts/PropertiesContext";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface PropertyCardProps {
  property: Property;
  featured?: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, featured = false }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to handle image navigation
  const handleImageNav = (direction: "next" | "prev", e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (direction === "next") {
      setCurrentImageIndex((prev) => 
        prev === property.images.length - 1 ? 0 : prev + 1
      );
    } else {
      setCurrentImageIndex((prev) => 
        prev === 0 ? property.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <Link 
      to={`/property/${property.id}`} 
      className={`property-card group block ${featured ? 'animate-float' : ''}`}
    >
      <div className="relative overflow-hidden rounded-t-2xl aspect-[4/3]">
        {/* Property image */}
        <img 
          src={property.images[currentImageIndex]} 
          alt={property.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Image navigation */}
        {property.images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={(e) => handleImageNav("prev", e)}
              className="bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition"
            >
              &#10094;
            </button>
            <button 
              onClick={(e) => handleImageNav("next", e)}
              className="bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition"
            >
              &#10095;
            </button>
          </div>
        )}
        
        {/* Status badge */}
        <div className="absolute top-3 left-3">
          <Badge className={`${property.status === "For Sale" ? 'bg-purple' : 'bg-orange'} text-white`}>
            {property.status}
          </Badge>
        </div>
        
        {/* Property type badge */}
        <div className="absolute top-3 right-3">
          <Badge variant="secondary">
            {property.propertyType}
          </Badge>
        </div>
        
        {/* Tags */}
        <div className="absolute bottom-3 left-3 flex space-x-2">
          {property.tags.map((tag, index) => (
            <Badge 
              key={index} 
              className={`
                ${tag === "New" ? 'bg-green-500' : 
                tag === "Hot" ? 'bg-red-500' : 
                tag === "Luxury" ? 'bg-purple-800' : 
                'bg-gray-700'} text-white
              `}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="p-4">
        {/* Price */}
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-2xl font-bold text-gray-900">
              ${property.price.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">
              {property.status === "For Rent" ? `$${property.pricePerMonth.toLocaleString()}/month` : ""}
            </p>
          </div>
          
          {/* Rating */}
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="ml-1 text-sm font-medium">{property.rating}</span>
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-bold mb-2 text-gray-800 line-clamp-1">
          {property.title}
        </h3>
        
        {/* Location */}
        <p className="text-gray-600 mb-3 text-sm line-clamp-1">
          {property.location.address}, {property.location.city}, {property.location.state}
        </p>
        
        {/* Features */}
        <div className="flex justify-between text-gray-600 text-sm">
          <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
          <span>{property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
          <span>{property.area} sq ft</span>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
