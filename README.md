# Extra Time — Aayush Tiwari

An interactive portfolio built with Next.js, React, TypeScript, Framer Motion, and Three.js.

## Run locally

```powershell
cd "C:\Users\Aayush Tiwari\Desktop\Extra Time"
npm install
npm run dev
```

Open http://localhost:3000. Existing dependencies are already installed on this computer.

Production: `npm run build`, then `npm start`. Checks: `npx tsc --noEmit` and `npm run lint`.

## Structure

- `src/components/ExperienceShell.tsx`: persistent environment and route transitions.
- `src/components/FlowField.tsx`: code-generated abstract flow field, cursor response, low-resolution mobile rendering, reduced-motion/static fallback, and cleanup.
- `src/components/StadiumEntrance.tsx`: landing page with previews of the three actual projects. The filename is retained for the existing route.
- `src/components/ExtraTimeExperience.tsx`: engineer, selected work, halftime, contact, dialogs, discoveries, and trophy persistence.
- `src/components/MatchGames.tsx`: preserved algorithm, bug hunt, and system puzzle logic.
- `src/components/portfolio.ts`: shared portfolio facts and discovery/trophy definitions.
- `src/app/globals.css` and `src/app/experience.css`: reset, self-hosted typography, responsive layout, and interaction styles.
- `public/resume.pdf`: supplied updated résumé.

Direct routes: `/`, `/arena#first-half`, `/arena#second-half`, `/arena#hiphophub`, `/arena#waymark`, `/arena#pact`, `/arena#halftime`, `/arena#full-time`.

Janadesh and SWAT Coin are excluded. Pact is explicitly described as a Phase 1 foundation with payment execution disabled. The site uses no remote font requests. Trophy storage is optional and handled defensively. Contact links open the user's email app; there is no submission service.

The previous `programme.css` and `StadiumScene.tsx` are no longer imported. Source backups were saved outside this project before replacement.
