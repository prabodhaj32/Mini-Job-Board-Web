import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// DELETE - Delete a job by ID from the URL
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const jobId = parseInt(params.id);

    if (isNaN(jobId)) {
      return NextResponse.json({ message: 'Invalid job ID' }, { status: 400 });
    }

    const deletedJob = await prisma.job.delete({
      where: { id: jobId },
    });

    return NextResponse.json(deletedJob, { status: 200 });
  } catch (error) {
    console.error('DELETE Job Error:', error);
    return NextResponse.json({ message: 'Failed to delete job' }, { status: 500 });
  }
}
