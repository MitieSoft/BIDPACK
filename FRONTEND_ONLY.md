# BIDPACK UK - FRONTEND ONLY MILESTONE BREAKDOWN
## Next.js 14+ + React + Tailwind CSS + TypeScript

---

## PROJECT OVERVIEW

**Product**: BIDPACK UK – Tender Compliance Operating System  
**Positioning**: "We stop construction contractors from getting disqualified before scoring."

**Frontend Tech Stack**:
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand or Redux Toolkit
- **Data Fetching**: React Query/TanStack Query
- **Forms**: React Hook Form + Zod
- **Tables**: ag-grid-react or tanstack-table
- **Notifications**: react-hot-toast or react-toastify
- **UI Components**: @headlessui/react
- **Icons**: @heroicons/react
- **Date Handling**: date-fns or dayjs

**Timeline**: 6 weeks  
**Budget**: ≤ $500

---

## FRONTEND ARCHITECTURE

```
┌─────────────────────────────────────────────────────────┐
│              NEXT.JS APP ROUTER STRUCTURE               │
│                                                           │
│  /app/                                                    │
│    ├── layout.tsx (root layout with Sidebar)            │
│    ├── page.tsx (home/dashboard)                         │
│    ├── login/page.tsx                                    │
│    ├── register/page.tsx                                 │
│    ├── dashboard/                                        │
│    │   ├── acu/page.tsx                                  │
│    │   └── ai-history/page.tsx                           │
│    ├── bids/                                             │
│    │   ├── page.tsx (list)                               │
│    │   ├── new/page.tsx                                  │
│    │   └── [id]/page.tsx (detail)                        │
│    ├── policies/                                         │
│    │   ├── page.tsx                                      │
│    │   ├── templates/page.tsx                            │
│    │   └── [id]/edit/page.tsx                            │
│    ├── method-statements/                                │
│    ├── settings/                                         │
│    └── admin/                                            │
│                                                           │
│  /components/                                            │
│    ├── Sidebar.tsx (Portal-style sidebar)                │
│    ├── Sidebar/                                          │
│    │   ├── SidebarHeader.tsx                             │
│    │   ├── NavItem.tsx                                   │
│    │   └── SidebarFooter.tsx                             │
│    ├── Header.tsx                                        │
│    ├── auth/                                             │
│    ├── bids/                                             │
│    ├── compliance/                                       │
│    ├── policies/                                         │
│    ├── method-statements/                                │
│    ├── social-value/                                     │
│    ├── acu/                                              │
│    ├── ai/                                               │
│    ├── export/                                           │
│    ├── admin/                                            │
│    ├── settings/                                         │
│    ├── subscription/                                     │
│    └── ui/ (reusable UI components)                      │
│                                                           │
│  /lib/                                                   │
│    ├── api/ (API service modules)                        │
│    ├── utils/ (utilities)                                │
│    └── auth.ts (auth utilities)                          │
│                                                           │
│  /store/ (Zustand/Redux stores)                          │
│    └── sidebarStore.ts (sidebar state)                  │
│  /hooks/ (custom React hooks)                            │
│    └── useSidebar.ts (sidebar hook)                      │
│  /types/ (TypeScript types)                              │
│  /styles/ (global styles, Tailwind config)               │
└─────────────────────────────────────────────────────────┘
```

---

## MILESTONE 0: FOUNDATION & INFRASTRUCTURE
**Duration**: Week 0 (Pre-development setup)
**Goal**: Frontend project foundation, environment setup, base components

### Frontend Tasks

#### 0.1 Project Initialization
- [ ] Initialize Next.js 14+ project (App Router)
- [ ] Install dependencies:
  - Next.js 14+
  - React 18+
  - TypeScript
  - Tailwind CSS
  - Axios or fetch API
  - React Hook Form (for form validation)
  - Zod (for schema validation)
  - Zustand or Redux Toolkit (for state management)
  - React Query/TanStack Query (for data fetching)
  - ag-grid-react or tanstack-table (for tables)
  - react-hot-toast or react-toastify (for notifications)
  - date-fns or dayjs (for date handling)
  - next-auth or custom auth (for authentication)
  - @headlessui/react (for accessible UI components)
  - @heroicons/react (for icons)
- [ ] Set up project structure:
  - `/app/` (App Router pages)
  - `/components/` (React components)
  - `/lib/` (utilities, API clients)
  - `/store/` (state management)
  - `/styles/` (global styles, Tailwind config)
  - `/types/` (TypeScript types)
  - `/hooks/` (custom React hooks)
  - `/middleware.ts` (Next.js middleware)
- [ ] Configure Next.js App Router
- [ ] Set up state management (Zustand/Redux)
- [ ] Configure Tailwind CSS:
  - Initialize Tailwind (`tailwind.config.ts`)
  - Set up `globals.css` with Tailwind directives
  - Configure custom theme colors, spacing, etc.
  - Set up dark mode (optional)
- [ ] Create base layout components
- [ ] Configure TypeScript

#### 0.2 API Client Setup
- [ ] Create API client utility (Axios or fetch wrapper)
- [ ] Set up request interceptor (add auth token)
- [ ] Set up response interceptor (handle errors, refresh token)
- [ ] Create API service modules:
  - `lib/api/authService.ts`
  - `lib/api/subscriptionService.ts`
  - `lib/api/acuService.ts`
  - `lib/api/bidService.ts`
  - `lib/api/policyService.ts`
  - `lib/api/methodStatementService.ts`
  - `lib/api/socialValueService.ts`
  - `lib/api/aiService.ts`
  - `lib/api/exportService.ts`
  - `lib/api/adminService.ts`
- [ ] Set up React Query hooks for data fetching
- [ ] Create custom hooks for API calls

#### 0.3 Base Components
- [ ] Create `app/layout.tsx` (root layout with header, sidebar, footer)
- [ ] Create `components/Header.tsx` (navigation, user menu)
- [ ] Create `components/Sidebar.tsx` (portal-style sidebar - see detailed spec below)
- [ ] Create `components/Footer.tsx`
- [ ] Create `components/LoadingSpinner.tsx`
- [ ] Create `components/ErrorMessage.tsx`
- [ ] Create `components/SuccessMessage.tsx`
- [ ] Create `components/PageHeader.tsx` (reusable page header)
- [ ] Set up global styles (`styles/globals.css` with Tailwind directives)
- [ ] Create `components/ui/` folder for reusable UI components:
  - `Button.tsx`
  - `Input.tsx`
  - `Modal.tsx`
  - `Badge.tsx`
  - `Card.tsx`
  - `Table.tsx`
  - `Dropdown.tsx`
  - `Tabs.tsx`
- [ ] Create Tailwind component utilities (e.g., `cn()` for className merging)

