"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
export async function createJob(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const location = formData.get("location") as string;
  const salary = formData.get("salary") as string;

  if (!title || !description || !category || !location || !salary) {
    throw new Error("All fields are required");
  }

  const job = await prisma.job.create({
    data: { title, description, category, location, salary },
  });

  revalidatePath("/"); 
  return job;
}

export async function getAllJobs() {
    return await prisma.job.findMany({
      include: { applications: true },
    });
  }

  export async function getJobById(jobId: string) {
    return await prisma.job.findUnique({
      where: { id: jobId },
      include: { applications: true },
    });
  }

export async function updateJob(jobId: string, formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const location = formData.get("location") as string;
  const salary = formData.get("salary") as string;

  if (!title || !description || !category || !location || !salary) {
    throw new Error("All fields are required");
  }

  const updatedJob = await prisma.job.update({
    where: { id: jobId },
    data: { title, description, category, location, salary },
  });

  revalidatePath(`/jobs/${jobId}`); 
  return updatedJob;
}

export async function deleteJob(jobId: string) {
    await prisma.job.delete({
      where: { id: jobId },
    });
  
    revalidatePath("/jobs"); 
    return { success: true };
  }
  
  export async function getJobApplications(jobId: string) {
    return await prisma.application.findMany({
      where: { jobId },
    });
  }
  
  
