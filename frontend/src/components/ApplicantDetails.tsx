import React, { useState } from 'react';
import { Applicant } from '@/data/applicants';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import AddApplicantForm from './AddApplicantForm';
import { UserPlus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import EditApplicantForm from './EditApplicantForm'; // Import komponen baru
import { DialogTitle } from '@/components/ui/dialog'

interface ApplicantDetailsProps {
  applicant: Applicant | null;
  onAddApplicant: (applicant: Applicant) => void; // Tambahkan prop ini
  onUpdateApplicant?: () => void; // Callback ketika applicant berhasil diupdate

}

const ApplicantDetails: React.FC<ApplicantDetailsProps> = ({
  applicant,
  onAddApplicant,
  onUpdateApplicant, 
 }) => {
  const [isAddingApplicant, setIsAddingApplicant] = useState(false);
  const [isEditingApplicant, setIsEditingApplicant] = useState(false);

  if (!applicant) {
    return (
      <div className="border rounded-md p-6 bg-white h-full flex flex-col items-center justify-center">
        <p className="text-gray-500 text-center mb-4">Select an applicant to view details</p>
        <Sheet open={isAddingApplicant} onOpenChange={setIsAddingApplicant}>
          <SheetTrigger asChild>
            <Button className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Add Application
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-3xl p-0">
           <DialogTitle className="sr-only">Edit Applicant</DialogTitle>
              <AddApplicantForm 
                onAddApplicant={onAddApplicant} // Teruskan prop ini
                onSuccess={() => setIsAddingApplicant(false)} 
              />
          </SheetContent>
        </Sheet>
      </div>
    );
  }

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const handleScheduleInterview = () => {
    if (!applicant) return;

    const title = encodeURIComponent(`Interview with ${applicant.name}`);
    const details = encodeURIComponent(`
      Name: ${applicant.name}
      Email: ${applicant.email || '-'}
      Phone: ${applicant.phone || '-'}
      
      Notes: Interview scheduled via Applicant Management System
    `);

    const location = encodeURIComponent('Online / Google Meet');

    const url = `https://calendar.google.com/calendar/u/0/r/eventedit?text=${title}&details=${details}&location=${location}`;

    window.open(url, '_blank');
  };

  return (
    <div className="border rounded-md p-6 bg-white">
      <div className="mb-4 flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold mb-1">Applicant details:</h2>
          <h1 className="text-2xl font-bold">{applicant.name}</h1>
        </div>
        <div className="flex gap-2">
          <Avatar className="w-24 h-24">
            <AvatarImage src={applicant.resume_link || undefined} alt={applicant.name} />
            <AvatarFallback className="text-2xl">{getInitials(applicant.name)}</AvatarFallback>
          </Avatar>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Name:</p>
            <p className="font-medium">{applicant.name}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Email:</p>
            <p className="font-medium text-blue-600">{applicant.email}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Phone No:</p>
            <p className="font-medium">{applicant.phone || "Not provided"}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Years of Experience:</p>
            <p className="font-medium">{applicant.experience || "Not specified"}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Role Applied For:</p>
            <p className="font-medium">{applicant.role}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Location:</p>
            <p className="font-medium">{applicant.location || "Not specified"}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Resume:</p>
            {applicant.resume_link ? (
              <a href={applicant.resume_link} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 cursor-pointer hover:underline">View Resume</a>
            ) : (
              <p className="font-medium">Not provided</p>
            )}
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Status:</p>
            <p className="font-medium">{applicant.status}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-2 gap-4">
        <Button
          className="bg-green-600 hover:bg-green-700 text-white"
          onClick={handleScheduleInterview}
        >
          Schedule Interview
        </Button>

        <Sheet open={isEditingApplicant} onOpenChange={setIsEditingApplicant}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Review
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-3xl p-0">
          <DialogTitle className="sr-only">Review Applicant</DialogTitle>
            <EditApplicantForm
              applicant={applicant}
              onSuccess={async () => {
                setIsEditingApplicant(false);
                await onUpdateApplicant();
              }}
            />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default ApplicantDetails;
