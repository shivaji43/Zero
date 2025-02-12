import { createDriver } from "../../driver";
import { NextRequest } from "next/server";
import { connection } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { db } from "@/db";

export const GET = async ({ headers, nextUrl }: NextRequest) => {
  const searchParams = nextUrl.searchParams;
  const session = await auth.api.getSession({ headers });
  if (!session) return new Response("Unauthorized", { status: 401 });

  // Updated to use googleConnection table
  const [_connection] = await db
    .select()
    .from(connection)
    .where(eq(connection.userId, session.user.id));

  if (!_connection?.accessToken || !_connection.refreshToken)
    return new Response("Unauthorized, reconnect", { status: 402 });

  const driver = createDriver("google", {
    // Assuming "google" is the provider ID
    auth: {
      access_token: _connection.accessToken,
      refresh_token: _connection.refreshToken,
    },
  });

  if (!searchParams.has("folder")) return new Response("Bad Request", { status: 400 });

  return new Response(
    JSON.stringify(
      await driver.list(
        searchParams.get("folder")!,
        searchParams.get("q") ?? undefined,
        Number(searchParams.get("max")) ? +searchParams.get("max")! : undefined,
        searchParams.get("labelIds") ? searchParams.get("labelIds")!.split(",") : undefined,
      ),
    ),
  );
};
