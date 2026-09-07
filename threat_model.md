# Threat Model

## Project Overview

A personal portfolio website for Renz Tristan Fernandez Diaz, consisting of a static React frontend (portfolio) and a Node.js/Express API server. The API server proxies chat requests to OpenAI so visitors can interact with an AI assistant that answers questions about the portfolio owner's professional background. Deployed publicly on Replit autoscale at `https://optimavirtualsolutions.replit.app`.

Tech stack: Node.js 24, TypeScript, Express 5, pnpm workspaces, Vite (frontend), OpenAI API.

## Assets

- **OpenAI API key / billing account** — the server uses the owner's OpenAI API key on every `/api/chat` request. Abuse of this endpoint directly translates into financial cost to the owner and service unavailability once quotas are exhausted.
- **Personal contact information** — phone number, email, LinkedIn embedded in the server-side system prompt. Exposure is intentional (portfolio context) but the information is baked into source code.
- **Application uptime / availability** — the portfolio represents the owner professionally; denial-of-service or quota exhaustion would harm that representation.

## Trust Boundaries

- **Public internet → API server** — the `/api/chat` endpoint is fully public with no authentication. Any internet user or script can call it. This is the primary attack surface.
- **API server → OpenAI** — the server calls OpenAI with the owner's secret API key. Unlimited public access to the chat endpoint transitively grants unlimited (costly) access to the OpenAI service. The OpenAI API key is loaded from the `AI_INTEGRATIONS_OPENAI_API_KEY` environment variable — not hardcoded.
- **Browser → API** — CORS is restricted to `https://optimavirtualsolutions.replit.app` and `*.replit.dev` subdomains. Requests with no `Origin` header (e.g., curl, server-to-server) are allowed unconditionally, which is intentional but means CORS is not a meaningful defense against scripted abuse.
- **Replit reverse proxy → API server** — Replit's autoscale infrastructure sits in front of the Express app and forwards real client IPs via `X-Forwarded-For`. Without `app.set('trust proxy', ...)`, Express ignores this header and `req.ip` resolves to the proxy's internal address for all clients.

## Scan Anchors

- **Production entry points:** `artifacts/api-server/src/routes/chat.ts` (`POST /api/chat`), `artifacts/api-server/src/routes/health.ts` (`GET /api/healthz`)
- **Highest-risk area:** `POST /api/chat` — unauthenticated, proxies to paid OpenAI API; rate limiter is present but misconfigured (missing trust proxy)
- **Public surface:** entire API is public (no authenticated routes exist currently)
- **Dev-only / mockup:** `artifacts/mockup-sandbox/` — design sandbox, not production-reachable in the same way
- **OpenAI client:** `lib/integrations-openai-ai-server/src/client.ts` — key from env vars, no hardcoding

## Threat Categories

### Denial of Service / Financial Abuse

The `/api/chat` endpoint calls OpenAI on every unauthenticated request. A rate limiter (`express-rate-limit`, 10 req/min) and input bounds (20 messages, 2000 chars each) have been added. However, the Express app does not set `trust proxy`, so `req.ip` resolves to the Replit proxy's internal IP for every client. This means all visitors share one rate-limit bucket — the limit triggers globally rather than per attacker, making the rate limiter ineffective as an abuse control.

**Required guarantees:**
- `app.set('trust proxy', 1)` MUST be added so `express-rate-limit` keys on the real client IP from `X-Forwarded-For`.
- The `messages` array length cap (20) and per-message size cap (2000 chars) are in place and MUST be retained.
- Consider adding a `max_completion_tokens` guard (already set to 1024) and `model` allowlist if more models are added later.

### Information Disclosure

The OpenAI system prompt is embedded in server source code (`chat.ts`). It contains intentionally public information (portfolio details, phone, email) so this is acceptable in context. The OpenAI API key is loaded from an environment variable (`AI_INTEGRATIONS_OPENAI_API_KEY`) — not hardcoded. The pino logger redacts `authorization` and `cookie` headers.

### Elevation of Privilege / Injection

User-supplied `role` and `content` fields are validated before forwarding to OpenAI: `role` is checked against an allowlist `["user", "assistant"]` and `content` must be a non-empty string within the character limit. This prevents role spoofing and limits prompt injection surface. No server-side code execution paths from user input exist.

### Spoofing / Broken Access Control

There are currently no authenticated routes. If admin or management endpoints are added in the future, they MUST enforce server-side authentication and authorization. The current architecture has no middleware for this.
