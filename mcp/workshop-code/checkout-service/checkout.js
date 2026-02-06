// checkout-service/checkout.js
// ShopFlow E-commerce Platform - Checkout Service

/**
 * Process cart and prepare for payment
 *
 * BUG HISTORY (WRK-1):
 * - Commit d30be37: Added cart validation but introduced null pointer bug
 * - Commit 2e3fcd1: Fixed null check - now deployed in v2.3.1
 */

class CheckoutService {
  constructor(paymentGateway, inventoryService) {
    this.paymentGateway = paymentGateway;
    this.inventoryService = inventoryService;
  }

  /**
   * Process cart for checkout
   * @param {Object} cart - User's shopping cart
   * @param {string} userId - User ID
   * @returns {Promise<Object>} Checkout session
   *
   * BUG (WRK-1): Before fix, this crashed on mobile Safari when cart was null
   * ERROR: "TypeError: Cannot read property 'items' of null at processCart (checkout.js:127)"
   *
   * CAUSE: Mobile Safari sometimes sends null cart when localStorage fails to sync
   * AFFECTED: 342 errors, 127 users
   *
   * FIX: Added null check before accessing cart.items
   */
  async processCart(cart, userId) {
    // ============================================================
    // FIX for WRK-1 (Commit 2e3fcd1)
    // Added null check to prevent crash on mobile Safari
    // ============================================================
    if (!cart || !cart.items) {
      console.error(`[WRK-1] Null cart detected for user ${userId}`);
      throw new Error('Invalid cart: Cart is empty or not initialized');
    }

    // Validate cart items have required fields
    for (const item of cart.items) {
      if (!item.productId || !item.quantity || !item.price) {
        throw new Error(`Invalid cart item: ${JSON.stringify(item)}`);
      }
    }

    // Check inventory availability
    const availabilityCheck = await this.checkInventory(cart.items);
    if (!availabilityCheck.allAvailable) {
      return {
        success: false,
        error: 'Some items are out of stock',
        unavailableItems: availabilityCheck.unavailableItems
      };
    }

    // Calculate totals
    const subtotal = cart.items.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);

    const tax = subtotal * 0.08; // 8% tax
    const shipping = this.calculateShipping(cart.items, cart.shippingAddress);
    const total = subtotal + tax + shipping;

    // Create checkout session
    const session = {
      sessionId: this.generateSessionId(),
      userId: userId,
      items: cart.items,
      subtotal: subtotal,
      tax: tax,
      shipping: shipping,
      total: total,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
    };

    console.log(`[Checkout] Session created: ${session.sessionId} for user ${userId}`);
    return { success: true, session };
  }

  /**
   * Check inventory for all cart items
   */
  async checkInventory(items) {
    const unavailableItems = [];

    for (const item of items) {
      const stock = await this.inventoryService.getStock(item.productId);
      if (stock < item.quantity) {
        unavailableItems.push({
          productId: item.productId,
          requested: item.quantity,
          available: stock
        });
      }
    }

    return {
      allAvailable: unavailableItems.length === 0,
      unavailableItems
    };
  }

  /**
   * Calculate shipping cost
   */
  calculateShipping(items, address) {
    const totalWeight = items.reduce((sum, item) => sum + (item.weight || 0), 0);

    // Free shipping over 50 lbs or $100
    const totalValue = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (totalWeight > 50 || totalValue > 100) {
      return 0;
    }

    // Base rate + weight rate
    return 5.99 + (totalWeight * 0.5);
  }

  /**
   * Generate unique session ID
   */
  generateSessionId() {
    return `sess_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  }
}

module.exports = CheckoutService;

// ============================================================
// WORKSHOP NOTES:
// ============================================================
// This file demonstrates Story 1 (WRK-1):
//
// BUG: Mobile Safari null pointer crash
// CAUSE: Missing null check on cart object
// FIX: Lines 39-42 - Added validation before accessing cart.items
//
// Cross-system links:
// - Linear Ticket: WRK-1 (Critical, Fixed)
// - MongoDB Bug: ticket_id "WRK-1", 342 errors
// - GitHub Commit: d30be37 (introduced bug), 2e3fcd1 (fixed)
// - Deployment: checkout-service v2.3.1 (includes fix)
// ============================================================
