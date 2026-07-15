import { json } from '@tanstack/react-start/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const status = url.searchParams.get('status') || 'published';
  const limit = parseInt(url.searchParams.get('limit') || '12');

  // TODO: Fetch published posts from DB with limit
  return json([]);
}
