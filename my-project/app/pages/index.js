import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const jobs = await prisma.job.findMany();
  return { props: { jobs } };
}

const JobBoard = ({ jobs }) => {
  return (
    <div>
      <h1>Job Listings</h1>
      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="border p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold">{job.title}</h2>
            <p>{job.company}</p>
            <p>{job.location}</p>
            <p>{job.jobType}</p>
            <p>{job.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobBoard;
