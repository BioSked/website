---
layout: "@layouts/ChangelogLayout.astro"
date: 2026-08-25
version: "4.7.0"
author: BioSked
title: 🗓️ Time-off policies, pre-approved requests, faster builds
description: "Momentum 4.7: time-off policies, pre-approval and requests in the date view, rolled out progressively and not on every instance yet, plus counts in the date view and a much faster build."
image: "../../assets/images/momentum4-7.png"

---

![Momentum 4.7](../../assets/images/momentum4-7.png)

Rolled out in stages from 17 August and to all European instances on 25 August 2026, followed by smaller releases on 26 August and 1 September. **Progressive rollout:** time-off policies, pre-approval of requests and requests in the date view are being switched on instance by instance, most active instances first, and are not active everywhere yet. If you do not see them, they are on their way. Tell your customer success contact if you want to be early.

### ✨ New

- **Time-off Policy Center:** accrual rules live in one place instead of being yearly only, and a contract term can use several policies, for example annual leave, sick leave and seniority days. Existing yearly accruals migrate into one policy per contract term. Progressive rollout, not on every instance yet.
- **Pre-approve requests:** mark a set of requests as pre-approved, run a test build to check coverage, then approve for good or roll back. Staff are only notified at final approval. Progressive rollout, not on every instance yet.
- **Requests in the date view:** show pending requests next to the assignments they affect, following the active filter. Progressive rollout, not on every instance yet.
- **Counts in the date view:** a "Show counts" display option shows how many assignments, or points, a day or a group holds, in both layouts and under any grouping.
- **Unstaffed shifts on the timeline:** the timeline view can now show the shifts that still need someone.
- **Swaps complete without a second approval** when the person accepting already holds the "Change requests: approve/deny" permission. Mobile app first; the web requests page follows.
- **Pending requests keep their submission order,** with a new Created column to sort on.
- **Admins are notified** when someone is removed from an already published assignment.

### 💎 Improvements

- **The classic scheduler builds about 58 times faster:** 43 minutes down to 45 seconds on our reference customer build.
- **Identical builds give identical schedules.** Where a template had several identical lines for the same role, the order in which they were filled is now fixed.
- **Large bulk edits complete** instead of failing halfway: shifting 200 assignments now takes 6 database round trips instead of 324.
- **Hover cards on the scheduling grid are readable:** larger text, wider cards, comments that wrap.
- **Saved filters open on the date range you saved.**
- **Support can see why a sign-in failed,** so access issues are solved in one exchange.
- **Mobile app updates reach a small group first,** then everyone.

### 🪲 Fixes

- **Hours count and time-off values:** the modern counting engine now reproduces the previous one exactly. Before switching, we checked it against every existing time-off summary figure: zero differences. Overlapping work periods no longer flip between screens, and the hours count details popup no longer errors.
- Approving or pre-approving a request twice no longer duplicates its days on the schedule, and staff no longer receive two notifications.
- The date-view totals row counts pre-approved requests.
- Bulk publish from the new date view no longer fails outright: rows that cannot be published are skipped, the rest go through.
- Publishing an empty layer publishes nothing, instead of every layer.
- Publish and unpublish work from multiselect and bulk edit.
- Requests submitted from the mobile app now create a notification and a history log entry.
- Admin notifications respect their checkboxes, and deleted-role notifications carry their full details.
- Posting an unassigned shift to the job board no longer interrupts other notifications.
- Roles can be deleted after a job board bid was approved.
- Staff can see public notes on the classic date view again, day notes included.
- The staff dropdown is alphabetical again, role group separation lines are visible again, and list view columns match Momentum Classic.
- Excel export no longer shows an error dialog, scheduled SFTP exports contain everything a manual run contains, and calendar export works again.
- Assignments created from approved requests now reach connected external calendars such as Outlook.
- Cancelling the forgot-to-clock prompt no longer deletes an earlier punch.
- Assignment validation stops when it times out instead of running on for minutes.
- Activation links handle a second click, and staff with long passwords can sign in again.
- A bulk edit that fails now says so and keeps your selection.
