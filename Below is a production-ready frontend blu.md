Below is a production-ready frontend blueprint for **SkillSure Phase 1**, based on the uploaded PRD v4 and locked question schema, with earlier cover notes treated as background only where they do not conflict with the latest spec. The key scope changes in v4 are decisive: **no payments**, **no PDF in Phase 1**, **no section timers**, **40-question continuous flow**, **4 operational question types in scope**, and **text-to-speech on question screens**.  

---

# 1. Product understanding

## Core purpose

SkillSure is a desktop-first online assessment platform for accountants working in Indian SMEs. Candidates register via phone or email OTP, complete a 75-minute assessment, and view an immediate score screen. Employers log into a separate dashboard to view results for consenting candidates from their company. Admin manages questions, employers, candidates, and integrity flags. 

## Primary user groups

**Candidate**

* Registers with OTP
* Receives a SkillSure ID immediately after OTP verification
* Completes profile and industry mapping
* Takes a locked-browser assessment
* Sees instant results and receives a score link by email 

**Employer**

* Uses separate email/password login
* Sees candidate results only when candidate listed that employer and gave consent
* Can filter/export candidate performance and review integrity flags
* Sees cohort analytics once enough candidates have completed 

**Admin**

* Internal-only access
* Uploads and validates question bank JSON
* Manages employer accounts
* Reviews candidate records and flags
* Can manually override scores with audit logging 

## Main feature set

* OTP-based candidate authentication
* SkillSure ID generation
* Candidate profiling + industry selection
* Lockdown assessment shell
* 4 question types in Phase 1 delivery engine: `mcq`, `sjt`, `chain_parent/chain_child`, `data`
* TTS for question stem in English, Hindi, Gujarati
* Server-side scoring across 9 competency dimensions
* Score screen with percentile placeholder logic and dimension chart
* Employer dashboard with filters, CSV export, integrity visibility
* Admin panel with schema validation and flags log  

## Important scope clarification

The older cover notes mention two payments, PDF unlock flow, section timers, and 5 question types. The latest PRD v4 explicitly supersedes that by removing payment logic, moving PDF to Stage 2, removing section timers, and defining Phase 1 around a continuous assessment flow. Use **PRD v4 as source of truth** for the frontend build.   

---

# 2. Frontend architecture

## Recommended stack

**Framework**

* **Next.js 15 App Router + React + TypeScript**
* Reason: route segmentation, SSR/CSR flexibility, strong forms ecosystem, easy auth layout separation, and production-readiness for candidate/employer/admin apps

**Styling**

* **Tailwind CSS**
* **shadcn/ui** for accessible primitives
* Reason: fast implementation, design consistency, easy theming, and scalable component composition

**State**

* **Zustand** for session/UI state
* **TanStack Query** for server state, caching, retries, invalidation
* Reason: clean separation between local interaction state and remote data

**Forms**

* **React Hook Form + Zod**
* Reason: schema-based validation, type-safe forms, good performance

**Charts**

* **Chart.js** for score bars and cohort charts, aligning with PRD score screen requirement for browser-rendered charts 

**Tables**

* **TanStack Table**
* Reason: sorting, filtering, export-friendly structure, reusable across employer and admin

**Auth/session**

* Candidate session: OTP + assessment session token/JWT from backend
* Employer/admin: cookie-based auth session preferred for dashboard security
* Frontend should never derive scoring locally; all score reads come from backend. 

## Application shape

I would structure this as **one monorepo, three route groups**, not three separate repos:

* `(public)` for candidate acquisition/auth/profile/assessment/results
* `(employer)` for employer dashboard
* `(admin)` for internal management

This keeps shared design system, validation helpers, API clients, charts, and table components reusable.

## Route map

