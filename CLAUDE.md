# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository context

This directory (`e-tools/`) is one of four independent Angular CLI projects living under a parent folder with no root `package.json` or workspace config — each project has its own `package.json`, `angular.json`, `tsconfig*.json`, and git-ignored `node_modules`. Commands below assume you are already `cd`'d into `e-tools/`.

## Commands

- `npm start` — `ng serve`, dev server at `http://localhost:4200`
- `npm run build` — production build to `dist/e-tools`
- `npm run watch` — dev build with `--watch` (development configuration)
- `npm test` — unit tests, run via Vitest through the `@angular/build:unit-test` builder (configured in `angular.json`, no standalone `vitest.config.*`). There is no dedicated single-test script; use Vitest's own filtering (e.g. `npm test -- <pattern>` or `.only`) to scope a run.

No lint script/ESLint config and no e2e tests are set up in this project.

## Architecture

**Bootstrap & routing.** Standalone bootstrap via `app.config.ts` → `provideRouter(routes)` + `provideBrowserGlobalErrorListeners()` (zoneless — no `zone.js` dependency, so change detection relies on signals + `OnPush`, not implicit dirty-checking). `app.routes.ts` nests every tool under `/e-tools` as a lazy `loadComponent` child route, each carrying `data: { icon, classIcon, ariaLabelIcon }` metadata used for the sidemenu; unmatched paths redirect to the default tool (`/e-tools/salary-distributor`). **To add a new tool**: create a new top-level folder under `src/app/` (mirroring `salary-distributor/`'s shape — see below) and add a child route entry here with its own icon metadata.

**Path aliases** (`tsconfig.json`): `@shared/*` → `src/app/shared/*`, `@interfaces/*` → `src/app/interfaces/*`, `@routes/` → `src/app/app.routes.ts`. Use these instead of relative imports (`../../../shared/...`).

**Tool module shape.** `salary-distributor/` is the first (and currently only) tool and is the template to follow for new ones: self-contained under its own `components/`, `pages/`, `services/`, `types/`, `validators/`, `helpers/` — don't grow `shared/` or `interfaces/` with tool-specific code.
- `SalaryDistributorService` (`providedIn: 'root'`) holds a `showDistributionFlag` signal and a pure `calculateDistribution(salary, percentagesValues)` function mapping a percentages reactive form into per-category totals. State is signals-based throughout, not RxJS `Subject`s — follow this pattern for new tool state.
- Custom reactive-forms validators live under `validators/` (`custom-validators.ts`, `total-percentage.validator.ts`) rather than inlined in components.

**Shared app chrome** (`shared/components/`): `sidemenu`, `topbar`, `page-header` are reused across tools.
- `SidemenuComponent` builds its menu items directly from `app.routes.ts` at class-field init time (`flatMap`/`filter` over `routes`), coupling the sidemenu to the `Route` shape (hence the `!`/optional-chaining noise in the template). A refactor to extract this into `SidebarService` with an independent `MenuItem` model is planned — see `to-do.md` before touching this logic.
- `SidebarService` (`providedIn: 'root'`) holds `mobileOpened`, `collapsed`, `isMobile` signals plus toggle methods; mobile breakpoint is a hardcoded `window.innerWidth <= 768` check duplicated in both the service and `SidemenuComponent`'s resize handler.

**Formatting** is enforced via `prettier` config embedded in `package.json` (`printWidth: 100`, `singleQuote: true`, Angular parser for `.html`) — there is no `.prettierrc`.

**Known in-repo TODOs** (`to-do.md`, check before unrelated refactors in these areas):
- `shared/sidemenu`: extract menu-building logic to `SidebarService`, introduce an independent `MenuItem` model, remove `!` non-null assertions from the template via stronger typing.
- Routing: add per-route icon/background color metadata and propagate it to `PageHeaderComponent` automatically from route data.
- Open bug: signals reportedly behave differently on certain Android mobile devices (high priority, unresolved, no repro steps recorded yet).
