# MakeMyWebsite AI — Frontend

The frontend for **MakeMyWebsite AI**, a React app that lets users generate, edit, preview, and deploy full websites from natural-language prompts. Pairs with the [MakeMyWebsite AI Backend](https://github.com/krishnasharma0101k/makeMyWebsite-Ai_backend).

## Features

- **Google sign-in** via Firebase Auth, synced with the backend session (JWT cookie).
- **Prompt-to-website generation** — describe a site and get a full, responsive HTML/CSS/JS build back.
- **In-browser code editor** (Monaco) with a live iframe preview, side-by-side with an AI chat panel for iterative edits.
- **Dashboard** listing all generated websites, with one-click deploy and share/copy link.
- **Public live site viewer** — deployed sites render standalone via a slug-based URL.
- **Pricing page** with Free / Pro / Enterprise plans and Stripe-powered checkout.
- **Redux** for global user state.

## Tech Stack

- **Framework:** React 19 + Vite
- **Routing:** React Router v7
- **State management:** Redux Toolkit
- **Styling:** Tailwind CSS v4
- **Animation:** Motion (Framer Motion)
- **Code editor:** Monaco Editor (`@monaco-editor/react`)
- **Auth:** Firebase Authentication (Google provider)
- **HTTP client:** Axios
- **Icons:** Lucide React

## Project Structure

```
.
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   └── _redirects            # Netlify SPA redirect rules
├── src/
│   ├── assets/                # Static images (hero, etc.)
│   ├── components/
│   │   └── LoginModal.jsx     # Google sign-in modal
│   ├── hooks/
│   │   └── useGetCurrentUser.jsx  # Fetches & stores the logged-in user on load
│   ├── pages/
│   │   ├── home.jsx           # Landing page
│   │   ├── GenerateWebsite.jsx # Prompt input & generation flow
│   │   ├── editor.jsx         # Code editor + live preview + AI chat for edits
│   │   ├── Dashboard.jsx      # List of the user's generated websites
│   │   ├── LiveSite.jsx       # Public renderer for deployed sites (by slug)
│   │   └── Pricing.jsx        # Plans & Stripe checkout
│   ├── redux/
│   │   ├── store.js
│   │   └── userSlice.js       # Current user state
│   ├── firebase.js            # Firebase app & Google auth provider setup
│   ├── App.jsx                # Routes
│   ├── main.jsx                # App entry point
│   └── index.css
├── index.html
├── vite.config.js
└── package.json
```

## Routes

| Path                 | Page             | Access                     |
|----------------------|------------------|----------------------------|
| `/`                  | Home             | Public                     |
| `/dashboard`         | Dashboard        | Logged-in users only       |
| `/generateWebsite`   | Generate Website | Logged-in users only       |
| `/editor/:id`        | Website Editor   | Logged-in users only       |
| `/site/:id`          | Live Site        | Public (rendered by slug)  |
| `/pricing`           | Pricing          | Public                     |

## Prerequisites

- Node.js (v18+ recommended)
- A running instance of the [backend API](https://github.com/krishnasharma0101k/makeMyWebsite-Ai_backend)
- A [Firebase](https://firebase.google.com/) project with Google sign-in enabled

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_FIREBASE_API_KEY=your_firebase_web_api_key
```

The rest of the Firebase config (auth domain, project ID, etc.) is hardcoded in `src/firebase.js` — update it there if you're pointing at your own Firebase project.

> **Note:** the backend URL is currently hardcoded in `src/App.jsx` as `serverUrl`. Point it at your own backend deployment (or `http://localhost:5000` for local development) before running the app.

## Installation

```bash
git clone https://github.com/krishnasharma0101k/makeMyWebsite-Ai.git
cd makeMyWebsite-Ai
npm install
```

## Running the App

```bash
# Start the Vite dev server
npm run dev

# Lint the project
npm run lint

# Build for production
npm run build

# Preview the production build locally
npm run preview
```

The dev server runs at `http://localhost:5173` by default.

## Deployment

The included `public/_redirects` file configures SPA fallback routing for **Netlify** deployments (all routes redirect to `index.html` so React Router can handle them client-side).

## How It Works

1. A user signs in with Google via the `LoginModal`; the resulting profile is sent to the backend, which returns a user record and sets a session cookie.
2. On `/generateWebsite`, the user describes the site they want. The prompt is sent to the backend, which returns a generated website and redirects to `/editor/:id`.
3. The editor page shows the generated HTML in a live iframe preview alongside a Monaco code view and an AI chat panel — further prompts update the site in place.
4. From the editor or dashboard, a site can be **deployed**, which asks the backend to assign it a public slug; the resulting URL renders the site via `/site/:id` → `LiveSite.jsx`.
5. The `/pricing` page lets users purchase more credits/plans through Stripe Checkout, handled by the backend's billing endpoints.

## Author

**Krishna Sharma** — [@krishnasharma0101k](https://github.com/krishnasharma0101k)

## License

MIT © Krishna Sharma — see [LICENSE](./LICENSE) for details.
