interface Hit { count: number; resetAt: number }

const store = new Map<string, Hit>();
const WINDOW_MS = 60_000; // 1 minute
const MAX_HITS = 5;       // 5 submissions per IP per minute

export function rateLimit(ip: string): { allowed: boolean; retryAfter: number } {
  const now = Date.now();
  const hit = store.get(ip);

  if (!hit || now > hit.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfter: 0 };
  }

  if (hit.count >= MAX_HITS) {
    return { allowed: false, retryAfter: Math.ceil((hit.resetAt - now) / 1000) };
  }

  hit.count++;
  return { allowed: true, retryAfter: 0 };
}