#### 0.3.1 Portal-Style Sidebar Specification

**Sidebar Features:**
- [ ] **Collapsible/Expandable**:
  - Toggle button (hamburger icon or collapse icon)
  - Smooth animation when expanding/collapsing
  - State persisted in localStorage
  - Collapsed width: ~64px (icons only)
  - Expanded width: ~256px (full width)

- [ ] **Navigation Structure**:
  - Logo/Brand section at top (collapsed: icon only, expanded: full logo)
  - Main navigation items with icons
  - Active route highlighting
  - Hover effects
  - Badge indicators (e.g., notification count)

- [ ] **Navigation Items** (with Heroicons):
  - Dashboard (`HomeIcon`) → `/dashboard`
  - Bids (`DocumentTextIcon`) → `/bids`
  - Policies (`FolderIcon`) → `/policies`
  - Method Statements (`ClipboardDocumentListIcon`) → `/method-statements`
  - ACU Dashboard (`CurrencyDollarIcon`) → `/dashboard/acu`
  - Settings (`Cog6ToothIcon`) → `/settings`
  - Admin (`ShieldCheckIcon`) → `/admin` (only if admin/owner)

- [ ] **User Section** (bottom of sidebar):
  - User avatar/initials
  - User name and email (expanded)
  - User role badge
  - ACU balance display (if authenticated)
  - Logout button

- [ ] **Mobile Responsive**:
  - Overlay sidebar on mobile (< 1024px)
  - Backdrop/overlay when open
  - Close on outside click
  - Slide in from left animation

- [ ] **Visual Design**:
  - Dark/light background (configurable)
  - Border-right separator
  - Shadow when collapsed
  - Smooth transitions
  - Icon + text layout (expanded)
  - Icon-only layout (collapsed)

- [ ] **Component Structure**:
  ```
  components/Sidebar.tsx
    ├── SidebarHeader (logo, collapse button)
    ├── SidebarNav (navigation items)
    │   ├── NavItem (individual nav item)
    │   └── NavGroup (grouped items, optional)
    └── SidebarFooter (user info, ACU balance, logout)
  ```

- [ ] **State Management**:
  - Sidebar collapsed/expanded state (Zustand/Context)
  - Active route tracking
  - Mobile menu open/close state

- [ ] **Accessibility**:
  - Keyboard navigation (Tab, Enter, Escape)
  - ARIA labels
  - Focus management
  - Screen reader support

#### 0.4 Authentication State Management
- [ ] Set up authentication store (Zustand/Redux):
  - State: user, token, isAuthenticated
  - Actions: setUser, setToken, logout, checkAuth
  - Selectors: isAuthenticated, currentUser, userRole
- [ ] Create auth context/provider (if using Context API)
- [ ] Set up Next.js middleware for route protection (`middleware.ts`)
- [ ] Create authentication utilities (`lib/auth.ts`)

### Acceptance Criteria - Milestone 0
- [ ] Frontend project boots locally (`npm run dev`)
- [ ] Tailwind CSS works correctly
- [ ] TypeScript compiles without errors
- [ ] API client can connect to backend (mock or real)
- [ ] Environment variables properly configured
- [ ] No linting errors
- [ ] Basic routing works (test with placeholder pages)
- [ ] Base layout renders correctly
- [ ] Header and Sidebar components render
- [ ] Loading and error components work

---

## MILESTONE 1: AUTHENTICATION, ORGANIZATIONS & SUBSCRIPTIONS
**Duration**: Week 1
**Dependencies**: Milestone 0
**Goal**: Users can register, login, manage organizations, and subscribe to plans

### Frontend Tasks

#### 1.1 Authentication UI
- [ ] **Login Page** (`app/login/page.tsx`)
  - Email input (React Hook Form + Zod validation)
  - Password input (React Hook Form + Zod validation)
  - Login button
  - "Forgot password?" link
  - "Don't have an account? Register" link
  - Error message display
  - Loading state

- [ ] **Register Page** (`app/register/page.tsx`)
  - First name input
  - Last name input
  - Email input (validation)
  - Password input (strength indicator)
  - Confirm password input
  - Company/Org name input
  - Register button
  - "Already have an account? Login" link
  - Error message display
  - Loading state

- [ ] **Forgot Password Page** (`app/forgot-password/page.tsx`)
  - Email input
  - Submit button
  - Success message

- [ ] **Reset Password Page** (`app/reset-password/[token]/page.tsx`)
  - New password input
  - Confirm password input
  - Submit button
  - Error handling

- [ ] Create `components/auth/LoginForm.tsx` component
- [ ] Create `components/auth/RegisterForm.tsx` component
- [ ] Create `components/auth/ForgotPasswordForm.tsx` component
- [ ] Create `components/auth/ResetPasswordForm.tsx` component

#### 1.2 Organization Management UI
- [ ] **Organization Settings Page** (`app/settings/organization/page.tsx`)
  - Org name display/edit
  - Member list table (ag-grid-react or tanstack-table with Tailwind styling)
  - Invite member button/modal
  - Role badges (Tailwind badge components)
  - Remove member action (with confirmation)

- [ ] Create `components/settings/OrgSettings.tsx` component
- [ ] Create `components/settings/MemberList.tsx` component
- [ ] Create `components/settings/InviteMemberModal.tsx` component

#### 1.3 Subscription Management UI
- [ ] **Subscription Page** (`app/settings/subscription/page.tsx`)
  - Current plan display (card)
  - Plan features comparison table
  - Upgrade button (if on Starter)
  - Downgrade button (if on Professional)
  - Cancel subscription button
  - Subscription status badge
  - Next billing date
  - Payment history link

- [ ] **Plan Selection Page** (`app/pricing/page.tsx` or `app/subscribe/page.tsx`)
  - Plan comparison cards (Starter vs Professional)
  - Feature lists
  - Pricing display
  - "Get Started" buttons → Stripe checkout

- [ ] Create `components/subscription/SubscriptionCard.tsx` component
- [ ] Create `components/subscription/PlanComparison.tsx` component
- [ ] Create `components/subscription/UpgradeModal.tsx` component
- [ ] Create `components/subscription/CancelSubscriptionModal.tsx` component

#### 1.4 ACU Dashboard UI
- [ ] **ACU Dashboard Page** (`app/dashboard/acu/page.tsx`)
  - Current balance (large display)
  - Monthly allocation display
  - Usage this month (progress bar with Tailwind)
  - Usage chart (recharts or chart.js with Tailwind styling)
  - Quick stats cards (Tailwind card components):
    - ACUs used today
    - ACUs used this month
    - ACUs remaining
  - Top-up button
  - Ledger table (ag-grid-react or tanstack-table with Tailwind styling):
    - Date
    - Type (debit/credit/grant/topup)
    - Amount
    - Balance After
    - Description
  - Filter by date range
  - Export ledger (CSV)

