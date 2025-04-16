import { hashPassword } from "../../../utils/auth";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    
    try {
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });
      res.status(201).json({ message: 'User created', user });
    } catch (error) {
      res.status(500).json({ error: 'Error creating user' });
    }
  }
}
