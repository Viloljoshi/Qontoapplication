# Qonto Due Diligence Product Artifact

A 5-minute executive brief and interactive product proposal for Qonto’s Senior Product Manager - Due Diligence role.

The site uses public Qonto and EU sources. Fictional case data, product concepts, metrics, rules, and screen layouts are marked as proposals. Prior-role results are labelled and never presented as Qonto estimates.

## Run Locally

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal.

## Verify

```bash
npm run lint
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

## Deploy

The included GitHub Pages workflow checks and deploys `main`. In the repository settings, choose **GitHub Actions** as the Pages source. The expected public URL is:

`https://viloljoshi.github.io/Qontoapplication/`

## Reading Modes

- Executive brief: the default 2-page reading path, with print styling
- Interactive deep dive: add `?view=deep-dive` or use the header switch
