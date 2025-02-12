"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  type SortingState,
  getSortedRowModel,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import { getAllJobs } from "@/app/actions/jobs";
import { JobPost } from "@/app/types/types";

export default function JobListingsPage() {
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchJobs() {
      const jobData = await getAllJobs();
      setJobs(jobData);
    }
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase())
  );

  const table = useReactTable({
    data: filteredJobs,
    columns: [
      { accessorKey: "title", header: "Job Title" },
      { accessorKey: "location", header: "Location" },
      { accessorKey: "salary", header: "Salary" },
    ],
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
  });

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Job Listings</h1>
      <div className="flex justify-between mb-4">
        <Input
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {filteredJobs.length ? (
              filteredJobs.map((job) => (
                <TableRow
                  key={job.id}
                  onClick={() => router.push(`/candidate/jobs/${job.id}`)}
                  className="cursor-pointer hover:bg-gray-100 text-blue-700"
                  title="Click to view details of this listing"
                >
                  <TableCell>{job.title}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>{job.salary}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-4">
                  No jobs found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
