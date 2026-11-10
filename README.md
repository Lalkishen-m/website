# Lalkishen M — Portfolio Website

A responsive, accessible portfolio for Lalkishen M, inspired by the page structure of sheethal-km.netlify.app, but featuring an original visual design.

## Quick start

1. Unzip the folder.
2. Double-click `index.html` to open it in a browser. No build step, API key, or npm installation is needed.
3. For deployment, upload the **contents** of this folder to Netlify, or commit them to a GitHub Pages repository. `index.html` must be in the deployment root.

### GitHub Pages

- For a new repository, create one named `Lalkishen-m.github.io` to host at the root domain, or use any repository name for a project URL.
- Upload all files and the `assets/` directory, then go to **Settings → Pages → Deploy from a branch → main → /(root)**.
- If using an existing repository that already hosts a site, replace only the intended website files after backing them up.

### Netlify

- In Netlify, create a new site and drag the folder containing `index.html` onto the deploy area; or link a GitHub repository for auto-deploy.

## What to edit

- `index.html`: biography, achievements, social links, labels, role dates, and contact details.
- `script.js`: project case-study modal content and interactions.
- `styles.css`: design tokens, typography, layout, responsiveness, and dark mode.
- `assets/lalkishen-profile.jpg`: profile photo.
- `assets/Lalkishen_M_Resume.pdf`: downloadable résumé.

## What works

- Responsive navigation, theme toggle, project case-study dialogs, scroll reveal, active nav links, accessible project links, and mailto contact form.
- The contact form **does not submit to a server**. It opens a new message in the visitor's configured email app, containing the entered information.

## Before you publish

- Review the résumé PDF for personal details you want to make publicly accessible (it currently contains the phone number from your provided résumé).
- Check whether all role dates and metrics are still current.
- Confirm that all repository projects are public and ready for recruiters.
- Once deployed, update the structured-data `url` and `og:image` to your final live domain if desired.

This site is plain HTML, CSS, and JavaScript — no external API keys, no visitor analytics, and no framework/build process. Web fonts fall back to system fonts if unavailable.
