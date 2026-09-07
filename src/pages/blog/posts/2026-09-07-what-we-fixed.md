---
layout: "@layouts/ArticleLayout.astro"
date: 2026-09-07
author: David Dudok de Wit
title: "257 improvements later: what your tickets taught us this summer"
description: Between April and September we deployed 257 improvements to Momentum, 131 of them fixes and 83 of them straight from your tickets. Here is the full account, in plain language.
image: "../../../assets/images/momentum-2026-09-what-we-fixed.png"

---

![257 improvements shipped since April](../../../assets/images/momentum-2026-09-what-we-fixed.png)

In March, one of you answered our satisfaction survey with an 8 out of 10 and a remark we have not forgotten. The update was good, simpler, but there were "no usage notes I can consult to know what all the features do."

Fair point. We have been fixing and shipping all spring and summer, and telling you about it through support answers, a webinar and an occasional email. That is not the same as writing it down in one place. So here it is.

## The numbers, and where they come from

Between 1 April and 6 September we deployed 257 improvements to Momentum. We did not round that up. It is the number of items our engineering tracker marks as deployed in that window, from the fixes you can see to the plumbing behind them. Of those:

- 131 were fixes for things that were broken or behaving wrongly.
- 83 came straight from a support ticket or a request one of you sent us.
- 124, nearly half, were opened by our own support and customer team, often on your behalf after a call. Most of the 83 are among them.
- 1,106 code changes were merged to make it happen.

They went out in three main releases (4.5 in April and May, 4.6 in June, 4.7 in August), two patch releases, a brand-new mobile app and, since late August, small releases most weeks. The release-by-release summary is on our [changelog page](/changelog/).

## What we fixed, in plain language

We grouped the highlights by the problem they solve, because that is how you sent them to us.

**Your hours and time-off counts add up.** This was the biggest family of tickets, and the one that mattered most: a day off valued at 24 hours instead of 7, overlapping time-off counted twice, a time-off allowance you could not track without distorting the hours count. Contract terms now count time-off days separately from worked hours. And when we replaced the counting engine underneath, we made sure it changed none of the numbers you already see: we replayed 4.3 million time-off summary figures across all 325 production databases, zero differences. The fixes are what make the numbers add up; the replay is what makes the engine change invisible. If yours still does not add up, tell us.

**Time-off policies live in one place.** Time-off rights used to accrue once a year, and everything else, from seniority days to sick-leave rules, meant manual adjustments. The new Time-off Policy Center holds those rules on one screen, and a contract can point at several policies. It sits behind a per-instance switch, because it touches numbers that feed payroll, and we are turning it on instance by instance.

**Approve requests with the schedule in front of you.** An approved request is a promise made. Two things changed. Pending requests can now show directly in the date view, next to the assignments they affect. And you can pre-approve a set of requests, run a test build, look at the coverage, then confirm or roll back before anyone is notified. Both are behind a per-instance switch. We are turning them on in stages, most active instances first; tell your customer success contact if you want to be early.

**Building schedules is fast again, and repeatable.** On our reference customer build, the classic scheduler went from about 43 minutes to 45 seconds. We also found that two identical runs could produce different schedules, because nothing decided which of several identical template lines counted as filled. On one schedule, 245 of 695 assignments moved between two runs. That is fixed and verified on ten customer databases. Bulk edits of a whole month now complete instead of failing halfway: 200 assignments used to take 324 round trips to the database, now they take 6.

**Notifications you can trust.**

- Notifications that ignored role restrictions.
- "Schedule published" alerts fired when nothing was published.
- Admins not told when someone was removed from a published assignment.
- Requests submitted from the mobile app leaving no notification and no history entry.
- One unassigned job board post silencing every other notification.

All fixed, and admin notifications now respect their checkboxes.

**See more, click less.** In the new date view:

- Auto-width columns.
- Counts per day and per group (assignments or points) without opening a report.
- Hover cards you can read.
- A clearer right-click menu, with "Replace staff" listing eligible candidates only.
- Empty and required assignments in red.
- Unstaffed shifts visible on the timeline.
- Saved filters that open on the range you saved. One customer's saved view opened on four years of schedule and froze the page.

**Exports that export.**

- Excel export from the new date view, and the same file layout as before for list view exports.
- Exports that respect the filter you have open, and CSV files beyond 1,000 lines.
- Scheduled SFTP exports that now contain exactly what a manual run contains, with an explicit port.
- Calendar exports that no longer error, and assignments created from approved requests now reaching Outlook calendars.

**A new mobile app.** Rebuilt from scratch and in the App Store and on Google Play since July: a "today" screen, sign-in with Face ID or fingerprint, encrypted offline access to your schedule, one-tap Microsoft sign-in (and SAML for other identity providers), faster push notifications, dark mode, five languages. Your first tickets on it (note visibility settings, submitted requests not showing, custom hours on iPhone) are fixed, and updates now go to a small group first, then to everyone.

![The new Momentum mobile app](../../../assets/images/momentum-mobile-app-2026-en.png)

**Getting in, every time.** Long passwords that could not sign in, activation links that failed on a second click: fixed. Support can now see why a sign-in failed, so "I can't get in" gets answered in one exchange.

## How we improve Momentum

The June update rebuilt 250,000 lines of legacy code on modern foundations. The right call for the years ahead, and it made a few weeks bumpier than we wanted for some of you. It also changed how we ship. Big bundled releases are over: since late August we ship small increments, most weeks, to a few active instances first, and the [changelog](/changelog/) shows what went out and when.

## In your words

*“It's a Christmas miracle! It is working. Thank you, thank you, thank you.”*<br><cite>Imaging supervisor, US medical group, June 2026</cite>

*“I built the schedule out through the end of the year and it was 90% perfect. Now I know what the issues are, so I can easily correct them.”*<br><cite>Practice manager, community health network, California, May 2026</cite>

*“Since the update, the feature is really quite good, simpler.”*<br><cite>The person who asked for usage notes, March 2026, translated from French</cite>

This post is a first answer.

## What we are working on next

- Request Preview and pre-approval switched on across instances, in stages.
- Time-off policies switched on across instances, with rollover rules the next thing on the list.
- A single Requests page in the new interface: time-off, extra work and swap requests on one screen, with approvals date by date.
- Payroll-ready hours: extra hours by pay rate, cleaner exports.
- And a few things our team would rather show you than describe.

## Come and see it

- **France:** JFR 2026, Paris, 8 to 11 October, stand 126A.
- **North America:** RSNA 2026, Chicago, 29 November to 3 December. [Book a slot](/demo/) with us there.
- **Everyone:** [talk to us](/demo/) for a 20-minute tour of what is new on your instance, or browse the [knowledge base](/help/).

Thank you for your feedback. It is what moves Momentum forward.

David Dudok de Wit, CEO, BioSked
