import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { Plus, Check } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import AddApplicantForm from './AddApplicantForm';
import { fetchLocations, fetchRoles, fetchStatuses } from '@/data/applicants';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";

interface ApplicantFiltersProps {
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  selectedRole: string;
  setSelectedRole: (role: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onAddApplicant: (applicant: any) => void; // Tambahkan prop ini
}

const ApplicantFilters: React.FC<ApplicantFiltersProps> = ({
  selectedLocation,
  setSelectedLocation,
  selectedRole,
  setSelectedRole,
  selectedStatus,
  setSelectedStatus,
  searchQuery,
  setSearchQuery,
  onAddApplicant // Gunakan prop ini
}) => {
  const [isAddingApplicant, setIsAddingApplicant] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [openRole, setOpenRole] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [locations, setLocations] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [statuses, setStatuses] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [locationsData, rolesData, statusesData] = await Promise.all([
          fetchLocations(),
          fetchRoles(),
          fetchStatuses()
        ]);
        setLocations(locationsData);
        setRoles(rolesData);
        setStatuses(statusesData);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Applicants</h1>
        <Sheet open={isAddingApplicant} onOpenChange={setIsAddingApplicant}>
          <SheetTrigger asChild>
            <Button className="bg-white text-green-600 border border-green-600 hover:bg-green-50">
              <Plus className="w-4 h-4 mr-2" /> Add Application
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-3xl p-0">
            <AddApplicantForm 
              onAddApplicant={onAddApplicant} // Teruskan prop ini
              onSuccess={() => setIsAddingApplicant(false)} 
            />
          </SheetContent>
        </Sheet>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Location</label>
          <Popover open={openLocation} onOpenChange={setOpenLocation}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openLocation}
                className="w-full justify-between text-sm h-10"
              >
                {selectedLocation}
                <span className="ml-2 opacity-50">▼</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Command>
                <CommandInput placeholder="Search location..." className="h-9" />
                <CommandList>
                  <CommandEmpty>No location found.</CommandEmpty>
                  <CommandGroup>
                    {locations.filter(Boolean).map((location) => (
                      <CommandItem
                        key={location}
                        value={location}
                        onSelect={(currentValue) => {
                          setSelectedLocation(currentValue);
                          setOpenLocation(false);
                        }}
                      >
                        {location}
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4",
                            selectedLocation === location ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Job role</label>
          <Popover open={openRole} onOpenChange={setOpenRole}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openRole}
                className="w-full justify-between text-sm h-10"
              >
                {selectedRole}
                <span className="ml-2 opacity-50">▼</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Command>
                <CommandInput placeholder="Search role..." className="h-9" />
                <CommandList>
                  <CommandEmpty>No role found.</CommandEmpty>
                  <CommandGroup>
                    {roles.filter(Boolean).map((role) => (
                      <CommandItem
                        key={role}
                        value={role}
                        onSelect={(currentValue) => {
                          setSelectedRole(currentValue);
                          setOpenRole(false);
                        }}
                      >
                        {role}
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4",
                            selectedRole === role ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>
          <Popover open={openStatus} onOpenChange={setOpenStatus}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openStatus}
                className="w-full justify-between text-sm h-10"
              >
                {selectedStatus}
                <span className="ml-2 opacity-50">▼</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Command>
                <CommandInput placeholder="Search status..." className="h-9" />
                <CommandList>
                  <CommandEmpty>No status found.</CommandEmpty>
                  <CommandGroup>
                    {statuses.filter(Boolean).map((status) => (
                      <CommandItem
                        key={status}
                        value={status}
                        onSelect={(currentValue) => {
                          setSelectedStatus(currentValue);
                          setOpenStatus(false);
                        }}
                      >
                        {status}
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4",
                            selectedStatus === status ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Search</label>
          <div className="relative">
            <Input 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
            <span className="absolute left-2 top-2.5">🔍</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantFilters;
