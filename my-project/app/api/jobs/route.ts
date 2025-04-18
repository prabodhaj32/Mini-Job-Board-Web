import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Make sure the field names match the front-end input and Prisma model
    const { title, company, location, jobType, description } = body;  // Use jobType to match the front-end

    // Check for missing fields
    if (!title || !company || !location || !jobType || !description) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const userId = 1; // Replace with real user ID if using auth

    // Create job entry in the database
    const job = await prisma.job.create({
      data: {
        title,
        company,
        location,
        type: jobType, // Ensure this matches the field name in the Prisma model (type)
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
