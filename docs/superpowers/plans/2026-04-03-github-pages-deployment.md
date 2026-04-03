# GitHub Pages Deployment — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deploy the Maria Szczudlo portfolio site to GitHub Pages at `JakubSzadziul.github.io/maria-portfolio/`.

**Architecture:** Fix Figma-specific asset imports so the site builds with standard Vite, remove the variant switcher to ship only the Cosmic Purple theme, configure Vite's `base` for subpath serving, and add a GitHub Actions workflow for automated deployment.

**Tech Stack:** Vite 6, React 18, TypeScript, pnpm, GitHub Actions (`actions/deploy-pages`)

**Spec:** `docs/superpowers/specs/2026-04-03-github-pages-deployment-design.md`

---

## File Structure

| Action | File | Purpose |
|--------|------|---------|
| Modify | `src/app/App.tsx` | Fix imports, remove variant switcher |
| Modify | `src/app/AppVariant1.tsx` | Fix imports |
| Modify | `src/app/AppVariant2.tsx` | Fix imports |
| Modify | `src/app/AppVariant3.tsx` | Fix imports |
| Modify | `vite.config.ts` | Add `base: '/maria-portfolio/'` |
| Create | `.github/workflows/deploy.yml` | CI/CD for GitHub Pages |
| Create | `public/.nojekyll` | Prevent Jekyll processing |
| Create | `.gitignore` | Ignore node_modules, dist |

---

### Task 1: Fix `figma:asset/` imports in all variant files

**Files:**
- Modify: `src/app/App.tsx:2-9`
- Modify: `src/app/AppVariant1.tsx:2-9`
- Modify: `src/app/AppVariant2.tsx:2-9`
- Modify: `src/app/AppVariant3.tsx:2-9`

All 4 files have identical import blocks at lines 2-9. Replace the `figma:asset/` protocol with `@/assets/` (which resolves to `src/assets/` via the alias in `vite.config.ts`).

- [ ] **Step 1: Replace imports in `src/app/App.tsx`**

Replace lines 2-9 with:
```typescript
import casualPhoto from "@/assets/322f5fffb8a42f0aa6026c0c68a371379392491d.png";
import profileImage from "@/assets/3ad57231056fffeb711fad4301cd4d587aeecfeb.png";
import bankingProject from "@/assets/4fbffc1a4fb396420140dcda2109f43cd1a8686c.png";
import eGroceryProject from "@/assets/8f1cdc86c47eb107b1f81ddb72687c404863dcf8.png";
import financialProject from "@/assets/2c875fdc0701588c7acbaf11d3005df2226db81d.png";
import bookingProject from "@/assets/9545140fd42a129fed6468ba209257a83e39693c.png";
import consultingImage from "@/assets/79904796ceb66d79eadd2e02864b17eebfd4742b.png";
import musicProject from "@/assets/75b6326fe54814dec8be3c5881d3fb008505b23c.png";
```

- [ ] **Step 2: Replace imports in `src/app/AppVariant1.tsx`**

Same replacement — lines 2-9, change `figma:asset/` to `@/assets/`.

- [ ] **Step 3: Replace imports in `src/app/AppVariant2.tsx`**

Same replacement — lines 2-9.

- [ ] **Step 4: Replace imports in `src/app/AppVariant3.tsx`**

Same replacement — lines 2-9.

- [ ] **Step 5: Commit**

```bash
git add src/app/App.tsx src/app/AppVariant1.tsx src/app/AppVariant2.tsx src/app/AppVariant3.tsx
git commit -m "fix: replace figma:asset/ imports with standard @/assets/ paths"
```

---

### Task 2: Remove variant switcher from `App.tsx`

**Files:**
- Modify: `src/app/App.tsx:631-678`

The exported `App` component (lines 631-678) renders a variant switcher and dynamically picks between 4 theme components. Remove the switcher and export `AppOriginal` (the Cosmic Purple theme) directly.

- [ ] **Step 1: Remove variant imports and switcher component**