- [ ] **Top-up Modal** (`components/acu/TopUpModal.tsx`)
  - ACU package options:
    - 20 ACUs = £20
    - 50 ACUs = £45
    - 100 ACUs = £80
  - Stripe payment integration
  - Success/error handling

- [ ] Create `components/acu/ACUBalance.tsx` component
- [ ] Create `components/acu/ACUUsageChart.tsx` component
- [ ] Create `components/acu/ACULedger.tsx` component
- [ ] Create `components/acu/TopUpModal.tsx` component

#### 1.5 Navigation & Layout Updates
- [ ] Update `components/Header.tsx`:
  - User menu dropdown
  - ACU balance display (if authenticated)
  - Logout button
- [ ] Update `components/Sidebar.tsx`:
  - Dashboard link
  - Bids link (placeholder)
  - Policies link (placeholder)
  - Settings link
  - Admin link (if admin/owner)
- [ ] Add Next.js middleware (`middleware.ts`):
  - Require authentication for protected routes
  - Redirect to login if not authenticated
  - Redirect to subscription page if no active subscription

### Acceptance Criteria - Milestone 1
- [ ] Users can register and create organization
- [ ] Users can login and receive JWT token
- [ ] JWT authentication works on protected routes
- [ ] Org isolation enforced (users can't access other orgs' data)
- [ ] Role-based access control works (owner/admin/member)
- [ ] Stripe checkout integration works
- [ ] Plan limits enforced (Starter = 1 user max)
- [ ] ACU balance displays correctly
- [ ] ACU ledger shows transactions
- [ ] Top-up flow works end-to-end
- [ ] All UI components use Tailwind CSS utility classes
- [ ] All forms use React Hook Form with Zod validation
- [ ] Consistent Tailwind design system (colors, spacing, typography)
- [ ] Error handling works throughout
- [ ] Loading states work correctly
- [ ] Responsive design works on mobile/tablet/desktop

---

## MILESTONE 2: BID MANAGEMENT & COMPLIANCE MATRIX ENGINE
**Duration**: Week 2
**Dependencies**: Milestone 1
**Goal**: Users can create bids, manage bid sections, and use compliance matrix

### Frontend Tasks

#### 2.1 Bid Management UI
- [ ] **Bids List Page** (`app/bids/page.tsx`)
  - Bids table (ag-grid-react or tanstack-table with Tailwind styling):
    - Client name
    - Deadline (with color coding)
    - Status badge
    - Section count
    - Compliance status indicator
    - Actions (view, edit, delete)
  - Filter by status
  - Sort by deadline
  - Search by client name
  - "Create New Bid" button
  - Empty state message

- [ ] **Bid Detail Page** (`app/bids/[id]/page.tsx`)
  - Bid header:
    - Client name (editable)
    - Deadline (editable date picker)
    - Status dropdown
    - Actions (save, export, delete)
  - Tabs:
    - Overview
    - Sections
    - Compliance Matrix
    - Team
    - Social Value
  - Overview tab:
    - Bid info summary
    - Quick stats
    - Recent activity
  - Sections tab (see 2.2)
  - Compliance Matrix tab (see 2.3)
  - Team tab:
    - Team member list
    - Add member button
    - Remove member action

- [ ] **Create Bid Page** (`app/bids/new/page.tsx`)
  - Form:
    - Client name input
    - Deadline date picker
    - Initial status (default: draft)
  - Create button
  - Cancel button

- [ ] Create `components/bids/BidList.tsx` component
- [ ] Create `components/bids/BidCard.tsx` component (for card view option)
- [ ] Create `components/bids/BidDetail.tsx` component
- [ ] Create `components/bids/BidForm.tsx` component
- [ ] Create `components/bids/BidHeader.tsx` component
- [ ] Create `components/bids/BidTabs.tsx` component
- [ ] Create `components/bids/TeamManagement.tsx` component

#### 2.2 Bid Sections UI
- [ ] **Sections Tab** (within Bid Detail)
  - Section list (grouped by type):
    - Policies
    - Method Statements
    - CVs
    - Case Studies
    - Insurances
    - Other
  - Add section button (dropdown with types)
  - Section cards:
    - Section name
    - Preview (truncated)
    - Version badge (if Professional)
    - Actions (edit, delete, view versions)
  - Section editor modal:
    - Rich text editor (or textarea)
    - Section name input
    - Save button
    - Cancel button
    - AI assist button (placeholder for Milestone 4)

- [ ] Create `components/bids/BidSections.tsx` component
- [ ] Create `components/bids/SectionList.tsx` component
- [ ] Create `components/bids/SectionCard.tsx` component
- [ ] Create `components/bids/SectionEditor.tsx` component (modal)
- [ ] Create `components/bids/SectionTypeSelector.tsx` component

#### 2.3 Compliance Matrix UI
- [ ] **Compliance Matrix Tab** (within Bid Detail)
  - Requirements input area:
    - Textarea for pasting requirements
    - "Parse Requirements" button
    - Or list input (add requirement button)
  - Matrix table (ag-grid-react or tanstack-table with Tailwind styling):
    - Requirement text
    - Status indicator (☐ Covered / ⚠️ Missing / ✗ Non-compliant)
    - Mapped to (section name/link)
    - Category
    - Actions (map, edit status, delete)
  - Compliance summary card:
    - Total requirements
    - Covered count (with percentage)
    - Missing count
    - Non-compliant count
    - Progress bar
  - Auto-map button (triggers backend mapping)
  - Manual mapping modal:
    - Search sections
    - Select section to map
    - Confirm mapping

- [ ] Create `components/compliance/ComplianceMatrix.tsx` component
- [ ] Create `components/compliance/RequirementInput.tsx` component
- [ ] Create `components/compliance/ComplianceTable.tsx` component
- [ ] Create `components/compliance/ComplianceSummary.tsx` component
- [ ] Create `components/compliance/StatusIndicator.tsx` component (☐/⚠️/✗ icons)
- [ ] Create `components/compliance/MappingModal.tsx` component

#### 2.4 Version History UI (Professional Only)
- [ ] **Version History Modal**
  - Version list (chronological)
  - Version details:
    - Version number
    - Date/time
    - Author
    - Preview
  - Restore button (with confirmation)
  - Compare versions (optional)

- [ ] Create `components/bids/VersionHistory.tsx` component
- [ ] Create `components/bids/VersionList.tsx` component

