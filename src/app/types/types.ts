export interface JobPost {
    id: string
    title: string
    category: string
    description:string
    location: string
    salary: string
    createdAt?: Date
  }
  
  export interface JobPostsTableProps {
    jobPosts: JobPost[]
    handleEdit: (job: JobPost) => void
    handleDelete: (jobId: string) => void
  }


export interface DeleteJobDialogProps {
  jobId: string
  onDelete: () => void
}

export interface JobEditSheetProps {
  job: JobPost
  onUpdate: (updatedJob: JobPost) => void
}

export type Application = {
  id: string;
  name: string;
  createdAt: Date; 
  email: string;
  resume: string;
  coverLetter: string;
  jobId: string;
};
