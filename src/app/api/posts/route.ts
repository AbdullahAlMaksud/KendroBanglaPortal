import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Post } from '@/models/Schema';
import { auth } from '@/auth';

export async function GET() {
  await dbConnect();
  try {
    const posts = await Post.find({}).sort({ date: -1 });
    return NextResponse.json({ success: true, data: posts });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch posts' }, { status: 400 });
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();
  try {
    const body = await req.json();
    const post = await Post.create(body);
    return NextResponse.json({ success: true, data: post }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create post' }, { status: 400 });
  }
}
