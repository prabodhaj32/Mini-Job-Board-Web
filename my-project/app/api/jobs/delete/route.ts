// app/api/jobs/delete/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
    }

    const jobId = parseInt(id);
    if (isNaN(jobId)) {
      return NextResponse.json({ error: 'Invalid Job ID' }, { status: 400 });
    }

    await prisma.job.delete({
      where: { id: jobId },
    });

    return NextResponse.json({ message: 'Job deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('DELETE Job Error:', error);
    return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 });
  }
}
