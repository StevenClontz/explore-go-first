# explore-go-first

A static web app for exporing [Go First Dice](http://gofirstdice.ericharshbarger.org)
in your browser.

## Dice Assets

Assets in `static/dice` taken from WikiMedia and used under GNU Free Documentation License, Version 1.2.

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## Deploying

The workflow at `.github/workflows/pages.yml` automatically deploys
the latest changes of the main branch to GitHub Pages
when pushed to GitHub.
