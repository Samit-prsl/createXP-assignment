"use client"

import { useState } from "react"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { JobEditSheetProps, JobPost } from "@/app/types/types"
import { updateJob } from "@/app/actions/jobs"
import { Loader2 } from "lucide-react"

export function JobEditSheet({ job, onUpdate }: JobEditSheetProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<JobPost>(job)
  const [loading, setLoading] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit() {
    setLoading(true)
    try {
      const jobFormData = new FormData()
      jobFormData.append("id", formData.id)
      jobFormData.append("title", formData.title)
      jobFormData.append("category", formData.category)
      jobFormData.append("location", formData.location)
      jobFormData.append("salary", formData.salary)
      jobFormData.append("description", formData.description)

      const updatedJob = await updateJob(job.id, jobFormData)
      onUpdate(updatedJob)

      toast({ title: "Success", description: "Job updated successfully!" })
      setOpen(false)
    } catch (error) {
      toast({ title: "Error", description: "Failed to update job.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">Edit</Button>
      </SheetTrigger>
      <SheetContent className="p-6 space-y-6">
        <h2 className="text-2xl font-bold">Edit Job</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Job Title</label>
            <Input name="title" value={formData.title} onChange={handleChange} placeholder="Enter job title" />
          </div>

          <div>
            <label className="block text-sm font-medium">Category</label>
            <Input name="category" value={formData.category} onChange={handleChange} placeholder="Enter category" />
          </div>

          <div>
            <label className="block text-sm font-medium">Location</label>
            <Input name="location" value={formData.location} onChange={handleChange} placeholder="Enter location" />
          </div>

          <div>
            <label className="block text-sm font-medium">Salary</label>
            <Input name="salary" value={formData.salary} onChange={handleChange} placeholder="Enter salary range" />
          </div>

          <div>
            <label className="block text-sm font-medium">Description</label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter job description"
              rows={4}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Changes"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
