import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useProperties } from "../contexts/PropertiesContext";
import HeaderSection from "../components/HeaderSection";
import FooterSection from "../components/FooterSection";
import AmenityIcon from "../components/AmenityIcon";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import aiResponses from "../data/aiResponses.json";
import { Loader2, Star, Calendar as CalendarIcon, MapPin, Home, Info, Check } from "lucide-react";

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getPropertyById, addBooking } = useProperties();
  const { isAuthenticated, user } = useAuth();
  const [property, setProperty] = useState(getPropertyById(Number(id)));
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [enhancedDescription, setEnhancedDescription] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
    
    if (property) {
      // Simulate loading enhanced AI description
      setLoadingAI(true);
      setTimeout(() => {
        const propertyDesc = aiResponses.propertyAssistant.descriptions.find(
          (desc) => desc.propertyId === property.id
        );
        if (propertyDesc) {
          setEnhancedDescription(propertyDesc.enhancedDescription);
        }
        setLoadingAI(false);
      }, 1500);
    }
  }, [property]);

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <HeaderSection />
        <main className="flex-grow pt-24 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Property Not Found</h1>
            <p className="text-gray-600 mb-6">
              Sorry, we couldn't find the property you're looking for.
            </p>
            <Link to="/properties">
              <Button>Back to Properties</Button>
            </Link>
          </div>
        </main>
        <FooterSection />
      </div>
    );
  }

  const handleBooking = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to book a viewing");
      return;
    }

    if (!selectedDate) {
      toast.error("Please select a date for your viewing");
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      addBooking({
        userId: user?.id || 1,
        propertyId: property.id,
        date: selectedDate.toISOString().split("T")[0],
        status: "pending",
        notes: "Booking request from property detail page"
      });
      
      setLoading(false);
      setBookingComplete(true);
    }, 1500);
  };

  const handleCallAgent = () => {
    window.location.href = `tel:7379340224`;
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderSection />
      
      <main className="flex-grow pt-24">
        {/* Property Title and Hero Section */}
        <div className="relative h-[50vh] overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>
          </div>
          
          <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-12 relative z-10">
            <div className="animate-fade-in">
              <span className="px-3 py-1 bg-purple rounded-full text-white text-sm font-medium mb-4 inline-block">
                {property.status}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {property.title}
              </h1>
              <div className="flex flex-wrap items-center text-white gap-4 mb-2">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-1" />
                  <span>
                    {property.location.address}, {property.location.city},{" "}
                    {property.location.state}
                  </span>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 fill-yellow-500 text-yellow-500 mr-1" />
                  <span>{property.rating} Rating</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 mt-4">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                  {property.bedrooms} Bedrooms
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                  {property.bathrooms} Bathrooms
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                  {property.area} sq ft
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                  Built {property.yearBuilt}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" onValueChange={setActiveTab} className="animate-fade-in">
                <TabsList className="w-full grid grid-cols-5 mb-8">
                  <TabsTrigger value="overview" className="rounded-l-md">
                    <Home className="w-4 h-4 mr-2 hidden sm:inline" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="gallery">
                    <svg className="w-4 h-4 mr-2 hidden sm:inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Gallery
                  </TabsTrigger>
                  <TabsTrigger value="amenities">
                    <Check className="w-4 h-4 mr-2 hidden sm:inline" />
                    Amenities
                  </TabsTrigger>
                  <TabsTrigger value="location">
                    <MapPin className="w-4 h-4 mr-2 hidden sm:inline" />
                    Location
                  </TabsTrigger>
                  <TabsTrigger value="details" className="rounded-r-md">
                    <Info className="w-4 h-4 mr-2 hidden sm:inline" />
                    Details
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="animate-fade-in">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">About This Property</h2>
                    <p className="text-gray-600 mb-4">{property.description}</p>
                    
                    {loadingAI ? (
                      <div className="flex items-center space-x-2 mt-6">
                        <Loader2 className="h-4 w-4 animate-spin text-purple" />
                        <span className="text-sm text-gray-500">AI is enhancing your property description...</span>
                      </div>
                    ) : enhancedDescription && (
                      <div className="mt-6 p-4 bg-purple-light rounded-xl border border-purple/20">
                        <h3 className="text-lg font-semibold mb-2 flex items-center">
                          <svg className="w-5 h-5 mr-2 text-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          AI-Enhanced Description
                        </h3>
                        <p className="text-gray-700">{enhancedDescription}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="text-xl font-bold mb-4">Property Features</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center text-gray-600">
                          <svg className="w-5 h-5 text-purple mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {property.bedrooms} Bedrooms
                        </li>
                        <li className="flex items-center text-gray-600">
                          <svg className="w-5 h-5 text-purple mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {property.bathrooms} Bathrooms
                        </li>
                        <li className="flex items-center text-gray-600">
                          <svg className="w-5 h-5 text-purple mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {property.area} sq ft
                        </li>
                        <li className="flex items-center text-gray-600">
                          <svg className="w-5 h-5 text-purple mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Built in {property.yearBuilt}
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-4">Property Type</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center text-gray-600">
                          <svg className="w-5 h-5 text-purple mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {property.type}
                        </li>
                        <li className="flex items-center text-gray-600">
                          <svg className="w-5 h-5 text-purple mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {property.propertyType}
                        </li>
                        <li className="flex items-center text-gray-600">
                          <svg className="w-5 h-5 text-purple mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {property.status}
                        </li>
                        <li className="flex items-center text-gray-600">
                          <svg className="w-5 h-5 text-purple mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Available from {formatDate(property.availableFrom)}
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="gallery" className="animate-fade-in">
                  <h2 className="text-2xl font-bold mb-4">Property Gallery</h2>
                  <Carousel className="w-full">
                    <CarouselContent>
                      {property.images.map((image, index) => (
                        <CarouselItem key={index} className="aspect-video">
                          <img
                            src={image}
                            alt={`${property.title} - Image ${index + 1}`}
                            className="w-full h-full object-cover rounded-xl"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                  
                  <div className="grid grid-cols-4 gap-4 mt-4">
                    {property.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="h-24 w-full object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                      />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="amenities" className="animate-fade-in">
                  <h2 className="text-2xl font-bold mb-6">Property Amenities</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {property.amenities.map((amenity, index) => (
                      <div
                        key={index}
                        className="p-4 bg-gray-50 rounded-lg flex items-start hover:bg-purple-light transition-colors"
                      >
                        <AmenityIcon amenity={amenity} />
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="location" className="animate-fade-in">
                  <h2 className="text-2xl font-bold mb-6">Property Location</h2>
                  <div className="bg-gray-100 rounded-xl overflow-hidden h-[400px] mb-6">
                    <iframe
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      title="Map"
                      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBtdr5J6dCJL4fUFH7XgwVNoZmJlD0zSNI&q=${encodeURIComponent(
                        `${property.location.address}, ${property.location.city}, ${property.location.state}`
                      )}`}
                      allowFullScreen
                    ></iframe>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3">Address</h3>
                    <p className="text-gray-600">
                      {property.location.address}, {property.location.city},{" "}
                      {property.location.state} {property.location.zip}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Nearby Amenities</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 text-purple mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Shopping Centers: 0.5 miles
                      </li>
                      <li className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 text-purple mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Restaurants: 0.3 miles
                      </li>
                      <li className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 text-purple mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Schools: 1.2 miles
                      </li>
                      <li className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 text-purple mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Parks: 0.8 miles
                      </li>
                      <li className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 text-purple mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Public Transportation: 0.4 miles
                      </li>
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="details" className="animate-fade-in">
                  <h2 className="text-2xl font-bold mb-6">Property Details</h2>
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-3">Key Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <ul className="space-y-4">
                          <li className="flex justify-between">
                            <span className="text-gray-600">Property ID:</span>
                            <span className="font-medium">{property.id}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-600">Property Type:</span>
                            <span className="font-medium">{property.propertyType}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-600">Property Status:</span>
                            <span className="font-medium">{property.status}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-600">Area:</span>
                            <span className="font-medium">{property.area} sq ft</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-600">Bedrooms:</span>
                            <span className="font-medium">{property.bedrooms}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-600">Bathrooms:</span>
                            <span className="font-medium">{property.bathrooms}</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <ul className="space-y-4">
                          <li className="flex justify-between">
                            <span className="text-gray-600">Year Built:</span>
                            <span className="font-medium">{property.yearBuilt}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-600">Available From:</span>
                            <span className="font-medium">{formatDate(property.availableFrom)}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-600">Price:</span>
                            <span className="font-medium">${property.price.toLocaleString()}</span>
                          </li>
                          {property.status === "For Rent" && (
                            <li className="flex justify-between">
                              <span className="text-gray-600">Price Per Month:</span>
                              <span className="font-medium">${property.pricePerMonth.toLocaleString()}</span>
                            </li>
                          )}
                          <li className="flex justify-between">
                            <span className="text-gray-600">Rating:</span>
                            <span className="font-medium flex items-center">
                              {property.rating}
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 ml-1" />
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {property.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 rounded-full text-gray-700 text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 animate-fade-in">
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">
                      ${property.price.toLocaleString()}
                    </h3>
                    {property.status === "For Rent" && (
                      <p className="text-gray-600 mb-4">
                        ${property.pricePerMonth.toLocaleString()} / month
                      </p>
                    )}
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <CalendarIcon className="w-4 h-4 mr-2 text-purple" />
                          Schedule a Viewing
                        </h4>
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="w-full bg-purple hover:bg-purple-dark">
                              Book Now
                            </Button>
                          </DialogTrigger>
                          
                          <DialogContent className="sm:max-w-md">
                            {bookingComplete ? (
                              <div className="py-6 text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                  <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                                <h2 className="text-xl font-bold mb-2">Booking Confirmed!</h2>
                                <p className="text-gray-600 mb-6">
                                  Your viewing has been scheduled for{" "}
                                  {selectedDate && formatDate(selectedDate.toISOString())}.
                                </p>
                                <Button className="bg-purple hover:bg-purple-dark" onClick={() => setBookingComplete(false)}>
                                  Close
                                </Button>
                              </div>
                            ) : (
                              <>
                                <DialogHeader>
                                  <DialogTitle>Schedule a Viewing</DialogTitle>
                                  <DialogDescription>
                                    Select a date to visit this property
                                  </DialogDescription>
                                </DialogHeader>
                                
                                <div className="py-6">
                                  <Calendar
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={setSelectedDate}
                                    disabled={(date) => {
                                      const today = new Date();
                                      today.setHours(0, 0, 0, 0);
                                      return date < today;
                                    }}
                                    className="rounded-md border mx-auto"
                                  />
                                </div>
                                
                                <DialogFooter>
                                  <Button type="button" variant="outline" className="mr-2">
                                    Cancel
                                  </Button>
                                  <Button 
                                    className="bg-purple hover:bg-purple-dark"
                                    onClick={handleBooking}
                                    disabled={!selectedDate || loading}
                                  >
                                    {loading ? (
                                      <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Processing...
                                      </>
                                    ) : (
                                      "Confirm Booking"
                                    )}
                                  </Button>
                                </DialogFooter>
                              </>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-200">
                        <h4 className="font-semibold mb-4">Contact Agent</h4>
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 rounded-full bg-gray-200 mr-3 overflow-hidden">
                            <img
                              src="https://images.unsplash.com/photo-1472396961693-142e6e269027"
                              alt="Agent"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">Jane Smith</p>
                            <p className="text-gray-600 text-sm">Property Agent</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Button 
                            variant="outline" 
                            className="w-full flex items-center justify-center"
                            onClick={handleCallAgent}
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            Call Agent
                          </Button>
                          
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" className="w-full flex items-center justify-center">
                                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Email Agent
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader>
                                <DialogTitle>Contact Agent</DialogTitle>
                                <DialogDescription>
                                  Send a message to inquire about this property
                                </DialogDescription>
                              </DialogHeader>
                              <EmailAgentForm
                                propertyId={property.id}
                                agentEmail="jane@example.com"
                                onClose={() => document.querySelector("button[aria-label='Close']")?.click()}
                              />
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <FooterSection />
    </div>
  );
};

export default PropertyDetailPage;
