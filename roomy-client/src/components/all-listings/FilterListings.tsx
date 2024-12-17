"use client";

import { Input } from "@/components/ui/input";
import { FilterIcon, SearchIcon } from "lucide-react";
import { DropdownMenuTrigger, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select";
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { CalendarIcon } from "../ui/icon";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { setAllValues } from "@/store/slices/postFilter-slice";
import AddressSearch from "../homepage/AddressSearch";

export default function FilterListings() {
  const [date, setDate] = useState<Date>();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    priceMax: 999999,
    priceMin: 0,
    startDateRange: "",
    bathCount: 0,
    bedCount: 0,
    city: "",
  });

  function handleDateChange(date: Date) {
    setDate(date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    setFormData((prevFormData) => ({
      ...prevFormData,
      startDateRange: formattedDate,
    }));
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const parsedValue = isNaN(parseInt(value, 10)) ? 0 : parseInt(value, 10);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "priceMax" || name === "priceMin" ? parsedValue : value,
    }));
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form data:", formData);
    dispatch(setAllValues(formData));
  };

  return (
    <>
      <section className="bg-white dark:bg-gray-950 p-4 md:p-6">
        <div className="grid gap-4">
          <form onSubmit={handleFormSubmit}>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                {/* <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  className="pl-8 w-full"
                  placeholder="Search properties..."
                  type="search"
                  name="search"
                  onChange={handleInputChange}
                /> */}
                <AddressSearch></AddressSearch>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="px-4 py-2 rounded-md" variant="outline">
                    <FilterIcon className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[300px] p-4 space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="price-min">Price (min)</Label>
                    <Input
                      onChange={handleInputChange}
                      defaultValue={formData.priceMin == 0 ? "$0" : formData.priceMin}
                      id="price-min"
                      placeholder="$0"
                      type="number"
                      name="priceMin"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="price-max">Price (max)</Label>
                    <Input
                      onChange={handleInputChange}
                      defaultValue={formData.priceMax == 999999 ? "$0" : formData.priceMax}
                      id="price-max"
                      placeholder="$1000"
                      type="number"
                      name="priceMax"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="bedrooms">Bedrooms</Label>

                    <Select
                      onValueChange={(value: any) => {
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          bedCount: parseInt(value),
                        }));
                      }}
                      // defaultValue={formData.bedCount.toString()} // Use defaultValue instead of value
                      name="bedCount"
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="1">1+</SelectItem>
                        <SelectItem value="2">2+</SelectItem>
                        <SelectItem value="3">3+</SelectItem>
                        <SelectItem value="4">4+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Select
                      onValueChange={(value: any) => {
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          bathCount: parseInt(value),
                        }));
                      }}
                      name="bathCount"
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="1">1+</SelectItem>
                        <SelectItem value="2">2+</SelectItem>
                        <SelectItem value="3">3+</SelectItem>
                        <SelectItem value="4">4+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="move-in-date">Move-in Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(value) => {
                            if (value) {
                              handleDateChange(value);
                            }
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" type="reset">
                      Reset
                    </Button>
                    <Button onClick={handleFormSubmit} type="submit">
                      Search
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
