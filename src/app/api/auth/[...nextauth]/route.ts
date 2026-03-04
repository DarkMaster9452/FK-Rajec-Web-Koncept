import { loadAuthModule } from "@/lib/runtime";

export const dynamic = "force-static";

export function generateStaticParams() {
	return [];
}

export async function GET(req: Request) {
	const { handlers } = await loadAuthModule();
	return handlers.GET(req as any);
}

export async function POST(req: Request) {
	const { handlers } = await loadAuthModule();
	return handlers.POST(req as any);
}
