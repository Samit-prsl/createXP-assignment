"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function applyForJob(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const resume = formData.get("resume") as string;
  const coverLetter = formData.get("coverLetter") as string;
  const jobId = formData.get("jobId") as string;

  if (!name || !email || !resume || !coverLetter || !jobId) {
    throw new Error("All fields are required");
  }

  const application = await prisma.application.create({
    data: { name, email, resume, coverLetter, jobId },
  });

  revalidatePath(`/jobs/${jobId}`); 
  return application;
}
