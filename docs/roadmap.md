# Mindwtr Roadmap

This document captures the phased product roadmap and how work splits between `@mindwtr/core` and the desktop/mobile apps.

## Phase 1 — GTD Completeness (Core-first)

### 1) Recurring Tasks Engine
**Goal:** A recurring task automatically produces its next instance when completed/archived.

- **Core**
  - Add recurrence helpers (daily/weekly/monthly/yearly).
  - On status transition into `done`/`archived`, roll a recurring task:
    - Create a new task instance with next `dueDate`/`startTime`.
    - Keep history by leaving the completed item intact.
  - Tests for recurrence edge cases and sync compatibility.
- **Desktop**
  - Recurrence selector in Task edit.
  - Display recurrence badge and next due date.
- **Mobile**
  - Add recurrence selector to Task edit modal.
  - Ensure swipe/status flows trigger recurrence via core.

### 2) Tickler / Review Dates
**Goal:** Add `reviewAt` to tasks and projects to control when items are due for re‑consideration.

- **Core**
  - Add `reviewAt` fields to Task and Project types.
  - Provide `isDueForReview` / `filterDueForReview` helpers.
  - Persist and merge via existing LWW rules.
- **Desktop**
  - Allow setting `reviewAt` on tasks/projects.
  - Weekly Review and Agenda surface items due for review first.
- **Mobile**
  - Allow setting `reviewAt` on tasks/projects.
  - Weekly Review and Agenda surface items due for review first.

### 3) Project Lifecycle + Next Action Discipline
**Goal:** Make projects trustworthy by ensuring each active project has a next action and can be completed/archived cleanly.

- **Core**
  - Project status transitions (`active` → `completed`/`archived`).
  - Helper to detect “no next action” projects.
- **Desktop**
  - Highlight projects without next actions.
  - Actions to complete/archive projects.
- **Mobile**
  - Highlight projects without next actions.
  - Actions to complete/archive projects.

## Phase 2 — Daily Capture & Engagement

### 1) Shared Quick‑Add Parser (Natural Language)
- **Core:** `parseQuickAdd(input)` that returns `{ title, props }` (status, due, note, contexts, tags, projectId).
- **Desktop/Mobile:** Wire all add inputs to the parser and show parsing help.

### 2) Frictionless Capture Entry Points
- **Desktop:** Global hotkey + tray quick‑add to Inbox.
- **Mobile:** Share‑sheet capture + optional home widget.

### 3) Notifications / Reminders
- **Core:** Schedule computation helpers from `dueDate/startTime/recurrence`.
- **Desktop:** Tauri notifications with snooze.
- **Mobile:** Expo notifications with snooze.

## Phase 3 — Trust, Sync, and Organization

### 1) Auto‑Sync + Status
- **Core:** Stronger merge stats/conflict summaries.
- **Desktop/Mobile:** Background/on‑resume sync with last‑sync UI.

### 2) Bulk Actions & List Customization
- **Core:** Batch store actions to reduce repeated saves.
- **Desktop/Mobile:** Multi‑select, batch move/tag/delete, user sorting/grouping.

## Phase 4 — Power‑User & Reference

### 1) Markdown Notes + Attachments
- **Core:** `attachments[]` on tasks/projects + merge rules.
- **Desktop/Mobile:** Pick/render attachments and markdown safely.

### 2) Desktop Keyboard/A11y Pass
- **Desktop only:** Full shortcut set for capture/clarify/organize and accessibility polish.

