export function requireAuthenticatedUser<T extends { id: string } | null>(user: T) {
  if (!user) throw new Error("AUTHENTICATION_REQUIRED");
  return user;
}
