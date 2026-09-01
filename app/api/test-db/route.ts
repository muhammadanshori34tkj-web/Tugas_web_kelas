import { NextResponse } from "next/server";
import { getDatabasePool } from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await getDatabasePool().query(
      "SELECT 1 + 1 AS result",
    );

    return NextResponse.json({
      status: "ok",
      rows,
    });
  } catch (error) {
    console.error("Database test failed:", error);

    return NextResponse.json(
      {
        status: "error",
        message: "Database connection failed",
      },
      { status: 500 },
    );
  }
}
