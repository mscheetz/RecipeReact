# Recipe React 🍳

A recipe catalog app built with React Router 8, TypeScript, and Tailwind CSS v4.

**Deployed at:** [mscheetz.github.io/RecipeReact](https://mscheetz.github.io/RecipeReact/)

Browse, search, add, edit, favorite, and delete recipes — all client-side, no backend.



## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

Deployed to GitHub Pages at `https://mscheetz.github.io/RecipeReact/`. Manual process — push contents of `build/client/` to `gh-pages` branch.

### Build

```bash
npm run build
```

Output goes to `build/client/` (static assets) and `build/server/` (unused — SPA mode).

### Styling

Tailwind CSS v4 via Vite plugin.
