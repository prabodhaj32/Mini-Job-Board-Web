import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export default async function handler(req, res) {
  const token = req.headers.authorization?.split(' ')[1];
  const user = verifyToken(token);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  const { title, company, location, jobType, description } = req.body;
  const job = await prisma.job.create({
    data: { title, company, location, jobType, description, userId: user.id },
  });

  res.json(job);
}
