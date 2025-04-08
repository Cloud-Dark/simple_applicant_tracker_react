import React, { useState, useEffect } from 'react';
import ApplicantFilters from '@/components/ApplicantFilters';
import ApplicantTable from '@/components/ApplicantTable';
import ApplicantDetails from '@/components/ApplicantDetails';
import { Applicant } from '@/data/applicants';
import { toast } from "sonner";

const Index = () => {
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApplicantId, setSelectedApplicantId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch applicants from API
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        setIsLoading(true);
        
        let url = 'http://localhost:3000/applicants';
        const params = new URLSearchParams();
        
        if (selectedLocation !== 'All') {
          params.append('location', selectedLocation);
        }
        
        if (selectedRole !== 'All') {
          params.append('role', selectedRole);
        }
        
        if (selectedStatus !== 'All') {
          params.append('status', selectedStatus);
        }
        
        if (params.toString()) {
          url += `?${params.toString()}`;
        }
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Error fetching applicants: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Transform API data to match our Applicant interface
        const transformedData = data.map((item: any) => ({
          id: item.id,
          name: item.candidate_name,
          email: item.candidate_email,
          role: item.applied_roles,
          experience: item.year_of_experience,
          status: item.application_status,
          phone: item.phone_number,
          location: item.location,
          resume_link: item.resume_link,
          photo: null,
        }));
        
        setApplicants(transformedData);
        
        // If we have applicants and none is selected, select the first one
        if (transformedData.length > 0 && selectedApplicantId === null) {
          setSelectedApplicantId(transformedData[0].id);
        }
      } catch (error) {
        console.error('Failed to fetch applicants:', error);
        toast.error('Failed to load applicants. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplicants();
  }, [selectedLocation, selectedRole, selectedStatus]);

  // Filter applicants based on search query
  const filteredApplicants = applicants.filter(app => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      app.name.toLowerCase().includes(query) || 
      app.email.toLowerCase().includes(query) ||
      app.role.toLowerCase().includes(query)
    );
  });

  const selectedApplicant = filteredApplicants.find(app => app.id === selectedApplicantId) || null;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <ApplicantFilters
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            {isLoading ? (
              <div className="border rounded-md p-6 bg-white h-full flex items-center justify-center">
                <p className="text-gray-500">Loading applicants...</p>
              </div>
            ) : (
              <ApplicantTable
                applicants={filteredApplicants}
                selectedApplicantId={selectedApplicantId}
                setSelectedApplicantId={setSelectedApplicantId}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            )}
          </div>
          
          <div>
            <ApplicantDetails applicant={selectedApplicant} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
