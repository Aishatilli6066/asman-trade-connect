import { createHash, randomBytes } from "crypto";

export function hashPassword(password: string): string {
  return createHash("sha256").update(password).digest("hex");
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

export function generateSessionId(): string {
  return randomBytes(32).toString("hex");
}

export function isSessionExpired(expiresAt: Date): boolean {
  return new Date() > expiresAt;
}

export function getSessionExpiryDate(hoursFromNow: number = 24): Date {
  const date = new Date();
  date.setHours(date.getHours() + hoursFromNow);
  return date;
}
