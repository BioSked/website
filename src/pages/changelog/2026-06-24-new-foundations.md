---
layout: "@layouts/ChangelogLayout.astro"
date: 2026-06-24
version: "4.6.0"
author: BioSked
title: 🧱 New foundations
description: Momentum 4.6 rebuilt the engine room, introduced per-instance switches for new capabilities, and opened the door to the new mobile app.
image: "../../assets/images/momentum4-6.png"

---

![Momentum 4.6](../../assets/images/momentum4-6.png)

Momentum 4.6 is the release you were meant to barely notice. Underneath, 250,000 lines of legacy code were converted to a modern language, and new capabilities can now be switched on for one instance at a time instead of for everyone at once. That is what made the new mobile app and the 4.7 features possible.

### ✨ New

- **Per-instance switches:** new capabilities can be turned on instance by instance, so we can roll them out in stages and with you.
- **The new mobile app** ships alongside this release. It has its own entry below.

### 🪲 Fixes

- Building a schedule by layer from the new date view works again.
- The new date view respects the "View display filter panel" privilege.
- The note export is back in request management.
- Cloning a schedule never duplicates time-off, and staff are unassigned when a duplicate lands on a time-off day.
- Default filter and contract copy work as expected.

### 🩹 Follow-up fixes over the summer

- **June:** setup pages (security groups, work patterns, contracts, role groups, staff groups, quick links) save correctly again; time clock popup sign-in and offline custom time; creating an assignment from the classic date view.
- **July:** sorting totals in reports; clocking details in the hours count; the Duplicate entry is back in the classic date view menu.
- **August:** single and bulk duplication over time-off; assignments created by requests can be published, with a confirmation; day notes show only for their location; other people's time-off shows in the new date view; publishing from the build window works on ranges that contain a day off; the assignment history log is complete.
- **September:** contract terms display correctly on instances where time-off policies were just switched on; the "New site" popup.
