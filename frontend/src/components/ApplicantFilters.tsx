import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchLocations, fetchRoles, fetchStatuses } from '@/data/applicants';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import AddApplicantForm from './AddApplicantForm';

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
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger>
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Job role</label>
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger>
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
