"use client"

import { useEffect, useState } from "react"
import { getAllJobs as getJobPosts, deleteJob as deleteJobPost } from "@/app/actions/jobs"
import { JobPost } from "@/app/types/types"
import { JobPostsTable } from "@/components/custom/JobPostsTable"
import { toast } from "@/hooks/use-toast"

export default function Dashboard() {
  const [jobPosts, setJobPosts] = useState<JobPost[]>([])

  useEffect(() => {
    async function fetchJobs() {
      try {
        const jobs = await getJobPosts()
        setJobPosts(jobs)
      } catch (error) {
        toast({ title: "Error", description: "Failed to load job posts.", variant: "destructive" })
      }
    }
    fetchJobs()
  }, [])

  async function handleEdit(updatedJob: JobPost) {
    setJobPosts((prev) => prev.map((job) => (job.id === updatedJob.id ? updatedJob : job)))
  }

  async function handleDelete(jobId: string) {
    try {
      await deleteJobPost(jobId)
      setJobPosts((prev) => prev.filter((job) => job.id !== jobId))
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete job post.", variant: "destructive" })
    }
  }

  return (
    <div className="container mx-auto py-10 px-5">
      <h1 className="text-3xl font-bold mb-6">Job Posts Dashboard</h1>
      <JobPostsTable jobPosts={jobPosts} handleDelete={handleDelete} handleEdit={handleEdit} />
    </div>
  )
}