### Acceptance Criteria - Milestone 2
- [ ] Users can create, edit, delete bids
- [ ] Bid status workflow works (draft → in_progress → ready → submitted)
- [ ] Team member assignment works
- [ ] Requirements can be input (text or list)
- [ ] Auto-mapping to existing content works
- [ ] Compliance matrix displays correctly
- [ ] Status indicators show correct states
- [ ] Manual mapping works
- [ ] Compliance validation blocks export if gaps exist
- [ ] Version history works (Professional plan only)
- [ ] Org isolation enforced (users can't see other orgs' bids)
- [ ] All UI responsive using Tailwind CSS responsive utilities (sm:, md:, lg:, xl:)
- [ ] Tables are sortable, filterable, and paginated
- [ ] Forms validate correctly
- [ ] Modals work correctly

---

## MILESTONE 3: POLICY LIBRARY, METHOD STATEMENTS & SOCIAL VALUE
**Duration**: Week 3
**Dependencies**: Milestone 2
**Goal**: Users can create and manage policies, method statements, and social value data

### Frontend Tasks

#### 3.1 Policy Library UI
- [ ] **Policy Library Page** (`app/policies/page.tsx`)
  - Policy list (ag-grid-react or tanstack-table with Tailwind styling):
    - Policy type badge
    - Title
    - Last updated date
    - Version (if Professional)
    - Actions (view, edit, duplicate, delete)
  - Filter by policy type
  - Search by title
  - "Create New Policy" button
  - "Browse Templates" button

- [ ] **Policy Templates Page** (`app/policies/templates/page.tsx`)
  - Template cards (12 mandatory + optional)
  - Policy type badges
  - Description for each type
  - "Use Template" button → Create policy from template

- [ ] **Policy Editor Page** (`app/policies/[id]/edit/page.tsx`)
  - Form:
    - Policy type (dropdown, disabled if editing)
    - Title input
    - Rich text editor (or textarea) for content
  - Save button
  - Cancel button
  - AI assist button (placeholder for Milestone 4)
  - Version history button (if Professional)
  - "Assign to Bid" button (opens bid selector)

- [ ] **Policy Detail Page** (`app/policies/[id]/page.tsx`)
  - Policy content display
  - Metadata (type, version, last updated)
  - Actions (edit, duplicate, assign to bid, delete)
  - Version history (if Professional)

- [ ] Create `components/policies/PolicyLibrary.tsx` component
- [ ] Create `components/policies/PolicyList.tsx` component
- [ ] Create `components/policies/PolicyCard.tsx` component
- [ ] Create `components/policies/PolicyEditor.tsx` component
- [ ] Create `components/policies/PolicyTemplates.tsx` component
- [ ] Create `components/policies/PolicyTypeBadge.tsx` component
- [ ] Create `components/policies/AssignToBidModal.tsx` component

#### 3.2 Method Statement Builder UI
- [ ] **Method Statements Page** (`app/method-statements/page.tsx`)
  - Method statement list (ag-grid-react or tanstack-table with Tailwind styling):
    - Trade type badge
    - Title
    - Last updated
    - Version
    - Actions (view, edit, duplicate, delete)
  - Filter by trade type
  - "Create New Method Statement" button
  - "Browse Trade Presets" button

- [ ] **Trade Presets Page** (`app/method-statements/presets/page.tsx`)
  - Trade preset cards (5 types)
  - Trade type badges
  - Description
  - "Use Preset" button → Create from preset

- [ ] **Method Statement Builder Page** (`app/method-statements/[id]/edit/page.tsx`)
  - Form:
    - Trade type (dropdown, disabled if editing)
    - Title input
    - Section tabs/accordion:
      - Scope of Works
      - Resources
      - Plant & Materials
      - H&S Controls
      - RAMS
      - Environmental Controls
      - QA
      - Emergency Procedures
    - Rich text editor for each section
  - Save button (saves all sections)
  - Cancel button
  - AI assist button per section (placeholder)
  - Version history button (if Professional)
  - "Assign to Bid" button

- [ ] **Method Statement Detail Page** (`app/method-statements/[id]/page.tsx`)
  - Method statement content display
  - All sections visible
  - Metadata
  - Actions (edit, duplicate, assign to bid, delete)

- [ ] Create `components/method-statements/MethodStatementLibrary.tsx` component
- [ ] Create `components/method-statements/MethodStatementList.tsx` component
- [ ] Create `components/method-statements/MethodStatementBuilder.tsx` component
- [ ] Create `components/method-statements/MethodStatementSections.tsx` component (accordion/tabs)
- [ ] Create `components/method-statements/SectionEditor.tsx` component (reusable)
- [ ] Create `components/method-statements/TradePresets.tsx` component
- [ ] Create `components/method-statements/TradeTypeBadge.tsx` component

#### 3.3 Social Value Builder UI
- [ ] **Social Value Tab** (within Bid Detail)
  - Form with KPI inputs:
    - Local Employment (number input)
    - Apprenticeships (number input)
    - SME Spend % (number input with %)
    - Carbon Reduction (kg) (number input)
    - Community Engagement (hours) (number input)
  - KPI Summary Table:
    - All KPIs listed
    - Values displayed
    - PPN 06/20 compliance indicators
  - Save button
  - Clear button
  - Help text for each KPI

- [ ] Create `components/social-value/SocialValueForm.tsx` component
- [ ] Create `components/social-value/KPIInput.tsx` component
- [ ] Create `components/social-value/KPISummary.tsx` component
- [ ] Create `components/social-value/PPNComplianceIndicator.tsx` component

### Acceptance Criteria - Milestone 3
- [ ] Users can create policies from templates
- [ ] Users can edit policies
- [ ] Policy versioning works (Professional only)
- [ ] Policies can be assigned to bids
- [ ] Method statements can be created from trade presets
- [ ] Method statement builder works with all sections
- [ ] Method statements can be assigned to bids
- [ ] Social value form captures all KPIs
- [ ] KPI summary calculates correctly
- [ ] PPN 06/20 compliance indicators work
- [ ] All content is reusable across bids
- [ ] Version history works for policies and method statements (Professional)
- [ ] Org isolation enforced
- [ ] Rich text editors work correctly
- [ ] Tabs/accordions work smoothly
- [ ] All forms validate and save correctly

---

## MILESTONE 4: AI GATEWAY (ACU-METERED) & EXPORT ENGINE
**Duration**: Week 4
**Dependencies**: Milestone 3
**Goal**: AI assistance works with ACU metering, exports generate submission packs

### Frontend Tasks

#### 4.1 AI Integration UI

**4.1.1 AI Confirmation Modal (MANDATORY)**
- [ ] Create `components/ai/AIConfirmationModal.tsx`:
  - Display ACUs required
  - Display current balance
  - Display balance after (if proceeds)
  - Warning if balance low
  - Confirm button
  - Cancel button
  - Loading state during execution

