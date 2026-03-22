# Walon-Foundation Website Plan

## Project Goal

Build the first public website for Walon-Foundation.

The site should do two jobs well:

1. Present Walon-Foundation as the umbrella for useful open-source software, public software experiments, SDKs, developer tools, and product systems.
2. Act as a client-facing front door where people can explore the work and start a project inquiry for contract or consulting work.
3. Showcase the existing body of software in a way that visibly proves technical range, engineering taste, and execution quality.

## Core Positioning

Walon-Foundation is the umbrella for software built by Mohamed Lamin Walon Jalloh (`walonCode`): open-source tools, practical platforms, SDKs, experimental systems, and client-focused engineering work.

The website should make three things clear quickly:

1. Real software has already been built.
2. The work is guided by a visible standard for quality.
3. Clients can hire the builder behind the work.
4. The site is also a showcase of what has already been designed, built, and explored.

## Brand Direction

Recommended voice:

- Speak mostly as `I`
- Present `Walon-Foundation` as the brand container
- Keep the tone technical, direct, credible, and opinionated

Avoid:

- generic nonprofit language
- startup hype language
- vague claims without proof
- generic template-style messaging

## Audience

Primary audiences:

- potential clients
- developers and collaborators
- people evaluating public work
- founders or organizations looking for contract engineering help

Primary user outcomes:

- trust the engineering standard
- explore projects
- understand the range of software already built
- start a project inquiry
- understand what Walon-Foundation is

## Main CTA Strategy

Primary CTA:

- `Start a Project`

Secondary CTA:

- `Explore Projects`

Reason:

The site should focus on project inquiry first, not calendar booking. Booking and pricing flow can be built later as a dedicated intake experience.

## Website Identity

Public identity to reflect on the site:

- Mohamed Lamin Walon Jalloh
- software engineer
- builder behind `walonCode`
- Walon-Foundation as the umbrella for the work

## What The Existing Repos Show

The current Walon-Foundation repos show a broad but coherent software body of work:

- Developer tooling
  - `backend-starter-cli`
  - `go-api-swagger`
  - `vscode_code-lang`
- Platforms and products
  - `business-directory`
  - `edu-ai`
  - `tele-health`
  - `religion-tracker`
  - `health-chatbot`
- SDK and infrastructure work
  - `monime-package`
  - `monime-package-go`
- Experimental and broader product direction
  - `better-chat`
  - `learning-platform`

This means the website should feel like:

- a software foundation
- a portfolio of real engineering work
- a consulting front door

## Homepage Structure

### 1. Hero

Purpose:

- immediate positioning
- communicate the standard
- present clear actions

Headline options:

- Useful Software. Open by Default. Built With Standards.
- Walon-Foundation Builds Software That Deserves Trust.
- Good Software Should Be Obvious.

Subheadline direction:

Walon-Foundation is where I build open-source tools, practical platforms, SDKs, and product systems with a clear standard for quality, usefulness, and long-term maintainability.

CTAs:

- Start a Project
- Explore Projects

### 2. Foundation Intro

Purpose:

- explain what Walon-Foundation is

Copy direction:

Walon-Foundation is the umbrella for my software work. It is where I build useful open-source software, experiment with better systems, and make the difference between good software and bad software visible through real products.

### 3. Built by walonCode

Purpose:

- connect the foundation to the personal builder identity

Copy direction:

I am Mohamed Lamin Walon Jalloh, a software engineer building products, infrastructure, SDKs, developer tools, and applied systems. My work spans public-interest software, AI-powered applications, backend systems, and developer-facing tools.

### 4. What I Build

Purpose:

- group the work into categories that visitors can understand quickly
- make the software range legible at a glance

Suggested categories:

- Developer Tools
- Platforms and Products
- AI Systems
- SDKs and Infrastructure
- Experimental Software

### 5. Featured Work

Purpose:

- prove capability using real projects
- function as the core showcase section for the homepage

Recommended featured projects:

- `business-directory`
- `edu-ai`
- `tele-health`
- `health-chatbot`
- `monime-package`
- `backend-starter-cli`

Each project card should include:

- project name
- one-line summary
- category or stack tag
- future link to repo or case-study page

