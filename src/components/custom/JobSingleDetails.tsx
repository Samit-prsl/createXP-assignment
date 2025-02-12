"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { getJobById } from "@/app/actions/jobs"
import { JobPost } from "@/app/types/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

export default function JobDetailsPage() {
  const { id } = useParams()
  const router = useRouter()
  const [job, setJob] = useState<JobPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchJobDetails() {
      try {
        const jobData = await getJobById(id as string)
        setJob(jobData)
      } catch (error) {
        toast({ title: "Error", description: "Failed to load job details.", variant: "destructive" })
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchJobDetails()
  }, [id])

  if (loading) return <p className="text-center mt-10 text-lg">Loading job details...</p>
  if (!job) return <p className="text-center mt-10 text-lg text-red-500">Job not found.</p>

  return (
    <div className="max-w-3xl mx-auto py-10">
      <Card className="shadow-xl border border-gray-200 rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{job.title}</CardTitle>
          <p className="text-gray-500">{job.category}</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-lg">
              <span className="font-semibold">Location:</span> {job.location}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Salary:</span> {job.salary}
            </p>
            <p className="text-lg leading-relaxed">
              <span className="font-semibold">Description:</span> {job.description}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Posted on:</span> {new Date(job.createdAt || "").toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Card>
      <div className="mt-6 flex gap-4">
        <Button variant="outline" onClick={() => router.push("/candidate/jobs")}>
          ← Back to Jobs
        </Button>
        <Button variant="default" onClick={() => router.push(`/candidate/apply/${id}`)}>
          🚀 Apply Now
        </Button>
      </div>
    </div>
  )
}
