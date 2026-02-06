# Changelog

All notable changes to the ShopFlow platform are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [v2.3.1] - 2026-02-03

### Fixed
- **[Critical]** Hotfix for checkout null pointer crash on iOS Safari
  - Fixed race condition in cart state management (checkout.js:127)
  - Added null checks before accessing cart.items
  - Affected users: 127 customers
  - Related ticket: WRK-2
- **[High]** Patched memory leak in media-service under high concurrency
  - Fixed image processing worker not releasing Sharp instances
  - Reduced memory usage by 40% under load
  - Closes issue #892

### Changed
- Increased health check timeout for checkout-service from 5s to 10s
- Updated Sentry SDK to v7.99.0

---

## [v2.3.0] - 2026-01-28

### Added
- **Payment retry logic** with exponential backoff
  - Automatically retries failed Stripe payments up to 3 times
  - Reduces false negatives from network timeouts
  - Improves checkout success rate by 1.2%
- **User preference API endpoints**
  - `GET /api/users/:id/preferences`
  - `PUT /api/users/:id/preferences`
  - Supports theme, language, currency, notifications
- **Webhook validation** for all payment callbacks
  - Validates Stripe webhook signatures
  - Prevents replay attacks

### Changed
- **Upgraded MongoDB driver** to v6.5
  - Better connection pooling
  - Native support for MongoDB 7.0 features
  - 15% improvement in query performance
- **Switched CDN provider** for APAC region
  - Moved from CloudFlare to CloudFront for Asia-Pacific
  - Reduced latency for APAC users by 40%
- Increased rate limit for auth endpoints from 10/min to 15/min
- Updated all dependencies to latest security patches

### Fixed
- Dashboard slow query issue (added composite index on users.orders)
- OAuth callback redirect loop for some Google accounts
- Product search not respecting user's currency preference

---

## [v2.2.0] - 2026-01-15

### Added
- **Initial dark mode support** (CSS variables only)
  - Added CSS custom properties for theming
  - `--color-background`, `--color-text`, `--color-primary`
  - Frontend components not yet using the variables (planned for v2.4)
- **Image lazy-loading skeleton components**
  - Reduces perceived load time
  - Improves Core Web Vitals (LCP score +12 points)
- **Admin dashboard** for customer support
  - View user orders, refund history
  - Search by email, order ID, date range
  - Role-based access control (RBAC)

### Changed
- Migrated from PM2 to Docker containers (ECS Fargate)
- Consolidated 3 Redis instances into 1 with namespacing
- Moved secrets from .env files to AWS Secrets Manager

### Fixed
- Shopping cart not persisting across sessions for logged-in users
- Currency conversion API timeout causing checkout failures
- Duplicate order creation when user clicks "Pay" multiple times

---

## [v2.1.5] - 2026-01-05

### Added
- **Product recommendation engine v1**
  - Collaborative filtering based on purchase history
  - "Customers who bought this also bought" section
  - 8% increase in cross-sell conversion
- Email templates for order confirmations and shipping updates

### Changed
- Optimized product images (WebP format with fallback)
  - Reduced image size by 60% average
  - Improved page load time by 1.2s
- Increased Stripe webhook timeout from 5s to 15s
- Switched logging format from custom to structured JSON

### Fixed
- User profile photos not uploading (S3 CORS issue)
- Product search returning zero results for partial matches
- Checkout button disabled state not updating correctly

---

## [v2.1.0] - 2025-12-20

### Added
- **Guest checkout** feature
  - Users can complete purchases without creating an account
  - Email-based order tracking
  - 22% increase in checkout completion rate
- **Product reviews** and ratings
  - 5-star rating system
  - Verified purchase badge
  - Review moderation queue for admins

### Changed
- Migrated from Heroku to AWS ECS (Fargate)
- Upgraded Node.js from v18 to v20 LTS
- Refactored authentication to use JWT instead of sessions
  - Improved scalability (no session store required)
  - Reduced Redis load by 70%

### Deprecated
- Legacy `/api/v1/cart` endpoints (use `/api/v2/cart` instead)
- Will be removed in v3.0.0 (June 2026)

---

## [v2.0.0] - 2025-12-01

### Added
- **Microservices architecture** (breaking change)
  - Split monolith into 4 services: auth, checkout, media, user
  - Independent scaling and deployment
- **MongoDB migration** from PostgreSQL
  - Better schema flexibility for product catalog
  - Improved query performance for nested data
- **Redis caching layer**
  - Product catalog cached for 1 hour
  - User sessions stored in Redis
  - 40% reduction in database load

### Changed
- API versioning: All endpoints now under `/api/v2/`
- Authentication tokens now expire after 24 hours (was 7 days)
- Product IDs changed from incremental integers to UUIDs

### Removed
- `/api/v1/` endpoints (deprecated in v1.8.0)
- Legacy admin panel (replaced by new React-based dashboard)

### Breaking Changes
- **Client apps must upgrade** to use `/api/v2/` endpoints
- Authentication tokens issued before v2.0.0 are invalid
- Product URLs changed from `/products/:id` to `/products/:uuid`

---

## [v1.8.0] - 2025-11-10

### Added
- Multi-currency support (USD, EUR, GBP, JPY)
- Internationalization (i18n) for English, Spanish, French
- Google Analytics 4 integration

### Deprecated
- `/api/v1/` endpoints (will be removed in v2.0.0)

---

## [v1.7.0] - 2025-10-25

### Added
- Stripe payment gateway integration
- Order history page for users
- Admin panel for order management

### Fixed
- Memory leak in image upload service
- Race condition in inventory deduction

---

## [v1.6.0] - 2025-10-01

Initial production release of ShopFlow platform.

### Features
- User authentication (email/password)
- Product catalog with search and filters
- Shopping cart and checkout
- PayPal payment integration
- Order tracking
- Email notifications

---

## Version History

| Version | Release Date | Status | Notes |
|---------|--------------|--------|-------|
| **v2.3.1** | 2026-02-03 | ✅ Current | Hotfix for checkout crash |
| v2.3.0 | 2026-01-28 | Stable | Payment retry + MongoDB 6.5 |
| v2.2.0 | 2026-01-15 | Stable | Dark mode prep, lazy loading |
| v2.1.5 | 2026-01-05 | Stable | Recommendations v1 |
| v2.1.0 | 2025-12-20 | Stable | Guest checkout |
| v2.0.0 | 2025-12-01 | Stable | Microservices architecture |
| v1.8.0 | 2025-11-10 | EOL | Multi-currency support |
| v1.7.0 | 2025-10-25 | EOL | Stripe integration |
| v1.6.0 | 2025-10-01 | EOL | Initial release |

---

**Next Release:** v2.4.0 (Planned for Feb 17, 2026)
- Dark mode UI implementation
- Database schema v2.0 migration
- Performance optimizations
- Critical bug fixes (WRK-2, auth memory leak)
