# Edit Booking System

This document explains the comprehensive edit booking functionality implemented for both online and offline bookings in your Divine Mentors system.

## 🎯 Overview

The edit booking system allows staff to modify existing bookings, including:
- **Client Information**: Name, email, contact, message
- **Session Details**: Date, time, session duration, mentor
- **Address Information**: Address, postal code, city
- **Payment Information**: Payment method, amount, currency, status
- **Booking Status**: Pending, confirmed, cancelled, completed

## 🚀 Features

### 1. **Universal Editing**
- **Online Bookings**: Edit PayPal-based bookings
- **Offline Bookings**: Edit cash/local payment bookings
- **Hybrid Updates**: Convert between payment methods

### 2. **Smart Field Management**
- **Session Duration**: Maps to `demo1` field for database compatibility
- **Payment Method Changes**: Automatically handles field updates
- **Validation**: Ensures data integrity during updates

### 3. **Email Notifications**
- **Update Confirmations**: Sends emails when important fields change
- **Payment Changes**: Notifies clients of payment method updates
- **Status Updates**: Informs clients of booking status changes

## 🔧 Backend Implementation

### **API Endpoint**
```
PUT /api/bookings/:id
```

### **Validation Rules**
```javascript
// Update Booking Validation
const updateBookingValidation = [
  param('id').isInt().withMessage('Booking ID must be a valid integer'),
  
  // Client Information
  body('name').optional().trim().isLength({ min: 2, max: 100 }),
  body('email').optional().isEmail().normalizeEmail(),
  body('contact').optional().isLength({ min: 10, max: 20 }),
  body('message').optional().isLength({ max: 1000 }),
  
  // Session Details
  body('date').optional().isDate(),
  body('time').optional().matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
  body('mentorName').optional().trim().isLength({ min: 2, max: 100 }),
  body('sessionDuration').optional().isIn(['25 min', '50 min']),
  
  // Address Information
  body('address').optional().trim().isLength({ min: 10, max: 500 }),
  body('postalCode').optional().trim().isLength({ min: 5, max: 10 }),
  body('city').optional().trim().isLength({ min: 2, max: 50 }),
  
  // Payment Information
  body('paymentAmount').optional().isFloat({ min: 0.01 }),
  body('paymentCurrency').optional().isIn(['EUR', 'CHF']),
  body('paymentMethod').optional().isIn(['cash', 'local_bank_transfer', 'local_payment', 'paypal'])
];
```

### **Controller Function**
```javascript
const updateBooking = async (req, res) => {
  // 1. Validate booking exists
  // 2. Handle sessionDuration mapping
  // 3. Handle payment method changes
  // 4. Update booking
  // 5. Send confirmation emails
  // 6. Return updated data
};
```

### **Smart Field Handling**
- **Session Duration**: Automatically maps to `demo1` field
- **Payment Method Changes**: 
  - Online → Offline: Clears PayPal fields, sets offline payment data
  - Offline → Online: Clears offline payment fields, sets PayPal status
- **Email Triggers**: Sends emails when contact, date, time, or mentor changes

## 🎨 Frontend Implementation

### **EditBookingModal Component**
- **Comprehensive Form**: All booking fields editable
- **Real-time Validation**: Client-side validation with error messages
- **Smart Disabling**: Payment fields disabled for PayPal bookings
- **Status Management**: Full booking status control

### **Integration Points**
- **Dashboard**: Edit button in booking table actions
- **State Management**: Proper modal state handling
- **Success Handling**: Refreshes booking list after updates

## 📱 How to Use

### **From Dashboard**
1. Navigate to `/dashboard/booking`
2. Find the booking you want to edit
3. Click the **Edit** button (green pencil icon)
4. Modify the desired fields
5. Click **Update Booking**

### **Editable Fields**

#### **Client Information**
- **Full Name**: Required field
- **Email**: Optional, validated format
- **Contact Number**: Required field
- **Message**: Optional, max 1000 characters

#### **Session Details**
- **Date**: Required, date format
- **Time**: Required, time format
- **Session Duration**: Required, 25 min or 50 min
- **Mentor**: Required, select from available mentors

