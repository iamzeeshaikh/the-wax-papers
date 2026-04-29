const ALLOWED_FILE_TYPES = new Set([
  "application/pdf",
  "application/postscript",        // .ai / .eps
  "image/png",
  "image/jpeg",
]);
const ALLOWED_EXTENSIONS = /\.(pdf|ai|eps|png|jpg|jpeg)$/i;
const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB

export function sanitizeText(value: unknown, maxLength = 500): string {
  if (typeof value !== "string") return "";
  return value
    .slice(0, maxLength)
    .replace(/[<>"'`]/g, (c) => ({ "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "`": "&#96;" }[c] ?? c));
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && email.length <= 254;
}

export function validateFile(file: File): string | null {
  if (file.size > MAX_FILE_BYTES) return "File exceeds 10 MB limit";
  if (!ALLOWED_EXTENSIONS.test(file.name)) return "Invalid file type";
  if (file.type && !ALLOWED_FILE_TYPES.has(file.type)) return "Invalid file type";
  return null;
}
