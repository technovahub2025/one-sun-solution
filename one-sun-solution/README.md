# One Sun Solution — React Frontend

A responsive single-page website inspired by the supplied One Sun Solution references.

## Requirements
Node.js 18+ and npm.

## Run locally
```bash
npm install
npm run dev
```
Open the local URL shown by Vite (usually http://localhost:5173).

## Production build
```bash
npm run build
npm run preview
```

## Section links
- `/#home` — Home
- `/#about` — About Us
- `/#solutions` — Solutions
- `/#results` — Success Stories
- `/#contact` — Contact
- `/#contact-form` — Consultation form

## Before production
- Replace externally hosted Unsplash photos with licensed brand photography.
- Replace sample phone/email/address with verified company contact details.
- Contact form currently opens the visitor's email client; connect a backend or form provider for direct submissions.
- Add verified client case studies and results before publishing numerical claims.
- Add a consultation booking service if calendar booking is required.

## Deployment
Vercel: import the project, use build command `npm run build` and output directory `dist`. The included `vercel.json` enables SPA routing.
