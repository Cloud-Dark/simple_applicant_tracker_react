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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Applicant } from "@/data/applicants";

// Schema untuk validasi form
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  experience: z.string().optional(),
  role: z.string({ required_error: "Please select a role." }),
  location: z.string().optional(),
  resumeUrl: z.string().optional(),
});

// Props untuk komponen AddApplicantForm
interface AddApplicantFormProps {
  onSuccess?: () => void; // Callback saat form berhasil di-submit
  onAddApplicant: (newApplicant: Applicant) => void; // Callback untuk menambahkan applicant baru
}

const AddApplicantForm: React.FC<AddApplicantFormProps> = ({
  onSuccess,
  onAddApplicant,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Inisialisasi form dengan react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      experience: "",
      role: "",
      location: "",
      resumeUrl: "",
    },
  });

  // Handler saat form di-submit
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    try {
      // Transform form values to match the API format
      const payload = {
        candidate_name: values.name,
        candidate_email: values.email,
        applied_roles: values.role,
        year_of_experience: parseInt(values.experience || "0", 10),
        application_status: "New",
        phone_number: values.phone || "",
        location: values.location || "",
        resume_link: values.resumeUrl || "",
      };

      // Kirim data ke API
      const response = await fetch("http://localhost:3000/applicants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      // Ambil data applicant yang baru ditambahkan
      const newApplicant = await response.json();

      // Panggil callback onAddApplicant
      onAddApplicant(newApplicant);

      // Tampilkan notifikasi sukses
      toast.success("Applicant added successfully!");

      // Reset form
      form.reset();

      // Panggil callback onSuccess jika ada
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to add applicant. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full">
      <div className="bg-green-700 p-4 mb-6">
        <h1 className="text-white text-xl font-bold">Applicant Tracker</h1>
      </div>

      <div className="px-6 pb-6">
        <h2 className="text-2xl font-bold mb-6">Upload a new candidate application</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Field untuk Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter first & last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Field untuk Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Field untuk Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone No.</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter phone number including country prefix"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Field untuk Experience */}
              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Years of Experience</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter years of experience"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Field untuk Role */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role Applied For</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Frontend Developer">Frontend Developer</SelectItem>
                        <SelectItem value="Backend Developer">Backend Developer</SelectItem>
                        <SelectItem value="Fullstack Developer">Fullstack Developer</SelectItem>
                        <SelectItem value="UI/UX Designer">UI/UX Designer</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Field untuk Location */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Field untuk Resume URL */}
              <FormField
                control={form.control}
                name="resumeUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resume URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter resume URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Tombol Submit */}
            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-green-700 hover:bg-green-800 text-white px-12"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddApplicantForm;
