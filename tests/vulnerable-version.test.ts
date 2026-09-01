import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import {
  buildUnsafeStudentSearchQuery,
  resolveUnsafeStudentFile,
} from "../lib/vulnerable-helpers.ts";

test("versi rentan memasukkan payload SQL ke struktur query", () => {
  const payload = "' OR 1=1 #";
  const query = buildUnsafeStudentSearchQuery(payload);

  assert.match(query, /LIKE '%' OR 1=1 #%'/);
  assert.equal(query.includes("?"), false);
});

test("versi rentan dapat keluar menuju fixture Path Traversal", () => {
  const uploadDirectory = path.resolve("public/uploads/siswa");
  const result = resolveUnsafeStudentFile(
    uploadDirectory,
    "../../../security-fixtures/demo-secret.txt",
  );

  assert.equal(result, path.resolve("security-fixtures/demo-secret.txt"));
  assert.equal(result.startsWith(`${uploadDirectory}${path.sep}`), false);
});

test("versi rentan memiliki sink HTML untuk stored XSS", async () => {
  const componentSource = await readFile(
    path.resolve("components/CommentSection.tsx"),
    "utf8",
  );
  const routeSource = await readFile(
    path.resolve("app/api/comments/route.ts"),
    "utf8",
  );

  assert.match(componentSource, /dangerouslySetInnerHTML/);
  assert.match(routeSource, /String\(body\.content \|\| ""\)/);
});
