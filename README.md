# Nitin Pandey — Portfolio

A Next.js portfolio site built as an "editor" — a file-tree sidebar doubles as navigation, each
section is a "file" (`about.md`, `resume.json`, `skills.config`...), and scrolling into a new
section triggers a diff-colored wipe transition. Includes a floating chatbot restricted to
answering questions about Nitin, in whatever language you ask it in.

## 1. Install & run locally

```bash
npm install
cp .env.local.example .env.local
# open .env.local and paste your Groq API key
npm run dev
```

Open http://localhost:3000.

## 2. The chatbot / API key

**Important — rotate your key first.** If you shared your Groq API key anywhere outside this
project (chat, email, a public repo), treat it as compromised and generate a new one at
https://console.groq.com/keys before using it here.

The key lives **only** in `.env.local` on the server and is read by `app/api/chat/route.js` —
it is never sent to the browser. `.env.local` is already in `.gitignore`, so it won't get
committed by accident.

The chatbot is restricted (via the system prompt in `route.js`) to answering questions about
Nitin only, using the content in `lib/data.js`, and always replies in whatever language the
visitor writes in.

If you ever see a "model not found" error from Groq, their model lineup rotates — open
`app/api/chat/route.js` and swap the `MODEL` constant for whatever Groq currently lists at
https://console.groq.com/docs/models.

## 3. Editing content

Everything — bio, education, experience, skills, certifications, projects, contact info — lives
in one place: `lib/data.js`. Edit that file and the whole site updates.

## 4. Deploying

The easiest path is [Vercel](https://vercel.com):

1. Push this project to a GitHub repo.
2. Import it in Vercel.
3. Add an environment variable `GROQ_API_KEY` in the Vercel project settings (Settings →
   Environment Variables) — don't rely on `.env.local`, it isn't deployed.
4. Deploy.

## 5. Project structure

```
app/
  layout.js          root layout, fonts, metadata
  page.js            assembles all sections
  globals.css         palette, code-grid background, scanline overlay
  api/chat/route.js   Groq-backed chatbot endpoint
components/
  TitleBar.js         top "editor" titlebar
  Sidebar.js           file-tree nav (desktop) / tab bar (mobile)
  SectionShell.js      shared wrapper: terminal-prompt eyebrow + diff-wipe transition
  Hero.js, About.js, Resume.js, Skills.js, Portfolio.js, Contact.js
  Chatbot.js           floating "ask-nitin.sh" widget
lib/
  data.js              all site content — edit this to update the site
  useActiveSection.js  scroll-spy hook for the sidebar
```

## 6. Notes on the "crazy" scroll transitions

Each section (`SectionShell.js`) is covered by three stacked color panels (teal, magenta, ink)
that wipe away left-to-right, staggered, the first time it scrolls into view — like a diff being
applied. Content underneath fades and slides up right behind it. The hero has an extra parallax
layer on the background grid tied to scroll position. Reduced-motion preferences are respected
(see `globals.css`).
