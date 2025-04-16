import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const jobs = await prisma.job.findMany();
    res.status(200).json(jobs);
  } else if (req.method === 'POST') {
    const { title, company, location, jobType, description } = req.body;
    const job = await prisma.job.create({
      data: {
        title,
        company,
        location,
        jobType,
        description,
      },
    });
    res.status(201).json(job);
  }
}
