
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";

interface FilterBarProps {
  onFilter: (filters: Record<string, any>) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilter }) => {
  const [location, setLocation] = useState("all");
  const [propertyType, setPropertyType] = useState("all");
  const [status, setStatus] = useState("all");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [priceRange, setPriceRange] = useState([0, 3000000]);
  const [expanded, setExpanded] = useState(false);

  const handleApplyFilter = () => {
    onFilter({
      location,
      propertyType,
      status,
      bedrooms: bedrooms ? parseInt(bedrooms) : undefined,
      bathrooms: bathrooms ? parseInt(bathrooms) : undefined,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    });
  };

  const handleReset = () => {
    setLocation("all");
    setPropertyType("all");
    setStatus("all");
    setBedrooms("");
    setBathrooms("");
    setPriceRange([0, 3000000]);
    onFilter({});
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 animate-fade-in">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <h3 className="text-xl font-bold mb-4 md:mb-0">Find Your Property</h3>
        <Button
          variant="ghost"
          onClick={() => setExpanded(!expanded)}
          className="flex items-center text-purple"
        >
          <Filter className="mr-2 h-4 w-4" />
          {expanded ? "Less Filters" : "More Filters"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="new york">New York</SelectItem>
              <SelectItem value="san francisco">San Francisco</SelectItem>
              <SelectItem value="miami">Miami</SelectItem>
              <SelectItem value="chicago">Chicago</SelectItem>
              <SelectItem value="los angeles">Los Angeles</SelectItem>
              <SelectItem value="austin">Austin</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Property Type
          </label>
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="loft">Loft</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
              <SelectItem value="office">Office</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="for sale">For Sale</SelectItem>
              <SelectItem value="for rent">For Rent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <Button
            onClick={handleApplyFilter}
            className="w-full bg-purple hover:bg-purple-dark"
          >
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
      </div>

      {/* Advanced Filters */}
      <div
        className={`grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 transition-all duration-300 overflow-hidden ${
          expanded
            ? "max-h-96 opacity-100 mt-4"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        {/* Bedrooms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bedrooms
          </label>
          <Input
            type="number"
            min="0"
            placeholder="Min Bedrooms"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
          />
        </div>

        {/* Bathrooms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bathrooms
          </label>
          <Input
            type="number"
            min="0"
            placeholder="Min Bathrooms"
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
          />
        </div>

        {/* Price Range */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price Range: ${priceRange[0].toLocaleString()} - $
            {priceRange[1].toLocaleString()}
          </label>
          <Slider
            defaultValue={priceRange}
            min={0}
            max={3000000}
            step={50000}
            onValueChange={setPriceRange}
            className="my-5"
          />
        </div>
      </div>

      {/* Reset Button (only shown when expanded) */}
      {expanded && (
        <div className="flex justify-end">
          <Button variant="outline" onClick={handleReset}>
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
