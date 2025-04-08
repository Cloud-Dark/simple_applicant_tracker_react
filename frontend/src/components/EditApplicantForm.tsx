import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Applicant } from '@/data/applicants';

const formSchema = z.object({
  application_status: z.string({ required_error: "Please select a status." }), // Hanya application_status yang diperlukan
});

interface EditApplicantFormProps {
  applicant: Applicant;
  onSuccess?: () => void;
}

const EditApplicantForm: React.FC<EditApplicantFormProps> = ({ applicant, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      application_status: applicant.status, // Default value untuk status
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    try {
      // Kirim hanya application_status ke API
      const payload = {
        candidate_name: applicant.name,
        candidate_email: applicant.email,
        applied_roles: applicant.role,
        year_of_experience: applicant.experience,
        application_status: values.application_status, // Gunakan nilai dari form
        phone_number: applicant.phone || "",
        location: applicant.location || "",
        resume_link: applicant.resume_link || ""
      };

      const response = await fetch(`http://localhost:3000/applicants/${applicant.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to update applicant');
      }

      // Tampilkan pesan sukses
      toast.success("Applicant updated successfully!");

      // Panggil callback jika ada
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error updating applicant:', error);
      toast.error("Failed to update applicant. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full h-full">
      <div className="bg-green-700 p-4 mb-6">
        <h1 className="text-white text-xl font-bold">Applicant Tracker</h1>
      </div>

      {/* Container dengan scrolling */}
      <div className="px-6 pb-6 overflow-y-auto max-h-[calc(100vh-100px)]">

        <h2 className="text-2xl font-bold mb-6">Edit candidate application</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Field Read-only untuk Name */}
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    value={applicant.name}
                    readOnly
                    className="bg-gray-100"
                  />
                </FormControl>
              </FormItem>

              {/* Field Read-only untuk Phone */}
              <FormItem>
                <FormLabel>Phone No.</FormLabel>
                <FormControl>
                  <Input
                    value={applicant.phone || "Not provided"}
                    readOnly
                    className="bg-gray-100"
                  />
                </FormControl>
              </FormItem>

              {/* Field Read-only untuk Email */}
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input
                    value={applicant.email}
                    readOnly
                    className="bg-gray-100"
                  />
                </FormControl>
              </FormItem>

              {/* Field Read-only untuk Role */}
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Input
                    value={applicant.role}
                    readOnly
                    className="bg-gray-100"
                  />
                </FormControl>
              </FormItem>

              {/* Field Read-only untuk Experience */}
              <FormItem>
                <FormLabel>Years of experience</FormLabel>
                <FormControl>
                  <Input
                    value={applicant.experience?.toString() || "Not specified"}
                    readOnly
                    className="bg-gray-100"
                  />
                </FormControl>
              </FormItem>

              {/* Field Read-only untuk Location */}
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input
                    value={applicant.location || "Not specified"}
                    readOnly
                    className="bg-gray-100"
                  />
                </FormControl>
              </FormItem>
            </div>

            {/* Resume URL Read-only */}
            <div className="bg-gray-100 p-6 rounded-md">
              <h3 className="text-center text-lg font-medium mb-4">Resume URL</h3>
              <FormItem>
                <FormControl>
                  <Input
                    value={applicant.resume_link || "Not provided"}
                    readOnly
                    className="bg-white"
                  />
                </FormControl>
              </FormItem>
            </div>

            {/* Application Status (Editable dan Full-width) */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="application_status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Application Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="In Review">In Review</SelectItem>
                        <SelectItem value="Interview Scheduled">Interview Scheduled</SelectItem>
                        <SelectItem value="Hired">Hired</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-center pt-4">
              <Button
                type="submit"
                className="bg-green-700 hover:bg-green-800 text-white px-12"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditApplicantForm;
