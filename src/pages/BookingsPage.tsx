
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, Clock, MapPin, Building, Users, X, Check, 
  ChevronRight, Trash2, Calendar as CalendarIcon
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

import HeaderSection from "../components/HeaderSection";
import FooterSection from "../components/FooterSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "../contexts/AuthContext";
import { useProperties } from "../contexts/PropertiesContext";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BookingsPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { bookings, properties, getPropertyById, getBookingsForUser } = useProperties();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [userBookings, setUserBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      toast.error("Please log in to view your bookings");
      navigate("/login");
      return;
    }

    // Simulate loading data
    setIsLoading(true);
    setTimeout(() => {
      if (user) {
        // Get user bookings and add property details
        const userBookingData = getBookingsForUser(user.id).map(booking => {
          const property = getPropertyById(booking.propertyId);
          return {
            ...booking,
            property,
          };
        });
        setUserBookings(userBookingData);
        setIsLoading(false);
      }
    }, 800);
  }, [isAuthenticated, user, navigate, getBookingsForUser, getPropertyById]);

  const handleCancelBooking = (bookingId: number) => {
    // In a real app, this would call an API
    // For now, we'll just update the local state
    setUserBookings(prevBookings => 
      prevBookings.map(booking => 
        booking.id === bookingId ? { ...booking, status: "cancelled" } : booking
      )
    );
    toast.success("Booking cancelled successfully");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const filteredBookings = userBookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    const today = new Date();
    
    if (activeTab === "upcoming") {
      return bookingDate >= today && booking.status !== "cancelled";
    } else if (activeTab === "past") {
      return bookingDate < today || booking.status === "cancelled";
    }
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderSection />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Your Bookings</h1>
                <p className="text-gray-600 mt-2">Manage all your property appointments in one place</p>
              </div>
              
              <Button 
                onClick={() => navigate("/properties")}
                className="mt-4 md:mt-0 bg-purple hover:bg-purple-dark"
              >
                Browse More Properties
                <ChevronRight size={16} className="ml-1" />
              </Button>
            </div>

            {isLoading ? (
              <div className="grid place-items-center py-20">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="rounded-full bg-slate-200 h-16 w-16 mb-4"></div>
                  <div className="h-4 bg-slate-200 rounded w-24 mb-2.5"></div>
                  <div className="h-3 bg-slate-200 rounded w-36"></div>
                </div>
              </div>
            ) : (
              <>
                <Tabs defaultValue="upcoming" className="w-full">
                  <TabsList className="grid grid-cols-2 w-full max-w-md mb-8">
                    <TabsTrigger 
                      value="upcoming"
                      onClick={() => setActiveTab("upcoming")}
                      className="text-sm md:text-base"
                    >
                      Upcoming Bookings
                    </TabsTrigger>
                    <TabsTrigger 
                      value="past"
                      onClick={() => setActiveTab("past")}
                      className="text-sm md:text-base"
                    >
                      Past & Cancelled
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="upcoming" className="mt-0">
                    {filteredBookings.length === 0 ? (
                      <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-200">
                        <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-4 text-lg font-medium text-gray-900">No upcoming bookings</h3>
                        <p className="mt-2 text-sm text-gray-500">
                          You don't have any upcoming property viewings scheduled.
                        </p>
                        <div className="mt-6">
                          <Button 
                            onClick={() => navigate("/properties")}
                            className="bg-purple hover:bg-purple-dark"
                          >
                            Find Properties
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <AnimatePresence>
                        <div className="grid grid-cols-1 gap-6">
                          {filteredBookings.map((booking) => (
                            <motion.div
                              key={booking.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Card className="overflow-hidden transition-all hover:shadow-lg">
                                <div className="flex flex-col md:flex-row">
                                  <div 
                                    className="w-full md:w-1/3 h-48 md:h-auto bg-cover bg-center relative"
                                    style={{ backgroundImage: `url(${booking.property?.images[0]})` }}
                                  >
                                    <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity hover:bg-opacity-10"></div>
                                  </div>
                                  
                                  <div className="flex-1">
                                    <CardHeader>
                                      <div className="flex justify-between items-start">
                                        <div>
                                          <CardTitle className="text-xl">{booking.property?.title}</CardTitle>
                                          <CardDescription className="flex items-center mt-1">
                                            <MapPin size={14} className="mr-1 text-gray-500" />
                                            {booking.property?.location.address}, {booking.property?.location.city}
                                          </CardDescription>
                                        </div>
                                        
                                        <Badge className={`${getStatusColor(booking.status)} px-3 py-1 text-xs font-medium`}>
                                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                        </Badge>
                                      </div>
                                    </CardHeader>
                                    
                                    <CardContent>
                                      <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="flex items-center">
                                          <Calendar size={18} className="mr-2 text-purple" />
                                          <span>
                                            {format(new Date(booking.date), "MMM dd, yyyy")}
                                          </span>
                                        </div>
                                        
                                        <div className="flex items-center">
                                          <Clock size={18} className="mr-2 text-purple" />
                                          <span>2:00 PM (Default)</span>
                                        </div>
                                        
                                        <div className="flex items-center">
                                          <Building size={18} className="mr-2 text-purple" />
                                          <span>{booking.property?.propertyType}</span>
                                        </div>
                                        
                                        <div className="flex items-center">
                                          <Users size={18} className="mr-2 text-purple" />
                                          <span>Meeting with Agent</span>
                                        </div>
                                      </div>
                                      
                                      {booking.notes && (
                                        <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-700 mt-2 border border-gray-100">
                                          <strong>Notes:</strong> {booking.notes}
                                        </div>
                                      )}
                                    </CardContent>
                                    
                                    <CardFooter className="flex justify-between border-t pt-4">
                                      <Button
                                        variant="outline"
                                        onClick={() => navigate(`/property/${booking.propertyId}`)}
                                      >
                                        View Property
                                      </Button>
                                      
                                      {booking.status !== "cancelled" && (
                                        <Button
                                          variant="destructive"
                                          onClick={() => handleCancelBooking(booking.id)}
                                          className="bg-red-600 hover:bg-red-700"
                                        >
                                          <Trash2 size={16} className="mr-1" />
                                          Cancel Booking
                                        </Button>
                                      )}
                                    </CardFooter>
                                  </div>
                                </div>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      </AnimatePresence>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="past" className="mt-0">
                    {filteredBookings.length === 0 ? (
                      <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-200">
                        <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-4 text-lg font-medium text-gray-900">No past bookings</h3>
                        <p className="mt-2 text-sm text-gray-500">
                          You don't have any past property viewings.
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-6">
                        {filteredBookings.map((booking) => (
                          <Card key={booking.id} className="overflow-hidden transition-all hover:shadow-md">
                            <div className="flex flex-col md:flex-row">
                              <div 
                                className="w-full md:w-1/4 h-32 md:h-auto bg-cover bg-center relative grayscale"
                                style={{ backgroundImage: `url(${booking.property?.images[0]})` }}
                              >
                                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                              </div>
                              
                              <div className="flex-1">
                                <CardHeader className="pb-2">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <CardTitle className="text-lg text-gray-700">{booking.property?.title}</CardTitle>
                                      <CardDescription className="flex items-center mt-1 text-sm">
                                        <MapPin size={12} className="mr-1 text-gray-500" />
                                        {booking.property?.location.city}
                                      </CardDescription>
                                    </div>
                                    
                                    <Badge className={`${getStatusColor(booking.status)} px-2 py-1 text-xs`}>
                                      {booking.status === "cancelled" ? "Cancelled" : "Completed"}
                                    </Badge>
                                  </div>
                                </CardHeader>
                                
                                <CardContent className="pb-3">
                                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                    <div className="flex items-center">
                                      <Calendar size={14} className="mr-1 text-gray-500" />
                                      <span>
                                        {format(new Date(booking.date), "MMM dd, yyyy")}
                                      </span>
                                    </div>
                                  </div>
                                </CardContent>
                                
                                <CardFooter className="pt-2 border-t">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => navigate(`/property/${booking.propertyId}`)}
                                    className="text-xs"
                                  >
                                    View Property
                                  </Button>
                                </CardFooter>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </>
            )}
          </motion.div>
        </div>
      </main>
      
      <FooterSection />
    </div>
  );
};

export default BookingsPage;
