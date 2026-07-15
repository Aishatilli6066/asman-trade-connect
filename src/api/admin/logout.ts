import { json } from '@tanstack/react-start/server';

export async function POST(request: Request) {
  // TODO: Clear session from DB
  return json({ success: true });
}
