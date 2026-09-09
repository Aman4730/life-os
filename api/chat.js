/**
 * Vercel serverless function at POST /api/chat.
 *
 * Reuses the Gemini proxy in netlify/functions/chat.mjs so local, Netlify, and
 * Vercel share one implementation. GEMINI_API_KEY is read only from process.env
 * inside that handler — never sent to the client.
 *
 * Compatible with both the Node.js (req, res) runtime and the Web Fetch API
 * runtime used by current Vercel Functions.
 */
import { handler as chatHandler } from "../netlify/functions/chat.mjs";

export const config = {
  maxDuration: 60,
};

async function runChat(method, body, headers = {}) {
  return chatHandler({
    httpMethod: method,
    headers,
    body: body || "",
  });
}

function headersFromWebRequest(request) {
  if (!request?.headers) return {};
  if (typeof request.headers.entries === "function") {
    return Object.fromEntries(request.headers.entries());
  }
  return { ...request.headers };
}

async function handleWebRequest(request) {
  const body = await request.text();
  const result = await runChat(request.method, body, headersFromWebRequest(request));
  return new Response(result.body || "", {
    status: result.statusCode || 200,
    headers: result.headers || { "Content-Type": "application/json" },
  });
}

async function readNodeBody(req) {
  if (typeof req.body === "string") return req.body;
  if (Buffer.isBuffer(req.body)) return req.body.toString("utf8");
  if (req.body && typeof req.body === "object") return JSON.stringify(req.body);
  if (typeof req.on === "function") {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    return Buffer.concat(chunks).toString("utf8");
  }
  return "";
}

export default async function handler(req, res) {
  const isNode = res && typeof res.status === "function" && typeof res.end === "function";

  if (!isNode) {
    return handleWebRequest(req);
  }

  const result = await runChat(req.method, await readNodeBody(req), req.headers || {});
  res.status(result.statusCode || 200);
  for (const [key, value] of Object.entries(
    result.headers || { "Content-Type": "application/json" }
  )) {
    res.setHeader(key, value);
  }
  res.end(result.body || "");
}

handler.fetch = handleWebRequest;
