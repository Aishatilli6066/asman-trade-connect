import { json } from '@tanstack/react-start/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const postId = parseInt(params.id);
    // TODO: Fetch related posts from DB
    return json([]);
  } catch (error) {
    return json([], { status: 200 });
  }
}
