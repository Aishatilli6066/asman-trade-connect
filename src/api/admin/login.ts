import { json } from '@tanstack/react-start/server';
import { hashPassword, generateSessionId, getSessionExpiryDate } from '@/lib/auth.server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Mock authentication - replace with actual DB query
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const sessionId = generateSessionId();
      // TODO: Store session in DB
      return json({ sessionId }, { status: 200 });
    }

    return json({ message: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    return json({ message: 'Login error' }, { status: 500 });
  }
}
