import type { Session } from "next-auth";

const demoSession: Session = {
  user: {
    id: "static-demo",
    role: "ADMIN",
    name: "Demo User",
    email: "demo@fkrajec.local",
    image: null,
  },
  expires: "2999-12-31T23:59:59.999Z",
};

export const handlers = {
  async GET() {
    return new Response(
      JSON.stringify({ error: "Auth is not available on static hosting." }),
      {
        status: 501,
        headers: { "content-type": "application/json" },
      }
    );
  },
  async POST() {
    return new Response(
      JSON.stringify({ error: "Auth is not available on static hosting." }),
      {
        status: 501,
        headers: { "content-type": "application/json" },
      }
    );
  },
};

export function auth(...args: any[]) {
  if (typeof args[0] === "function") {
    const middleware = args[0];
    return (req: any) => middleware({ ...req, auth: demoSession });
  }
  return Promise.resolve(demoSession);
}

export async function signIn() {
  return { ok: false, error: "static-hosting" };
}

export async function signOut() {
  return { ok: true };
}
