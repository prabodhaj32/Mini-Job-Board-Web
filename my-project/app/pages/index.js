import { useEffect, useState } from 'react';

export default function Home() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch('/api/jobs')
      .then(res => res.json())
      .then(data => setJobs(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Job Listings</h1>
      {jobs.map(job => (
        <div key={job.id} className="border p-4 rounded mb-4">
          <h2 className="text-xl font-semibold">{job.title}</h2>
          <p>{job.company} - {job.location}</p>
          <p className="text-sm text-gray-600">{job.jobType}</p>
          <p className="mt-2">{job.description}</p>
        </div>
      ))}
    </div>
  );
}
