import { EU_COUNTRIES } from "./constants/countries";
import { geolocation } from "@vercel/functions";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const geo = geolocation(request);
  const country = geo.countryRegion || "";

  console.log(geo);

  response.headers.set("x-user-country", country);

  const isEuRegion = EU_COUNTRIES.includes(country);
  response.headers.set("x-user-eu-region", String(isEuRegion));

  return response;
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
