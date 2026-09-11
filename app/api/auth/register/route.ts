import { NextResponse } from "next/server";
import { registerAccount } from "@/lib/auth";
import { validateRegistration } from "@/lib/auth-validation";
import {
  readJsonBody,
  requireSameOrigin,
  rateLimit,
} from "@/lib/http-security";
import { apiError } from "@/lib/api-error";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    requireSameOrigin(request);
    rateLimit("registration", 20, 60_000);

    const input = validateRegistration(await readJsonBody(request));

    await registerAccount(input);

    return NextResponse.json(
      { message: "Akun berhasil dibuat. Silakan masuk." },
      { status: 201 },
    );
  } catch (error) {
    return apiError(error);
  }
}
