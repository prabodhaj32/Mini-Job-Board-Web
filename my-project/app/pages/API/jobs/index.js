import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { location, jobType, page = 1 } = req.query;
    const filters = {};
    if (location) filters.location = location;
    if (jobType) filters.jobType = jobType;

    const jobs = await prisma.job.findMany({
      where: filters,
      take: 5,
      skip: (page - 1) * 5,
      orderBy: { createdAt: 'desc' },
    });
    res.json(jobs);
  }
}
