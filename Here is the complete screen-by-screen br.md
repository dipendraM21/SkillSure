Here is the complete screen-by-screen breakdown based on the SkillSure Project Requirements Document (PRD), formatted as a single Markdown guide that you can hand over to your Figma designer. 

Please note that based on the latest specifications (Phase 1 / v4), **candidate payments and PDF report generation have been completely removed**, so your designer does not need to design payment gateways or PDF layouts for this phase.

***

```markdown
# SkillSure UI/UX Design Brief — Complete Screen Inventory

SkillSure is an online assessment platform for accountants at Indian SMEs. There are three distinct user journeys requiring UI screens: **Candidates** (taking the free test), **Employers** (viewing staff results), and **Admin** (internal management).

## 1. Candidate Journey Screens
*Note: The candidate experience is completely free. Do not design any payment screens.*

### 1.1 Candidate Registration & Authentication
* **Screen Name:** Registration Page
* **Elements:** Input fields for phone number or email to trigger an OTP.

### 1.2 OTP Success & ID Screen
* **Screen Name:** OTP Verification Success
* **Elements:** A prominent display showing the candidate's newly generated **SkillSure ID** (Format: SS-YYYY-NNNNN).
* **Rules:** This ID must be shown to the candidate immediately upon successful OTP verification, before they proceed to the profile form.

### 1.3 Candidate Profile Form
* **Screen Name:** Profile Details
* **Elements:** Input fields for Name, City, Years of experience, Qualification, Role type, Software used, and Employer name.
* **Rules:** Must include a mandatory consent checkbox confirming the candidate agrees to let their employer see their results.

### 1.4 Industry Profiling (Two-Step Flow)
* **Screen Name:** Sector Selection (Level 1)
* **Elements:** 8 industry sector options displayed as selectable chips (Manufacturing, Trading, Services, Construction, Healthcare, Hospitality, Financial Services, Other).
* **Screen Name:** Sub-type Selection (Level 2)
* **Elements:** Appears dynamically after a Level 1 chip is selected. Displayed as a radio list where each option has a primary label and a one-line "accounting character" subtitle. 
* **Fallback Rule:** If the user selects "Other" in Level 1, the UI must show a free-text field ("Describe your industry") alongside 6 fallback profile cards described in plain language.

### 1.5 Assessment Interface (The Test Engine)
* **Screen Name:** Question Delivery Engine
* **Rules:** Runs in a locked, fullscreen browser. There are no section breaks and no visible countdown timers for the overall sections. A "Submit" button remains disabled until a silent, hidden minimum time-per-question has elapsed. 
* **Elements:**
  * **Question area:** Displays the question stem and options (Single/Multi-select MCQs, Situational Judgement choices, or branching Chain Scenarios).
  * **Text-to-Speech (TTS) Button:** Features a button labeled "Listen" (when inactive) and "Stop" (when active). Must include a language selector dropdown for English, Hindi, and Gujarati.
  * **Data Exhibits:** For "Data" questions, the screen must display a persistent financial exhibit (either an HTML table or an image) alongside the question.
  * **Context Banner:** For branching questions ("Chain Child"), a persistent banner must sit above the question stem displaying a max 2-sentence context based on the candidate's previous answer.

### 1.6 Tab Violation Warning Modal
* **Screen Name:** Anti-Cheat Warning
* **Elements:** A full-screen modal overlay that pauses the assessment.
* **Rules:** Triggered if the user tries to switch browser tabs. Must feature exactly one button: "Return to assessment".

### 1.7 Candidate Score Screen
* **Screen Name:** Results Dashboard (Candidate View)
* **Elements:** 
  * SkillSure logo, Candidate Name, and SkillSure ID.
  * A large display of the overall score and the assigned "Band" label (Developing, Proficient, Advanced, or Expert).
  * A percentile statement (or a placeholder text if the cohort is too small).
  * A bar chart (rendered in-browser) showing one bar per competency dimension, with score and band label per bar.
  * The SkillSure ID displayed again with sharing instructions.
  * Specific copy text: *"Your full report will be available in a future update."* (PDF generation is excluded from Phase 1).

---

## 2. Employer Journey Screens

### 2.1 Employer Login
* **Screen Name:** Employer Portal Login
* **Elements:** Email and Password input fields, and a "Forgot password" link to reset via email. (Employers cannot self-register; no OTP is used here).

### 2.2 Employer Dashboard
* **Screen Name:** Cohort Dashboard
* **Elements & Rules:**
  * **Candidate Table:** A tabular view of staff who consented to share results. Columns include: Name, SkillSure ID, Date assessed, Score, Percentile, Band, Areas to strengthen (lowest scoring dimension), Integrity flags (shows red flag count for tab switching), and a "Report" link (designed but visibly disabled/placeholder for Phase 1).
  * **Table Controls:** Filters for date range, band, and score threshold. A button for "CSV download".
  * **Cohort Summary Section:** *Only displays if 5 or more candidates have completed the test*. Features a bar chart (average score per dimension), a donut chart (band distribution), and a list of the top 3 weakest dimensions across the team.

---

## 3. Admin Panel Screens (Internal Tool)
*Note: This panel is for internal SkillSure use. It prioritizes function and reliability over beautiful design.*

### 3.1 Candidate Management
* **Screen Name:** All Candidates Table
* **Elements:** A searchable table (by name, phone, SkillSure ID) showing Name, Phone, SkillSure ID, Employer, Score, Status, and Flags. Must include an interface for manual score overrides with a mandatory "reason" field and audit log.

### 3.2 Question Bank Management
* **Screen Name:** Question Bank Upload & Repository
* **Elements:** 
  * An interface to upload JSON array files of questions.
  * A dashboard to view active questions, filterable by type, profile, dimension, and difficulty.
  * Buttons/Actions to "deactivate" (soft delete) or "reactivate" specific questions.

### 3.3 Employer Management
* **Screen Name:** Employer Accounts
* **Elements:** A form to create employer accounts (Company Name, Contact Email, Password), an edit interface to update names or reset passwords, and a view to see candidates associated with that employer.

### 3.4 Flags Log
* **Screen Name:** Global Integrity Log
* **Elements:** A full table of all anti-cheat flags across all candidates. Columns: Candidate Name, SkillSure ID, Flag type, Detail, Question ID, Timestamp. Must be filterable by flag type and date range.
```