```txt
/
├── /candidate
│   ├── /auth
│   │   ├── /start
│   │   ├── /verify
│   │   └── /success
│   ├── /profile
│   ├── /industry
│   ├── /instructions
│   ├── /assessment
│   ├── /assessment/complete
│   └── /results/[assessmentId or signedToken]
│
├── /employer
│   ├── /login
│   ├── /forgot-password
│   ├── /reset-password
│   ├── /dashboard
│   ├── /dashboard/candidates
│   ├── /dashboard/candidates/[candidateId]
│   └── /dashboard/analytics
│
├── /admin
│   ├── /login
│   ├── /dashboard
│   ├── /candidates
│   ├── /candidates/[candidateId]
│   ├── /questions
│   ├── /questions/upload
│   ├── /questions/[questionId]
│   ├── /employers
│   ├── /employers/[employerId]
│   ├── /flags
│   └── /audit-log
│
└── /403 /404 /500
```

## Folder structure

```txt
src/
  app/
    (public)/
    (employer)/
    (admin)/
    api-proxy/                  # optional server actions / route handlers
  components/
    ui/
    layout/
    auth/
    candidate/
    assessment/
    results/
    employer/
    admin/
    charts/
    tables/
    feedback/
  features/
    auth/
    candidate-profile/
    industry-profiling/
    assessment-engine/
    scoring-view/
    employer-dashboard/
    admin-question-bank/
    flags/
  hooks/
    useCountdown.ts
    useFullscreenGuard.ts
    useVisibilityGuard.ts
    useSpeechSynthesis.ts
    useAssessmentSession.ts
    useQueryParams.ts
  lib/
    api/
      client.ts
      endpoints.ts
      types.ts
    auth/
    constants/
    formatters/
    validators/
    permissions/
  store/
    auth.store.ts
    assessment.store.ts
    ui.store.ts
  schemas/
    auth.schemas.ts
    candidate.schemas.ts
    employer.schemas.ts
    question-upload.schemas.ts
  styles/
  assets/
  config/
    navigation.ts
    env.ts
    chart-config.ts
```

---

# 3. Information architecture and page-level breakdown

# Candidate app

## 3.1 Candidate auth start

### Purpose

Collect phone or email to initiate OTP flow. PRD allows phone or email OTP entry at start. 

### UI sections

* Branding header
* Intro/value proposition
* OTP entry mode selector: phone or email
* Input form
* CTA button
* Support/help note

### Components

* `BrandHeader`
* `AuthMethodTabs`
* `OtpStartForm`
* `InputField`
* `PrimaryButton`
* `InlineAlert`

### User interactions

* Select phone or email
* Enter contact detail
* Submit to receive OTP
* Error handling for invalid input / rate limit

### Data required

* OTP provider status
* field validation rules
* optional campaign/referrer context

---

## 3.2 OTP verify

### Purpose

Verify OTP and establish candidate session. On success, SkillSure ID is generated and shown before profile step. 

### UI sections

* Progress indicator
* OTP form
* Resend block
* Timer / resend availability
* Security info

### Components

* `OtpVerifyForm`
* `OtpDigitInput`
* `ResendOtpButton`
* `SessionStatusCard`

### Interactions

* Enter OTP
* Resend OTP
* Handle expired OTP
* Success redirect

### Data required

* masked phone/email
* resend cooldown
* verification result
* generated `skillsure_id`

---

## 3.3 OTP success / SkillSure ID screen

### Purpose

Display SkillSure ID prominently before moving to profile form, matching PRD requirement. 

### UI sections

* Success state
* SkillSure ID card
* Instructional text
* Continue CTA

### Components

* `SuccessIllustration`
* `SkillSureIdCard`
* `ContinueButton`

### Data required

* candidate first identifier
* `SS-YYYY-NNNNN` id

---

## 3.4 Candidate profile

### Purpose

Capture candidate profile required by data model and flow: name, city, experience, qualification, role, software, employer name, consent. 

### UI sections

* Stepper/progress
* Personal details
* Professional profile
* Employer section
* Consent section
* Save and continue CTA

### Components

* `CandidateProfileForm`
* `SelectField`
* `ConsentCheckbox`
* `FieldGroup`

