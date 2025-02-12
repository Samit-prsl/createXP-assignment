"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getJobApplications } from "@/app/actions/jobs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { Application } from "@/app/types/types";

export default function JobApplicationsPage() {
  const { id: jobId } = useParams();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchApplications() {
      try {
        const apps = await getJobApplications(jobId as string);
        setApplications(apps);
      } catch (error) {
        toast({ title: "Error", description: "Failed to load applications.", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    }
    if (jobId) fetchApplications();
  }, [jobId]);

  if (loading) return <p className="text-center mt-10 text-lg">Loading applications...</p>;
  if (!applications.length) return <p className="text-center mt-10 text-lg text-gray-500">No applications yet.</p>;

  return (
    <div className="max-w-4xl mx-auto py-10">
      <Card className="shadow-xl border border-gray-200 rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Job Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Resume</TableHead>
                  <TableHead>Cover Letter</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell>{app.name}</TableCell>
                    <TableCell>{app.email}</TableCell>
                    <TableCell>
                      <a href={app.resume} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                        View Resume
                      </a>
                    </TableCell>
                    <TableCell className="max-w-xs">{app.coverLetter}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