Delete lines 631-678 (the `import AppVariant1/2/3` statements and the entire `export default function App()`) and replace with a simple re-export of `AppOriginal`:

```typescript
export default AppOriginal;
```

This replaces everything from line 630 (`// Variant Switcher Component`) through line 678 (closing `}`). The `AppOriginal` function (lines 11-109) stays untouched and becomes the default export.

- [ ] **Step 2: Clean up unused import**

`App.tsx` line 1 imports `useState` which is still used by `AppOriginal` (for `scrollY` and `zoomedImage`). No change needed there.

However, `useEffect` is also still used. Both imports stay.

Verify: no dangling references to `AppVariant1`, `AppVariant2`, `AppVariant3`, `currentVariant`, or `variants` remain.

- [ ] **Step 3: Commit**

```bash
git add src/app/App.tsx
git commit -m "feat: remove variant switcher, ship Cosmic Purple theme only"
```

---

### Task 3: Configure Vite for GitHub Pages

**Files:**
- Modify: `vite.config.ts`

- [ ] **Step 1: Add `base` to Vite config**

Add `base: '/maria-portfolio/',` as the first property inside `defineConfig({`:

```typescript
export default defineConfig({
  base: '/maria-portfolio/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
```

- [ ] **Step 2: Commit**

```bash
git add vite.config.ts
git commit -m "build: set vite base path for GitHub Pages subpath deployment"
```

---

### Task 4: Add `.gitignore`, `public/.nojekyll`, and GitHub Actions workflow

**Files:**
- Create: `.gitignore`
- Create: `public/.nojekyll`
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create `.gitignore`**

```
node_modules
dist
*.local
```

- [ ] **Step 2: Create `public/.nojekyll`**

Empty file. Create `public/` directory first:

```bash
mkdir -p public
touch public/.nojekyll
```

- [ ] **Step 3: Create `.github/workflows/deploy.yml`**

```bash
mkdir -p .github/workflows
```

File contents:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 4: Commit**

```bash
git add .gitignore public/.nojekyll .github/workflows/deploy.yml
git commit -m "ci: add GitHub Actions workflow for Pages deployment"
```

---

### Task 5: Install dependencies, build, and verify locally

**Note:** `node_modules` does not exist yet and there is no `pnpm-lock.yaml`. Both must be generated before the GitHub Actions workflow can use `--frozen-lockfile`.

- [ ] **Step 1: Install pnpm if not available**

```bash
npm install -g pnpm
```

- [ ] **Step 2: Install dependencies**

```bash
pnpm install
```

This creates `node_modules/` and `pnpm-lock.yaml`.

- [ ] **Step 3: Run production build**

```bash
pnpm build
```

Expected: Build succeeds, `dist/` directory is created with `index.html` and asset files.

- [ ] **Step 4: Preview the build**

```bash
npx serve dist
```

Open the printed URL in a browser. Verify:
- All 8 project images load
- Profile photo and casual photo load
- Hash navigation (#projects, #about, #contact) works
- No variant switcher is visible
- No console errors

- [ ] **Step 5: Commit the lockfile**

```bash
git add pnpm-lock.yaml
git commit -m "chore: add pnpm lockfile"
```

---

### Task 6: Push to GitHub and enable Pages

These are manual steps performed by the user.

- [ ] **Step 1: Create the GitHub repository**

```bash
gh repo create JakubSzadziul/maria-portfolio --public --source=. --push
```

This creates the repo, sets the remote, and pushes all commits.

- [ ] **Step 2: Enable GitHub Pages**

Go to **Settings > Pages** in the GitHub repo. Under "Build and deployment", set Source to **GitHub Actions**.

- [ ] **Step 3: Verify deployment**

Check the **Actions** tab — the workflow should have triggered automatically from the push. Once the `deploy` job completes, visit:

```
https://JakubSzadziul.github.io/maria-portfolio/
```

Verify:
- All 8 project images load correctly
- Profile photo loads
- Hash-based navigation works
- No console errors related to asset paths or 404s
- No variant switcher visible
