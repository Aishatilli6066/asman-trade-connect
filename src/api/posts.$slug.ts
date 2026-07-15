import { json } from '@tanstack/react-start/server';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    // TODO: Fetch post by slug from DB
    return json({
      id: 1,
      slug: params.slug,
      title: 'Sample Post',
      content: 'Post content',
      seoTitle: 'Sample Post Title',
      seoDescription: 'Post description',
    });
  } catch (error) {
    return json({ message: 'Post not found' }, { status: 404 });
  }
}
