# QA Checklist: Dashboard Refactor

**Feature**: [Link to spec.md](file:///Users/hafriaya/Development/hackathon/NotebookLM/specs/002-dashboard-refactor/spec.md)
**Branch**: `002-dashboard-refactor`

## Visual Verification

- [ ] **FR-001**: Dashboard layout matches `specs/Dashboard.png`.
- [ ] **FR-002**: "Welcome" message and "New Exam" button are present and styled correctly.
- [ ] **FR-003**: Stats cards display correct icons, colors, and trends.
- [ ] **FR-004**: Recent Activity table has correct columns and status badges.
- [ ] **FR-006**: Sidebar active state matches design.

## Functional Verification

- [ ] **SC-002**: "New Exam" button navigates to `/dashboard/materials`.
- [ ] **SC-002**: "View Results" links navigate to `/exam/[id]/results`.
- [ ] **Responsive**: Sidebar collapses/adapts on mobile viewport.

## Independent Tests

- [ ] **Status Badge Logic**: Completed = Green, In Progress = Blue.
- [ ] **Score Color Logic**: >= 80 Green, >= 50 Orange, < 50 Red.
