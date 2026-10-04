# Study Smart AI

create a website MASTER PROMPT — STUDYTRACK AI

You are a Senior Full-Stack Software Engineer, UI/UX Designer, Database Architect, and AI Engineer.

Build a production-quality, responsive full-stack web application called StudyTrack AI.

Product tagline

"Understand your time. Improve your focus. Study smarter."

The application is a Student Productivity, Study Tracking, Time Management, and AI Recommendation Platform.

The goal is to help students understand exactly how they spend their day, track study time by subject, monitor productive/unproductive application usage, set academic goals, create intelligent schedules, and receive personalized recommendations.

Do NOT create only a static frontend.

The project must have:

Frontend

Backend

REST APIs

Database

Authentication

User profile

Subject management

Study-session tracking

Application/website usage tracking

Goals

Timetable

Focus sessions

Analytics

Notifications

AI recommendations

Daily/weekly/monthly reports

Proper error handling

Responsive design

Security

Persistent database storage

1. TECHNOLOGY STACK

Use the following modern technology stack.

Frontend

Next.js

React

TypeScript

Tailwind CSS

shadcn/ui

Recharts

Lucide React icons

Responsive design

Dark/light mode

Backend

Use either:

Preferred

Next.js API Routes / Server Actions

OR

Alternative

Node.js + Express + TypeScript

Create clean REST APIs where appropriate.

Database

Use:

PostgreSQL

Prisma ORM

The database must persist all important user data.

Authentication

Implement:

Email/password registration

Login

Logout

Password hashing

Session management

Protected dashboard routes

Forgot/reset password flow

Optional:

Google OAuth

Never store plain-text passwords.

AI

Create an AI recommendation layer that analyzes:

Study duration

Subject performance

Goals

Schedule

Focus sessions

Social media usage

Entertainment usage

Missed study targets

Historical productivity

The AI should generate useful recommendations and personalized schedules.

2. DESIGN REQUIREMENTS

Create a premium modern SaaS-style UI.

The design should feel like a combination of:

Notion

Google Calendar

Forest

Todoist

modern AI dashboards

Do NOT make it look like a basic college project.

Use:

Clean cards

Rounded corners

Subtle shadows

Good spacing

Professional typography

Interactive charts

Smooth animations

Hover states

Skeleton loading

Empty states

Toast notifications

Support:

Desktop

1920px, 1440px, 1280px

Tablet

1024px, 768px

Mobile

430px, 390px, 375px

The website must be completely responsive.

3. LANDING PAGE

Create a beautiful public landing page.

Sections:

Hero

Headline:

"Turn Your Time Into Your Biggest Advantage."

Subheading:

"Track what you study, understand where your time goes, and let AI create a smarter study plan for you."

Buttons:

Start Tracking Free

View Demo

Add a modern dashboard preview.

Features

Show:

Smart Study Tracking

Track study time automatically and manually.

Subject Analytics

Understand how much time you spend on every subject.

Application Tracking

Track productive, social, entertainment, and other applications.

AI Study Planner

Generate personalized schedules.

Focus Mode

Run distraction-free study sessions.

Productivity Analytics

Understand your daily and weekly performance.

Goals

Set daily, weekly, monthly academic goals.

Reports

Generate detailed productivity reports.

4. AUTHENTICATION

Create:

Register

Fields:

Full name

Email

Password

Confirm password

Education level

Course/branch

Year/semester

Login

Fields:

Email

Password

Remember me

Also include:

Forgot password

Reset password

Logout

After registration, redirect the student to an onboarding flow.

5. ONBOARDING

Ask the student:

Basic Information

Name

College/school

Course

Branch

Semester/year

Study Goals

Example:

"How many hours do you want to study every day?"

"Which subjects are important?"

"Which subjects are difficult?"

"Your preferred study time?"

"Morning / Afternoon / Evening / Night"

"How many hours do you sleep?"

"How much free time do you normally have?"

Use this information to personalize the dashboard.

6. MAIN DASHBOARD

Create the main dashboard.

Top section:

Good Evening, [Student Name] 👋

Display:

Today's Goal

