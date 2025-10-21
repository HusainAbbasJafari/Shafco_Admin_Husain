# 🛍️ Shafco Admin Panel

(./public/ShafcoAdminHome.png)

A modern, full-featured e-commerce admin dashboard for Shafco's modest fashion platform. Built with Next.js 14+, this comprehensive admin panel provides powerful tools for managing products, orders, customers, and analytics.


![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat-square&logo=typescript)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---
![Home](./public/ShafcoAdminHome.png)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Environment Setup](#-environment-setup)
- [Available Scripts](#-available-scripts)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Support](#-support)

---

## ✨ Features

### 📊 Dashboard & Analytics
- Real-time sales overview and revenue tracking
- Customer analytics and behavior insights
- Product performance metrics
- Visual data representations with interactive charts

### 📦 Product Management
- Full CRUD operations for products
- Bulk product import/export
- Category and collection management
- Inventory tracking and alerts
- Image gallery with multi-upload support
- Product variants (sizes, colors, materials)

### 🛒 Order Management
- Comprehensive order tracking system
- Order status management (Pending, Processing, Completed, Cancelled)
- Invoice generation and printing
- Shipping label integration
- Order search and filtering
- Bulk order processing

### 👥 Customer Management
- Customer profiles and purchase history
- Customer segmentation
- Communication tools
- Wishlist and cart tracking
- Customer lifetime value analytics

### 💳 Payment & Transactions
- Multiple payment gateway integration
- Transaction history and reconciliation
- Refund management
- Payment analytics

### 🚚 Shipping & Logistics
- Multi-carrier shipping integration
- Real-time tracking updates
- Shipping rate calculation
- Return and exchange management

### ⭐ Reviews & Ratings
- Review moderation system
- Rating analytics
- Customer feedback management

### 📢 Marketing Tools
- Discount and coupon management
- Email marketing campaigns
- Promotional banner management
- Newsletter subscriber management

### 🔐 Security & Access Control
- Role-based access control (RBAC)
- Multi-factor authentication
- Activity logging and audit trails
- Secure API endpoints

### 🎨 UI/UX Features
- Responsive design for all devices
- Dark/Light mode support
- Intuitive navigation
- Real-time notifications
- Advanced search and filtering
- Data export capabilities (CSV, Excel, PDF)

---

## 🛠 Tech Stack

### Core
- **Framework:** [Next.js 14+](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI Library:** [React 18+](https://react.dev/)

### Styling & UI Components
- **CSS Framework:** [Tailwind CSS](https://tailwindcss.com/)
- **Component Library:** [shadcn/ui](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

### Data & State Management
- **Data Fetching:** React Query / SWR
- **State Management:** Zustand / Context API
- **Forms:** React Hook Form + Zod validation

### Charts & Visualization
- **Charts:** [Recharts](https://recharts.org/) / Chart.js
- **Data Tables:** TanStack Table

### Backend Integration
- **API Client:** Axios / Fetch API
- **Authentication:** NextAuth.js / JWT
- **File Upload:** Cloudinary / AWS S3

### Development Tools
- **Linting:** ESLint
- **Formatting:** Prettier
- **Git Hooks:** Husky
- **Testing:** Jest + React Testing Library

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your system:
- **Node.js** 18.17 or later
- **npm** / **yarn** / **pnpm** / **bun**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/shafco-admin.git
   cd shafco-admin
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example env file
   cp .env.example .env.dev
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🔐 Environment Setup

The project supports multiple environments with separate configuration files:

### Environment Files

```
.env.dev         # Development environment
.env.staging     # Staging environment
.env.prod        # Production environment
```

### Required Environment Variables

Create your `.env.dev` file with the following variables:

```bash
# App Configuration
NEXT_PUBLIC_APP_NAME=Shafco Admin
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# API Configuration
NEXT_PUBLIC_API_URL=https://api.shafco.com
NEXT_PUBLIC_API_VERSION=v1

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-here
JWT_SECRET=your-jwt-secret-key

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/shafco_admin

# AWS S3 / File Storage
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=shafco-uploads

# Cloudinary (Alternative)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Payment Gateways
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email Service
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=noreply@shafco.com

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_CHAT_SUPPORT=false

# External Services
GOOGLE_MAPS_API_KEY=your-google-maps-key
SHIPMENT_TRACKING_API_KEY=your-tracking-key
```

### Environment-Specific Configuration

You can create different configurations for each environment:

```bash
# .env.dev - Development settings
NEXT_PUBLIC_API_URL=http://localhost:8000
DEBUG=true

# .env.staging - Staging settings
NEXT_PUBLIC_API_URL=https://staging-api.shafco.com
DEBUG=true

# .env.prod - Production settings
NEXT_PUBLIC_API_URL=https://api.shafco.com
DEBUG=false
```

---

## 📜 Available Scripts

### Development

```bash
# Run development server with .env.dev
npm run dev

# Run development server with staging environment
npm run dev:staging

# Run development server with production environment
npm run dev:prod
```

### Building

```bash
# Build for development
npm run build

# Build for staging
npm run build:staging

# Build for production
npm run build:prod
```

### Testing & Quality

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code with Prettier
npm run format

# Type checking
npm run type-check
```

### Production

```bash
# Start production server
npm run start

# Build and start
npm run build && npm run start
```

### Database & Migrations

```bash
# Run database migrations
npm run db:migrate

# Create new migration
npm run db:migrate:create

# Seed database
npm run db:seed

# Reset database
npm run db:reset
```

---

## 📁 Project Structure

```
shafco-admin/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   ├── (dashboard)/              # Protected dashboard routes
│   │   ├── page.tsx              # Main dashboard
│   │   ├── products/             # Product management
│   │   ├── orders/               # Order management
│   │   ├── customers/            # Customer management
│   │   ├── analytics/            # Analytics & reports
│   │   ├── categories/           # Category management
│   │   ├── payments/             # Payment management
│   │   ├── shipping/             # Shipping management
│   │   ├── reviews/              # Review management
│   │   ├── marketing/            # Marketing tools
│   │   └── settings/             # Settings & configuration
│   ├── api/                      # API routes
│   │   ├── auth/
│   │   ├── products/
│   │   ├── orders/
│   │   └── upload/
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   ├── layout/                   # Layout components
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Breadcrumb.tsx
│   ├── dashboard/                # Dashboard-specific components
│   │   ├── StatsCard.tsx
│   │   ├── SalesChart.tsx
│   │   ├── RecentOrders.tsx
│   │   └── TopProducts.tsx
│   ├── products/                 # Product components
│   │   ├── ProductForm.tsx
│   │   ├── ProductList.tsx
│   │   ├── ProductCard.tsx
│   │   └── ProductFilters.tsx
│   ├── orders/                   # Order components
│   │   ├── OrderTable.tsx
│   │   ├── OrderDetails.tsx
│   │   └── OrderStatus.tsx
│   └── shared/                   # Shared components
│       ├── DataTable.tsx
│       ├── SearchBar.tsx
│       ├── Pagination.tsx
│       └── EmptyState.tsx
├── lib/                          # Utility libraries
│   ├── api.ts                    # API client
│   ├── auth.ts                   # Authentication utilities
│   ├── utils.ts                  # General utilities
│   ├── constants.ts              # App constants
│   └── validations.ts            # Validation schemas
├── hooks/                        # Custom React hooks
│   ├── useAuth.ts
│   ├── useProducts.ts
│   ├── useOrders.ts
│   └── useDebounce.ts
├── types/                        # TypeScript type definitions
│   ├── index.ts
│   ├── product.ts
│   ├── order.ts
│   ├── customer.ts
│   └── api.ts
├── store/                        # State management
│   ├── authStore.ts
│   ├── cartStore.ts
│   └── uiStore.ts
├── config/                       # Configuration files
│   ├── site.ts                   # Site configuration
│   ├── navigation.ts             # Navigation structure
│   └── constants.ts              # App-wide constants
├── public/                       # Static assets
│   ├── images/
│   ├── icons/
│   └── fonts/
├── styles/                       # Additional styles
├── .env.dev                      # Development environment
├── .env.staging                  # Staging environment
├── .env.prod                     # Production environment
├── .env.example                  # Environment template
├── next.config.js                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies
└── README.md                     # This file
```

---

## ⚙️ Configuration

### Next.js Configuration

Edit `next.config.js` to customize your build:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 's3.amazonaws.com'],
  },
  env: {
    CUSTOM_ENV_VAR: process.env.CUSTOM_ENV_VAR,
  },
  // Add more configurations
}

module.exports = nextConfig
```

### Tailwind Configuration

Customize your design system in `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        shafco: {
          red: '#FF0000',
          dark: '#1a1a1a',
          // Add more brand colors
        },
      },
    },
  },
  plugins: [],
}
export default config
```

---

## 🚢 Deployment

### Deploy on Vercel (Recommended)

The easiest way to deploy your Next.js app:

1. **Push your code to GitHub**

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your repository
   - Configure environment variables
   - Deploy!

3. **Set up environment variables**
   - Add all variables from `.env.prod`
   - Configure production API endpoints

4. **Configure domains**
   - Add your custom domain
   - Set up SSL certificates (automatic)

### Deploy on Other Platforms

#### AWS (EC2 / ECS)
```bash
# Build the application
npm run build:prod

# Start with PM2
pm2 start npm --name "shafco-admin" -- start
```







