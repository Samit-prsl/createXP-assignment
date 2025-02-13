import { JobPostForm } from "@/components/custom/JobPostForm"

export default function Home() {
  return (
    <main className="container lg:mx-auto py-10 mx-4 overflow-x-hidden overflow-y-hidden">
      <h1 className="text-3xl font-bold mb-6">Create a New Job Post</h1>
      <JobPostForm />
    </main>
  )
}

