
import React from 'react';
import { Applicant } from '@/data/applicants';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';

interface ApplicantTableProps {
  applicants: Applicant[];
  selectedApplicantId: number | null;
  setSelectedApplicantId: (id: number) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const ApplicantTable: React.FC<ApplicantTableProps> = ({
  applicants,
  selectedApplicantId,
  setSelectedApplicantId,
  currentPage,
  setCurrentPage
}) => {
  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "accepted":
      case "hired":
      case "ok":
        return "bg-green-100 text-green-800";
      case "rejected":
      case "candidate rejected":
      case "offer rejected":
        return "bg-red-100 text-red-800";
      case "interview":
      case "interview done":
      case "interview scheduled":
        return "bg-blue-100 text-blue-800";
      case "offer made":
        return "bg-purple-100 text-purple-800";
      case "applied":
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (applicants.length === 0) {
    return (
      <div className="border rounded-md p-6 bg-white h-full flex items-center justify-center">
        <p className="text-gray-500">No applicants found</p>
      </div>
    );
  }

  return (
    <div className="border rounded-md overflow-hidden bg-white">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applicants.map((applicant) => (
              <TableRow 
                key={applicant.id} 
                onClick={() => setSelectedApplicantId(applicant.id)}
                className={`cursor-pointer hover:bg-gray-50 ${selectedApplicantId === applicant.id ? 'bg-green-50' : ''}`}
              >
                <TableCell className="font-medium">{applicant.name}</TableCell>
                <TableCell>{applicant.email}</TableCell>
                <TableCell>{applicant.role}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(applicant.status)}`}>
                    {applicant.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex items-center justify-center py-3 bg-white border-t border-gray-200">
        <nav className="flex items-center">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md mr-2 bg-white border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            &lt;
          </button>
          <span className="px-4 py-1 text-sm font-medium text-gray-700">
            {currentPage}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-3 py-1 rounded-md ml-2 bg-white border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            &gt;
          </button>
        </nav>
      </div>
    </div>
  );
};

export default ApplicantTable;
