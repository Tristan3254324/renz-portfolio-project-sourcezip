# GitHub Pages + Render deployment

This project uses a split deployment:

- GitHub Pages hosts the static portfolio.
- Render hosts the Express API used by Renz AI and the contact form.
- Groq and Gmail credentials exist only on Render.

## 1. Push the repository to GitHub

Use a private or public GitHub repository with `main` as its default branch.

## 2. Create the Render API

1. In Render, create a new Blueprint.
2. Connect this GitHub repository.
3. Render detects `render.yaml` and creates `renz-portfolio-api`.
4. Add these secret values when prompted:
   - `AI_CHATBOT_GROQ_API_KEY`: a valid Groq API key.
   - `GMAIL_APP_PASSWORD`: the Google App Password for the portfolio Gmail account.
   - `ALLOWED_ORIGINS`: the exact GitHub Pages origin, without a trailing slash. Example: `https://USERNAME.github.io`
5. Deploy and confirm `https://YOUR-RENDER-SERVICE.onrender.com/api/healthz` returns `{"status":"ok"}`.

## 3. Connect GitHub Pages to Render

In the GitHub repository:

1. Open **Settings → Secrets and variables → Actions → Variables**.
2. Create `RENDER_API_URL` with the Render service origin, without a trailing slash. Example: `https://YOUR-RENDER-SERVICE.onrender.com`.
3. Open **Settings → Pages**.
4. Set **Source** to **GitHub Actions**.
5. Run the **Deploy portfolio to GitHub Pages** workflow, or push to `main`.

The workflow builds with the repository subpath automatically, so assets work at:

`https://USERNAME.github.io/REPOSITORY/`

## Security

Never add the Groq key or Gmail App Password to GitHub repository variables, source files, or frontend environment variables. Only the public Render service URL belongs in `RENDER_API_URL`.