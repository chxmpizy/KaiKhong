import { NextResponse } from "next/server";

export type ApiErrorCode =
  | "AUTHENTICATION_REQUIRED"
  | "CONFIGURATION_ERROR"
  | "DUPLICATE_RESOURCE"
  | "FORBIDDEN"
  | "INTERNAL_ERROR"
  | "NOT_FOUND"
  | "VALIDATION_ERROR"
  | "VERIFICATION_FAILED";

export function apiError(code: ApiErrorCode, message: string, status: number) {
  return NextResponse.json({ success: false, error: { code, message } }, { status });
}

export function apiSuccess<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}