### Interactions

* Fill and validate profile
* Employer name optional
* Consent required if employer visibility is intended
* Autosave draft locally until submit

### Data required

* form enum options for role/software/qualification
* candidate identity from session

---

## 3.5 Industry profiling

### Purpose

Collect sector and subtype, assign internal financial profile A–F or fallback mapping for “Other.” This directly determines question pool eligibility. 

### UI sections

* Instructions
* Level 1 sector chip selector
* Level 2 subtype list with accounting subtitles
* “Other” fallback text field
* Fallback profile cards for “Other”
* Continue CTA

### Components

* `SectorChipGroup`
* `SubtypeRadioCards`
* `OtherIndustryTextarea`
* `FallbackProfileCards`
* `IndustrySummaryFooter`

### Interactions

* Choose L1
* Reveal L2 dynamically
* For “Other,” enter custom description and choose closest profile card
* Persist selection

### Data required

* complete sector/subtype mapping matrix from PRD
* fallback profile card copy
* internal profile assignment result 

---

## 3.6 Pre-assessment instructions

### Purpose

Prepare candidate for locked-browser experience and explain rules before begin. 

### UI sections

* Device/browser requirements
* Lockdown rules summary
* TTS availability note
* Estimated assessment duration
* Begin button

### Components

* `InstructionsChecklist`
* `BrowserCompatibilityNote`
* `AssessmentRulesPanel`
* `BeginAssessmentButton`

### Interactions

* Accept readiness
* Trigger fullscreen request
* Create/start assessment session

### Data required

* browser compatibility flags
* session start endpoint
* user consent state

---

## 3.7 Assessment shell

### Purpose

Run the continuous 40-question assessment with lockdown controls, question rendering, answer submission, and branch handling. Questions are one-at-a-time, no sections, chain children excluded from random pool and only delivered from parent consequence map.  

### UI sections

* Top assessment header
* Progress indicator
* Active question area
* Persistent exhibit/context area when relevant
* Action footer
* Global warning modal overlay
* TTS controls

### Core sub-layout

```txt
AssessmentShell
  ├── AssessmentHeader
  │   ├── Logo
  │   ├── ProgressMeta
  │   └── SessionStatus
  ├── LockdownBoundary
  ├── QuestionViewport
  │   ├── ContextBanner (chain child)
  │   ├── ExhibitPanel (data question)
  │   ├── QuestionStem
  │   ├── TTSControlBar
  │   └── AnswerInputRenderer
  ├── QuestionMetaFooter
  │   ├── MinTimeIndicator (hidden logic, no visible countdown)
  │   └── NavigationActions
  └── ViolationModal
```

### Components

* `AssessmentShell`
* `AssessmentHeader`
* `ProgressBar`
* `QuestionRenderer`
* `McqQuestion`
* `SjtQuestion`
* `ChainParentQuestion`
* `ChainChildQuestion`
* `DataQuestion`
* `ExhibitPanel`
* `ContextBanner`
* `QuestionOptionsList`
* `TTSControlBar`
* `SubmitAnswerButton`
* `ViolationModal`
* `FullscreenReentryPrompt`

### Interactions

* Load next question from backend
* Submit answer only after min-time unlock
* For SJT: choose one MOST and one LEAST, never same option
* For chain parent: answer locks, next served child depends on `consequence_map`
* For chain child: persistent context banner above stem
* For data: exhibit remains on screen while answering
* TTS: play/stop stem only, language switch resets playback
* Lockdown: intercept blur, visibility change, fullscreen exit, shortcut attempts, context menu, back/forward
* Session recovery on refresh if backend supports active token continuation

### Data required

* assessment session token/JWT
* current question payload
* elapsed time metadata
* violation count
* question number / total served
* branch result for chain
* submission status

---

## 3.8 Assessment complete

### Purpose

A simple transition state after final answer while backend computes scores and sends email. Score computation is server-side only. 

### UI sections

* Completion confirmation
* Processing state
* Auto-redirect to results

