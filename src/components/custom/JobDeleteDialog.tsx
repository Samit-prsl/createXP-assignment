"use client"

import { useState } from "react"
import { Dialog, DialogTrigger, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { DeleteJobDialogProps } from "@/app/types/types"

export function DeleteJobDialog({ jobId, onDelete }: DeleteJobDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    setLoading(true)
    try {
      await onDelete()
      toast({ title: "Deleted", description: "Job post has been removed." })
      setOpen(false)
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete job post.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <h2 className="text-lg font-bold">Confirm Deletion</h2>
        <p>Are you sure you want to delete this job post?</p>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={loading}>
            {loading ? "Deleting..." : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
