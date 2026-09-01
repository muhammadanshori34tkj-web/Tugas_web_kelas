import "server-only";

import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { getDatabasePool } from "@/lib/db";
import {
  createMockComment,
  getMockComments,
  isMockDataSource,
  mockStudents,
} from "@/lib/mock-data";
import type { StudentComment } from "@/lib/types";

interface CommentRow extends RowDataPacket {
  id: number;
  student_id: number;
  author_name: string;
  content: string;
  created_at: Date | string;
}

function serializeDate(value: Date | string): string {
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

function toComment(row: CommentRow): StudentComment {
  return {
    id: row.id,
    studentId: row.student_id,
    authorName: row.author_name,
    content: row.content,
    createdAt: serializeDate(row.created_at),
  };
}

export async function getCommentsForStudent(studentId: number): Promise<StudentComment[]> {
  if (isMockDataSource()) return getMockComments(studentId);

  const [rows] = await getDatabasePool().execute<CommentRow[]>(
    `SELECT id, student_id, author_name, content, created_at
     FROM student_comments
     WHERE student_id = ? AND is_visible = 1
     ORDER BY created_at DESC, id DESC
     LIMIT 50`,
    [studentId],
  );

  return rows.map(toComment);
}

export async function createComment(input: {
  studentId: number;
  authorName: string;
  content: string;
}): Promise<StudentComment> {
  if (isMockDataSource()) {
    if (!mockStudents.some((student) => student.id === input.studentId)) {
      throw new Error("STUDENT_NOT_FOUND");
    }
    return createMockComment(input);
  }

  const pool = getDatabasePool();
  const [studentRows] = await pool.execute<RowDataPacket[]>(
    "SELECT id FROM siswa WHERE id = ? LIMIT 1",
    [input.studentId],
  );

  if (studentRows.length === 0) {
    throw new Error("STUDENT_NOT_FOUND");
  }

  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO student_comments (student_id, author_name, content)
     VALUES (?, ?, ?)`,
    [input.studentId, input.authorName, input.content],
  );

  const [rows] = await pool.execute<CommentRow[]>(
    `SELECT id, student_id, author_name, content, created_at
     FROM student_comments
     WHERE id = ?
     LIMIT 1`,
    [result.insertId],
  );

  if (!rows[0]) {
    throw new Error("COMMENT_NOT_FOUND_AFTER_INSERT");
  }

  return toComment(rows[0]);
}
