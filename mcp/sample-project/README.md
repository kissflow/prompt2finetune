# ShopFlow E-Commerce Platform

A modern, scalable e-commerce platform built with microservices architecture.

## Overview

**ShopFlow** is a full-featured e-commerce platform serving **50,000+ daily active users** across web and mobile. The platform handles product catalog, order management, payments, and customer support.

### Current Sprint: v2.4.0
**Focus Areas:**
- Mobile checkout stability fixes
- Dark mode UI implementation
- Performance optimization for high-traffic events
- Database migration for v2.0 schema

## System Architecture

### Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend** | React + Next.js | React 18, Next.js 14 |
| **Backend** | Node.js + Express | Node 20 LTS, Express 4.18 |
| **Database** | MongoDB | v7.0 |
| **Cache** | Redis | v7.2 |
| **CDN** | CloudFront | - |
| **Hosting** | AWS ECS | Fargate |
| **CI/CD** | GitHub Actions | - |
| **Monitoring** | Sentry + Datadog | - |

### Microservices Architecture

```
┌─────────────────┐
│  CDN (CloudFront) │
└────────┬─────────┘
         │
┌────────▼─────────────────────────────────────┐
│          Load Balancer (ALB)                  │
└───┬──────────┬──────────┬──────────┬─────────┘
    │          │          │          │
    ▼          ▼          ▼          ▼
┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│ auth-  │ │checkout│ │ media- │ │ user-  │
│service │ │service │ │service │ │service │
└───┬────┘ └───┬────┘ └───┬────┘ └───┬────┘
    │          │          │          │
    └──────────┴──────────┴──────────┘
                   │
         ┌─────────▼──────────┐
         │   MongoDB Atlas    │
         │     (Primary)      │
         └────────────────────┘
```

## Services

### 1. **auth-service** (Port 3001)
**Responsibility**: Authentication & session management

**Features:**
- JWT-based authentication
- OAuth2 integration (Google, Facebook)
- Session management with Redis
- Rate limiting & brute force protection

**Tech Stack:**
- Node.js + Express
- Passport.js
- Redis for sessions
- bcrypt for password hashing

**Current Issues:**
- Memory leak in session handler (89 errors) ⚠️

### 2. **checkout-service** (Port 3002)
**Responsibility**: Cart & payment processing

**Features:**
- Shopping cart management
- Payment gateway integration (Stripe, PayPal)
- Order creation and tracking
- Inventory reservation

**Tech Stack:**
- Node.js + Express
- Stripe SDK
- MongoDB transactions
- Bull (job queue for async order processing)

**Current Issues:**
- Null pointer crash on mobile Safari (342 errors) 🔴

### 3. **media-service** (Port 3003)
**Responsibility**: Image upload, processing & CDN

**Features:**
- Product image upload & storage
- Image optimization (resize, compress, webp conversion)
- CDN distribution via CloudFront
- Thumbnail generation

**Tech Stack:**
- Node.js + Express
- Sharp (image processing)
- AWS S3 for storage
- CloudFront CDN

**Current Issues:**
- CDN returning 503 under load (156 errors) ⚠️
- Recent rollback of v3.0.0

### 4. **user-service** (Port 3004)
**Responsibility**: User profiles & preferences

**Features:**
- User profile management
- Preferences & settings
- Order history
- Wishlist & favorites
- Address book

**Tech Stack:**
- Node.js + Express
- MongoDB
- Redis for caching

**Current Issues:**
- Slow query on dashboard (>5s, 412 errors) ⚠️

## Infrastructure

### AWS Services Used
- **ECS (Fargate)**: Container orchestration
- **RDS (MongoDB Atlas)**: Primary database
- **ElastiCache (Redis)**: Session store & caching
- **S3**: Media storage
- **CloudFront**: CDN
- **ALB**: Load balancing
- **Route 53**: DNS
- **CloudWatch**: Logging & monitoring
- **Secrets Manager**: Sensitive credentials

### Environments
- **Development**: dev.shopflow.com
- **Staging**: staging.shopflow.com
- **Production**: www.shopflow.com

## Development Setup

### Prerequisites
- Node.js 20+
- Docker & Docker Compose
- MongoDB 7.0+
- Redis 7.2+

### Local Development

```bash
# Clone repository
git clone https://github.com/shopflow/platform.git
cd platform

# Install dependencies
npm install

# Start infrastructure (MongoDB, Redis)
docker-compose up -d

# Copy environment variables
cp .env.example .env

# Start all services
npm run dev

# Or start individual services:
npm run dev:auth
npm run dev:checkout
npm run dev:media
npm run dev:user
```

### Environment Variables

```bash
# Database
MONGODB_URI=mongodb://localhost:27017/shopflow
REDIS_URL=redis://localhost:6379

# Auth Service
JWT_SECRET=your-secret-key
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx

# Checkout Service
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Media Service
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
S3_BUCKET=shopflow-media
CLOUDFRONT_DOMAIN=d123456abcdef.cloudfront.net
```

## Testing

```bash
# Run all tests
npm test

# Run tests for specific service
npm run test:auth
npm run test:checkout
npm run test:media
npm run test:user

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e
```

## Deployment

```bash
# Build Docker images
npm run build

# Deploy to staging
npm run deploy:staging

# Deploy to production (requires approval)
npm run deploy:production
```

### Deployment Pipeline
1. Developer pushes to feature branch
2. GitHub Actions runs tests
3. PR review & approval required
4. Merge to `main` triggers staging deployment
5. Manual approval required for production
6. Production deployment via GitHub Actions

## Monitoring & Observability

### Metrics
- **Datadog**: Application performance monitoring (APM)
- **Sentry**: Error tracking & crash reporting
- **CloudWatch**: Infrastructure metrics

### Alerts
- **Critical**: Page immediately (checkout failures, auth down)
- **High**: Notify Slack within 5 minutes
- **Medium**: Daily digest

### SLAs
- **Uptime**: 99.9% (production)
- **Response time**: <500ms (p95)
- **Error rate**: <0.1%

## Team

| Role | Name | Slack | Focus Areas |
|------|------|-------|-------------|
| **Tech Lead** | Alice | @alice | Architecture, auth-service |
| **Backend Dev** | Bob | @bob | checkout-service, payments |
| **DevOps** | Charlie | @charlie | Infrastructure, deployments |
| **Frontend Dev** | Diana | @diana | React, Next.js, mobile |

## Current Sprint (v2.4.0)

### Sprint Goals
1. **Fix critical bugs**:
   - WRK-2: Checkout crash on mobile Safari (Priority: Urgent)
   - Auth memory leak (newly discovered, Priority: Critical)
2. **Feature work**:
   - WRK-3: Dark mode support (Priority: Medium)
   - WRK-6: Optimize image loading (Priority: Medium)
3. **Infrastructure**:
   - WRK-4: Database migration for v2.0 schema (Priority: High)

### Sprint Timeline
- **Start**: Feb 3, 2026
- **End**: Feb 17, 2026
- **Sprint Demo**: Feb 17, 2026 at 2pm

## Performance Benchmarks

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Page Load Time (p95) | <2s | 1.8s | ✅ |
| API Response (p95) | <500ms | 420ms | ✅ |
| Checkout Success Rate | >99% | 98.2% | ⚠️ |
| CDN Cache Hit Rate | >95% | 87% | ⚠️ |
| Database Query Time (p95) | <100ms | 340ms | ⚠️ |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines.

## License

Proprietary - © 2026 ShopFlow Inc. All rights reserved.

---

**Need help?** Check the [Wiki](https://wiki.shopflow.com) or ask in #engineering on Slack.