Example:

6h target

4h 32m completed

75% completed

Statistics Cards

Show:

Total Study Time

4h 32m

Focus Time

3h 48m

Social Media

1h 18m

Entertainment

45m

Productivity Score

82/100

Current Streak

7 days

7. TODAY'S TIMELINE

Create a visual timeline.

Example:

07:00 – 08:00
DSA
Study

08:00 – 08:30
Breakfast
Break

08:30 – 10:00
College
Academic

10:00 – 11:00
Mathematics
Study

11:00 – 11:30
Instagram
Social Media

11:30 – 12:30
AI/ML
Study

Allow users to:

Add activity

Edit activity

Delete activity

Change category

Assign subject

Add notes

8. SUBJECT MANAGEMENT

Create a Subjects page.

Student can:

Add subject

Edit subject

Delete subject

Set target hours

Set priority

Set difficulty

Set color/icon

Example:

DSA
Target: 20h/week
Priority: High
Difficulty: Hard

Mathematics
Target: 10h/week
Priority: Medium
Difficulty: Medium

AI/ML
Target: 15h/week
Priority: High
Difficulty: Hard

9. SUBJECT ANALYTICS

For every subject show:

Total study time

Weekly target

Monthly target

Completion percentage

Number of sessions

Average session duration

Focus score

Goal completion

Example:

DSA

Target: 20 hours

Completed: 15h 30m

Progress: 77.5%

Use progress bars and charts.

10. STUDY SESSION TRACKER

Create:

Start Study Session

User selects:

Subject

Topic

Goal

Duration

Example:

Subject: DSA

Topic: Binary Trees

Goal: Solve 5 problems

Duration: 60 minutes

Buttons:

START SESSION

During session show:

Countdown/up timer

Subject

Topic

Goal

Pause

Resume

Finish

Distraction counter

When completed, save session to database.

11. FOCUS MODE

Create a distraction-free full-screen mode.

Example:

DSA
Binary Trees

47:32

Goal
Solve 5 Problems

[ Pause ] [ Finish ]


When session finishes:

Show:

Session Completed 🎉

Duration: 52 minutes

Goal completion: 100%

Focus Score: 92%

Add session to analytics.

12. APPLICATION & WEBSITE TRACKING

Create an application usage tracking system.

Categorize applications/websites as:

Study/Productive

VS Code

LeetCode

GeeksforGeeks

Google Docs

Jupyter

Educational websites

Social Media

Instagram

Facebook

Snapchat

Reddit

X

Entertainment

YouTube

Netflix

Gaming

Communication

WhatsApp

Discord

Telegram

Other

Unknown applications/websites.

Record:

Application name

Website

Start time

End time

Duration

Category

Productivity status

IMPORTANT:

A normal browser website cannot reliably monitor every application running on a student's operating system.

Therefore design the architecture so that a future desktop tracking agent can send activity data to the backend.

Create a clear API such as:

POST /api/activity

The desktop agent can later send:

{
  "application": "VS Code",
  "category": "PRODUCTIVE",
  "startTime": "...",
  "endTime": "...",
  "duration": 3600
}


For the MVP, provide manual activity entry and simulated/demo tracking data.

13. PRODUCTIVITY ANALYTICS

Calculate:

Study Percentage

Study Time / Total Active Time × 100

Social Media Percentage

Social Media Time / Total Active Time × 100

Entertainment Percentage

Entertainment Time / Total Active Time × 100

Productivity Score

Create a transparent scoring system based on:

Goal completion

Study duration

Focus sessions

Subject targets

Distraction time

Social media usage

Consistency

Show the score as:

82/100

Do not present it as a scientific psychological measurement. Clearly label it as an app-generated productivity score.

14. ANALYTICS PAGE

Create a powerful analytics dashboard.

Filters:

Today

Yesterday

Last 7 days

Last 30 days

Custom range

Charts:

Study Hours

Bar chart

Subject Distribution

Pie/donut chart

Application Usage

Horizontal bar chart

Productivity Trend

Line chart

Social Media Usage

Trend chart

Daily Timeline

Heatmap/calendar view

