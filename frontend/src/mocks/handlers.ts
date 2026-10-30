import { http as msw, HttpResponse } from "msw";
import { computersPayload, computerTypesPayload } from "./data";

export const handlers = [
  msw.get("/api/computers", ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") ?? "1");
    return HttpResponse.json({ ...computersPayload, page });
  }),
  msw.get("/api/computer-types", ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") ?? "1");
    return HttpResponse.json({ ...computerTypesPayload, page });
  }),
];
