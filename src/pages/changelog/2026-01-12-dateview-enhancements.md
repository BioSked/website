---
layout: "@layouts/ChangelogLayout.astro"
date: 2026-01-12
version: 4.4
author: Frédéric Andreae
title: Major Scheduling, Analytics, and Performance Improvements
description: Version 4.4 introduces powerful new scheduling workflows, real-time analytics, and major performance improvements to help teams plan faster, scale confidently, and gain immediate operational insight.
image: "../../../assets/images/ai-laptop.webp"
noindex: true
---

## ✨ New

### Timeline View
- New hour-by-hour visualization of assignment coverage.
- Quickly identify coverage gaps and overlaps.
- Supports multi-timezone viewing, making it easier to manage distributed teams.
- Designed for high-volume schedules where visibility into coverage density matters.

### Bulk Editing for Assignments
- Select multiple assignments using:
  - Ctrl / Cmd + click
  - Ctrl / Cmd + A to select all visible assignments
- Apply changes in bulk:
  - Lock / Unlock
  - Publish / Unpublish
  - Change dates
  - Reassign staff
- Dramatically reduces repetitive work for large schedules.

### Faster Assignment Creation
- Right-click any cell in the schedule to create a new assignment.
- Automatically pre-fills relevant fields based on context and active filters, including:
  - Date
  - Role
  - Staff
  - Location
- Staff **and role lists** are filtered to the current view, reducing errors and speeding up scheduling for large teams.

### Analytics Dashboard
- Real-time operational insights based on the current filters and schedule view.
- Key metrics include:
  - Unfilled assignments
  - Total cost
  - Average hours
  - Distribution by role and staff
- Visualizations:
  - Hourly distribution
  - Heatmap showing assignment density
- Enables quick analysis without exporting data.

### Keyboard Shortcuts
- Power-user shortcuts for faster navigation and actions.
- Examples:
  - `Ctrl / Cmd + K` — Quick search
  - `N` — Create a new assignment

### Assignment Duplication
- Duplicate selected assignments:
  - Once
  - Or on a recurring pattern (e.g., weekly)
- Useful for repeating schedules and rapidly building future coverage.
- Designed to work with bulk selection and existing filters for precise control.

---

## 💎 Improvements

### Performance & Scale
- Removed the previous hard cap on the number of assignments that can be viewed at once.
- Schedules now scale significantly better across all views.
- Faster loading and UI refreshes throughout the application, especially for large datasets.

### Schedule & UI Enhancements
- Simplified layout with clearer access to primary actions.
- New Shift View layout options for alternative schedule visualization.
- Dark mode support:
  - Light
  - Dark
  - System preference

### Multi-Select Enhancements
- Select entire rows or columns of assignments.
- Publish or unpublish assignments individually or in bulk.
- Copy and paste schedules using multi-select.

### Search
- Quick-search instantly highlights assignments on screen as you type.
