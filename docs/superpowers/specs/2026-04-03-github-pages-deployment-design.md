# GitHub Pages Deployment — Design Spec

## Context

This portfolio site was generated from Figma's Make tool and runs locally with Vite. It needs to be deployed to GitHub Pages at `JakubSzadziul.github.io/maria-portfolio/`. The site currently cannot build for production due to Figma-specific asset imports, has no deployment pipeline, and ships a variant switcher that should be removed for production.

## Scope

1. Fix asset imports so the site builds outside Figma's toolchain
2. Remove variant switcher, ship Cosmic Purple theme only
3. Configure Vite for GitHub Pages subpath
4. Add GitHub Actions CI/CD for automated deployment
5. Prepare repository for GitHub push

## Changes

### 1. Replace `figma:asset/` imports with standard imports

**Files:** `src/app/App.tsx`, `src/app/AppVariant1.tsx`, `src/app/AppVariant2.tsx`, `src/app/AppVariant3.tsx`

All 4 files import 8 images using Figma's custom protocol:
```typescript
// Before
import casualPhoto from "figma:asset/322f5fffb8a42f0aa6026c0c68a371379392491d.png";

// After
import casualPhoto from "@/assets/322f5fffb8a42f0aa6026c0c68a371379392491d.png";
```

The PNG files already exist in `src/assets/` with matching hash filenames. The `@` alias is configured in `vite.config.ts` to resolve to `./src`.

Full mapping (same in all 4 files):
| Variable | Hash |
|---|---|
| casualPhoto | 322f5fffb8a42f0aa6026c0c68a371379392491d |
| profileImage | 3ad57231056fffeb711fad4301cd4d587aeecfeb |
| bankingProject | 4fbffc1a4fb396420140dcda2109f43cd1a8686c |
| eGroceryProject | 8f1cdc86c47eb107b1f81ddb72687c404863dcf8 |
| financialProject | 2c875fdc0701588c7acbaf11d3005df2226db81d |
| bookingProject | 9545140fd42a129fed6468ba209257a83e39693c |
| consultingImage | 79904796ceb66d79eadd2e02864b17eebfd4742b |
| musicProject | 75b6326fe54814dec8be3c5881d3fb008505b23c |

### 2. Remove variant switcher from App.tsx

**File:** `src/app/App.tsx`

- Remove `useState` for variant selection
- Remove the floating variant switcher UI (the pill-shaped button group)
- Remove imports of `AppVariant1`, `AppVariant2`, `AppVariant3`
- Keep only the Cosmic Purple theme (variant 0), which is defined inline in `App.tsx`
- The `AppVariant1/2/3.tsx` files stay in the repo untouched (they just won't be imported)

### 3. Set Vite `base` path

**File:** `vite.config.ts`

Add `base: '/maria-portfolio/'` to the config:
```typescript
export default defineConfig({
  base: '/maria-portfolio/',
  plugins: [react(), tailwindcss()],
  // ...
})
```

Vite will prepend this path to all asset URLs in the production build. The `/src/main.tsx` script reference in `index.html` is handled by Vite's build transform and does not need manual changes.

### 4. Create GitHub Actions workflow

**File:** `.github/workflows/deploy.yml`

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

This uses GitHub's official Pages deployment (artifact-based, no `gh-pages` branch needed). Triggers on push to `main` and can be manually triggered via `workflow_dispatch`.

### 5. Add `.nojekyll` file

**File:** `public/.nojekyll` (empty file)

Create `public/` directory with an empty `.nojekyll` file. Vite copies `public/` contents to the build output root. This tells GitHub Pages to skip Jekyll processing, which would otherwise ignore files starting with `_`.

### 6. Repository setup (manual steps)

After code changes are committed:
1. Create repo on GitHub: `gh repo create JakubSzadziul/maria-portfolio --public --source=.`
2. Push to GitHub: `git push -u origin main`
3. In repo Settings > Pages, set Source to "GitHub Actions"
4. First deployment will trigger automatically from the push

## Out of scope

- Custom domain setup
- Image optimization / compression
- SEO improvements beyond what already exists
- Removing unused shadcn/ui components
- Updating placeholder contact info (email, links)

## Verification

1. Run `pnpm install && pnpm build` locally — confirm it succeeds and `dist/` is created
2. Preview the build: `npx serve dist` — open in browser, verify images load and navigation works
3. After pushing to GitHub, check the Actions tab for a successful deployment
4. Visit `https://JakubSzadziul.github.io/maria-portfolio/` and verify:
   - All 8 project images load
   - Profile photo loads
   - Hash-based navigation (#projects, #about, #contact) works
   - No variant switcher is visible
   - No console errors related to asset loading
