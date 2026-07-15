import { json } from '@tanstack/react-start/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const postId = parseInt(params.id);
    // TODO: Fetch single post from DB
    return json({ id: postId });
  } catch (error) {
    return json({ message: 'Post not found' }, { status: 404 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const postId = parseInt(params.id);
    const postData = await request.json();
    // TODO: Update post in DB
    return json({ id: postId, ...postData });
  } catch (error) {
    return json({ message: 'Error updating post' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const postId = parseInt(params.id);
    // TODO: Delete post from DB
    return json({ success: true });
  } catch (error) {
    return json({ message: 'Error deleting post' }, { status: 500 });
  }
}
