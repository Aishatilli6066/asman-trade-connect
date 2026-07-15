import { json } from '@tanstack/react-start/server';

export async function GET(request: Request) {
  // TODO: Fetch posts from DB
  return json([]);
}

export async function POST(request: Request) {
  try {
    const postData = await request.json();
    // TODO: Create post in DB
    return json({ id: 1, ...postData }, { status: 201 });
  } catch (error) {
    return json({ message: 'Error creating post' }, { status: 500 });
  }
}
