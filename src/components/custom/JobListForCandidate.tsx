"use client";
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
  const [locationFilter, setLocationFilter] = useState("");
  const [salaryFilter, setSalaryFilter] = useState("");
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
      (job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.location.toLowerCase().includes(search.toLowerCase())) &&
      job.location.toLowerCase().includes(locationFilter.toLowerCase()) &&
      job.salary.toLowerCase().includes(salaryFilter.toLowerCase())
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
    <div className="container py-10 px-3 lg:mx-auto overflow-x-hidden">
      <h1 className="text-3xl font-bold mb-6 text-center">Job Listings</h1>
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4 gap-2">
        <Input
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="lg:max-w-sm w-full md:w-1/3"
        />
        <Input
          placeholder="Filter by location..."
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="lg:max-w-sm w-full md:w-1/3"
        />
        <Input
          placeholder="Filter by salary range..."
          value={salaryFilter}
          onChange={(e) => setSalaryFilter(e.target.value)}
          className="lg:max-w-sm w-full md:w-1/3"
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
                  Please wait for sometime data can show up if waiting for long then no data found!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
