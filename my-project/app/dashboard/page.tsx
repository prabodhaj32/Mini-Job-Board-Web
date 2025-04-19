'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  jobType: string;
  description: string;
};

export default function Dashboard() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    jobType: '',
    description: '',
  });

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch('/api/auth', { cache: 'no-store' });
      if (res.status !== 200) router.push('/login');
    };

    checkAuth();
    fetchJobs();
  }, [router]);

  const fetchJobs = async () => {
    try {
      const res = await fetch('/api/jobs');
      if (!res.ok) throw new Error('Failed to fetch jobs');
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error('Fetch Jobs Error:', err);
      toast.error(err instanceof Error ? err.message : 'Unknown fetch error', {
        position: 'top-right', 
        autoClose: 3000,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to create job');
      }

      setForm({
        title: '',
        company: '',
        location: '',
        jobType: '',
        description: '',
      });

      fetchJobs();
      toast.success("Job created successfully!", {
        position: 'top-right', 
        autoClose: 3000,
      });
    } catch (err) {
      console.error('Submit Error:', err);
      toast.error(err instanceof Error ? err.message : 'Unknown submit error', {
        position: 'top-right', 
        autoClose: 3000,
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/jobs/delete?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete job');
      fetchJobs();
      toast.success("Job deleted successfully!", {
        position: 'top-right', 
        autoClose: 3000,
      });
    } catch (err) {
      console.error('Delete Error:', err);
      toast.error(err instanceof Error ? err.message : 'Unknown delete error', {
        position: 'top-right', 
        autoClose: 3000,
      });
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", { method: "POST" });

      if (res.ok) {
        toast.success("Logged out successfully!", {
          position: 'top-right', 
          autoClose: 3000,
        });

        setTimeout(() => {
          router.push("/"); // Redirect to homepage
        }, 3000);
      } else {
        const errorResponse = await res.json();
        toast.error(errorResponse.message || "Failed to log out. Please try again.", {
          position: 'top-right', 
          autoClose: 3000,
        });
      }
    } catch (err) {
      toast.error("An error occurred while logging out.", {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-4 rounded border mb-8">
        <div>
          <label className="block text-sm font-medium">Job Title</label>
          <input
            className="w-full p-2 border rounded"
            placeholder="e.g. Frontend Developer"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Company</label>
          <input
            className="w-full p-2 border rounded"
            placeholder="e.g. TechCorp"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Location</label>
          <input
            className="w-full p-2 border rounded"
            placeholder="e.g. Remote or New York"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Job Type</label>
          <input
            className="w-full p-2 border rounded"
            placeholder="e.g. Full-time, Part-time"
            value={form.jobType}
            onChange={(e) => setForm({ ...form, jobType: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            className="w-full p-2 border rounded"
            placeholder="Brief description of the job..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={4}
            required
          />
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition" type="submit">
          Add Job
        </button>
      </form>

      <div className="space-y-4">
        {jobs.length === 0 ? (
          <p className="text-gray-500 text-center">No jobs posted yet.</p>
        ) : (
          jobs.map((job) => (
            <div
              key={job.id}
              className="border p-4 rounded flex justify-between items-start bg-white shadow-sm"
            >
              <div>
                <h2 className="text-lg font-semibold">{job.title}</h2>
                <p className="text-sm text-gray-600">{job.company} — {job.location}</p>
                <p className="text-sm text-gray-500 italic">{job.jobType}</p>
                <p className="text-sm mt-2">{job.description}</p>
              </div>
              <button
                onClick={() => handleDelete(job.id)}
                className="text-red-500 hover:underline ml-4"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
