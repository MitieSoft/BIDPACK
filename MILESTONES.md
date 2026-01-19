# BIDPACK UK - COMPLETE MILESTONE BREAKDOWN
## Development Roadmap (6 Weeks)

---

## PROJECT OVERVIEW

**Product**: BIDPACK UK – Tender Compliance Operating System  
**Positioning**: "We stop construction contractors from getting disqualified before scoring."

**Tech Stack**:
- **Frontend**: Next.js 14+ (React) + Tailwind CSS + TypeScript
- **Backend**: Node.js + Express (or Serverless Functions)
- **Database**: PostgreSQL (can be hosted on Supabase, AWS RDS, or self-hosted)
- **Storage**: Supabase Storage/S3 (for file storage)
- **Payment**: Stripe
- **AI**: LLM Provider (OpenAI/Anthropic) with ACU metering

**Timeline**: 6 weeks  
**Budget**: ≤ $500

---

## ARCHITECTURE OVERVIEW

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND LAYER                        │
│  (Next.js 14+ + React + Tailwind CSS + TypeScript)      │
│                                                           │
│  - Authentication UI                                     │
│  - Dashboard & Navigation                                │
│  - Bid Management Interface                              │
│  - Compliance Matrix UI                                  │
│  - Policy & Method Statement Editors                     │
│  - Social Value Builder                                  │
│  - ACU Dashboard & Modals                                │
│  - Export Interface                                      │
│  - Admin Panel UI                                        │
└─────────────────────────────────────────────────────────┘
                            │
                            │ HTTP/REST API
                            │
┌─────────────────────────────────────────────────────────┐
│                    BACKEND LAYER                         │
│  (Node.js/Serverless Functions)                          │
│                                                           │
│  - Auth Service (JWT)                                    │
│  - Org & Subscription Service                             │
│  - Bid CRUD Service                                      │
│  - Compliance Engine                                     │
│  - ACU Accounting Service                                 │
│  - AI Gateway (ACU-metered)                              │
│  - Export Generation Service                             │
│  - Admin Control Service                                 │
└─────────────────────────────────────────────────────────┘
                            │
                            │
