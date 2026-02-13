# Implementation Tasks: Dashboard Refactor

**Feature**: Refactor Dashboard UI (from `specs/002-dashboard-refactor`)
**Status**: In Progress

## Dependencies
- Phase 3 (UI Skeleton) MUST be complete.

## Phase 1: Component Implementation

Goal: Create reusable UI components for the dashboard.

- [x] T001 [US1] Create `components/dashboard/StatsCard.tsx`
- [x] T002 [US1] Create `components/dashboard/ActivityTable.tsx`
- [ ] T003 [US1] ongoing: Create shared UI components (Button, Badge) if needed

## Phase 2: Page Integration

Goal: update the dashboard page to use new structure.

- [x] T004 [US1] Update `app/dashboard/page.tsx` layout structure
- [x] T005 [US1] Integrate StatsCard components with mock data (or real if available)
- [x] T006 [US1] Integrate ActivityTable component
- [x] T007 [US2] Apply final styling and responsive fix (mobile sidebar interaction)

## Implementation Strategy
- Use Tailwind CSS for rapid styling.
- Isolate complex UI parts into components.
