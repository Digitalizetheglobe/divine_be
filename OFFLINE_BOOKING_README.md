# Offline Booking Functionality

This document explains how to use the offline/cash booking functionality that allows staff to manually create bookings for clients who pay cash or make local payments.

## Overview

The offline booking system allows you to:
- Create bookings manually through the dashboard
- Handle cash payments and local bank transfers
- Automatically set booking status to "confirmed"
- Send confirmation emails to clients
- Track offline vs online payments separately

## API Endpoints

### 1. Create Offline Booking

**POST** `/api/bookings/offline`

Creates a new offline booking with cash or local payment.

#### Request Body

```json
{
  "name": "John Doe",
  "date": "2024-12-25",
  "time": "14:00",
  "email": "john.doe@example.com",
  "contact": "+1234567890",
  "message": "I would like to book a session for spiritual guidance",
  "mentorName": "Swami Pratik",
  "address": "123 Main Street",
  "postalCode": "12345",
  "city": "New York",
  "demo1": "Spiritual guidance needed",
  "demo2": "Life purpose questions",
  "demo3": "Meditation techniques",
  "demo4": "",
  "demo5": "",
  "paymentAmount": 150.00,
  "paymentCurrency": "CHF",
  "paymentMethod": "cash"
}
```

#### Required Fields
- `name` - Client's full name
- `date` - Booking date (YYYY-MM-DD)
- `time` - Booking time (HH:MM)
- `contact` - Phone number
- `mentorName` - Name of the mentor
- `paymentAmount` - Payment amount
- `paymentCurrency` - Currency (EUR or CHF)
- `paymentMethod` - Payment method (cash, local_bank_transfer, local_payment)

#### Response

```json
{
  "status": "success",
  "message": "Offline booking created successfully",
  "data": {
    "id": 123,
    "name": "John Doe",
    "date": "2024-12-25",
    "time": "14:00:00",
    "mentorName": "Swami Pratik",
    "status": "confirmed",
    "paymentAmount": "150.00",
    "paymentCurrency": "CHF",
    "paymentStatus": "COMPLETED",
    "paymentMethod": "cash"
  },
  "emailSent": true
}
```

### 2. Filter Bookings by Payment Method

**GET** `/api/bookings/payment-method?paymentMethod=offline`

Filters bookings by payment method.

#### Query Parameters
- `paymentMethod` - One of: `online`, `offline`, `cash`
- `page` - Page number (optional, default: 1)
- `limit` - Items per page (optional, default: 10)

#### Response

```json
{
  "status": "success",
  "message": "Bookings with offline payment method retrieved successfully",
  "data": {
    "bookings": [...],
    "total": 5,
    "currentPage": 1,
    "totalPages": 1,
    "paymentMethod": "offline"
  }
}
```

## How It Works

### Online vs Offline Bookings

1. **Online Bookings** (`POST /api/bookings`)
   - Created through website with PayPal
   - Have PayPal transaction details
   - Status depends on payment completion

2. **Offline Bookings** (`POST /api/bookings/offline`)
   - Created manually through dashboard
   - No PayPal transaction details
   - Automatically confirmed status
   - Include payment method and amount

### Database Structure

Offline bookings are stored with:
- `paymentOrderID`: null
- `paymentPayerID`: null  
- `paymentID`: null
- `paymentAmount`: [amount provided]
- `paymentCurrency`: [currency provided]
- `paymentStatus`: "COMPLETED"
- `status`: "confirmed"

## Usage Examples

### Frontend Dashboard Integration

```javascript
// Create offline booking
const createOfflineBooking = async (bookingData) => {
  try {
    const response = await fetch('/api/bookings/offline', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData)
    });
    
    const result = await response.json();
    if (result.status === 'success') {
      console.log('Offline booking created:', result.data);
    }
  } catch (error) {
    console.error('Error creating offline booking:', error);
  }
};

// Get offline bookings
const getOfflineBookings = async () => {
  try {
    const response = await fetch('/api/bookings/payment-method?paymentMethod=offline');
    const result = await response.json();
    return result.data.bookings;
  } catch (error) {
    console.error('Error fetching offline bookings:', error);
  }
};
```

### Testing

Use the provided test file:

```bash
node test-offline-booking.js
```

## Validation Rules

The offline booking validation ensures:
- Required fields are provided
- Date format is valid (YYYY-MM-DD)
- Time format is valid (HH:MM)
- Payment amount is positive
- Payment currency is EUR or CHF
- Payment method is valid

## Email Notifications

Offline bookings automatically trigger:
- Confirmation email to client (if email provided)
- Notification email to staff
- Email includes payment details and booking information

## Security Considerations

- All validation is server-side
- Payment amounts are validated
- Required fields are enforced
- SQL injection protection through Sequelize

## Troubleshooting

### Common Issues

1. **Validation Errors**: Check that all required fields are provided
2. **Email Failures**: Offline bookings still succeed even if email fails
3. **Database Errors**: Ensure MySQL connection is working

### Error Responses

```json
{
  "status": "error",
  "message": "Validation failed",
  "errors": [
    {
      "field": "paymentAmount",
      "message": "Payment amount is required for offline booking"
    }
  ]
}
```

## Support

For issues or questions about the offline booking functionality, check:
1. Server logs for detailed error messages
2. Database connection status
3. Email service configuration
4. Validation rules in middleware
