import { useState } from 'react';

const AdminDashboard = () => {
  const [job, setJob] = useState({
    title: '',
    company: '',
    location: '',
    jobType: '',
    description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(job)
    });
    if (response.ok) {
      setJob({ title: '', company: '', location: '', jobType: '', description: '' });
    }
  };

  return (
    <div className="space-y-4">
      <h1>Admin Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="p-2 border"
          type="text"
          placeholder="Job Title"
          value={job.title}
          onChange={(e) => setJob({ ...job, title: e.target.value })}
        />
        <input
          className="p-2 border"
          type="text"
          placeholder="Company"
          value={job.company}
          onChange={(e) => setJob({ ...job, company: e.target.value })}
        />
        {/* Add other inputs for location, jobType, etc. */}
        <button className="bg-blue-500 text-white p-2" type="submit">Add Job</button>
      </form>
    </div>
  );
};

export default AdminDashboard;
import { useState } from 'react';

const AdminDashboard = () => {
  const [job, setJob] = useState({
    title: '',
    company: '',
    location: '',
    jobType: '',
    description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(job)
    });
    if (response.ok) {
      setJob({ title: '', company: '', location: '', jobType: '', description: '' });
    }
  };

  return (
    <div className="space-y-4">
      <h1>Admin Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="p-2 border"
          type="text"
          placeholder="Job Title"
          value={job.title}
          onChange={(e) => setJob({ ...job, title: e.target.value })}
        />
        <input
          className="p-2 border"
          type="text"
          placeholder="Company"
          value={job.company}
          onChange={(e) => setJob({ ...job, company: e.target.value })}
        />
        {/* Add other inputs for location, jobType, etc. */}
        <button className="bg-blue-500 text-white p-2" type="submit">Add Job</button>
      </form>
    </div>
  );
};

export default AdminDashboard;