**4.1.2 AI Action Buttons**
- [ ] Add AI buttons to:
  - Policy editor ("Generate Paragraph" button)
  - Method statement section editor ("Refine Section" button)
  - Compliance matrix ("Explain Gap" button)
  - Social value form ("Refine Social Value" button)

**4.1.3 AI Usage History**
- [ ] **AI Usage History Page** (`app/dashboard/ai-history/page.tsx`)
  - History table (ag-grid-react or tanstack-table with Tailwind styling):
    - Date/time
    - Action type
    - ACUs used
    - Tokens used
    - Status
    - Preview result (truncated)
  - Filter by action type, date range
  - Export history (CSV)

**4.1.4 AI Paused Screen**
- [ ] Create `components/ai/AIPausedScreen.tsx`:
  - Display when ACU balance = 0
  - Message: "AI assistance is paused due to insufficient ACUs"
  - Show top-up button
  - Show monthly grant info

- [ ] Create `components/ai/AIActionButton.tsx` component (reusable)
- [ ] Create `components/ai/AIUsageHistory.tsx` component
- [ ] Update all editors to include AI buttons

#### 4.2 Export Interface UI

**4.2.1 Export Button & Flow**
- [ ] Add "Export Submission Pack" button to Bid Detail page
- [ ] Export confirmation modal:
  - Show compliance status
  - Warn if gaps exist (block export)
  - Show export options (ZIP, PDF, both)
  - Confirm button
- [ ] Export status display:
  - Show progress if processing
  - Show download button when ready
  - Show error if failed

**4.2.2 Export History**
- [ ] Export history section in Bid Detail:
  - List previous exports
  - Download links
  - Export dates

- [ ] Create `components/export/ExportButton.tsx` component
- [ ] Create `components/export/ExportConfirmationModal.tsx` component
- [ ] Create `components/export/ExportStatus.tsx` component
- [ ] Create `components/export/ExportHistory.tsx` component

### Acceptance Criteria - Milestone 4
- [ ] AI confirmation modal shows before every AI action
- [ ] AI requests are logged and displayed
- [ ] AI usage history displays correctly
- [ ] AI paused screen shows when balance = 0
- [ ] Export validation blocks non-compliant bids
- [ ] Export status shows progress
- [ ] Download links work securely
- [ ] All AI buttons work correctly
- [ ] ACU balance updates in real-time after AI actions
- [ ] Error handling works for AI failures
- [ ] Export history displays correctly

---

## MILESTONE 5: ADMIN PANEL & SECURITY HARDENING
**Duration**: Week 5
**Dependencies**: Milestone 4
**Goal**: Admins can control system, security hardened, abuse prevention

### Frontend Tasks

#### 5.1 Admin Panel UI

**5.1.1 Admin Dashboard**
- [ ] **Admin Dashboard Page** (`app/admin/page.tsx`)
  - Overview cards:
    - Total orgs
    - Active subscriptions
    - Total ACU usage
    - Total AI requests
  - Quick actions:
    - Toggle global AI kill switch
    - View abuse flags
    - View system logs
  - Recent activity feed

**5.1.2 Global AI Controls**
- [ ] **AI Controls Page** (`app/admin/ai-controls/page.tsx`)
  - Global kill switch toggle (large, prominent)
  - Global limits settings:
    - Max ACUs per request
    - Max ACUs per day (global)
    - Max ACUs per month (global)
  - Save button
  - Confirmation modals for critical actions

**5.1.3 Organization Management**
- [ ] **Organizations Page** (`app/admin/orgs/page.tsx`)
  - Org table (ag-grid-react or tanstack-table with Tailwind styling):
    - Org name
    - Subscription status
    - User count
    - ACU usage
    - Abuse flag indicator
    - Actions (view, edit, suspend)
  - Search and filters
  - "View Details" → Org detail page

- [ ] **Org Detail Page** (`app/admin/orgs/[orgId]/page.tsx`)
  - Org info
  - Subscription details
  - User list
  - ACU usage chart
  - AI request history
  - Abuse flags
  - Actions (suspend, flag, set limits)

**5.1.4 ACU Management**
- [ ] **ACU Management Page** (`app/admin/acu/page.tsx`)
  - Global ledger viewer (ag-grid-react or tanstack-table with Tailwind styling)
  - Filter by org, date, type
  - Export to CSV
  - Set org-specific limits modal

**5.1.5 Abuse Detection**
- [ ] **Abuse Detection Page** (`app/admin/abuse/page.tsx`)
  - Flagged orgs list
  - Flag reasons
  - Auto-detected patterns
  - Manual flag/unflag actions
  - Suspend org button

**5.1.6 Analytics**
- [ ] **Analytics Page** (`app/admin/analytics/page.tsx`)
  - Overview charts:
    - ACU usage over time
    - AI requests over time
    - Org growth
    - Subscription distribution
  - Export reports button

- [ ] Create `components/admin/AdminDashboard.tsx` component
- [ ] Create `components/admin/GlobalAIToggle.tsx` component
- [ ] Create `components/admin/ACULimitsManager.tsx` component
- [ ] Create `components/admin/OrgManagement.tsx` component
- [ ] Create `components/admin/OrgDetail.tsx` component
- [ ] Create `components/admin/AbuseDetection.tsx` component
- [ ] Create `components/admin/LedgerViewer.tsx` component
- [ ] Create `components/admin/AnalyticsDashboard.tsx` component

#### 5.2 Security UI Updates

**5.2.1 Route Guards**
- [ ] Add admin route guard:
  - Check user role = 'owner' or 'admin'
  - Check org has admin privileges
  - Redirect if unauthorized

**5.2.2 Error Handling**
- [ ] Improve error messages:
  - User-friendly messages
  - Technical details for admins
  - Error codes for support

**5.2.3 Loading States**
- [ ] Add loading indicators to all async operations
- [ ] Add skeleton loaders for data tables

**5.2.4 Validation Feedback**
- [ ] Improve form validation:
  - Real-time validation
  - Clear error messages
  - Success confirmations

### Acceptance Criteria - Milestone 5
- [ ] Admin can toggle global AI kill switch
- [ ] Admin can set org-specific ACU limits
- [ ] Admin can view all orgs and their stats
- [ ] Admin can flag/unflag orgs for abuse
- [ ] Abuse detection flags suspicious activity
- [ ] Admin can view full ACU ledger
- [ ] Admin can view analytics
- [ ] Admin routes are protected
- [ ] Error handling is comprehensive
- [ ] All UI responsive and accessible
- [ ] Charts and graphs display correctly
- [ ] Admin actions require confirmation

---

## MILESTONE 6: TESTING, UX POLISH & LAUNCH PREPARATION
**Duration**: Week 6
**Dependencies**: Milestone 5
**Goal**: Production-ready frontend, tested, polished, demo pack ready

