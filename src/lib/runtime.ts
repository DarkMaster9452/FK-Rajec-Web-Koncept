export const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

export async function loadAuthModule() {
  if (isStaticExport) {
    return import("@/lib/auth.static");
  }
  return import("@/lib/auth");
}

export async function loadDbModule() {
  if (isStaticExport) {
    return import("@/lib/db.static");
  }
  return import("@/lib/db");
}
