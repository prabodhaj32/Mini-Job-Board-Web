import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export default async function handler(req, res) {
  const token = req.headers.authorization?.split(' ')[1];
  const user = verifyToken(token);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  const { id } = req.body;
  await prisma.job.delete({ where: { id: parseInt(id) } });
  res.json({ message: 'Deleted' });
}
