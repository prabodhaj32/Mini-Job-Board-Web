'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    jobType: '',  // ✅ Fixed: 'jobType' instead of 'type'
    description: '',
  });

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch('/api/auth', { cache: 'no-store' });
      if (res.status !== 200) router.push('/login');
    };

    checkAuth();
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch('/api/jobs');
      if (!res.ok) throw new Error('Failed to fetch jobs');
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      if (err instanceof Error) {
        console.error('Fetch Jobs Error:', err);
        alert(err.message);
      } else {
        console.error('Unknown fetch error:', err);
      }
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
        jobType: '',  // ✅ Resetting 'jobType' after submission
        description: '',
      });

      fetchJobs();
    } catch (err) {
      if (err instanceof Error) {
        console.error('Submit Error:', err);
        alert(err.message);
      } else {
        console.error('Unknown submit error:', err);
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/jobs?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete job');
      fetchJobs();
    } catch (err) {
      if (err instanceof Error) {
        console.error('Delete Error:', err);
        alert(err.message);
      } else {
        console.error('Unknown delete error:', err);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <form onSubmit={handleSubmit} className="space-y-2 mb-6">
        <input
          className="w-full p-2 border"
          placeholder="Job Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          className="w-full p-2 border"
          placeholder="Company"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
        />
        <input
          className="w-full p-2 border"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        <input
          className="w-full p-2 border"
          placeholder="Job Type"
          value={form.jobType}  // ✅ 'jobType' for input
          onChange={(e) => setForm({ ...form, jobType: e.target.value })}
        />
        <textarea
          className="w-full p-2 border"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          Add Job
        </button>
      </form>

      <div className="space-y-4">
        {jobs.map((job: any) => (
          <div
            key={job.id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">{job.title}</h2>
              <p className="text-sm">
                {job.company} – {job.location}
              </p>
            </div>
            <button
              onClick={() => handleDelete(job.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <form method="POST" action="/api/logout" className="mt-6">
        <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">
          Logout
        </button>
      </form>
    </div>
  );
}