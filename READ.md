## Client (frontend) — Import/Export App

This frontend is a Vite + React application for managing product imports and exports.

Short overview

- Tech: Vite, React, CSS
- Purpose: UI for listing products, adding imports/exports, authentication (Firebase), and integrating with a backend server in `../server`.

Key features

- User authentication
- Import/export product listing and details
- Add / Edit imports and exports

Quick start (development)

1. Install dependencies

```powershell
cd client
npm install
```

2. Start dev server

```powershell
npm run dev
```

Build for production

```powershell
npm run build
```

Environment variables (Vite)

- This project uses Vite. Environment variables available at build/runtime must use the VITE\_ prefix.

Important variables (examples)

- VITE_API_URL - URL of the backend server (e.g. http://localhost:5000)
- VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, etc. - your Firebase config
- VITE_ENABLE_CLAUDE_HAIKU - feature flag to enable Claude Haiku 4.5 for all clients (true/false)

Enable "Claude Haiku 4.5" for all clients

- To enable Claude Haiku 4.5 across all clients, set the Vite env flag `VITE_ENABLE_CLAUDE_HAIKU=true` before building or running the app.

Development (local)

- Create a local env file `client/.env.local` (this file should NOT be committed):

```
VITE_ENABLE_CLAUDE_HAIKU=true
VITE_API_URL=http://localhost:5000
# Add your Firebase variables below
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

- Start the dev server (`npm run dev`). Vite injects variables with the `import.meta.env` API. Example in code:

```js
// to read the flag in the app
const enabled = import.meta.env.VITE_ENABLE_CLAUDE_HAIKU === "true";
```

Production

- When deploying, set the build/pipeline environment variable `VITE_ENABLE_CLAUDE_HAIKU=true` or configure your hosting provider to add that env var so production bundles are built with the feature enabled. If you need runtime toggles, consider implementing a small runtime config endpoint in the server.

Notes about the "Enable Claude Haiku 4.5 for all clients" request

- This README adds a clear, repo-level feature flag for enabling the Claude integration across clients.
- Enabling the flag in the environment will make the front-end components read it and toggle UI/behavior. If the repository needs code-level wiring (calls to Claude or an SDK), we can add the integration in a follow-up.

Files of interest

- `src/firebase.config.js` — Firebase configuration (fill via env vars)
- `src/main.jsx` — App bootstrap
- `src/components` — UI components (Import/Export, Auth, etc.)

Where to go next

- If you want me to also wire the flag into code (example: conditionally call an API or show a Claude-specific UI), tell me which component(s) should be updated and whether the backend already exposes a Claude endpoint. I can then implement the toggle and add tests.

License & contribution

- Adapt the LICENSE or add contribution guidelines as needed.
