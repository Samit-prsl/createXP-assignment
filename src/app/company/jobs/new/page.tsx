import { JobPostForm } from "@/components/custom/JobPostForm"

export default function Home() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Create a New Job Post</h1>
      <JobPostForm />
    </main>
  )
}

