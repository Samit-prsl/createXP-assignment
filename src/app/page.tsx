"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-xl p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Welcome to Mini Job Board</h1>
        <p className="text-gray-600 mb-8">
          This platform allows companies to post jobs and candidates to apply for opportunities.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Candidate Routes</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-700">
              <ul className="space-y-2">
                <li>
                  <Link href="/candidate/jobs">
                    <Button variant="link" className="text-blue-600">View Jobs</Button>
                  </Link>
                  - Browse all available job listings.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Company Routes</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-700">
              <ul className="space-y-2">
                <li>
                  <Link href="/company/jobs/new">
                    <Button variant="link" className="text-blue-600">New Job Posting</Button>
                  </Link>
                  - Create a new one
                </li>
                <li>
                  <Link href="/company/jobs">
                    <Button variant="link" className="text-blue-600">My Job Listings</Button>
                  </Link>
                  - View and edit posted jobs.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <p className="text-gray-500 text-sm">Use the navigation links above to explore the platform.</p>
        </div>
      </div>
    </main>
  );
}