15. WEEKLY REPORT

Generate:

WEEKLY PRODUCTIVITY REPORT

Total Study
32h 40m

Average Daily Study
4h 40m

Best Day
Saturday

Most Studied Subject
DSA

Least Studied Subject
Mathematics

Social Media
7h 20m

Entertainment
4h 10m

Average Productivity
78%


Also show:

What went well

What needs improvement

AI recommendation

16. MONTHLY REPORT

Show:

Total study hours

Subject-wise hours

Goal completion

Productivity trend

Social media trend

Best performing week

Worst performing week

Streak

Average study session

Most productive time of day

Allow report export as PDF.

17. SMART TIMETABLE

Create a calendar/schedule page.

Student can manually create:

Study session

Break

College

Assignment

Exam

Revision

Personal activity

Create:

AI Generate Schedule

AI considers:

Subject priority

Difficulty

Upcoming exams

Available hours

Previous study patterns

Weak subjects

Target hours

Preferred study time

Break requirements

Generate an optimized schedule.

18. EXAM MODE

Add an Exam Mode.

Student enters:

Exam:

DSA

Exam date:

20 September

Topics:

Arrays

Linked List

Stack

Queue

Trees

Graphs

The system calculates:

Days remaining

Topics remaining

Required study hours

Daily target

Then AI generates a revision plan.

Example:

15 DAYS LEFT

DSA Preparation: 62%

Today:
Trees — 1h
Graphs — 1h
Revision — 30m
Practice — 45m


19. AI STUDY ASSISTANT

Create a chat interface.

Student can ask:

"How should I study tomorrow?"

"Why is my productivity low?"

"Which subject should I study now?"

"How much DSA have I studied this week?"

"Create a 7-day revision plan."

"How can I reduce my social media usage?"

The AI must use the student's stored application data when answering personalized questions.

Do not expose private database information to other users.

20. AI RECOMMENDATION ENGINE

Generate recommendations such as:

You studied DSA for 3 hours today but Mathematics for only 20 minutes.

Mathematics is currently below your weekly target.

Tomorrow, consider allocating 90 minutes to Mathematics.

Also detect:

Overuse

"You spent 2h 15m on social media today."

Understudied Subject

"AI/ML is 35% below its weekly target."

Strong Subject

"DSA is 92% of its weekly target."

Consistency

"You studied 6 consecutive days."

21. GOAL SYSTEM

Allow students to create:

Daily Goals

Study 6 hours.

Weekly Goals

Study DSA 10 hours.

Monthly Goals

Complete 80 LeetCode problems.

Academic Goals

Complete 5 chapters.

Track:

Target

Current progress

Percentage

Deadline

Status

22. HABIT & STREAK SYSTEM

Create:

🔥 Study streak

🔥 Focus streak

🔥 Goal completion streak

Show:

Current streak: 7 days
Longest streak: 18 days


Create achievement badges:

First Study Session

10 Hours Studied

7 Day Streak

30 Day Streak

100 Focus Sessions

Goal Master

23. NOTIFICATION SYSTEM

Create notifications for:

Upcoming study session

Missed goal

Exam approaching

Excessive social media usage

Streak reminder

Weekly report

AI recommendation

Allow user to control notifications from Settings.

24. SETTINGS

Create:

Profile

Name

Email

College

Course

Semester

Preferences

Daily study target

Preferred study time

Break duration

Theme

Privacy

Allow user to control:

Activity tracking

Application tracking

Data collection

Analytics

Notifications

Toggle each notification type.

Account

Change password

Logout

Delete account

25. DATABASE DESIGN

Use PostgreSQL + Prisma.

Create appropriate tables/models such as:

User

id
name
email
passwordHash
college
course
branch
semester
createdAt
updatedAt


Subject

id
userId
name
description
priority
difficulty
weeklyTarget
monthlyTarget
createdAt


StudySession

id
userId
subjectId
topic
startTime
endTime
duration
goal
goalCompleted
focusScore
notes
createdAt


Activity

id
userId
applicationName
website
category
startTime
endTime
duration
isProductive
createdAt


Goal

