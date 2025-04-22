
import React, { createContext, useContext, useState, useEffect } from "react";
import propertiesData from "../data/properties.json";
import bookingsData from "../data/bookings.json";
import { toast } from "sonner";

export type Property = {
  id: number;
  title: string;
  price: number;
  pricePerMonth: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  location: {
    address: string;
    city: string;
    state: string;
    zip: string;
    lat: number;
    lng: number;
  };
  type: string;
  propertyType: string;
  status: string;
  featured: boolean;
  images: string[];
  amenities: string[];
  rating: number;
  description: string;
  yearBuilt: number;
  availableFrom: string;
  tags: string[];
};

export type Booking = {
  id: number;
  userId: number;
  propertyId: number;
  date: string;
  status: string;
  createdAt: string;
  notes?: string;
};

type PropertiesContextType = {
  properties: Property[];
  bookings: Booking[];
  filteredProperties: Property[];
  loading: boolean;
  getPropertyById: (id: number) => Property | undefined;
  filterProperties: (filters: Record<string, any>) => void;
  addBooking: (booking: Omit<Booking, "id" | "createdAt">) => void;
  getBookingsForUser: (userId: number) => Booking[];
  getBookingsForProperty: (propertyId: number) => Booking[];
  featuredProperties: Property[];
};

const PropertiesContext = createContext<PropertiesContextType | undefined>(undefined);

export const PropertiesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>(propertiesData);
  const [bookings, setBookings] = useState<Booking[]>(bookingsData);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(propertiesData);
  const [loading, setLoading] = useState<boolean>(false);

  // Filter properties based on criteria
  const filterProperties = (filters: Record<string, any>) => {
    setLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      let filtered = [...properties];
      
      // Filter by location (city)
      if (filters.location && filters.location !== "all") {
        filtered = filtered.filter(p => 
          p.location.city.toLowerCase() === filters.location.toLowerCase()
        );
      }
      
      // Filter by type (residential/commercial)
      if (filters.type && filters.type !== "all") {
        filtered = filtered.filter(p => 
          p.type.toLowerCase() === filters.type.toLowerCase()
        );
      }
      
      // Filter by status (for sale/for rent)
      if (filters.status && filters.status !== "all") {
        filtered = filtered.filter(p => 
          p.status.toLowerCase() === filters.status.toLowerCase()
        );
      }
      
      // Filter by price range
      if (filters.minPrice && filters.maxPrice) {
        filtered = filtered.filter(p => 
          p.price >= filters.minPrice && p.price <= filters.maxPrice
        );
      } else if (filters.minPrice) {
        filtered = filtered.filter(p => p.price >= filters.minPrice);
      } else if (filters.maxPrice) {
        filtered = filtered.filter(p => p.price <= filters.maxPrice);
      }
      
      // Filter by bedrooms
      if (filters.bedrooms) {
        filtered = filtered.filter(p => p.bedrooms >= filters.bedrooms);
      }
      
      // Filter by bathrooms
      if (filters.bathrooms) {
        filtered = filtered.filter(p => p.bathrooms >= filters.bathrooms);
      }

      // Filter by property type
      if (filters.propertyType && filters.propertyType !== "all") {
        filtered = filtered.filter(p => 
          p.propertyType.toLowerCase() === filters.propertyType.toLowerCase()
        );
      }
      
      setFilteredProperties(filtered);
      setLoading(false);
    }, 600);
  };

  // Get property by ID
  const getPropertyById = (id: number) => {
    return properties.find(p => p.id === id);
  };

  // Add a new booking
  const addBooking = (booking: Omit<Booking, "id" | "createdAt">) => {
    // Check if the property is already booked on that date
    const isAlreadyBooked = bookings.some(
      b => b.propertyId === booking.propertyId && 
           b.date === booking.date && 
           b.status !== "cancelled"
    );

    if (isAlreadyBooked) {
      toast.error("This property is already booked for the selected date");
      return;
    }

    const newBooking: Booking = {
      ...booking,
      id: bookings.length + 1,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setBookings([...bookings, newBooking]);
    
    // In a real app, we would save this to a database
    // For now, we'll save to localStorage
    const storedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    localStorage.setItem("bookings", JSON.stringify([...storedBookings, newBooking]));
    
    toast.success("Booking request submitted successfully");
  };

  // Get bookings for a specific user
  const getBookingsForUser = (userId: number) => {
    return bookings.filter(b => b.userId === userId);
  };

  // Get bookings for a specific property
  const getBookingsForProperty = (propertyId: number) => {
    return bookings.filter(b => b.propertyId === propertyId);
  };

  // Get featured properties
  const featuredProperties = properties.filter(p => p.featured);

  // Load bookings from localStorage on init
  useEffect(() => {
    const storedBookings = localStorage.getItem("bookings");
    if (storedBookings) {
      setBookings([...bookings, ...JSON.parse(storedBookings)]);
    }
  }, []);

  return (
    <PropertiesContext.Provider 
      value={{ 
        properties, 
        filteredProperties, 
        loading, 
        getPropertyById, 
        filterProperties, 
        bookings, 
        addBooking, 
        getBookingsForUser, 
        getBookingsForProperty,
        featuredProperties
      }}
    >
      {children}
    </PropertiesContext.Provider>
  );
};

export const useProperties = () => {
  const context = useContext(PropertiesContext);
  if (context === undefined) {
    throw new Error("useProperties must be used within a PropertiesProvider");
  }
  return context;
};
