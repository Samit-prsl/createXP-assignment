"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { getJobById } from "@/app/actions/jobs"
import { JobPost } from "@/app/types/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import { Briefcase, MapPin, DollarSign, Calendar, ChevronLeft, Rocket } from "lucide-react"

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

  if (loading)
    return (
      <div className="max-w-3xl mx-auto py-10">
        <Skeleton className="h-64 w-full rounded-lg" />
        <div className="flex gap-4 mt-4">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-40" />
        </div>
      </div>
    )

  if (!job)
    return <p className="text-center mt-10 text-lg text-red-500">Job not found.</p>

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <Card className="shadow-lg border border-gray-200 rounded-xl p-6 bg-white">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-900">{job.title}</CardTitle>
          <p className="text-gray-500 text-sm flex justify-center items-center gap-2 mt-2">
            <Briefcase className="w-5 h-5" />
            {job.category}
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex flex-col gap-4">
            <p className="text-lg flex items-center gap-2 text-gray-700">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span>
                <span className="font-semibold">Location:</span> {job.location}
              </span>
            </p>

            <p className="text-lg flex items-center gap-2 text-gray-700">
              <DollarSign className="w-5 h-5 text-green-600" />
              <span>
                <span className="font-semibold">Salary:</span> ₹{job.salary.toLocaleString()}
              </span>
            </p>

            <p className="text-lg flex items-center gap-2 text-gray-700">
              <Calendar className="w-5 h-5 text-gray-500" />
              <span>
                <span className="font-semibold">Posted on:</span>{" "}
                {new Date(job.createdAt || "").toLocaleDateString()}
              </span>
            </p>
          </div>

          <div className="border-t pt-4">
            <h2 className="text-xl font-semibold text-gray-900">Job Description</h2>
            <p className="text-gray-700 leading-relaxed mt-2">{job.description}</p>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center">
        <Button
          variant="outline"
          onClick={() => router.push("/candidate/jobs")}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Jobs
        </Button>

        <Button
          variant="default"
          onClick={() => router.push(`/candidate/apply/${id}`)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
        >
          <Rocket className="w-5 h-5" />
          Apply Now
        </Button>
      </div>
    </div>
  )
}