┌─────────────────────────────────────────────────────────┐
│                    DATA LAYER                            │
│  (PostgreSQL + File Storage)                           │
│                                                           │
│  - users, orgs, subscriptions                            │
│  - bids, bid_sections                                    │
│  - acu_ledger, ai_requests, acu_limits                   │
│  - File Storage (documents, exports)                     │
└─────────────────────────────────────────────────────────┘
```

---

## MILESTONE 0: FOUNDATION & INFRASTRUCTURE
**Duration**: Week 0 (Pre-development setup)
**Goal**: Project foundation, environment setup, database schema

### Backend Tasks

#### 0.1 Project Initialization
- [ ] Initialize Node.js project (Express or Serverless framework)
- [ ] Set up project structure (routes, services, middleware, utils)
- [ ] Configure environment variables (.env.example)
- [ ] Set up package.json with dependencies:
  - Express/Serverless framework
  - PostgreSQL client (pg or node-postgres)
  - Database ORM/Query Builder (optional: Prisma, TypeORM, or Knex.js)
  - Migration tool (node-pg-migrate, Knex.js migrations, or Prisma Migrate)
  - Stripe SDK
  - JWT library (jsonwebtoken)
  - bcrypt for password hashing
  - dotenv for env management
  - cors middleware
  - express-validator for input validation
- [ ] Set up ESLint/Prettier
- [ ] Create basic error handling middleware
- [ ] Set up logging (Winston or similar)

#### 0.2 Database Schema Setup
- [ ] Set up PostgreSQL database (Supabase, AWS RDS, or self-hosted)
- [ ] Install PostgreSQL client library (pg or node-postgres)
- [ ] Create migration scripts for all tables (using a migration tool like node-pg-migrate, Knex.js, or Prisma):

**users table**:
```sql
- id (UUID, primary key)
- email (string, unique, not null)
- password_hash (string, not null)
- org_id (UUID, foreign key → orgs.id)
- role (enum: 'owner', 'admin', 'member')
- first_name (string)
- last_name (string)
- created_at (timestamp)
- updated_at (timestamp)
- last_login_at (timestamp)
```

**orgs table**:
```sql
- id (UUID, primary key)
- name (string, not null)
- stripe_customer_id (string, unique)
- created_at (timestamp)
- updated_at (timestamp)
```

**subscriptions table**:
```sql
- id (UUID, primary key)
- org_id (UUID, foreign key → orgs.id)
- plan_type (enum: 'starter', 'professional')
- status (enum: 'active', 'canceled', 'past_due', 'trialing')
- stripe_subscription_id (string, unique)
- stripe_price_id (string)
- current_period_start (timestamp)
- current_period_end (timestamp)
- cancel_at_period_end (boolean)
- created_at (timestamp)
- updated_at (timestamp)
```

**bids table**:
```sql
- id (UUID, primary key)
- org_id (UUID, foreign key → orgs.id)
- client_name (string, not null)
- deadline (timestamp)
- status (enum: 'draft', 'in_progress', 'ready', 'submitted')
- created_by (UUID, foreign key → users.id)
- created_at (timestamp)
- updated_at (timestamp)
```

**bid_sections table**:
```sql
- id (UUID, primary key)
- bid_id (UUID, foreign key → bids.id)
- section_type (enum: 'policy', 'method_statement', 'cv', 'case_study', 'insurance', 'social_value', 'other')
- section_name (string)
- content (text)
- version (integer, default 1)
- created_at (timestamp)
- updated_at (timestamp)
```

**bid_team_members table**:
```sql
- id (UUID, primary key)
- bid_id (UUID, foreign key → bids.id)
- user_id (UUID, foreign key → users.id)
- role (string)
- assigned_at (timestamp)
```

**bid_requirements table**:
```sql
- id (UUID, primary key)
- bid_id (UUID, foreign key → bids.id)
- requirement_text (text, not null)
- requirement_category (string)
- status (enum: 'covered', 'missing', 'non_compliant')
- mapped_to_section_id (UUID, nullable, foreign key → bid_sections.id)
- mapped_to_type (string, nullable)
- created_at (timestamp)
- updated_at (timestamp)
```

**policies table**:
```sql
- id (UUID, primary key)
- org_id (UUID, foreign key → orgs.id)
- policy_type (enum: 'h&s_cdm', 'quality', 'environmental', 'equality_diversity', 'modern_slavery', 'gdpr', 'anti_bribery', 'safeguarding', 'carbon_reduction', 'social_value', 'supply_chain', 'ethical_procurement', 'business_continuity')
- title (string, not null)
- content (text)
- version (integer, default 1)
- is_template (boolean, default false)
- last_updated_at (timestamp)
- created_at (timestamp)
- updated_at (timestamp)
```

**method_statements table**:
```sql
- id (UUID, primary key)
- org_id (UUID, foreign key → orgs.id)
- trade_type (enum: 'groundworks_civils', 'electrical', 'mechanical', 'fit_out', 'highways')
- title (string, not null)
- scope_of_works (text)
- resources (text)
- plant_materials (text)
- h&s_controls (text)
- rams (text)
- environmental_controls (text)
- qa (text)
- emergency_procedures (text)
- version (integer, default 1)
- created_at (timestamp)
- updated_at (timestamp)
```

**social_value_data table**:
```sql
- id (UUID, primary key)
- bid_id (UUID, foreign key → bids.id)
- local_employment_count (integer)
- apprenticeships_count (integer)
- sme_spend_percentage (decimal)
- carbon_reduction_kg (decimal)
- community_engagement_hours (integer)
- kpi_summary (jsonb)
- created_at (timestamp)
- updated_at (timestamp)
```

**acu_ledger table** (IMMUTABLE):
```sql
- id (UUID, primary key)
- org_id (UUID, foreign key → orgs.id)
- transaction_type (enum: 'debit', 'credit', 'grant', 'topup', 'expiry')
- amount (integer, not null) -- ACU amount
- balance_after (integer, not null)
- description (string)
- reference_id (UUID, nullable) -- links to ai_requests.id or subscription.id
- created_at (timestamp) -- immutable, never updated
```

**ai_requests table**:
```sql
- id (UUID, primary key)
- org_id (UUID, foreign key → orgs.id)
- user_id (UUID, foreign key → users.id)
- bid_id (UUID, nullable, foreign key → bids.id)
- action_type (enum: 'generate_paragraph', 'refine_section', 'compliance_gap_explain', 'social_value_refine')
- acus_used (integer, not null)
- tokens_requested (integer)
- tokens_used (integer)
- tokens_limit (integer)
- status (enum: 'pending', 'completed', 'failed', 'rejected')
- request_prompt (text)
- response_content (text, nullable)
- error_message (text, nullable)
- created_at (timestamp)
```

**acu_limits table**:
```sql
- id (UUID, primary key)
- org_id (UUID, nullable, foreign key → orgs.id) -- null = global limit
- monthly_limit (integer)
- daily_limit (integer)
- global_kill_switch (boolean, default false)
- created_at (timestamp)
- updated_at (timestamp)
```

**acu_usage_rollups table** (for analytics):
```sql
- id (UUID, primary key)
- org_id (UUID, foreign key → orgs.id)
- period_start (timestamp)
- period_end (timestamp)
- period_type (enum: 'daily', 'monthly')
- acus_used (integer)
- created_at (timestamp)
```

**export_jobs table**:
```sql
- id (UUID, primary key)
- bid_id (UUID, foreign key → bids.id)
- org_id (UUID, foreign key → orgs.id)
- user_id (UUID, foreign key → users.id)
- status (enum: 'pending', 'processing', 'completed', 'failed')
- file_path (string, nullable)
- file_url (string, nullable)
- file_size (bigint, nullable)
- error_message (text, nullable)
- created_at (timestamp)
- completed_at (timestamp)
```

**audit_logs table**:
```sql
- id (UUID, primary key)
- org_id (UUID, nullable, foreign key → orgs.id)
- user_id (UUID, nullable, foreign key → users.id)
- action_type (string, not null)
- resource_type (string)
- resource_id (UUID)
- details (jsonb)
- ip_address (string)
- user_agent (string)
- created_at (timestamp)
```

- [ ] Create indexes:
  - users: email, org_id
  - bids: org_id, status, created_at
  - bid_sections: bid_id, section_type
  - acu_ledger: org_id, created_at
  - ai_requests: org_id, created_at
  - subscriptions: org_id, status

- [ ] Set up Row Level Security (RLS) policies in PostgreSQL (if using Supabase, or implement application-level access control)
- [ ] Create database seed script for initial data (policy templates, method statement templates)
- [ ] Set up connection pooling (pgBouncer or similar)
- [ ] Configure database backups and recovery strategy

#### 0.3 API Structure Setup
- [ ] Create route structure:
  - `/api/auth/*`
  - `/api/subscriptions/*`
  - `/api/acu/*`
  - `/api/bids/*`
  - `/api/policies/*`
  - `/api/method-statements/*`
  - `/api/social-value/*`
  - `/api/ai/*`
  - `/api/export/*`
  - `/api/admin/*`
- [ ] Set up middleware:
  - Authentication middleware
  - Authorization middleware (RBAC)
  - Org isolation middleware
  - Error handling middleware
  - Request logging middleware
- [ ] Configure CORS
- [ ] Set up rate limiting

#### 0.4 External Service Integration Setup
- [ ] Configure PostgreSQL connection:
  - Set up connection string/credentials
  - Configure connection pool settings
  - Set up database client (pg, Prisma, or TypeORM)
- [ ] Set up Stripe account and configure SDK
- [ ] Set up file storage (Supabase Storage or S3)
- [ ] Configure LLM provider (OpenAI/Anthropic) SDK
- [ ] Set up environment variables for all services (database URL, credentials, etc.)

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
- [ ] Create `components/Sidebar.tsx` (main navigation)
- [ ] Create `components/Footer.tsx`
- [ ] Create `components/LoadingSpinner.tsx`
- [ ] Create `components/ErrorMessage.tsx`
- [ ] Create `components/SuccessMessage.tsx`
- [ ] Create `components/PageHeader.tsx` (reusable page header)
- [ ] Set up global styles (`styles/globals.css` with Tailwind directives)
- [ ] Create `components/ui/` folder for reusable UI components (buttons, inputs, modals, etc.)
- [ ] Create Tailwind component utilities (e.g., `cn()` for className merging)

#### 0.4 Authentication State Management
- [ ] Set up authentication store (Zustand/Redux):
  - State: user, token, isAuthenticated
  - Actions: setUser, setToken, logout, checkAuth
  - Selectors: isAuthenticated, currentUser, userRole
- [ ] Create auth context/provider (if using Context API)
- [ ] Set up Next.js middleware for route protection
- [ ] Create authentication utilities (`lib/auth.ts`)

### Acceptance Criteria - Milestone 0
- [ ] Backend project boots locally
- [ ] Frontend project boots locally
- [ ] PostgreSQL database connection works
- [ ] Database migrations run successfully
- [ ] All tables created with proper relationships
- [ ] Indexes created for performance
- [ ] RLS policies configured (if using Supabase) or application-level access control implemented
- [ ] API client can connect to backend
- [ ] Environment variables properly configured
- [ ] No linting errors
- [ ] Basic routing works

---

## MILESTONE 1: AUTHENTICATION, ORGANIZATIONS & SUBSCRIPTIONS
**Duration**: Week 1
**Dependencies**: Milestone 0
**Goal**: Users can register, login, manage organizations, and subscribe to plans

### Backend Tasks

#### 1.1 Authentication Service
- [ ] **POST /api/auth/register**
  - Validate email format
  - Check email uniqueness
  - Hash password with bcrypt
  - Create user + org in transaction
  - Assign user as 'owner' role
  - Generate JWT token
  - Return user data + token

- [ ] **POST /api/auth/login**
  - Validate email/password
  - Check user exists
  - Verify password hash
  - Update last_login_at
  - Generate JWT token
  - Return user data + token

- [ ] **POST /api/auth/logout**
  - Invalidate token (if using token blacklist)
  - Return success

- [ ] **GET /api/auth/me**
  - Verify JWT token
  - Return current user data with org info

- [ ] **POST /api/auth/refresh-token**
  - Verify refresh token
  - Generate new access token
  - Return new token

- [ ] **POST /api/auth/forgot-password**
  - Generate reset token
  - Send email (if email service configured)
  - Store reset token with expiry

- [ ] **POST /api/auth/reset-password**
  - Validate reset token
  - Update password
  - Invalidate reset token

- [ ] Create authentication middleware:
  - Verify JWT token
  - Attach user to request object
  - Handle token expiry

- [ ] Create authorization middleware:
  - Check user role (owner/admin/member)
  - Enforce org isolation

#### 1.2 Organization Service
- [ ] **GET /api/orgs/current**
  - Return current user's org data

- [ ] **PUT /api/orgs/current**
  - Update org name (owner/admin only)
  - Validate permissions

- [ ] **GET /api/orgs/current/members**
  - List all org members
  - Return user data with roles

- [ ] **POST /api/orgs/current/members**
  - Invite new member (owner/admin only)
  - Send invitation email
  - Create pending invitation record

- [ ] **PUT /api/orgs/current/members/:userId**
  - Update member role (owner only)
  - Remove member (owner/admin only)

- [ ] Create org isolation middleware:
  - Ensure users can only access their org's data
  - Apply to all org-scoped endpoints

#### 1.3 Subscription & Billing Service
- [ ] **GET /api/subscriptions/current**
  - Return current org's subscription
  - Include plan details, status, period dates

- [ ] **POST /api/subscriptions/create-checkout**
  - Create Stripe Checkout Session
  - Pass plan type (starter/professional)
  - Set success/cancel URLs
  - Return checkout session URL

- [ ] **POST /api/subscriptions/webhook** (Stripe webhook)
  - Verify webhook signature
  - Handle events:
    - `checkout.session.completed` → Create subscription
    - `customer.subscription.updated` → Update subscription
    - `customer.subscription.deleted` → Cancel subscription
    - `invoice.payment_succeeded` → Renew subscription
    - `invoice.payment_failed` → Mark as past_due
  - Update subscription record
  - Create/update ACU limits based on plan

- [ ] **POST /api/subscriptions/upgrade**
  - Validate current subscription
  - Create upgrade checkout session
  - Handle immediate upgrade (if applicable)

- [ ] **POST /api/subscriptions/downgrade**
  - Validate current subscription
  - Schedule downgrade at period end
  - Update cancel_at_period_end flag

- [ ] **POST /api/subscriptions/cancel**
  - Cancel subscription immediately
  - Update status to 'canceled'

- [ ] Create plan enforcement middleware:
  - Check subscription status
  - Enforce plan limits (user count, features)
  - Block access if subscription inactive

- [ ] Create subscription status checker utility

#### 1.4 ACU Ledger Service (Core Accounting)
- [ ] **GET /api/acu/balance**
  - Calculate current balance from ledger
  - Return balance, monthly allocation, usage this month

- [ ] **GET /api/acu/ledger**
  - Return paginated ledger entries
  - Filter by date range, transaction type
  - Include metadata (description, reference)

- [ ] **POST /api/acu/debit** (internal use only)
  - Validate org_id, amount
  - Check balance sufficient
  - Create ledger entry atomically
  - Calculate balance_after
  - Prevent negative balances
  - Return new balance

- [ ] **POST /api/acu/credit** (internal use only)
  - Validate org_id, amount
  - Create ledger entry atomically
  - Calculate balance_after
  - Return new balance

- [ ] **POST /api/billing/topup**
  - Create Stripe payment intent
  - Calculate ACU amount (20 ACUs = £20, 50 = £45, 100 = £80)
  - Return payment intent client secret

- [ ] **POST /api/billing/topup/confirm** (webhook)
  - Verify payment succeeded
  - Credit ACUs to org
  - Create ledger entry

- [ ] **POST /api/system/monthly-grant** (cron job)
  - Find all active subscriptions
  - Grant monthly ACUs:
    - Starter: 40 ACUs
    - Professional: 150 ACUs
  - Create ledger entries
  - Reset usage counters
  - Expire old unused ACUs (if required)

- [ ] Create ACU balance calculation utility
- [ ] Create ACU validation service (check balance, limits)

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
- [ ] Webhook handles subscription events correctly
- [ ] Plan limits enforced (Starter = 1 user max)
- [ ] ACU balance displays correctly
- [ ] ACU ledger shows transactions
- [ ] Monthly ACU grant cron job works
- [ ] Top-up flow works end-to-end
- [ ] All UI components use Tailwind CSS utility classes
- [ ] All forms use React Hook Form with Zod validation
- [ ] Consistent Tailwind design system (colors, spacing, typography)
- [ ] Error handling works throughout

---

## MILESTONE 2: BID MANAGEMENT & COMPLIANCE MATRIX ENGINE
**Duration**: Week 2
**Dependencies**: Milestone 1
**Goal**: Users can create bids, manage bid sections, and use compliance matrix

### Backend Tasks

#### 2.1 Bid CRUD Service
- [ ] **GET /api/bids**
  - List all bids for current org
  - Filter by status, date range
  - Pagination
  - Sort by deadline, created_at
  - Include basic stats (section count, compliance status)

- [ ] **GET /api/bids/:id**
  - Return bid details
  - Include all sections
  - Include team members
  - Include compliance matrix status
  - Verify org access

- [ ] **POST /api/bids**
  - Validate input (client_name, deadline)
  - Create bid with org_id
  - Set created_by to current user
  - Set status to 'draft'
  - Return created bid

- [ ] **PUT /api/bids/:id**
  - Validate org access
  - Update bid fields
  - Update updated_at timestamp
  - Return updated bid

- [ ] **DELETE /api/bids/:id**
  - Validate org access
  - Soft delete or hard delete (based on requirements)
  - Cascade delete sections (or handle separately)

- [ ] **GET /api/bids/:id/sections**
  - Return all sections for bid
  - Group by section_type
  - Include version info

- [ ] **POST /api/bids/:id/sections**
  - Validate bid access
  - Create new section
  - Set version to 1
  - Return created section

- [ ] **PUT /api/bids/:id/sections/:sectionId**
  - Validate bid access
  - Update section content
  - Increment version (if Professional plan)
  - Create version history entry (if Professional)
  - Return updated section

- [ ] **DELETE /api/bids/:id/sections/:sectionId**
  - Validate bid access
  - Delete section
  - Update compliance matrix (unmap requirements)

- [ ] **GET /api/bids/:id/team**
  - Return team members assigned to bid

- [ ] **POST /api/bids/:id/team**
  - Assign team member to bid
  - Validate user belongs to org
  - Return updated team list

- [ ] **DELETE /api/bids/:id/team/:userId**
  - Remove team member from bid
  - Return updated team list

- [ ] **PUT /api/bids/:id/status**
  - Update bid status
  - Validate status transitions
  - Return updated bid

#### 2.2 Compliance Matrix Engine (CORE FEATURE)
- [ ] **POST /api/bids/:id/compliance/requirements**
  - Accept requirements input (text/list)
  - Parse requirements (split by line/item)
  - Create requirement records
  - Auto-map to existing content:
    - Search policies by keywords
    - Search method statements by keywords
    - Search CVs (if implemented)
    - Search case studies (if implemented)
    - Search insurances (if implemented)
  - Set initial status (covered/missing/non_compliant)
  - Return requirements with mapping suggestions

- [ ] **GET /api/bids/:id/compliance/matrix**
  - Return full compliance matrix:
    - All requirements
    - Current status for each
    - Mapped sections
    - Coverage percentage
  - Group by category if available

- [ ] **PUT /api/bids/:id/compliance/map/:requirementId**
  - Map requirement to section
  - Update requirement status to 'covered'
  - Update mapped_to_section_id
  - Update mapped_to_type
  - Return updated requirement

- [ ] **PUT /api/bids/:id/compliance/status/:requirementId**
  - Manually set requirement status
  - Update status field
  - Return updated requirement

- [ ] **GET /api/bids/:id/compliance/status**
  - Calculate overall compliance status
  - Return:
    - Total requirements
    - Covered count
    - Missing count
    - Non-compliant count
    - Coverage percentage
    - Critical gaps (if any)

- [ ] **POST /api/bids/:id/compliance/validate-export**
  - Check all critical requirements
  - Verify all critical = 'covered'
  - Return validation result:
    - can_export (boolean)
    - missing_requirements (array)
    - non_compliant_requirements (array)
  - This endpoint MUST be called before export

- [ ] Create compliance mapping algorithm:
  - Keyword matching
  - Fuzzy matching for similar terms
  - Category-based matching
  - Score-based ranking

- [ ] Create requirement parser utility:
  - Parse text input
  - Extract requirement items
  - Categorize requirements

#### 2.3 Version History (Professional Plan Only)
- [ ] **GET /api/bids/:id/sections/:sectionId/versions**
  - Return version history for section
  - Check plan type (Professional only)
  - Return versions with timestamps, authors

- [ ] **GET /api/bids/:id/sections/:sectionId/versions/:versionId**
  - Return specific version content

- [ ] **POST /api/bids/:id/sections/:sectionId/restore/:versionId**
  - Restore section to specific version
  - Create new version from restored content

- [ ] Create version history service:
  - Store versions on section update
  - Link versions to users
  - Track changes

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

---

## MILESTONE 3: POLICY LIBRARY, METHOD STATEMENTS & SOCIAL VALUE
**Duration**: Week 3
**Dependencies**: Milestone 2
**Goal**: Users can create and manage policies, method statements, and social value data

### Backend Tasks

#### 3.1 Policy Library Service
- [ ] **GET /api/policies**
  - List all policies for current org
  - Filter by policy_type
  - Include version info
  - Include last_updated_at

- [ ] **GET /api/policies/:id**
  - Return policy details
  - Include full content
  - Include version history (if Professional)

- [ ] **POST /api/policies**
  - Validate input (policy_type, title, content)
  - Create policy
  - Set version to 1
  - Set is_template to false
  - Return created policy

- [ ] **PUT /api/policies/:id**
  - Validate org access
  - Update policy content
  - Increment version
  - Update last_updated_at
  - Create version history entry (if Professional)
  - Return updated policy

- [ ] **DELETE /api/policies/:id**
  - Validate org access
  - Check if used in bids (warn if yes)
  - Delete policy
  - Return success

- [ ] **GET /api/policies/templates**
  - Return policy templates (is_template = true)
  - Include all 12 mandatory + optional types
  - These are read-only templates

- [ ] **POST /api/policies/:id/duplicate**
  - Duplicate policy
  - Create new policy with same content
  - Return new policy

- [ ] **GET /api/policies/:id/versions** (Professional only)
  - Return version history
  - Check plan type

- [ ] **POST /api/policies/:id/assign-to-bid/:bidId**
  - Link policy to bid
  - Create bid_section entry
  - Return success

- [ ] Create policy template seed data:
  - H&S (CDM) template
  - Quality template
  - Environmental template
  - Equality & Diversity template
  - Modern Slavery template
  - GDPR template
  - Anti-Bribery template
  - Safeguarding template
  - Carbon Reduction (PPN 06/21) template
  - Social Value template
  - Supply Chain template
  - Ethical Procurement template
  - Business Continuity template

#### 3.2 Method Statement Builder Service
- [ ] **GET /api/method-statements**
  - List all method statements for current org
  - Filter by trade_type
  - Include version info

- [ ] **GET /api/method-statements/:id**
  - Return method statement details
  - Include all sections

- [ ] **POST /api/method-statements**
  - Validate input (trade_type, title)
  - Create method statement
  - Initialize sections with empty/default content
  - Set version to 1
  - Return created method statement

- [ ] **PUT /api/method-statements/:id**
  - Validate org access
  - Update method statement sections
  - Increment version
  - Create version history (if Professional)
  - Return updated method statement

- [ ] **PUT /api/method-statements/:id/section/:sectionName**
  - Update specific section content
  - Validate section name (scope_of_works, resources, etc.)
  - Return updated method statement

- [ ] **DELETE /api/method-statements/:id**
  - Validate org access
  - Check if used in bids
  - Delete method statement
  - Return success

- [ ] **GET /api/method-statements/trade-presets**
  - Return trade preset templates:
    - Groundworks / Civils
    - Electrical
    - Mechanical
    - Fit-Out
    - Highways
  - Include section templates for each

- [ ] **POST /api/method-statements/:id/duplicate**
  - Duplicate method statement
  - Return new method statement

- [ ] **POST /api/method-statements/:id/assign-to-bid/:bidId**
  - Link method statement to bid
  - Create bid_section entry
  - Return success

- [ ] Create method statement template seed data for each trade type

#### 3.3 Social Value Engine Service
- [ ] **GET /api/social-value/:bidId**
  - Return social value data for bid
  - Include all KPI fields
  - Include summary

- [ ] **POST /api/social-value/:bidId**
  - Create/update social value data
  - Validate bid access
  - Store KPI values:
    - local_employment_count
    - apprenticeships_count
    - sme_spend_percentage
    - carbon_reduction_kg
    - community_engagement_hours
  - Calculate KPI summary
  - Return saved data

- [ ] **PUT /api/social-value/:bidId/kpi/:kpiName**
  - Update specific KPI value
  - Recalculate summary
  - Return updated data

- [ ] **GET /api/social-value/:bidId/summary**
  - Calculate and return KPI summary
  - Format for display
  - Include PPN 06/20 compliance indicators

- [ ] Create KPI calculation service:
  - Calculate totals
  - Format percentages
  - Generate summary text
  - Check PPN 06/20 alignment

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

---

## MILESTONE 4: AI GATEWAY (ACU-METERED) & EXPORT ENGINE
**Duration**: Week 4
**Dependencies**: Milestone 3
**Goal**: AI assistance works with ACU metering, exports generate submission packs

### Backend Tasks

#### 4.1 AI Gateway Service (CRITICAL - COST CONTROL)

**4.1.1 AI Quote Endpoint**
- [ ] **POST /api/ai/quote**
  - Accept action_type parameter
  - Calculate ACU cost based on action:
    - generate_paragraph: 1 ACU
    - refine_section: 2 ACUs
    - compliance_gap_explain: 3 ACUs
    - social_value_refine: 4 ACUs
  - Check current ACU balance
  - Check per-action cap (max 4 ACUs per request)
  - Check org monthly/daily limits
  - Check global kill switch
  - Return quote:
    - acus_required
    - current_balance
    - balance_after
    - can_proceed (boolean)
    - rejection_reason (if cannot proceed)

**4.1.2 AI Execute Endpoint (MANDATORY FLOW)**
- [ ] **POST /api/ai/execute**
  - **Step 1**: Validate authentication
  - **Step 2**: Check subscription active
  - **Step 3**: Validate ACU balance sufficient
  - **Step 4**: Check per-action cap (max 4 ACUs)
  - **Step 5**: Check org limits (monthly/daily)
  - **Step 6**: Check global kill switch
  - **Step 7**: Atomic ACU debit (create ledger entry)
  - **Step 8**: Calculate token limit (1 ACU = 1000 tokens max)
  - **Step 9**: Apply hard token cap to LLM request
  - **Step 10**: Call LLM with:
    - Token limit enforced
    - Prompt from request
    - Action context
  - **Step 11**: Log AI request:
    - Store in ai_requests table
    - Record tokens_used
    - Record tokens_limit
    - Record status
  - **Step 12**: Return result to client
  - **Error Handling**:
    - If any check fails → return error, no debit
    - If LLM fails → log error, keep debit (cost incurred)
    - If token limit exceeded → truncate response

- [ ] **GET /api/ai/history**
  - Return paginated AI request history
  - Filter by date range, action_type
  - Include ACU usage, token usage
  - Return for current org only

- [ ] Create ACU validation service:
  - Check balance
  - Check limits
  - Check kill switches
  - Return validation result

- [ ] Create token limit calculator:
  - Calculate max tokens from ACUs
  - Apply hard cap (4000 tokens max for 4 ACUs)

- [ ] Create LLM gateway service:
  - Initialize LLM client (OpenAI/Anthropic)
  - Make requests with token limits
  - Handle errors
  - Track token usage

- [ ] Create AI action handlers:
  - generate_paragraph handler
  - refine_section handler
  - compliance_gap_explain handler
  - social_value_refine handler

#### 4.2 Export Generation Service

**4.2.1 Export Validation**
- [ ] **POST /api/bids/:id/export/validate**
  - Check compliance matrix
  - Verify all critical requirements = 'covered'
  - Return validation result
  - Block export if gaps exist

**4.2.2 Export Generation**
- [ ] **POST /api/bids/:id/export/prepare**
  - Validate compliance (call validate endpoint)
  - If validation fails → return error, block export
  - Gather all bid sections:
    - Policies
    - Method Statements
    - CVs
    - Case Studies
    - Insurances
    - Social Value data
  - Create export job record (status: 'pending')
  - Queue export job (or process synchronously)
  - Return job_id

- [ ] **GET /api/bids/:id/export/status/:jobId**
  - Return export job status
  - Include progress if processing
  - Include file_url if completed

- [ ] **GET /api/bids/:id/export/download/:jobId**
  - Verify job belongs to org
  - Return secure download link
  - Track download in audit log

- [ ] **Export Generation Process**:
  1. Create folder structure:
     ```
     BidPack_[ClientName]_[Date]/
     ├── Policies/
     ├── Method_Statements/
     ├── CVs/
     ├── Case_Studies/
     ├── Insurances/
     ├── Social_Value/
     └── Compliance_Matrix.pdf
     ```
  2. Generate DOCX files for each section
  3. Generate master PDF (all documents combined)
  4. Create ZIP archive
  5. Add timestamp to filename
  6. Upload to storage (Supabase Storage or S3)
  7. Update export_job record
  8. Create audit log entry

- [ ] Create document generator service:
  - DOCX generation (use docx library)
  - PDF generation (use pdfkit or similar)
  - Master PDF creation
  - ZIP creation

- [ ] Create export formatter service:
  - Format policies
  - Format method statements
  - Format social value summary
  - Format compliance matrix

- [ ] Create file naming service:
  - Generate consistent filenames
  - Add timestamps
  - Sanitize client names

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
- [ ] AI quote endpoint returns correct ACU costs
- [ ] AI execute endpoint validates all 6 checks before execution
- [ ] ACU debit happens atomically before LLM call
- [ ] Token limits are enforced (max 4000 tokens)
- [ ] AI confirmation modal shows before every AI action
- [ ] AI requests are logged in database
- [ ] AI usage history displays correctly
- [ ] AI paused screen shows when balance = 0
- [ ] Export validation blocks non-compliant bids
- [ ] Export generates correct folder structure
- [ ] Export generates DOCX files
- [ ] Export generates ZIP archive
- [ ] Export generates master PDF
- [ ] Export includes timestamp
- [ ] Download links work securely
- [ ] Audit trail created for exports

---

## MILESTONE 5: ADMIN PANEL & SECURITY HARDENING
**Duration**: Week 5
**Dependencies**: Milestone 4
**Goal**: Admins can control system, security hardened, abuse prevention

### Backend Tasks

#### 5.1 Admin Control Service

**5.1.1 Global AI Controls**
- [ ] **GET /api/admin/acu/global-status**
  - Return global AI status
  - Return kill switch status
  - Return global limits

- [ ] **POST /api/admin/acu/kill-switch**
  - Toggle global AI kill switch
  - Update acu_limits table (global_kill_switch)
  - Create audit log entry
  - Return updated status

- [ ] **GET /api/admin/acu/limits**
  - Return all org limits
  - Include global limits
  - Pagination

- [ ] **PUT /api/admin/acu/limits/:orgId**
  - Set custom limits for org
  - Override monthly/daily limits
  - Create audit log entry
  - Return updated limits

- [ ] **GET /api/admin/acu/ledger**
  - Return full ACU ledger (all orgs)
  - Filter by org, date range, transaction type
  - Export to CSV

**5.1.2 Organization Management**
- [ ] **GET /api/admin/orgs**
  - List all organizations
  - Include subscription status
  - Include ACU usage stats
  - Pagination, search, filters

- [ ] **GET /api/admin/orgs/:orgId**
  - Return org details
  - Include all stats:
    - User count
    - Bid count
    - ACU usage
    - Subscription info

- [ ] **PUT /api/admin/orgs/:orgId**
  - Update org details
  - Suspend/activate org
  - Create audit log

- [ ] **GET /api/admin/orgs/:orgId/users**
  - List all users in org
  - Include roles, activity

**5.1.3 Abuse Detection**
- [ ] **GET /api/admin/abuse/flags**
  - Return abuse detection flags
  - Include:
    - High ACU usage orgs
    - Rapid API calls
    - Suspicious patterns
  - Auto-flag thresholds:
    - > 1000 ACUs/day
    - > 100 AI requests/hour
    - Multiple failed validations

- [ ] **POST /api/admin/abuse/flag/:orgId**
  - Manually flag org
  - Add flag reason
  - Create audit log

- [ ] **POST /api/admin/abuse/unflag/:orgId**
  - Remove flag
  - Create audit log

- [ ] Create abuse detection service:
  - Monitor ACU usage patterns
  - Detect rapid API calls
  - Flag suspicious activity
  - Auto-suspend if needed

**5.1.4 Analytics & Reporting**
- [ ] **GET /api/admin/analytics/overview**
  - System-wide stats:
    - Total orgs
    - Active subscriptions
    - Total ACU usage
    - Total AI requests
    - Total exports

- [ ] **GET /api/admin/analytics/acu-usage**
  - ACU usage trends
  - Top consuming orgs
  - Daily/monthly breakdown

- [ ] **GET /api/admin/analytics/ai-requests**
  - AI request stats
  - Success/failure rates
  - Average tokens per request
  - Action type distribution

- [ ] Create analytics service:
  - Aggregate data
  - Generate reports
  - Cache results

#### 5.2 Security Hardening

**5.2.1 API Security**
- [ ] Implement rate limiting:
  - Per-user limits
  - Per-org limits
  - Per-endpoint limits
- [ ] Add request validation:
  - Input sanitization
  - SQL injection prevention
  - XSS prevention
- [ ] Add CORS configuration:
  - Whitelist allowed origins
  - Restrict methods
- [ ] Add helmet.js for security headers

**5.2.2 Authentication Security**
- [ ] Implement token refresh mechanism
- [ ] Add token blacklist (for logout)
- [ ] Add password strength requirements
- [ ] Add account lockout after failed attempts
- [ ] Add 2FA option (optional, future)

**5.2.3 Data Security**
- [ ] Encrypt sensitive data at rest
- [ ] Use HTTPS only
- [ ] Implement data retention policies
- [ ] Add GDPR compliance features:
  - Data export
  - Data deletion
  - Consent management

**5.2.4 Audit Logging**
- [ ] Log all admin actions
- [ ] Log all ACU transactions
- [ ] Log all AI requests
- [ ] Log all exports
- [ ] Log authentication events
- [ ] Log data access

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
- [ ] Rate limiting works
- [ ] Input validation prevents attacks
- [ ] Audit logs capture all admin actions
- [ ] Admin routes are protected
- [ ] Error handling is comprehensive
- [ ] All UI responsive and accessible

---

## MILESTONE 6: TESTING, UX POLISH & LAUNCH PREPARATION
**Duration**: Week 6
**Dependencies**: Milestone 5
**Goal**: Production-ready system, tested, polished, demo pack ready

### Backend Tasks

#### 6.1 Testing

**6.1.1 Unit Tests**
- [ ] Test ACU ledger service:
  - Debit operations
  - Credit operations
  - Balance calculations
  - Negative balance prevention
- [ ] Test AI gateway:
  - Quote calculation
  - Validation checks
  - Token limits
  - LLM integration
- [ ] Test compliance engine:
  - Requirement parsing
  - Auto-mapping
  - Status calculation
  - Export validation
- [ ] Test export generation:
  - Document creation
  - ZIP generation
  - PDF generation
- [ ] Test subscription service:
  - Plan enforcement
  - Webhook handling
  - ACU grants

**6.1.2 Integration Tests**
- [ ] Test authentication flow:
  - Register → Login → Access protected route
  - Token refresh
  - Logout
- [ ] Test bid creation flow:
  - Create bid → Add sections → Update compliance
- [ ] Test AI flow:
  - Quote → Confirm → Execute → Log
- [ ] Test export flow:
  - Validate → Generate → Download
- [ ] Test subscription flow:
  - Checkout → Webhook → Subscription active

**6.1.3 E2E Tests (Critical Paths)**
- [ ] User registration and onboarding
- [ ] Bid creation and compliance matrix
- [ ] AI assistance usage
- [ ] Export generation
- [ ] Subscription upgrade/downgrade
- [ ] ACU top-up

**6.1.4 Performance Tests**
- [ ] API response times (< 2s for non-AI)
- [ ] AI response times (< 10s)
- [ ] Database query optimization
- [ ] Export generation performance
- [ ] Concurrent user handling

**6.1.5 Security Tests**
- [ ] RBAC tests (users can't access other orgs)
- [ ] ACU abuse prevention tests
- [ ] SQL injection tests
- [ ] XSS tests
- [ ] Rate limiting tests
- [ ] Token validation tests

#### 6.2 Performance Optimization
- [ ] Database query optimization:
  - Add missing indexes
  - Optimize slow queries
  - Add query caching where appropriate
- [ ] API response caching:
  - Cache static data
  - Cache policy templates
  - Cache method statement templates
- [ ] Export generation optimization:
  - Async processing for large exports
  - Progress tracking
  - Error recovery

#### 6.3 Error Handling & Logging
- [ ] Comprehensive error handling:
  - All endpoints have try/catch
  - Meaningful error messages
  - Error logging
- [ ] Logging setup:
  - Application logs
  - Error logs
  - Audit logs
  - Performance logs
- [ ] Monitoring setup:
  - Error tracking (Sentry or similar)
  - Performance monitoring
  - Uptime monitoring

#### 6.4 Documentation
- [ ] API documentation:
  - Endpoint descriptions
  - Request/response examples
  - Error codes
- [ ] Database schema documentation
- [ ] Deployment documentation
- [ ] Environment setup guide

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
- [ ] Security tests pass
- [ ] Export validation blocks non-compliant bids
- [ ] ACU system prevents abuse
- [ ] AI never executes without ACUs
- [ ] Token limits never exceeded

**Non-Functional Requirements**
- [ ] 99% uptime target (monitoring setup)
- [ ] GDPR-compliant storage
- [ ] Audit trail for all critical actions
- [ ] Responsive design works
- [ ] Accessibility standards met
- [ ] Error handling comprehensive
- [ ] Loading states everywhere
- [ ] Success feedback everywhere

**Launch Readiness**
- [ ] Demo pack ready
- [ ] Documentation complete
- [ ] Deployment process documented
- [ ] Environment variables documented
- [ ] Monitoring setup
- [ ] Backup strategy in place
- [ ] Rollback plan ready

**Success Metrics**
- [ ] System reduces bid disqualification risk
- [ ] Gross margin ≥ 80% under AI usage (monitoring setup)
- [ ] User onboarding smooth
- [ ] No critical security vulnerabilities

---

## POST-LAUNCH MILESTONE: MONITORING & ITERATION
**Duration**: Ongoing
**Goal**: Monitor system, gather feedback, iterate

### Tasks
- [ ] Monitor ACU usage and costs
- [ ] Monitor AI token usage
- [ ] Monitor export generation performance
- [ ] Gather user feedback
- [ ] Track error rates
- [ ] Monitor subscription conversions
- [ ] Iterate on UX based on feedback
- [ ] Add missing features
- [ ] Optimize based on usage patterns

---

## CRITICAL SUCCESS FACTORS CHECKLIST

### Must Have (Go/No-Go)
- [ ] Non-compliant submissions cannot be exported
- [ ] AI never executes without ACUs
- [ ] Token caps never exceeded (max 4000 tokens)
- [ ] Audit-ready ZIP/PDF generated
- [ ] Plan limits enforced (Starter = 1 user)
- [ ] Every AI/ACU event logged
- [ ] ACU ledger is immutable
- [ ] Export validation blocks gaps
- [ ] Org isolation enforced
- [ ] RBAC works correctly

### Performance Targets
- [ ] Response time < 2s (non-AI endpoints)
- [ ] AI response < 10s
- [ ] 99% uptime target
- [ ] Database queries optimized

### Security Requirements
- [ ] JWT authentication on all protected routes
- [ ] Role-based access control
- [ ] Org isolation enforced
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention
- [ ] XSS prevention
- [ ] Rate limiting implemented
- [ ] GDPR-compliant storage

### Commercial Requirements
- [ ] Gross margin ≥ 80% under AI usage
- [ ] ACU costs controlled
- [ ] Subscription management works
- [ ] Top-up flow works
- [ ] Monthly grants automated

---

## DEPENDENCIES SUMMARY

### External Services
- PostgreSQL Database (hosted on Supabase, AWS RDS, or self-hosted)
- File Storage (Supabase Storage or S3)
- Stripe (Payments)
- LLM Provider (OpenAI/Anthropic)
- Email Service (for invitations, password reset)

### Internal Dependencies
- Milestone 0 → All other milestones
- Milestone 1 → Milestones 2, 3, 4, 5
- Milestone 2 → Milestones 3, 4
- Milestone 3 → Milestone 4
- Milestone 4 → Milestone 5
- Milestone 5 → Milestone 6

---

## RISK MITIGATION

### Technical Risks
- **AI Cost Overruns**: Mitigated by ACU system, hard caps, kill switches
- **Performance Issues**: Mitigated by optimization, caching, monitoring
- **Security Vulnerabilities**: Mitigated by security testing, input validation
- **Export Generation Failures**: Mitigated by error handling, retry logic

### Business Risks
- **Scope Creep**: Mitigated by strict milestone boundaries
- **Timeline Overruns**: Mitigated by clear priorities, MVP focus
- **Budget Overruns**: Mitigated by cost monitoring, ACU controls

---

## API ENDPOINTS SUMMARY

### Authentication
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `POST /api/auth/refresh-token`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`

### Organizations
- `GET /api/orgs/current`
- `PUT /api/orgs/current`
- `GET /api/orgs/current/members`
- `POST /api/orgs/current/members`
- `PUT /api/orgs/current/members/:userId`

### Subscriptions
- `GET /api/subscriptions/current`
- `POST /api/subscriptions/create-checkout`
- `POST /api/subscriptions/webhook`
- `POST /api/subscriptions/upgrade`
- `POST /api/subscriptions/downgrade`
- `POST /api/subscriptions/cancel`

### ACU Management
- `GET /api/acu/balance`
- `GET /api/acu/ledger`
- `POST /api/billing/topup`
- `POST /api/billing/topup/confirm`
- `POST /api/system/monthly-grant`

### Bids
- `GET /api/bids`
- `GET /api/bids/:id`
- `POST /api/bids`
- `PUT /api/bids/:id`
- `DELETE /api/bids/:id`
- `GET /api/bids/:id/sections`
- `POST /api/bids/:id/sections`
- `PUT /api/bids/:id/sections/:sectionId`
- `DELETE /api/bids/:id/sections/:sectionId`
- `GET /api/bids/:id/team`
- `POST /api/bids/:id/team`
- `DELETE /api/bids/:id/team/:userId`
- `PUT /api/bids/:id/status`

### Compliance
- `POST /api/bids/:id/compliance/requirements`
- `GET /api/bids/:id/compliance/matrix`
- `PUT /api/bids/:id/compliance/map/:requirementId`
- `PUT /api/bids/:id/compliance/status/:requirementId`
- `GET /api/bids/:id/compliance/status`
- `POST /api/bids/:id/compliance/validate-export`

### Policies
- `GET /api/policies`
- `GET /api/policies/:id`
- `POST /api/policies`
- `PUT /api/policies/:id`
- `DELETE /api/policies/:id`
- `GET /api/policies/templates`
- `POST /api/policies/:id/duplicate`
- `GET /api/policies/:id/versions`
- `POST /api/policies/:id/assign-to-bid/:bidId`

### Method Statements
- `GET /api/method-statements`
- `GET /api/method-statements/:id`
- `POST /api/method-statements`
- `PUT /api/method-statements/:id`
- `PUT /api/method-statements/:id/section/:sectionName`
- `DELETE /api/method-statements/:id`
- `GET /api/method-statements/trade-presets`
- `POST /api/method-statements/:id/duplicate`
- `POST /api/method-statements/:id/assign-to-bid/:bidId`

### Social Value
- `GET /api/social-value/:bidId`
- `POST /api/social-value/:bidId`
- `PUT /api/social-value/:bidId/kpi/:kpiName`
- `GET /api/social-value/:bidId/summary`

### AI Gateway
- `POST /api/ai/quote`
- `POST /api/ai/execute`
- `GET /api/ai/history`

### Export
- `POST /api/bids/:id/export/validate`
- `POST /api/bids/:id/export/prepare`
- `GET /api/bids/:id/export/status/:jobId`
- `GET /api/bids/:id/export/download/:jobId`

### Admin
- `GET /api/admin/acu/global-status`
- `POST /api/admin/acu/kill-switch`
- `GET /api/admin/acu/limits`
- `PUT /api/admin/acu/limits/:orgId`
- `GET /api/admin/acu/ledger`
- `GET /api/admin/orgs`
- `GET /api/admin/orgs/:orgId`
- `PUT /api/admin/orgs/:orgId`
- `GET /api/admin/orgs/:orgId/users`
- `GET /api/admin/abuse/flags`
- `POST /api/admin/abuse/flag/:orgId`
- `POST /api/admin/abuse/unflag/:orgId`
- `GET /api/admin/analytics/overview`
- `GET /api/admin/analytics/acu-usage`
- `GET /api/admin/analytics/ai-requests`

---

## CRITICAL FLOWS

### 1. AI Request Flow (MANDATORY)
```
Frontend: User clicks AI action
    ↓
Frontend: Show ACU confirmation modal
    ↓
Frontend: User confirms
    ↓
Frontend: POST /api/ai/quote
    ↓
Backend: Calculate ACU cost, check balance
    ↓
Backend: Return quote
    ↓
Frontend: POST /api/ai/execute
    ↓
Backend: Validate (auth, plan, balance, caps)
    ↓
Backend: Atomic ACU debit
    ↓
Backend: Call LLM with token limit
    ↓
Backend: Log usage
    ↓
Backend: Return result
    ↓
Frontend: Display result, update balance
```

### 2. Export Flow (MANDATORY)
```
Frontend: User clicks Export
    ↓
Frontend: POST /api/bids/:id/export/prepare
    ↓
Backend: Validate compliance (block if gaps)
    ↓
Backend: Gather all sections
    ↓
Backend: Generate documents (DOCX/PDF)
    ↓
Backend: Create folder structure
    ↓
Backend: Build ZIP + Master PDF
    ↓
Backend: Store in storage
    ↓
Backend: Return download link
    ↓
Frontend: Show download button
```

### 3. Compliance Validation Flow
```
User adds requirement
    ↓
Backend: Auto-map to existing content
    ↓
Backend: Calculate status (Covered/Missing/Non-compliant)
    ↓
Frontend: Display matrix with status
    ↓
User tries to export
    ↓
Backend: Check all critical items = Covered
    ↓
If gaps: Block export, return errors
If covered: Allow export
```

---

**END OF MILESTONE BREAKDOWN**