#### **Address Information**
- **Address**: Optional, street address
- **Postal Code**: Optional, 5-10 characters
- **City**: Optional, city name

#### **Payment Information**
- **Payment Method**: Select from available options
- **Payment Amount**: Required for offline payments
- **Currency**: CHF or EUR
- **Status**: Pending, confirmed, cancelled, completed

## 🔄 Payment Method Conversion

### **Online → Offline**
- Clears PayPal transaction fields
- Sets payment status to 'COMPLETED'
- Enables payment amount and currency fields
- Updates payment timestamp

### **Offline → Online**
- Clears offline payment fields
- Sets payment status to 'PENDING'
- Disables payment amount and currency fields
- Clears payment timestamp

## 📧 Email Notifications

### **Automatic Triggers**
- **Contact Changes**: Email, phone number updates
- **Session Changes**: Date, time, mentor updates
- **Status Changes**: Booking status modifications

### **Email Content**
- **Confirmation**: Updated booking details
- **Payment Info**: Current payment status and method
- **Contact Details**: How to reach the client

## 🧪 Testing

### **Test File**
```bash
node test-edit-booking.js
```

### **Test Scenarios**
1. **Basic Updates**: Name, time, message changes
2. **Session Duration**: Updating session length
3. **Payment Method**: Converting between online/offline
4. **Validation**: Testing invalid data rejection

### **Validation Tests**
- Invalid session duration
- Negative payment amounts
- Invalid currency codes
- Missing required fields

## 🚨 Error Handling

### **Common Issues**
1. **Validation Errors**: Field-specific error messages
2. **Database Errors**: Connection or constraint issues
3. **Email Failures**: SMTP or configuration problems

### **Error Responses**
```json
{
  "status": "error",
  "message": "Validation failed",
  "errors": [
    {
      "field": "sessionDuration",
      "message": "Session duration must be either 25 min or 50 min"
    }
  ]
}
```

## 🔮 Future Enhancements

### **Potential Improvements**
- **Bulk Editing**: Edit multiple bookings simultaneously
- **Change History**: Track all modifications with timestamps
- **Approval Workflow**: Require approval for certain changes
- **Audit Logging**: Complete audit trail of all edits
- **Template System**: Save common edit patterns as templates

### **Advanced Features**
- **Conflict Detection**: Warn about double-booked time slots
- **Auto-scheduling**: Suggest alternative times when conflicts occur
- **Integration**: Connect with calendar systems
- **Notifications**: SMS/WhatsApp updates for urgent changes

## 📊 Database Schema

### **Key Fields**
```sql
-- Core booking information
name, email, contact, message
date, time, mentorName, status

-- Address information
address, postalCode, city

-- Session information (stored in demo1)
demo1 VARCHAR(255) -- Maps to sessionDuration

-- Payment information
paymentOrderID, paymentPayerID, paymentID
paymentAmount, paymentCurrency, paymentStatus
paymentTimestamp, paymentMethod
```

## 🔒 Security Considerations

### **Access Control**
- **Public Endpoint**: Currently accessible to all users
- **Validation**: Server-side validation prevents invalid data
- **Rate Limiting**: Consider implementing API rate limiting

### **Data Integrity**
- **Validation**: Comprehensive input validation
- **Database Constraints**: Foreign key and check constraints
- **Transaction Safety**: Atomic updates prevent partial failures

## 📞 Support

### **Troubleshooting**
1. **Check Validation**: Ensure all required fields are filled
2. **Verify Permissions**: Confirm API endpoint accessibility
3. **Check Logs**: Review server logs for error details
4. **Test API**: Use test file to verify functionality

### **Common Solutions**
- **Validation Errors**: Check field requirements and formats
- **Database Errors**: Verify database connection and schema
- **Email Failures**: Check SMTP configuration
- **Frontend Issues**: Verify component integration

---

**The edit booking system is now fully integrated, providing comprehensive booking management capabilities for both online and offline bookings! 🎉**
