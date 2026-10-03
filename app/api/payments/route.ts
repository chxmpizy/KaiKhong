import { apiError } from "@/lib/api";

/** Payment creation stays deliberately closed until plan selection and an Omise source flow are designed. */
export async function POST() {
  return apiError("NOT_FOUND", "Payment creation is not available during validation.", 501);
}
