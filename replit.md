# Renz Tristan Diaz — Portfolio

A personal portfolio workspace with an interactive website, AI and contact API, component preview canvas, and animated showcase video.

## Run & Operate

- `pnpm install --frozen-lockfile` — install all workspace dependencies after an import.
- Start registered Replit workflows rather than running artifact `dev` scripts directly; managed workflows provide required `PORT` and `BASE_PATH` values.
- `artifacts/portfolio: web` — portfolio website at `/`
- `artifacts/api-server: API Server` — shared API at `/api`
- `artifacts/mockup-sandbox: Component Preview Server` — component canvas at `/__mockup`
- `artifacts/video: web` — portfolio showcase video at `/video/`
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck and build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes in development
- The current API routes do not use PostgreSQL, so `DATABASE_URL` is not required to start the API. It is required for DB schema commands or routes that import `@workspace/db`.
- Optional env: `GMAIL_APP_PASSWORD` enables contact-form email delivery. Without it, the API starts but contact submissions cannot be delivered.
- AI chat uses Groq through the server-side `AI_CHATBOT_GROQ_API_KEY` secret.

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 19, Vite 7, Tailwind CSS 4
- API: Express 5
- DB: PostgreSQL and Drizzle ORM
- Validation: Zod (`zod/v4`) and `drizzle-zod`
- API codegen: Orval from the OpenAPI spec
- API build: esbuild

## Where things live

- `artifacts/portfolio` — public React/Vite portfolio
- `artifacts/api-server` — Express API for health, AI chat, and contact messages
- `artifacts/mockup-sandbox` — React/Vite component preview canvas
- `artifacts/video` — animated portfolio showcase
- `lib/api-spec` — OpenAPI source of truth
- `lib/db` — Drizzle/PostgreSQL package for future database-backed features

## Architecture decisions

- Artifact services are exposed through Replit's path-based proxy; frontend code uses relative `/api` URLs.
- Managed artifact workflows own ports and base paths. Do not create replacement workflows or hardcode service ports.
- PostgreSQL remains available as a shared library but is intentionally not part of the current API startup path.

## Product

- Portfolio landing page showcasing experience, work samples, skills, certifications, honors, and contact options
- AI-powered portfolio chat assistant and contact form served through the shared API
- Component canvas for iterating on interface sections
- Animated portfolio showcase video

## Gotchas

- Vite artifact builds require workflow-provided `PORT` and `BASE_PATH`; use package `typecheck` commands for shell verification.
- Contact email delivery requires `GMAIL_APP_PASSWORD`, even though API startup and health checks do not.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.