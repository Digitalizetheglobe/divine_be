require('dotenv').config({ path: '../config.env' });

const paypalConfig = {
  // PayPal API credentials
  clientId: process.env.PAYPAL_CLIENT_ID || 'YOUR_PAYPAL_CLIENT_ID',
  clientSecret: process.env.PAYPAL_CLIENT_SECRET || 'YOUR_PAYPAL_CLIENT_SECRET',
  
  // Environment (sandbox or live)
  mode: process.env.PAYPAL_MODE || 'sandbox', // 'sandbox' for testing, 'live' for production
  
  // Currency settings
  currency: process.env.PAYPAL_CURRENCY || 'USD',
  
  // Default session pricing
  sessionPrice: process.env.SESSION_PRICE || 99,
  
  // PayPal webhook settings
  webhookId: process.env.PAYPAL_WEBHOOK_ID || null,
  
  // Return URLs
  returnUrl: process.env.PAYPAL_RETURN_URL || 'http://localhost:3000/booking/success',
  cancelUrl: process.env.PAYPAL_CANCEL_URL || 'http://localhost:3000/booking/cancel'
};

module.exports = paypalConfig; 