id
userId
title
type
targetValue
currentValue
deadline
status
createdAt


Schedule

id
userId
subjectId
title
startTime
endTime
type
status


Exam

id
userId
subjectId
examDate
topics
status


Achievement

id
userId
type
title
description
earnedAt


Notification

id
userId
title
message
type
isRead
createdAt


Design proper relationships and indexes.

Use foreign keys.

26. API STRUCTURE

Create clean APIs.

Examples:

POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout

GET    /api/user/profile
PUT    /api/user/profile

GET    /api/subjects
POST   /api/subjects
PUT    /api/subjects/:id
DELETE /api/subjects/:id

GET    /api/study-sessions
POST   /api/study-sessions
PUT    /api/study-sessions/:id
DELETE /api/study-sessions/:id

GET    /api/activities
POST   /api/activities

GET    /api/goals
POST   /api/goals
PUT    /api/goals/:id

GET    /api/analytics/daily
GET    /api/analytics/weekly
GET    /api/analytics/monthly

GET    /api/schedule
POST   /api/schedule

GET    /api/exams
POST   /api/exams

POST   /api/ai/recommendation
POST   /api/ai/schedule
POST   /api/ai/chat


Validate all incoming data.

Return proper HTTP status codes and useful error messages.

27. SECURITY

Implement:

Password hashing

Authentication middleware

Authorization

Input validation

Rate limiting where appropriate

Secure cookies/session handling

CORS configuration if separate backend is used

SQL injection protection through Prisma

XSS protection

Environment variables for secrets

No API keys in frontend

User data isolation

A user must never be able to access another user's study data by changing an ID in the URL/API.

28. DEMO MODE

Because this is intended for demonstration, create a Demo Student option.

Populate realistic demo data:

DSA
Mathematics
AI/ML
Web Development
Operating Systems
Database Management


Generate realistic activity:

VS Code
Chrome
LeetCode
YouTube
Instagram
WhatsApp
Google Docs


This allows the complete dashboard to look populated during a presentation.

29. EMPTY STATES

Do not show blank screens.

For a new student:

Welcome to StudyTrack AI 🎓

You haven't recorded any study sessions yet.

Start your first session.

[ Start Studying ]


Create useful empty states for:

Subjects

Analytics

Goals

Schedule

Exams

Activity

30. ERROR HANDLING

Create professional error handling.

Examples:

Something went wrong.

We couldn't load your analytics.

[ Try Again ]


Handle:

Network errors

Authentication errors

Invalid form input

Database errors

API errors

AI errors

Missing data

31. PERFORMANCE

Optimize the application.

Use:

Lazy loading

Pagination

Server-side data fetching where appropriate

Database indexes

Caching where useful

Optimized charts

Debounced search

Efficient API calls

Do not load thousands of activity records unnecessarily.

32. RESPONSIVE MOBILE DESIGN

On mobile:

Use a bottom navigation bar:

Home | Study | Schedule | Analytics | Profile


Dashboard cards should stack vertically.

Charts should resize properly.

Focus Mode should work perfectly on mobile.

33. ACCESSIBILITY

Implement:

Semantic HTML

Keyboard navigation

Proper labels

Accessible buttons

Good contrast

ARIA where needed

Screen-reader-friendly components

34. PROJECT STRUCTURE

Use a clean architecture.

Example:

studytrack-ai/

├── app/
│   ├── login/
│   ├── register/
│   ├── dashboard/
│   ├── subjects/
│   ├── study/
│   ├── schedule/
│   ├── analytics/
│   ├── exams/
│   ├── goals/
│   ├── ai/
│   └── settings/
│
├── components/
│   ├── dashboard/
│   ├── charts/
│   ├── forms/
│   ├── navigation/
│   └── ui/
│
├── lib/
│   ├── auth/
│   ├── database/
│   ├── ai/
│   ├── analytics/
│   └── validations/
│
├── prisma/
│   └── schema.prisma
│
├── api/
│   └── ...
│
├── public/
│
├── types/
│
└── README.md


Keep components reusable.

Do not put everything into one giant component.

35. DASHBOARD VISUALIZATION