### Components

* `CompletionLoader`
* `StatusMessageCard`

### Data required

* assessment completion confirmation
* result URL token

---

## 3.9 Candidate results page

### Purpose

Show immediate score screen with overall score, band, percentile message/placeholder, dimension bar chart, SkillSure ID, and future report note. PRD explicitly says no PDF in Phase 1. 

### UI sections

* Logo / header
* Candidate identity block
* Overall score hero
* Percentile statement
* Dimension score chart
* Band explanations
* Share/remember SkillSure ID instruction
* “Full report later” message

### Components

* `ResultsHero`
* `ScoreBadge`
* `PercentileMessage`
* `DimensionBarChart`
* `DimensionBandList`
* `SkillSureIdPanel`
* `EmptyReportPlaceholder`

### Interactions

* View dimension breakdown
* Copy SkillSure ID
* Open from signed email link

### Data required

* candidate name
* SkillSure ID
* overall score + band
* percentile or placeholder
* 9 dimension scores and labels 

---

# Employer app

## 3.10 Employer login

### Purpose

Secure employer access via email/password. Employers cannot self-register; accounts are admin-created. 

### UI sections

* Login form
* Forgot password link
* Support note

### Components

* `EmployerLoginForm`
* `PasswordField`
* `AuthCard`

---

## 3.11 Forgot/reset password

### Purpose

Email reset workflow for employers. 

### Components

* `ForgotPasswordForm`
* `ResetPasswordForm`
* `SuccessNotice`

---

## 3.12 Employer dashboard overview

### Purpose

High-level landing page with KPI cards and quick access to candidate table and analytics.

### UI sections

* KPI cards
* recent candidates
* top weaknesses preview
* integrity alerts summary

### Components

* `DashboardStatCard`
* `RecentCandidatesTable`
* `WeaknessSummaryCard`
* `IntegritySummaryCard`

### Data required

* total visible candidates
* average score
* band distribution preview
* flags summary

---

## 3.13 Employer candidates table

### Purpose

Main operational view for reviewing candidate results. Shows name, SkillSure ID, date assessed, score, percentile, band, weakest area, integrity count, report placeholder. Filters and CSV export required. 

### UI sections

* Filter toolbar
* Data table
* CSV export
* Empty state
* Pagination

### Components

* `CandidateFilters`
* `CandidateResultsTable`
* `IntegrityPill`
* `BandBadge`
* `ExportCsvButton`
* `TableEmptyState`

### Interactions

* Filter by date range, band, score threshold
* Sort by score/date
* Open candidate detail
* Export current dataset

### Data required

* paginated candidate records
* filter option values
* CSV endpoint / client-side export payload

---

## 3.14 Employer candidate detail

### Purpose

Detailed review of one candidate’s scores, weakest areas, integrity incidents, and result summary.

### UI sections

* Candidate summary
* Overall and dimension breakdown
* Integrity timeline/log
* Report action placeholder

### Components

* `CandidateSummaryCard`
* `DimensionBreakdownChart`
* `IntegrityTimeline`
* `ReportActionPlaceholder`

### Data required

* assessment summary
* dimension scores
* flag events
* consent-linked employer visibility confirmation

---

## 3.15 Employer analytics

### Purpose

Cohort analytics available only when at least 5 candidates are completed. Shows average score per dimension, band distribution, and top 3 weakest dimensions. 

### UI sections

* gating notice when insufficient candidates
* average dimension chart
* band donut
* weaknesses list

### Components

* `AnalyticsGateNotice`
* `AverageDimensionChart`
* `BandDistributionChart`
* `WeakDimensionsCard`

### Data required

* cohort size
* aggregated score statistics
* dimension ranking

---

# Admin app

## 3.16 Admin login

### Purpose

Internal access for SkillSure operator.

### Components

* `AdminLoginForm`
* `AuthCard`

---

## 3.17 Admin dashboard

### Purpose