This section should feel like a true showcase, not a decorative project list.
It should help visitors immediately see breadth across:

- public-interest products
- developer tooling
- AI systems
- SDK and infrastructure work

### 6. Software Standards

Purpose:

- show the philosophy that differentiates the work

Suggested section title:

- What Good Software Means Here

Suggested ideas:

- useful before impressive
- clear before clever
- maintainable before rushed
- reliable before noisy
- open where possible
- built for real users, not just screenshots

### 7. Services

Purpose:

- convert clients

Suggested section title:

- Work With Me

Suggested services:

- contract engineering
- full-stack product development
- backend and API systems
- AI integrations and workflow tooling
- technical architecture
- MVP and prototype builds

### 8. Project Intake CTA

Purpose:

- route visitors into the future pricing or inquiry flow

Suggested title:

- Start a Project

Copy direction:

If you need software built well, whether it is a client platform, internal tool, backend system, or AI-powered product, start here. Tell me what you need, what stage you are at, and what kind of timeline you have.

Suggested CTA buttons:

- Request a Quote
- Discuss Your Project

### 9. Footer

Purpose:

- close with identity and navigation

Should include:

- GitHub
- Walon-Foundation name
- personal identity
- contact path
- future service / pricing link

## Future Project Intake / Pricing Page

This should be a separate page after the homepage is live.

Suggested route:

- `/start-a-project`

Recommended sections:

1. Intro
2. Services Overview
3. Project Types
4. Pricing Approach
5. Intake Form
6. Optional follow-up booking step

Suggested project types:

- landing pages
- full-stack apps
- internal tools
- APIs
- AI features
- SDK or package development

Recommended pricing approach:

- small scoped work
- medium product work
- long-term contract work
- custom quote

Suggested intake fields:

- name
- email
- company or project
- what needs to be built
- budget range
- timeline
- reference links

## Visual Direction

The website should feel like a software foundation and engineering studio, not a nonprofit brochure.

Recommended traits:

- strong typography
- editorial-tech feel
- visible grid structure
- warm light background with dark text
- one strong accent color
- restrained but deliberate motion
- project cards that feel substantial

It should not look like:

- a generic startup template
- a generic charity website
- a theme-heavy component demo

## Tooling Plan

Recommended implementation stack:

- Next.js 16
- React 19
- Tailwind CSS v4
- `motion` or `framer-motion`
- selective `shadcn/ui` primitives

Recommendation:

- use `motion` for clean section and hero animation unless a broader Framer Motion API is specifically needed
- use `shadcn/ui` only for targeted primitives such as buttons, cards, dialog, or form controls
- skip `daisyUI`

Why skip `daisyUI`:

- it is likely to push the design toward a theme-pack look instead of a distinct brand identity

## Implementation Plan

When building starts, implement in this order:

1. Replace starter metadata and base page structure
2. Build the homepage sections with static content
3. Establish the global visual system in CSS
4. Add motion and reveal behavior
5. Add featured project cards from real repo data
6. Add project inquiry CTAs
7. Refine responsiveness and polish

## Expected Files To Change

Main files:

- `app/page.tsx`
- `app/layout.tsx`
- `app/globals.css`

Probable additions:

- `app/start-a-project/page.tsx`
- local data file for featured projects
- small reusable section components
- future assets under `public/`

## Build Priorities

Phase 1:

- homepage structure
- messaging
- showcase positioning
- featured work
- services section
- project inquiry CTA

Phase 2:

- stronger motion
- section polish
- project metadata improvements
- start-a-project page

Phase 3:

- booking or pricing workflow
- richer case studies
- GitHub-driven project data if needed

## Decisions Locked For Now

- voice: `I`
- title direction: `Software Engineer`
- primary CTA: `Start a Project`
- secondary CTA: `Explore Projects`
- Walon-Foundation is the umbrella brand
- `walonCode` is the personal builder identity behind the work
- project inquiry comes before direct booking
- stack: `Tailwind + motion + selective shadcn/ui`

## Next Step

Begin implementation of the homepage based on this plan, then return to the dedicated project intake and pricing flow after the landing page is established.
