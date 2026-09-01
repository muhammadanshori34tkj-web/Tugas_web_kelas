const CONTROL_CHARACTERS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export function parsePositiveInteger(value: unknown): number | null {
  if (typeof value !== "string" && typeof value !== "number") {
    return null;
  }

  const normalized = typeof value === "string" ? value.trim() : value;
  if (normalized === "") {
    return null;
  }

  const parsed = Number(normalized);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : null;
}

export function normalizeSearchQuery(value: unknown): string {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .normalize("NFKC")
    .replace(CONTROL_CHARACTERS, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
}

export function escapeLikePattern(value: string): string {
  return value.replace(/[\\%_]/g, "\\$&");
}

export function sanitizePlainText(value: unknown, maximumLength: number): string {
  if (typeof value !== "string") {
    throw new ValidationError("Nilai harus berupa teks.");
  }

  const sanitized = value
    .normalize("NFKC")
    .replace(CONTROL_CHARACTERS, "")
    .replace(/[<>]/g, "")
    .replace(/\r\n?/g, "\n")
    .trim();

  if (!sanitized) {
    throw new ValidationError("Kolom ini wajib diisi.");
  }

  if (sanitized.length > maximumLength) {
    throw new ValidationError(`Maksimal ${maximumLength} karakter.`);
  }

  return sanitized;
}

export function validateCommentPayload(value: unknown) {
  if (!value || typeof value !== "object") {
    throw new ValidationError("Data komentar tidak valid.");
  }

  const input = value as Record<string, unknown>;
  const studentId = parsePositiveInteger(input.studentId);

  if (!studentId) {
    throw new ValidationError("ID siswa tidak valid.");
  }

  return {
    studentId,
    authorName: sanitizePlainText(input.authorName, 60),
    content: sanitizePlainText(input.content, 500),
    website: typeof input.website === "string" ? input.website.trim() : "",
  };
}
