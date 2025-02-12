"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type SortingState,
  getSortedRowModel,
  type ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { JobPost, JobPostsTableProps } from "@/app/types/types"
import { JobEditSheet } from "./JobEditSheet"
import { DeleteJobDialog } from "./JobDeleteDialog"
import { useRouter } from "next/navigation"

export function JobPostsTable({ jobPosts, handleEdit, handleDelete }: JobPostsTableProps) {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const columns: ColumnDef<JobPost>[] = [
    {
      accessorKey: "title",
      header: "Job Title",
      cell: ({ row }) => <span className="font-medium">{row.getValue("title")}</span>,
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => <span>{row.getValue("category")}</span>,
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => <span>{row.getValue("location")}</span>,
    },
    {
      accessorKey: "salary",
      header: "Salary Range",
      cell: ({ row }) => <span className="font-medium">{row.getValue("salary")}</span>,
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const job = row.original;
        return (
          <div className="flex justify-center space-x-2">
            <JobEditSheet job={job} onUpdate={handleEdit} />
            <DeleteJobDialog jobId={job.id} onDelete={() => handleDelete(job.id)} />
          </div>
        );
      },
    },
    {
      accessorKey: "applications",
      header: "Applications",
      cell: ({ row }) => {
        const job = row.original;
        return (
          <Button variant="outline" size="sm" onClick={() => router.push(`/company/jobs/${job.id}/applications`)}>
            View Applications
          </Button>
        );
      },
    },
  ];

  const table = useReactTable({
    data: jobPosts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter jobs..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("title")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table className="w-full">
          <TableHeader className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="px-4 py-3 text-center">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-2 text-center">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  );
}