Operational snapshot across candidates, uploads, employers, and flags.

### UI sections

* candidate count
* active questions count
* upload health
* flags summary
* recent admin actions

---

## 3.18 Admin candidates table

### Purpose

Searchable full candidate list with score, status, flags, employer, and manual override capability with required reason and audit log. 

### Components

* `AdminCandidatesTable`
* `CandidateSearchBar`
* `OverrideScoreDialog`
* `AuditReasonField`

### Interactions

* search by name, phone, SkillSure ID
* open detail
* override score with mandatory rationale

---

## 3.19 Admin question bank list

### Purpose

Manage uploaded questions: filter, inspect, soft deactivate/reactivate. No hardcoded questions allowed. 

### UI sections

* filter bar
* question table
* status controls
* question detail drawer

### Components

* `QuestionBankTable`
* `QuestionTypeBadge`
* `ProfileTagList`
* `DifficultyBadge`
* `QuestionStatusToggle`

---

## 3.20 Admin question upload

### Purpose

Upload JSON array of questions, validate against locked schema, reject with rule-specific errors.  

### UI sections

* upload zone
* validation status
* error list
* success summary

### Components

* `JsonUploadDropzone`
* `ValidationResultPanel`
* `ValidationErrorTable`
* `UploadSummaryCard`

### Interactions

* drag/drop file
* preview validation errors
* retry upload
* successful ingest feedback

### Data required

* validation response with exact failed rule, field, and item

---

## 3.21 Admin employer management

### Purpose

Create/edit employer accounts and review associated candidates. Employers cannot self-register. 

### Components

* `EmployerTable`
* `CreateEmployerDialog`
* `ResetPasswordDialog`
* `EmployerCandidateList`

---

## 3.22 Admin flags log

### Purpose

Central visibility into all integrity flags with filters by type and date. 

### Components

* `FlagsTable`
* `FlagTypeFilter`
* `DateRangePicker`

---

## 3.23 Admin audit log

### Purpose

Operational transparency for overrides, question actions, and account edits.

---

# 4. Component architecture

## Global component hierarchy

```txt
AppShell
  ├── RouteGuard
  ├── Sidebar / Header
  ├── MainContent
  └── GlobalFeedbackLayer
       ├── ToastProvider
       ├── ConfirmDialog
       └── ErrorBoundary
```

## Assessment engine component hierarchy

```txt
AssessmentShell
  ├── AssessmentHeader
  │   ├── Logo
  │   ├── ProgressBar
  │   └── ConnectionStatus
  ├── LockdownBoundary
  │   ├── useVisibilityGuard
  │   ├── useFullscreenGuard
  │   ├── useShortcutBlocker
  │   └── ViolationModal
  ├── QuestionViewport
  │   ├── ContextBanner
  │   ├── ExhibitPanel
  │   ├── QuestionStem
  │   ├── TTSControlBar
  │   └── QuestionRenderer
  │        ├── McqQuestion
  │        ├── SjtQuestion
  │        ├── ChainQuestion
  │        └── DataQuestion
  └── QuestionActions
       ├── SaveStatus
       └── SubmitAnswerButton
```

## Reusable component definitions

### `QuestionRenderer`

**Props**

* `question: QuestionDTO`
* `answerState: AnswerState`
* `disabled: boolean`
* `onChange(answer)`
* `onSubmit()`

**Responsibility**

* Switches by `type`
* Composes correct question input widget
* Keeps rendering logic isolated from session logic

### `McqQuestion`

**Props**

* `stem`
* `options`
* `maxSelections`
* `shuffle`

**Responsibility**

* Single/multi-select inputs
* Enforce selection limits on UI
* Emit selected option ids only

### `SjtQuestion`

**Props**

* `stem`
* `options`
* `mostSelection`
* `leastSelection`

**Responsibility**

* Dual-choice interaction
* Prevent same option for most and least
* Clear visual affordances

### `ChainChildQuestion`

**Props**

* `contextBanner`
* `stem`
* `options`

