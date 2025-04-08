
export interface Applicant {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  phone?: string;
  experience?: number;
  location?: string;
  photo?: string;
}



export const locations = ["All", "South Africa", "Mexico", "United States", "Canada", "India", "Germany", "UK"];
export const roles = ["All", "Systems Architect", "Project Manager", "Product Designer", "QA Engineer", "Data Engineer", 
  "Full Stack Developer", "DevOps Engineer", "Backend Developer", "UX Designer", "Frontend Developer", 
  "System Administrator", "Data Scientist", "Data Analyst", "Product Manager", "Software Developer"];
export const statuses = ["All", "Applied", "Contacted", "Interview Scheduled", "Interview Done", "Offer Made", 
  "Offer Accepted", "Offer Rejected", "Candidate Rejected", "Hired"];
