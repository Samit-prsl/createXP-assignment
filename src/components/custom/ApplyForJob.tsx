"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { applyForJob } from "@/app/actions/applications";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  resume: z.string().url("Resume must be a valid URL"),
  coverLetter: z.string().min(20, "Cover letter must be at least 20 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function ApplyForJobPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: FormData) {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("resume", data.resume);
      formData.append("coverLetter", data.coverLetter);
      formData.append("jobId", id as string);

      await applyForJob(formData);

      toast({
        title: "Success",
        description: "Application submitted successfully!",
      });
      router.push(`/candidate/jobs/${id}`);
    } catch {
      toast({
        title: "Error",
        description: "Failed to apply.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-10">
      <Card className="shadow-xl border border-gray-200 rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Apply for Job</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Input {...register("name")} placeholder="Full Name" />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>
            <div>
              <Input {...register("email")} type="email" placeholder="Email" />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
            <div>
              <Input {...register("resume")} placeholder="Resume URL" />
              {errors.resume && (
                <p className="text-red-500 text-sm mt-1">{errors.resume.message}</p>
              )}
            </div>
            <div>
              <Textarea {...register("coverLetter")} placeholder="Cover Letter" rows={4} />
              {errors.coverLetter && (
                <p className="text-red-500 text-sm mt-1">{errors.coverLetter.message}</p>
              )}
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Apply Now"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className="mt-6 flex justify-start">
        <Button variant="outline" onClick={() => router.push(`/candidate/jobs`)}>
          ← Back to Job Details
        </Button>
      </div>
    </div>
  );
}