**Responsibility**

* Persistent consequence context above stem
* Same answer mechanics as MCQ

### `DataQuestion`

**Props**

* `exhibit`
* `stem`
* `options`

**Responsibility**

* Render table/image exhibit beside or above question
* Keep exhibit sticky where possible on desktop

### `TTSControlBar`

**Props**

* `text`
* `languages`
* `isPlaying`
* `onPlay`
* `onStop`
* `onLanguageChange`

**Responsibility**

* Web Speech API controls for question stem only
* Match PRD language options and stop behavior 

### `ViolationModal`

**Props**

* `strikeCount`
* `onReturn()`

**Responsibility**

* Display exact tab-switch warning pattern
* Block interaction until dismissal
* Resume assessment after confirmation 

### `CandidateResultsTable`

**Props**

* `rows`
* `filters`
* `onFilterChange`
* `onExport`
* `onRowClick`

**Responsibility**

* Shared table base for employer/admin variants

---

# 5. UI/UX system

## Design direction

This product should feel:

* trustworthy
* assessment-focused
* distraction-free
* serious but not intimidating

Candidate flows need calm clarity. Employer/admin views need density and efficiency.

## Layout principles

**Candidate**

* centered content
* generous whitespace
* strong progress cues
* minimal side navigation
* one dominant CTA per screen

**Employer/Admin**

* app-shell layout
* left sidebar + top action bar
* dense but readable tables
* persistent filters
* export/action affordances

## Typography

Recommended type pairing:

* **Inter** for UI/body
* **Manrope** or **Inter Tight** for headings

Suggested scale:

* Hero: 36–48
* H1: 30–36
* H2: 24–28
* H3: 18–22
* Body: 14–16
* Caption: 12–13

## Spacing

Use 8px spacing system:

* 4, 8, 12, 16, 24, 32, 40, 48, 64

## Color system

Since brand assets will be provided by SkillSure, build a token-based theme:

* `--color-primary`
* `--color-primary-foreground`
* `--color-surface`
* `--color-border`
* `--color-success`
* `--color-warning`
* `--color-danger`
* `--color-info`

UX guidance:

* integrity warnings: red
* score success states: green/teal
* neutral dashboards: slate/gray
* assessment active focus: blue/brand primary

## Responsiveness

PRD says:

* assessment: desktop only
* dashboard: desktop + mobile responsive
* admin: desktop only 

So:

* hard-block assessment on mobile/tablet with device eligibility screen
* employer dashboard should collapse to cards/stacked filters under tablet widths
* admin can be responsive enough for laptop sizes, but no need to optimize for mobile

## Accessibility

* semantic headings and landmarks
* keyboard-visible focus states
* ARIA labels for MOST/LEAST controls
* color is not sole indicator for score/band
* contrast at WCAG AA minimum
* modals trap focus
* table actions accessible by keyboard
* TTS controls accessible and announced
* do not rely only on fullscreen warnings visually; include text status too

---

# 6. Data and integration blueprint

## Frontend data strategy

Use **TanStack Query** with feature-based API services.

```txt
lib/api/
  auth.api.ts
  candidate.api.ts
  assessment.api.ts
  results.api.ts
  employer.api.ts
  admin.api.ts
  questions.api.ts
  flags.api.ts
```

## Candidate-facing API contract suggestions

### Auth

* `POST /candidate/auth/request-otp`
* `POST /candidate/auth/verify-otp`
* `GET /candidate/me`

### Profile

* `POST /candidate/profile`
* `POST /candidate/industry-profile`

### Assessment

* `POST /assessments/start`
* `GET /assessments/current`
* `GET /assessments/current/question`
* `POST /assessments/current/answer`
* `POST /assessments/current/flag`
* `POST /assessments/current/heartbeat`
* `POST /assessments/current/complete`

### Results

* `GET /results/:assessmentId`
* `GET /results/signed/:token`

## Employer API

