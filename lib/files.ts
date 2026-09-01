import "server-only";

import path from "node:path";
import { resolveFileInsideDirectory } from "@/lib/path-safety";

export const studentUploadDirectory = path.resolve(
  process.cwd(),
  "public",
  "uploads",
  "siswa",
);

export function resolveStudentFile(filename: string): string | null {
  return resolveFileInsideDirectory(studentUploadDirectory, filename);
}

export function getImageContentType(filename: string): string {
  const extension = path.extname(filename).toLowerCase();

  if (extension === ".png") return "image/png";
  if (extension === ".webp") return "image/webp";
  return "image/jpeg";
}
