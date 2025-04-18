// app/api/jobs/route.ts

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - Fetch all jobs
export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    console.error('GET Job Error:', error);
    return NextResponse.json({ message: 'Failed to fetch jobs' }, { status: 500 });
  }
}

// POST - Create a new job
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { title, company, location, jobType, description } = body;

    if (!title || !company || !location || !jobType || !description) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const userId = 1; // Replace with dynamic user ID if auth is used

    const job = await prisma.job.create({
      data: {
        title,
        company,
        location,
        type: jobType, // Make sure 'type' is the field name in your Prisma schema
        description,
        userId,
      },
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error('POST Job Error:', error);
    return NextResponse.json({ message: 'Failed to create job' }, { status: 400 });
  }
}