* `POST /employer/auth/login`
* `POST /employer/auth/forgot-password`
* `POST /employer/auth/reset-password`
* `GET /employer/dashboard/summary`
* `GET /employer/candidates`
* `GET /employer/candidates/:candidateId`
* `GET /employer/analytics`
* `GET /employer/candidates/export`

## Admin API

* `POST /admin/auth/login`
* `GET /admin/dashboard`
* `GET /admin/candidates`
* `PATCH /admin/candidates/:id/override-score`
* `GET /admin/questions`
* `POST /admin/questions/upload`
* `PATCH /admin/questions/:id/status`
* `GET /admin/employers`
* `POST /admin/employers`
* `PATCH /admin/employers/:id`
* `POST /admin/employers/:id/reset-password`
* `GET /admin/flags`
* `GET /admin/audit-log`

## Question DTO shape

The frontend question type system should mirror the locked schema and use discriminated unions.

```ts
type Question =
  | McqQuestion
  | SjtQuestion
  | ChainParentQuestion
  | ChainChildQuestion
  | DataQuestion;
```

Important frontend rules derived from schema:

* `chain_child` never appears in general pool UI logic, only in next-question response after parent submission
* SJT options must include MOST/LEAST metadata flags in payload, though frontend should not expose correctness
* data exhibits may be `table` or `image`, but PRD notes image support can be deferred if not in Phase 1 upload set. Design the component now so later support is additive. 

---

# 7. Loading, error, and empty states

## Candidate flow

* OTP sending: inline loading + disabled submit
* OTP fail: field-level + retry
* Industry load fail: recoverable alert
* Assessment question fetch fail: full-screen reconnect state
* Submission fail: optimistic lock, retry banner, prevent duplicate submits
* Results fetch fail: signed-link expired / unauthorized state

## Employer/admin

* Tables: skeleton rows on load
* Empty candidate table: “No candidates match your filters”
* Analytics under threshold: explanatory placeholder instead of blank chart
* Question upload validation failure: grouped by row/question_id/rule id
* Flags log empty: neutral empty state

---

# 8. User journey and navigation flow

## Candidate journey

1. Candidate opens invite or landing page
2. Enters phone/email
3. Verifies OTP
4. Sees generated SkillSure ID
5. Completes profile
6. Selects industry
7. Reads instructions
8. Begins assessment and enters fullscreen
9. Completes 40-question continuous flow
10. Backend computes results
11. Candidate sees score screen
12. Candidate later accesses score screen again via email link 

## Employer journey

1. Employer logs in
2. Lands on dashboard summary
3. Reviews candidate table
4. Applies filters/export
5. Opens candidate detail
6. Visits analytics once enough cohort data exists 

## Admin journey

1. Admin logs in
2. Uploads question bank JSON
3. Resolves validation issues if any
4. Activates/deactivates questions
5. Creates employer accounts
6. Reviews candidates and flags
7. Uses audit-backed override only when needed  

---

# 9. Assessment engine frontend design

## Why this matters

This is the most sensitive part of the frontend. It must be highly controlled, predictable, and resilient, while still remaining usable.

## Client responsibilities

The client should handle:

* rendering question types
* input capture
* fullscreen request/re-entry
* tab/visibility event detection
* shortcut/contextmenu blocking
* local answer draft state for current question
* TTS controls
* visual progress and warning states

## Server responsibilities

The server should handle:

* session issuance and concurrency enforcement
* question selection
* branch consequence resolution
* min-time validation
* scoring
* percentile computation
* integrity log persistence 

## Question rendering logic

Use one `QuestionRenderer` with a type switch:

* `mcq`: radio or checkbox group
* `sjt`: dual-choice matrix with “Most effective” and “Least effective”
* `chain_parent`: same as single-select MCQ, but submit endpoint returns child or next random item
* `chain_child`: standard render with context banner
* `data`: split-pane layout with sticky exhibit

## Progress model

Avoid giving away exact adaptive logic or detailed section structure. Since PRD says continuous 40-question flow, show:

