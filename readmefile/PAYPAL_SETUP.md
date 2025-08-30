# PayPal Integration Setup Guide

This guide will help you set up PayPal payment integration for the Divine Mentors booking system.

## 🚀 Quick Setup

### 1. Create PayPal Developer Account

1. Go to [PayPal Developer Portal](https://developer.paypal.com/)
2. Sign up for a PayPal Developer account
3. Navigate to "Apps & Credentials"

### 2. Create PayPal App

1. Click "Create App"
2. Choose "Business" app type
3. Give your app a name (e.g., "Divine Mentors Booking")
4. Select "Web" as the platform

### 3. Get Your Credentials

After creating the app, you'll get:
- **Client ID** (for frontend)
- **Client Secret** (for backend - keep this secure!)

### 4. Configure Environment Variables

Update your `backend/config.env` file:

```env
# PayPal Configuration
PAYPAL_CLIENT_ID=your_actual_client_id_here
PAYPAL_CLIENT_SECRET=your_actual_client_secret_here
PAYPAL_MODE=sandbox
PAYPAL_CURRENCY=USD
SESSION_PRICE=99
```

### 5. Update Frontend PayPal Client ID

In `frontend/src/app/components/PayPalPayment.tsx`, replace:
```javascript
script.src = `https://www.paypal.com/sdk/js?client-id=YOUR_PAYPAL_CLIENT_ID&currency=USD&intent=capture`;
```

With your actual client ID:
```javascript
script.src = `https://www.paypal.com/sdk/js?client-id=YOUR_ACTUAL_CLIENT_ID&currency=USD&intent=capture`;
```

## 🔧 Testing Setup

### Sandbox Environment (Recommended for Development)

1. **Use Sandbox Mode**: Set `PAYPAL_MODE=sandbox` in your config
2. **Test Accounts**: PayPal provides sandbox buyer/seller accounts
3. **Test Payments**: Use sandbox accounts to test the full payment flow

### Sandbox Test Accounts

You can use these PayPal sandbox accounts for testing:

**Buyer Account (for testing payments):**
- Email: `sb-buyer@business.example.com`
- Password: `provided_by_paypal`

**Seller Account (your business):**
- Email: `sb-seller@business.example.com`
- Password: `provided_by_paypal`

## 🌐 Production Setup

### 1. Switch to Live Mode

When ready for production:

1. Update `PAYPAL_MODE=live` in your config
2. Use your live PayPal business account credentials
3. Update the frontend client ID to your live app credentials

### 2. Webhook Setup (Optional but Recommended)

For production, set up PayPal webhooks to handle payment notifications:

1. Go to PayPal Developer Dashboard
2. Navigate to Webhooks
3. Add webhook URL: `https://yourdomain.com/api/paypal/webhook`
4. Select events: `PAYMENT.CAPTURE.COMPLETED`, `PAYMENT.CAPTURE.DENIED`

## 💰 Pricing Configuration

### Session Pricing

The default session price is set to $99 USD. You can modify this:

1. **Environment Variable**: Update `SESSION_PRICE` in `config.env`
2. **Frontend**: Update `sessionAmount` in `BookingModal.tsx`
3. **Dynamic Pricing**: Modify the code to support different mentor prices

### Currency Support

Currently configured for USD. To support other currencies:

1. Update `PAYPAL_CURRENCY` in config
2. Modify the PayPal script URL
3. Update the frontend display

## 🔒 Security Best Practices

### 1. Environment Variables
- Never commit PayPal credentials to version control
- Use environment variables for all sensitive data
- Keep client secret secure on the server

### 2. Payment Validation
- Always verify payment status on the server
- Store payment details in your database
- Implement proper error handling

### 3. HTTPS
- Use HTTPS in production
- PayPal requires secure connections

## 🐛 Troubleshooting

### Common Issues

1. **"Invalid Client ID" Error**
   - Check your PayPal client ID is correct
   - Ensure you're using the right environment (sandbox/live)

2. **Payment Not Processing**
   - Verify PayPal account is properly configured
   - Check browser console for JavaScript errors
   - Ensure all required fields are filled

3. **Webhook Not Working**
   - Verify webhook URL is accessible
   - Check webhook event subscriptions
   - Review server logs for webhook errors

### Debug Mode

Enable PayPal debug mode by adding to the script URL:
```javascript
script.src = `https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID&currency=USD&intent=capture&debug=true`;
```

## 📋 Testing Checklist

Before going live, test:

- [ ] Payment processing works in sandbox
- [ ] Booking creation after successful payment
- [ ] Payment details stored in database
- [ ] Error handling for failed payments
- [ ] Cancel payment flow
- [ ] Different payment methods (PayPal balance, credit card)
- [ ] Mobile responsiveness
- [ ] Email notifications (if implemented)

## 🔄 Payment Flow

1. **User fills booking form**
2. **Clicks "Proceed to Payment"**
3. **PayPal payment screen appears**
4. **User completes payment**
5. **Payment success callback**
6. **Booking created with payment details**
7. **Success confirmation shown**

## 📞 Support

For PayPal-specific issues:
- [PayPal Developer Support](https://developer.paypal.com/support/)
- [PayPal Developer Documentation](https://developer.paypal.com/docs/)

For application-specific issues:
- Check the application logs
- Review the booking API responses
- Verify database connections 