### Frontend Tasks

#### 6.1 Testing

**6.1.1 Component Tests**
- [ ] Test form components:
  - Validation
  - Submission
  - Error handling
- [ ] Test table components:
  - Sorting
  - Filtering
  - Pagination
- [ ] Test modal components:
  - Open/close
  - Confirmation flows

**6.1.2 Integration Tests**
- [ ] Test API integration:
  - All service calls
  - Error handling
  - Loading states
- [ ] Test state management (Zustand/Redux):
  - State updates
  - Actions
  - Selectors

**6.1.3 E2E Tests**
- [ ] User flows:
  - Login → Create bid → Add compliance → Export
  - Subscribe → Use AI → Top up ACUs
  - Admin → Manage orgs → View analytics

#### 6.2 UX Polish

**6.2.1 Loading States**
- [ ] Add loading spinners to all async operations
- [ ] Add skeleton loaders for data tables
- [ ] Add progress indicators for long operations (exports)

**6.2.2 Error Messages**
- [ ] User-friendly error messages
- [ ] Error toast notifications (react-hot-toast or react-toastify)
- [ ] Inline form errors
- [ ] Network error handling

**6.2.3 Success Feedback**
- [ ] Success toast notifications
- [ ] Confirmation messages
- [ ] Success states in forms

**6.2.4 Empty States**
- [ ] Empty state messages for:
  - No bids
  - No policies
  - No method statements
  - No AI history
- [ ] Call-to-action buttons in empty states

**6.2.5 Responsive Design**
- [ ] Test on mobile devices
- [ ] Test on tablets
- [ ] Test on different screen sizes
- [ ] Fix layout issues

**6.2.6 Accessibility**
- [ ] Add ARIA labels
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Color contrast compliance

**6.2.7 UI Consistency**
- [ ] Consistent button styles
- [ ] Consistent form styles
- [ ] Consistent table styles
- [ ] Consistent modal styles
- [ ] Consistent color scheme (Tailwind theme colors)

#### 6.3 Demo Pack Preparation

**6.3.1 Demo Data**
- [ ] Create demo organization
- [ ] Create demo bid with:
  - All section types
  - Compliance matrix filled
  - Social value data
  - Team members assigned
- [ ] Create sample policies
- [ ] Create sample method statements
- [ ] Create sample export

**6.3.2 Onboarding Flow**
- [ ] Welcome screen for new users
- [ ] Guided tour (optional)
- [ ] Sample data import option
- [ ] Help documentation links

**6.3.3 Landing Page** (if separate)
- [ ] Hero section with positioning statement
- [ ] Features section
- [ ] Pricing section
- [ ] Testimonials (if available)
- [ ] CTA buttons

#### 6.4 Final Checks

**6.4.1 Code Quality**
- [ ] Run linter (fix all errors)
- [ ] Run formatter (consistent formatting)
- [ ] Remove console.logs
- [ ] Remove commented code
- [ ] Code review

**6.4.2 Browser Compatibility**
- [ ] Test on Chrome
- [ ] Test on Firefox
- [ ] Test on Safari
- [ ] Test on Edge

**6.4.3 Performance**
- [ ] Bundle size optimization
- [ ] Image optimization
- [ ] Lazy loading
- [ ] Code splitting

### Acceptance Criteria - Milestone 6

**Functional Requirements**
- [ ] All features work as specified
- [ ] No critical bugs
- [ ] All tests pass
- [ ] Performance meets requirements (< 2s non-AI, < 10s AI)
- [ ] Export validation blocks non-compliant bids
- [ ] ACU system prevents abuse
- [ ] AI never executes without ACUs
- [ ] Token limits never exceeded

**Non-Functional Requirements**
- [ ] Responsive design works
- [ ] Accessibility standards met
- [ ] Error handling comprehensive
- [ ] Loading states everywhere
- [ ] Success feedback everywhere
- [ ] Smooth animations and transitions

**Launch Readiness**
- [ ] Demo pack ready
- [ ] Documentation complete
- [ ] Environment variables documented
- [ ] No console errors
- [ ] All images optimized
- [ ] SEO meta tags added (if needed)

**Success Metrics**
- [ ] User onboarding smooth
- [ ] No critical security vulnerabilities
- [ ] Fast page load times
- [ ] Smooth user experience

---

## COMPONENT INVENTORY

### Base Components
- `components/Header.tsx`
- `components/Sidebar.tsx` (Portal-style with collapse/expand)
- `components/Sidebar/SidebarHeader.tsx`
- `components/Sidebar/NavItem.tsx`
- `components/Sidebar/SidebarFooter.tsx`
- `components/Footer.tsx`
- `components/LoadingSpinner.tsx`
- `components/ErrorMessage.tsx`
- `components/SuccessMessage.tsx`
- `components/PageHeader.tsx`

### UI Components (`components/ui/`)
- `Button.tsx`
- `Input.tsx`
- `Modal.tsx`
- `Badge.tsx`
- `Card.tsx`
- `Table.tsx`
- `Dropdown.tsx`
- `Tabs.tsx`
- `Select.tsx`
- `Checkbox.tsx`
- `Radio.tsx`
- `Textarea.tsx`
- `DatePicker.tsx`
- `ProgressBar.tsx`
- `Tooltip.tsx`
- `Popover.tsx`

### Auth Components (`components/auth/`)
- `LoginForm.tsx`
- `RegisterForm.tsx`
- `ForgotPasswordForm.tsx`
- `ResetPasswordForm.tsx`

### Bid Components (`components/bids/`)
- `BidList.tsx`
- `BidCard.tsx`
- `BidDetail.tsx`
- `BidForm.tsx`
- `BidHeader.tsx`
- `BidTabs.tsx`
- `BidSections.tsx`
- `SectionList.tsx`
- `SectionCard.tsx`
- `SectionEditor.tsx`
- `SectionTypeSelector.tsx`
- `TeamManagement.tsx`
- `VersionHistory.tsx`
- `VersionList.tsx`

### Compliance Components (`components/compliance/`)
- `ComplianceMatrix.tsx`
- `RequirementInput.tsx`
- `ComplianceTable.tsx`
- `ComplianceSummary.tsx`
- `StatusIndicator.tsx`
- `MappingModal.tsx`

### Policy Components (`components/policies/`)
- `PolicyLibrary.tsx`
- `PolicyList.tsx`
- `PolicyCard.tsx`
- `PolicyEditor.tsx`
- `PolicyTemplates.tsx`
- `PolicyTypeBadge.tsx`
- `AssignToBidModal.tsx`

