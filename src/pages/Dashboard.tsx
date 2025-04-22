
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useProperties } from "../contexts/PropertiesContext";
import HeaderSection from "../components/HeaderSection";
import FooterSection from "../components/FooterSection";
import PropertyCard from "../components/PropertyCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import dashboardMetrics from "../data/dashboard-metrics.json";
import { Loader2 } from "lucide-react";

const Dashboard: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const { properties, getPropertyById, bookings, getBookingsForUser } = useProperties();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // Colors for charts
  const COLORS = ["#9b87f5", "#7E69AB", "#F97316", "#8E9196"];
  
  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    // Simulate loading dashboard data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [isAuthenticated, navigate]);
  
  // Filter properties based on user role
  const userProperties = () => {
    if (!user) return [];
    
    switch (user.role) {
      case "seller":
        return properties.filter(p => user.listedProperties?.includes(p.id));
      case "buyer":
        return properties.filter(p => user.savedProperties?.includes(p.id));
      case "admin":
        return properties;
      default:
        return [];
    }
  };
  
  // Get user bookings
  const userBookings = user ? getBookingsForUser(user.id) : [];
  
  // Create recent bookings with property details
  const recentBookings = userBookings.map(booking => {
    const property = getPropertyById(booking.propertyId);
    return {
      ...booking,
      property,
    };
  });
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <HeaderSection />
        <main className="flex-grow pt-24 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 text-purple animate-spin mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Loading Your Dashboard</h2>
            <p className="text-gray-600">Please wait while we fetch your data...</p>
          </div>
        </main>
        <FooterSection />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderSection />
      
      <main className="flex-grow pt-24 bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.name}
            </h1>
            <p className="text-gray-600">
              {user?.role === "buyer" && "Manage your saved properties and bookings"}
              {user?.role === "seller" && "Manage your listings and booking requests"}
              {user?.role === "admin" && "Monitor platform activity and manage users"}
            </p>
          </div>
          
          {/* Dashboard Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">
                  {user?.role === "buyer" && "Saved Properties"}
                  {user?.role === "seller" && "My Listings"}
                  {user?.role === "admin" && "Total Properties"}
                </CardTitle>
                <CardDescription>
                  {user?.role === "buyer" && "Properties you've saved"}
                  {user?.role === "seller" && "Properties you've listed"}
                  {user?.role === "admin" && "All properties on the platform"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {user?.role === "buyer" && user?.savedProperties?.length || 0}
                  {user?.role === "seller" && user?.listedProperties?.length || 0}
                  {user?.role === "admin" && dashboardMetrics.propertyMetrics.totalProperties}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">
                  {user?.role === "buyer" && "My Bookings"}
                  {user?.role === "seller" && "Booking Requests"}
                  {user?.role === "admin" && "Total Bookings"}
                </CardTitle>
                <CardDescription>
                  {user?.role === "buyer" && "Properties you've booked"}
                  {user?.role === "seller" && "Requests for your properties"}
                  {user?.role === "admin" && "All bookings on the platform"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {user?.role === "buyer" && userBookings.length}
                  {user?.role === "seller" && user?.bookingRequests?.length || 0}
                  {user?.role === "admin" && dashboardMetrics.bookingMetrics.totalBookings}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">
                  {user?.role === "buyer" && "Upcoming Viewings"}
                  {user?.role === "seller" && "Pending Approvals"}
                  {user?.role === "admin" && "Total Users"}
                </CardTitle>
                <CardDescription>
                  {user?.role === "buyer" && "Scheduled property visits"}
                  {user?.role === "seller" && "Bookings awaiting approval"}
                  {user?.role === "admin" && "Registered users on the platform"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {user?.role === "buyer" && userBookings.filter(b => b.status === "confirmed").length}
                  {user?.role === "seller" && user?.bookingRequests?.filter(b => b.status === "pending").length || 0}
                  {user?.role === "admin" && dashboardMetrics.userMetrics.totalUsers}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">
                  {user?.role === "buyer" && "Average Rating"}
                  {user?.role === "seller" && "Average Listing Rating"}
                  {user?.role === "admin" && "Revenue"}
                </CardTitle>
                <CardDescription>
                  {user?.role === "buyer" && "Average rating of saved properties"}
                  {user?.role === "seller" && "Average rating of your listings"}
                  {user?.role === "admin" && "Total platform revenue"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {user?.role === "buyer" && "4.7"}
                  {user?.role === "seller" && "4.8"}
                  {user?.role === "admin" && `$${dashboardMetrics.financialMetrics.totalRevenue.toLocaleString()}`}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Dashboard Tabs */}
          <Tabs defaultValue="properties" className="w-full animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <TabsList className="mb-8 grid w-full md:w-auto grid-cols-3">
              <TabsTrigger value="properties">
                {user?.role === "buyer" && "Saved Properties"}
                {user?.role === "seller" && "My Listings"}
                {user?.role === "admin" && "All Properties"}
              </TabsTrigger>
              <TabsTrigger value="bookings">
                {user?.role === "buyer" && "My Bookings"}
                {user?.role === "seller" && "Booking Requests"}
                {user?.role === "admin" && "All Bookings"}
              </TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            {/* Properties Tab */}
            <TabsContent value="properties">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {userProperties().length > 0 ? (
                  userProperties().map((property, index) => (
                    <div key={property.id} className="animate-fade-in" style={{ animationDelay: `${0.1 * (index % 6)}s` }}>
                      <PropertyCard property={property} />
                    </div>
                  ))
                ) : (
                  <div className="col-span-3 p-12 text-center bg-white rounded-xl shadow-sm">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No properties found</h3>
                    <p className="mt-2 text-gray-500">
                      {user?.role === "buyer" && "You haven't saved any properties yet."}
                      {user?.role === "seller" && "You haven't listed any properties yet."}
                      {user?.role === "admin" && "No properties have been added to the platform."}
                    </p>
                    <Button className="mt-6 bg-purple hover:bg-purple-dark">
                      {user?.role === "buyer" && "Browse Properties"}
                      {user?.role === "seller" && "Add New Listing"}
                      {user?.role === "admin" && "Add Property"}
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            {/* Bookings Tab */}
            <TabsContent value="bookings">
              {recentBookings.length > 0 ? (
                <div className="space-y-6">
                  {recentBookings.map((booking, index) => (
                    <Card key={booking.id} className="animate-fade-in" style={{ animationDelay: `${0.1 * index}s` }}>
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          {booking.property && (
                            <div className="w-full md:w-1/4">
                              <img
                                src={booking.property.images[0]}
                                alt={booking.property.title}
                                className="h-48 md:h-full w-full object-cover"
                              />
                            </div>
                          )}
                          <div className="p-6 flex-grow">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="text-xl font-bold mb-1">
                                  {booking.property ? booking.property.title : "Property Unavailable"}
                                </h3>
                                <p className="text-gray-600 text-sm mb-2">
                                  {booking.property && (
                                    <>
                                      {booking.property.location.address}, {booking.property.location.city},{" "}
                                      {booking.property.location.state}
                                    </>
                                  )}
                                </p>
                              </div>
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                booking.status === "confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : booking.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </span>
                            </div>
                            
                            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                              <div>
                                <span className="font-semibold">Viewing Date:</span>{" "}
                                {formatDate(booking.date)}
                              </div>
                              <div>
                                <span className="font-semibold">Booking Created:</span>{" "}
                                {formatDate(booking.createdAt)}
                              </div>
                              {booking.notes && (
                                <div className="w-full mt-1">
                                  <span className="font-semibold">Notes:</span> {booking.notes}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="bg-gray-50 border-t border-gray-100 p-4 flex justify-end gap-4">
                        {user?.role === "buyer" && (
                          <Button variant="outline">Reschedule</Button>
                        )}
                        {user?.role === "seller" && booking.status === "pending" && (
                          <>
                            <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50">
                              Decline
                            </Button>
                            <Button className="bg-green-600 hover:bg-green-700">
                              Approve
                            </Button>
                          </>
                        )}
                        {user?.role === "admin" && (
                          <Button variant="outline">Manage Booking</Button>
                        )}
                        <Button className="bg-purple hover:bg-purple-dark">
                          View Details
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center bg-white rounded-xl shadow-sm">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No bookings found</h3>
                  <p className="mt-2 text-gray-500">
                    {user?.role === "buyer" && "You haven't made any bookings yet."}
                    {user?.role === "seller" && "You haven't received any booking requests yet."}
                    {user?.role === "admin" && "No bookings have been made on the platform."}
                  </p>
                  {user?.role === "buyer" && (
                    <Button className="mt-6 bg-purple hover:bg-purple-dark">
                      Browse Properties
                    </Button>
                  )}
                </div>
              )}
            </TabsContent>
            
            {/* Analytics Tab */}
            <TabsContent value="analytics">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {user?.role === "buyer" && "Property Type Preferences"}
                      {user?.role === "seller" && "Property Type Distribution"}
                      {user?.role === "admin" && "Property Type Distribution"}
                    </CardTitle>
                    <CardDescription>
                      {user?.role === "buyer" && "Types of properties you've shown interest in"}
                      {user?.role === "seller" && "Breakdown of your property listings"}
                      {user?.role === "admin" && "Breakdown of all properties on the platform"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={dashboardMetrics.chartData.propertyTypeDistribution}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="count"
                            nameKey="type"
                            label={({ type, percent }) => `${type}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {dashboardMetrics.chartData.propertyTypeDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {user?.role === "buyer" && "Booking Trends"}
                      {user?.role === "seller" && "Booking Requests"}
                      {user?.role === "admin" && "Booking Trends"}
                    </CardTitle>
                    <CardDescription>
                      {user?.role === "buyer" && "Your booking activity over time"}
                      {user?.role === "seller" && "Booking requests for your properties"}
                      {user?.role === "admin" && "Platform-wide booking activity"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={dashboardMetrics.chartData.bookingsTrend}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="count" fill="#9b87f5" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <FooterSection />
    </div>
  );
};

export default Dashboard;
