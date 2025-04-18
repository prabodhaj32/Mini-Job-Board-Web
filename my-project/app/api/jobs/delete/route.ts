// app/api/jobs/delete/route.ts
import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ error: 'Job ID required' }, { status: 400 });

  try {
    await prisma.job.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: 'Job deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 });
  }
}