* “Question X of Y served”
* subtle progress bar
* no visible min-time countdown

## Lockdown UX model

Do not over-punish or panic the user:

* modal should pause interaction and explain clearly
* strike count language should match PRD pattern
* assessment is never force-terminated for tab switching; it is logged for employer visibility instead 

---

# 10. State management plan

## Zustand slices

### `auth.store`

* user role
* auth status
* candidate/employer/admin identity
* session expiry
* logout actions

### `assessment.store`

* assessment id
* current question
* question index
* local answer state
* current strike count
* fullscreen state
* TTS language
* submit status

### `ui.store`

* global toasts
* modal visibility
* table preferences
* sidebar collapsed state

## TanStack Query responsibilities

* fetch session user
* fetch current question
* mutate answer submit
* fetch results
* fetch employer/admin tables
* invalidation after uploads/edits

---

# 11. Scalability and maintainability

## Code organization principles

* feature-first folders for business logic
* shared primitives only in `components/ui`
* route-level data fetching close to route
* DTO types generated or centrally maintained
* no backend business logic duplicated in client

## Performance optimizations

* code split employer/admin sections
* lazy-load Chart.js on result/dashboard pages
* memoize table columns
* virtualize large admin tables if needed
* prefetch next candidate/employer pages on hover
* keep assessment shell minimal; no unnecessary rerenders

## Reliability improvements

* heartbeat to backend during assessment
* reconnect strategy for transient network drops
* idempotent answer submission
* stale session detection with user-friendly recovery

## Security-conscious frontend practices

* no PII in URLs, matching PRD guidance
* signed result links expire client-side gracefully
* use httpOnly cookies for employer/admin where possible
* avoid storing sensitive tokens in localStorage for dashboard roles 

---

# 12. Best-practice implementation notes

## A. Treat schema as a locked frontend contract

The frontend type system should align exactly with schema v1.0. Create a shared `QuestionSchemaDTO` and do not invent alternate shapes. That prevents integration drift. 

## B. Build assessment engine against sample JSON early

Since SkillSure provides real sample questions during development, create a local mock adapter so UI can be tested before backend is complete. Earlier cover notes and PRD both emphasize parallel question-bank development and integration risk.  

## C. Design results UI for Stage 2 extension

Even though PDF is out of scope now, shape the results page with a reserved report module so Stage 2 can add download/report history without redesign. 

## D. Make employer/admin tables share a common table system

The candidate table, admin candidates list, flags log, and question list all benefit from one reusable table foundation.

---

# 13. Suggested frontend milestones

## Phase 1

* Design system, app shell, auth primitives
* Candidate auth/profile/industry
* Employer/admin auth shell

## Phase 2

* Assessment engine shell
* MCQ, SJT, chain child/parent rendering
* Lockdown controls
* TTS controls

## Phase 3

* Results screen
* Employer dashboard tables and analytics
* CSV export

## Phase 4

* Admin question upload/validation UI
* Employer management
* Flags log
* polish, QA, accessibility

---

# 14. Final architecture summary

## Recommended blueprint

* **Next.js + TypeScript + Tailwind + shadcn/ui**
* **Zustand for client workflow state**
* **TanStack Query for server state**
* **React Hook Form + Zod for forms**
* **Chart.js for score/analytics charts**
* **TanStack Table for dashboard/admin data grids**

## Frontend priorities

1. Nail the assessment shell
2. Keep schema fidelity exact
3. Separate candidate vs employer/admin experiences cleanly
4. Treat all score logic as server-owned
5. Build reusable tables, charts, and filters for long-term maintainability

## Non-negotiable frontend assumptions based on source docs

* no hardcoded question content
* no frontend scoring
* no random serving of chain children
* no payment UI in Phase 1
* no PDF UI beyond placeholder
* employer account creation is admin-only  

If you want, I can turn this next into a **screen-by-screen wireframe spec** or a **developer handoff document with exact component props and TypeScript interfaces**.