The dashboard should include:

Today's study progress

Productivity score

Study vs social media

Subject progress

Today's timeline

Application usage

Current streak

Today's schedule

AI recommendation

Quick Start Study button

36. QUICK ACTIONS

Add prominent buttons:

+ Add Study Session
▶ Start Focus Mode
+ Add Subject
+ Add Goal
🤖 Ask AI
📅 Generate Schedule


37. PRIVACY-FIRST TRACKING

This is important.

Application tracking can contain sensitive behavioral data.

Therefore:

Clearly inform the user what is being tracked.

Obtain explicit permission before tracking.

Allow tracking to be paused.

Allow users to delete their activity history.

Do not secretly monitor applications.

Do not collect unnecessary personal information.

Never sell or expose user activity data.

38. FUTURE DESKTOP TRACKER

Design the backend so a future desktop application can communicate with it.

Architecture:

Windows/macOS/Linux
        │
        ▼
Desktop Tracking Agent
        │
        ▼
Secure API
        │
        ▼
Backend
        │
        ▼
PostgreSQL
        │
        ▼
StudyTrack Dashboard


The MVP should NOT pretend that a browser can automatically monitor the entire operating system.

Use simulated/demo data until a desktop agent is implemented.

39. AI DATA PIPELINE

Create this conceptual pipeline:

Student Activity
       ↓
Data Collection
       ↓
Data Cleaning
       ↓
Analytics Engine
       ↓
Student Profile
       ↓
AI Recommendation Engine
       ↓
Personalized Schedule
       ↓
Student
       ↓
New Activity
       ↓
Continuous Improvement


40. FINAL USER EXPERIENCE

The ideal user journey should be:

Landing Page
      ↓
Register
      ↓
Onboarding
      ↓
Add Subjects
      ↓
Set Goals
      ↓
Generate Schedule
      ↓
Start Study Session
      ↓
Track Activity
      ↓
Dashboard
      ↓
Analytics
      ↓
AI Recommendation
      ↓
Improved Schedule
      ↓
Repeat


41. DEVELOPMENT REQUIREMENT

Do NOT generate fake buttons that do nothing.

Every important button must have functionality.

Do NOT hardcode dashboard values in the production dashboard.

Dashboard values should come from the database/API.

Use realistic seed/demo data only for Demo Mode.

Implement loading states.

Implement error states.

Implement success states.

Use environment variables.

Provide:

.env.example

with variables such as:

DATABASE_URL=
AUTH_SECRET=
AI_API_KEY=


Never expose secrets in client-side code.

42. README

Create a complete README containing:

Project overview

Features

Tech stack

Architecture

Database setup

Environment variables

Installation

Prisma migration commands

Seed/demo data

Development commands

Production build

Deployment instructions

API documentation

Future improvements

43. FINAL QUALITY REQUIREMENT

Before considering the project complete, verify:

Frontend

Responsive

Modern UI

No broken links

No console errors

Accessible

Mobile friendly

Backend

APIs functional

Validation implemented

Authentication secure

Proper error handling

Database

PostgreSQL connected

Prisma schema valid

Relationships correct

Migrations working

Seed data working

Features

Authentication

Dashboard

Subjects

Study sessions

Focus Mode

Activity tracking

Goals

Timetable

Exams

Analytics

AI recommendations

Notifications

Reports

Settings

All major functionality must actually work.

44. MOST IMPORTANT PRODUCT PRINCIPLE

Do not build this as simply a:

"Study Timer Website."

Build it as a:

"Personal Productivity Intelligence Platform for Students."

The system should answer:

1. What did I do today?

2. How much did I study?

3. Which subjects did I study?

4. How much time did I spend on each subject?

5. Which applications/websites consumed my time?

6. How much time did I spend on social media?

7. Am I meeting my academic goals?

8. Which subjects need more attention?

9. When am I most productive?

10. What should I study tomorrow?

The final application should feel like a real commercial SaaS product, not a basic student CRUD project.

Build the project incrementally and ensure the application remains runnable after every major implementation stage.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a477464c-ecb9-499e-9a79-838de57af331).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