### Method Statement Components (`components/method-statements/`)
- `MethodStatementLibrary.tsx`
- `MethodStatementList.tsx`
- `MethodStatementBuilder.tsx`
- `MethodStatementSections.tsx`
- `SectionEditor.tsx`
- `TradePresets.tsx`
- `TradeTypeBadge.tsx`

### Social Value Components (`components/social-value/`)
- `SocialValueForm.tsx`
- `KPIInput.tsx`
- `KPISummary.tsx`
- `PPNComplianceIndicator.tsx`

### ACU Components (`components/acu/`)
- `ACUBalance.tsx`
- `ACUUsageChart.tsx`
- `ACULedger.tsx`
- `TopUpModal.tsx`

### AI Components (`components/ai/`)
- `AIConfirmationModal.tsx`
- `AIActionButton.tsx`
- `AIUsageHistory.tsx`
- `AIPausedScreen.tsx`

### Export Components (`components/export/`)
- `ExportButton.tsx`
- `ExportConfirmationModal.tsx`
- `ExportStatus.tsx`
- `ExportHistory.tsx`

### Admin Components (`components/admin/`)
- `AdminDashboard.tsx`
- `GlobalAIToggle.tsx`
- `ACULimitsManager.tsx`
- `OrgManagement.tsx`
- `OrgDetail.tsx`
- `AbuseDetection.tsx`
- `LedgerViewer.tsx`
- `AnalyticsDashboard.tsx`

### Settings Components (`components/settings/`)
- `OrgSettings.tsx`
- `MemberList.tsx`
- `InviteMemberModal.tsx`

### Subscription Components (`components/subscription/`)
- `SubscriptionCard.tsx`
- `PlanComparison.tsx`
- `UpgradeModal.tsx`
- `CancelSubscriptionModal.tsx`

---

## PAGE ROUTES SUMMARY

### Public Routes
- `/` - Landing/Home page
- `/login` - Login page
- `/register` - Registration page
- `/forgot-password` - Forgot password page
- `/reset-password/[token]` - Reset password page
- `/pricing` - Pricing/Plan selection page

### Protected Routes (Require Auth)
- `/dashboard` - Main dashboard
- `/dashboard/acu` - ACU dashboard
- `/dashboard/ai-history` - AI usage history
- `/bids` - Bids list
- `/bids/new` - Create new bid
- `/bids/[id]` - Bid detail
- `/policies` - Policy library
- `/policies/templates` - Policy templates
- `/policies/[id]` - Policy detail
- `/policies/[id]/edit` - Policy editor
- `/method-statements` - Method statements list
- `/method-statements/presets` - Trade presets
- `/method-statements/[id]` - Method statement detail
- `/method-statements/[id]/edit` - Method statement builder
- `/settings/organization` - Organization settings
- `/settings/subscription` - Subscription settings

### Admin Routes (Require Admin Role)
- `/admin` - Admin dashboard
- `/admin/ai-controls` - Global AI controls
- `/admin/orgs` - Organization management
- `/admin/orgs/[orgId]` - Org detail
- `/admin/acu` - ACU management
- `/admin/abuse` - Abuse detection
- `/admin/analytics` - Analytics dashboard

---

## API SERVICE MODULES

### Required API Services (`lib/api/`)
- `authService.ts` - Authentication endpoints
- `subscriptionService.ts` - Subscription management
- `acuService.ts` - ACU balance and ledger
- `bidService.ts` - Bid CRUD operations
- `policyService.ts` - Policy management
- `methodStatementService.ts` - Method statement management
- `socialValueService.ts` - Social value data
- `aiService.ts` - AI gateway (quote, execute, history)
- `exportService.ts` - Export generation
- `adminService.ts` - Admin endpoints

---

## STATE MANAGEMENT STRUCTURE

### Auth Store (Zustand/Redux)
```typescript
{
  user: User | null
  token: string | null
  isAuthenticated: boolean
  org: Organization | null
  subscription: Subscription | null
}
```

### Actions
- `setUser(user)`
- `setToken(token)`
- `logout()`
- `checkAuth()`
- `setOrg(org)`
- `setSubscription(subscription)`

---

## TAILWIND DESIGN SYSTEM

### Colors
- Primary: Blue scale (primary-50 to primary-900)
- Success: Green
- Warning: Yellow/Orange
- Error: Red
- Neutral: Gray scale

### Spacing
- Use Tailwind spacing scale (p-4, m-2, gap-6, etc.)

### Typography
- Headings: font-bold, text-xl, text-2xl, text-3xl
- Body: text-base, text-sm
- Links: text-primary-600, hover:text-primary-700

### Components
- Buttons: Primary, Secondary, Danger variants
- Cards: Shadow, rounded, padding
- Forms: Input styling, error states
- Tables: Striped rows, hover effects
- Modals: Backdrop, centered, responsive

---

## CRITICAL FRONTEND FLOWS

### 1. AI Request Flow (MANDATORY)
```
User clicks AI action button
    ↓
Show AIConfirmationModal
    ↓
User confirms
    ↓
Call POST /api/ai/quote
    ↓
Display quote (ACUs required, balance)
    ↓
Call POST /api/ai/execute
    ↓
Show loading state
    ↓
Display result
    ↓
Update ACU balance in UI
    ↓
Show success notification
```

### 2. Export Flow (MANDATORY)
```
User clicks Export button
    ↓
Call POST /api/bids/:id/export/validate
    ↓
If validation fails → Show error, block export
    ↓
If validation passes → Show ExportConfirmationModal
    ↓
User confirms export
    ↓
Call POST /api/bids/:id/export/prepare
    ↓
Show export status (processing)
    ↓
Poll GET /api/bids/:id/export/status/:jobId
    ↓
When completed → Show download button
    ↓
User clicks download → GET /api/bids/:id/export/download/:jobId
```

### 3. Compliance Validation Flow
```
User adds requirements
    ↓
Call POST /api/bids/:id/compliance/requirements
    ↓
Display compliance matrix
    ↓
Auto-map button → Call backend mapping
    ↓
Display mapped requirements
    ↓
User tries to export
    ↓
Call POST /api/bids/:id/compliance/validate-export
    ↓
If gaps exist → Show error, block export
    ↓
If covered → Allow export
```

---

## FRONTEND DEPENDENCIES SUMMARY

### Core
- next: ^14.0.0
- react: ^18.2.0
- react-dom: ^18.2.0
- typescript: ^5.2.0

### Styling
- tailwindcss: ^3.3.0
- autoprefixer: ^10.4.0
- postcss: ^8.4.0

### State & Data
- zustand: ^4.4.0 (or @reduxjs/toolkit)
- @tanstack/react-query: ^5.0.0
- axios: ^1.6.0

### Forms & Validation
- react-hook-form: ^7.48.0
- zod: ^3.22.0
- @hookform/resolvers: ^3.3.0

