# BIDPACK UK - Frontend Application

**Tender Compliance Operating System**  
*"We stop construction contractors from getting disqualified before scoring."*

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   ├── bids/              # Bid management pages
│   ├── policies/          # Policy library pages
│   ├── method-statements/ # Method statement pages
│   ├── settings/          # Settings pages
│   └── admin/             # Admin panel pages
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── bids/             # Bid components
│   ├── compliance/       # Compliance matrix components
│   ├── policies/         # Policy components
│   ├── method-statements/# Method statement components
│   ├── social-value/     # Social value components
│   ├── acu/              # ACU dashboard components
│   ├── ai/               # AI integration components
│   ├── export/           # Export components
│   ├── admin/            # Admin components
│   └── ui/               # Reusable UI components
├── lib/                  # Utilities and API services
│   ├── api/              # API service modules (mock)
│   ├── utils/            # Utility functions
│   └── mockData.ts       # Mock data for development
├── store/                # Zustand state stores
├── types/                # TypeScript type definitions
└── styles/               # Global styles
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: React Query/TanStack Query
- **Forms**: React Hook Form + Zod
- **Tables**: TanStack Table
- **Notifications**: react-hot-toast
- **UI Components**: @headlessui/react
- **Icons**: @heroicons/react
- **Date Handling**: date-fns

## 🎯 Features

### ✅ Milestone 0: Foundation
- Project setup with Next.js 14 + TypeScript + Tailwind CSS
- Portal-style sidebar with collapse/expand
- Base UI components (Button, Input, Card, Badge, etc.)
- Authentication state management
- Route protection middleware

### ✅ Milestone 1: Authentication & Subscriptions
- User registration and login
- Organization management
- Subscription management (Starter/Professional)
- ACU dashboard with balance and ledger
- Password reset flow

### ✅ Milestone 2: Bid Management & Compliance
- Create, edit, delete bids
- Bid sections management
- Compliance matrix engine
- Requirement mapping
- Auto-mapping functionality

### ✅ Milestone 3: Policy Library & Method Statements
- Policy library with templates
- Method statement builder
- Social value engine
- KPI tracking and PPN 06/20 compliance

### ✅ Milestone 4: AI Gateway & Export
- AI confirmation modal (ACU metering)
- AI action buttons (Generate, Refine, Explain)
- AI usage history
- Export submission packs (ZIP/PDF)
- Export validation and compliance checks

### ✅ Milestone 5: Admin Panel
- Admin dashboard with system stats
- Global AI controls and kill switch
- Organization management
- ACU management and ledger viewer
- Abuse detection and flagging
- Analytics dashboard

### ✅ Milestone 6: UX Polish
- Loading states and skeleton loaders
- Empty states with call-to-action
- Error boundaries and handling
- Accessibility improvements
- Responsive design

## 🔐 Authentication

The application uses JWT-based authentication. Mock authentication is implemented for development:

- **Login**: Use any email/password (mock accepts all)
- **Default User**: First user from mock data (ali.ahmed@demo-construction.co.uk)
- **Roles**: owner, admin, member

## 📊 Mock Data

All API services use mock data located in `lib/mockData.ts`. This includes:

- Organizations
- Users
- Subscriptions
- Bids
- Policies
- Method Statements
- ACU transactions
- AI request history

## 🎨 Design System

### Colors
- **Primary**: Blue scale (primary-50 to primary-900)
- **Success**: Green
- **Warning**: Yellow/Orange
- **Error**: Red
- **Neutral**: Gray scale

### Components
All components follow Tailwind CSS utility-first approach with:
- Consistent spacing (Tailwind spacing scale)
- Responsive design (mobile-first)
- Dark mode support
- Accessibility features

## 🔒 Route Protection

- **Public Routes**: `/login`, `/register`, `/forgot-password`, `/reset-password`, `/pricing`
- **Protected Routes**: All other routes require authentication
- **Admin Routes**: `/admin/*` requires owner/admin role

## 📱 Responsive Design

The application is fully responsive:
- **Mobile**: < 768px (overlay sidebar)
- **Tablet**: 768px - 1023px
- **Desktop**: ≥ 1024px (fixed sidebar)

## ♿ Accessibility

- ARIA labels on interactive elements
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Semantic HTML

## 🧪 Development

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_...
```

### Mock API

All API services are mocked. To connect to a real backend:

1. Update API URLs in `lib/api/apiClient.ts`
2. Replace mock implementations in `lib/api/*Service.ts`
3. Update `lib/mockData.ts` with real data structures

## 📝 Code Style

- **Components**: PascalCase (e.g., `BidList.tsx`)
- **Utilities**: camelCase (e.g., `cn.ts`)
- **Types**: PascalCase interfaces/types
- **Files**: Match component/function name

## 🚀 Deployment

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

### Environment Setup

Ensure all environment variables are set in production:
- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_STRIPE_PUBLIC_KEY`

## 📚 Documentation

- **Component Documentation**: See component files for prop types and usage
- **API Services**: See `lib/api/*Service.ts` for API interfaces
- **Types**: See `types/index.ts` for TypeScript definitions

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**: Change port in `package.json` scripts
2. **TypeScript errors**: Run `npm run build` to check for type errors
3. **Tailwind not working**: Ensure `tailwind.config.ts` includes correct content paths

## 📄 License

Proprietary - BIDPACK UK

---

**Built with ❤️ using Next.js, React, and Tailwind CSS**

