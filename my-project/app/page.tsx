'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  jobType: string;
  description: string;
};

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('/api/jobs');
        if (!res.ok) throw new Error('Failed to fetch jobs');
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('There was an error fetching jobs.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">
      <header className="bg-blue-600 text-white px-6 py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">🧑‍💼 Job Board</h1>
          <nav className="space-x-4">
            <Link href="/login" className="hover:underline">
              Login
            </Link>
            <Link href="/register" className="hover:underline">
              Register
            </Link>
            <Link href="/dashboard" className="hover:underline">
              Admin
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-4">Find Your Dream Job</h2>
          <p className="text-lg text-gray-600 mb-6">
            Browse opportunities or post a job — it's quick and easy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
           
          </div>
        </div>

        {/* Job Listings */}
        <section>
          <h3 className="text-2xl font-semibold mb-4">Latest Jobs</h3>
          {loading ? (
            <p className="text-gray-600">Loading jobs...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : jobs.length === 0 ? (
            <p className="text-gray-600">No jobs available at the moment.</p>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="border p-4 rounded shadow-sm hover:shadow-lg transition"
                >
                  <h4 className="text-lg font-bold">{job.title}</h4>
                  <p className="text-sm text-gray-700">
                    {job.company} — {job.location}
                  </p>
                  <p className="text-sm text-gray-600">{job.jobType}</p>
                  <p className="mt-2 text-sm">{job.description}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="bg-gray-100 py-4 text-center text-sm text-gray-500 border-t">
        Built with  <span className="font-semibold">Next.js</span> & TailwindCSS
      </footer>
    </div>
  );
}
