import path from "node:path";

const SAFE_STUDENT_FILENAME = /^[a-z0-9]+(?:-[a-z0-9]+)*\.(?:jpe?g|png|webp)$/i;

export function resolveFileInsideDirectory(
  baseDirectory: string,
  filename: string,
): string | null {
  if (!SAFE_STUDENT_FILENAME.test(filename) || path.basename(filename) !== filename) {
    return null;
  }

  const normalizedBase = path.resolve(baseDirectory);
  const resolvedPath = path.resolve(normalizedBase, filename);
  const relativePath = path.relative(normalizedBase, resolvedPath);

  if (
    !relativePath ||
    relativePath.startsWith("..") ||
    path.isAbsolute(relativePath)
  ) {
    return null;
  }

  return resolvedPath;
}
