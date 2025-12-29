import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { User } from '@/models/Schema';

export async function GET() {
  await dbConnect();
  try {
    const existingUser = await User.findOne({ email: 'admin@example.com' });
    if (existingUser) {
        return NextResponse.json({ message: 'User already exists' });
    }

    const user = await User.create({
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123', // In production, hash this!
        role: 'admin'
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to seed' }, { status: 400 });
  }
}