### UI Components
- @headlessui/react: ^1.7.0
- @heroicons/react: ^2.0.0

### Tables
- @tanstack/react-table: ^8.10.0 (or ag-grid-react)

### Notifications
- react-hot-toast: ^2.4.0 (or react-toastify)

### Utilities
- date-fns: ^2.30.0 (or dayjs)
- clsx: ^2.0.0
- tailwind-merge: ^2.0.0

---

## ENVIRONMENT VARIABLES

### Required (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## FRONTEND ACCEPTANCE CRITERIA SUMMARY

### Must Have (Go/No-Go)
- [ ] All pages render without errors
- [ ] Authentication flow works end-to-end
- [ ] Protected routes redirect to login
- [ ] Forms validate correctly
- [ ] API calls handle errors gracefully
- [ ] Loading states show during async operations
- [ ] Responsive design works on all devices
- [ ] Tailwind CSS classes used consistently
- [ ] TypeScript types are correct
- [ ] No console errors in production

### Performance Targets
- [ ] Page load time < 2s
- [ ] API response handling < 500ms
- [ ] Smooth animations (60fps)
- [ ] Optimized bundle size

### UX Requirements
- [ ] Intuitive navigation
- [ ] Clear error messages
- [ ] Success feedback
- [ ] Empty states
- [ ] Loading indicators
- [ ] Accessible (WCAG 2.1 AA)

---

## PORTAL SIDEBAR DETAILED SPECIFICATION

### Sidebar Component Structure

**File**: `components/Sidebar.tsx`

**Props**:
```typescript
interface SidebarProps {
  className?: string
}
```

**Features**:
1. **Collapsible/Expandable**:
   - Toggle button (hamburger icon or collapse icon)
   - Smooth animation when expanding/collapsing
   - State persisted in localStorage
   - Collapsed width: ~64px (icons only)
   - Expanded width: ~256px (full width)

2. **Navigation Structure**:
   - Logo/Brand section at top (collapsed: icon only, expanded: full logo)
   - Main navigation items with icons
   - Active route highlighting
   - Hover effects
   - Badge indicators (e.g., notification count)

3. **Navigation Items** (with Heroicons):
   ```typescript
   const navItems = [
     {
       name: 'Dashboard',
       href: '/dashboard',
       icon: HomeIcon,
       badge: null
     },
     {
       name: 'Bids',
       href: '/bids',
       icon: DocumentTextIcon,
       badge: null
     },
     {
       name: 'Policies',
       href: '/policies',
       icon: FolderIcon,
       badge: null
     },
     {
       name: 'Method Statements',
       href: '/method-statements',
       icon: ClipboardDocumentListIcon,
       badge: null
     },
     {
       name: 'ACU Dashboard',
       href: '/dashboard/acu',
       icon: CurrencyDollarIcon,
       badge: 'balance' // Shows ACU balance
     },
     {
       name: 'Settings',
       href: '/settings',
       icon: Cog6ToothIcon,
       badge: null
     },
     {
       name: 'Admin',
       href: '/admin',
       icon: ShieldCheckIcon,
       badge: null,
       requireRole: ['owner', 'admin']
     }
   ]
   ```

4. **Visual States**:
   - **Expanded**: Full width (256px), icon + text visible
   - **Collapsed**: Narrow (64px), icons only with tooltips
   - **Active**: Highlighted background, primary color text
   - **Hover**: Subtle background change
   - **Mobile**: Overlay sidebar, full height, backdrop

5. **User Section** (Footer):
   - User avatar (initials or image)
   - User name and email (expanded only)
   - Role badge (Owner/Admin/Member)
   - ACU balance (if authenticated)
   - Logout button

6. **Responsive Behavior**:
   - Desktop (≥1024px): Fixed sidebar, collapse/expand
   - Tablet (768px-1023px): Collapsible sidebar
   - Mobile (<768px): Overlay sidebar with backdrop

### Sidebar Sub-Components

**SidebarHeader.tsx**:
- Logo/Brand (full logo when expanded, icon when collapsed)
- Collapse/Expand toggle button
- Smooth icon rotation animation

**NavItem.tsx**:
- Icon + label layout
- Active state detection (usePathname from next/navigation)
- Badge support (notifications, counts)
- Tooltip on hover when collapsed
- Smooth hover transitions

**SidebarFooter.tsx**:
- User avatar circle
- User info (name, email, role)
- ACU balance card
- Logout button with confirmation

### Tailwind Classes for Sidebar

```css
/* Sidebar Container */
sidebar-container: "fixed left-0 top-0 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out z-30"

/* Expanded State */
sidebar-expanded: "w-64"

/* Collapsed State */
sidebar-collapsed: "w-16"

/* Mobile Overlay */
sidebar-mobile: "fixed inset-0 bg-black/50 z-40 lg:hidden"

/* Nav Item */
nav-item: "flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"

/* Active Nav Item */
nav-item-active: "bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400 font-medium"

/* Tooltip (when collapsed) */
nav-tooltip: "absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded shadow-lg whitespace-nowrap z-50"
```

### Implementation Notes

1. **State Management**:
   - Use Zustand store for sidebar state
   - Persist `isCollapsed` to localStorage
   - Sync with mobile menu state

2. **Routing**:
   - Use Next.js `usePathname()` for active route detection
   - Highlight matching route in navigation

3. **Icons**:
   - Use @heroicons/react for consistent iconography
   - Icon size: 20px (w-5 h-5)
   - Icon color: Inherit from text color

4. **Animations**:
   - Use Tailwind `transition-all duration-300`
   - Smooth width transitions
   - Icon rotation on collapse button
   - Fade in/out for text labels

5. **Accessibility**:
   - Keyboard navigation (Tab, Arrow keys)
   - ARIA labels for collapsed items
   - Focus management
   - Screen reader announcements

### Sidebar State Store (Zustand Example)

```typescript
// store/sidebarStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SidebarState {
  isCollapsed: boolean
  isMobileOpen: boolean
  toggleSidebar: () => void
  collapseSidebar: () => void
  expandSidebar: () => void
  toggleMobileMenu: () => void
  closeMobileMenu: () => void
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      isCollapsed: false,
      isMobileOpen: false,
      toggleSidebar: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
      collapseSidebar: () => set({ isCollapsed: true }),
      expandSidebar: () => set({ isCollapsed: false }),
      toggleMobileMenu: () => set((state) => ({ isMobileOpen: !state.isMobileOpen })),
      closeMobileMenu: () => set({ isMobileOpen: false }),
    }),
    {
      name: 'sidebar-storage',
      partialize: (state) => ({ isCollapsed: state.isCollapsed }),
    }
  )
)
```

---

**END OF FRONTEND ONLY MILESTONE BREAKDOWN**

