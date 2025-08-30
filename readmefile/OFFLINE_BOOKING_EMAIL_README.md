# Offline Booking Email System - Divine Mentors

## 📧 Overview

This document describes the email confirmation system for offline bookings in the Divine Mentors application. The system automatically sends confirmation emails to both customers and administrators when offline bookings are created.

## 🎯 Features

### ✅ **Customer Confirmation Emails**
- **Automatic sending** when offline booking is created
- **Professional HTML templates** with Divine Mentors branding
- **Session details** including mentor, date, time, and duration
- **Payment information** with method and amount
- **Next steps guidance** for customers
- **Contact information** for support

### ✅ **Admin Notification Emails**
- **Immediate notifications** for all offline bookings
- **Detailed booking information** for staff reference
- **Payment collection reminders** for offline payments
- **Action items** for staff coordination
- **Visual distinction** from online booking notifications

### ✅ **Smart Email Handling**
- **Conditional sending** based on email availability
- **Error handling** without affecting booking creation
- **Multiple payment method support** (Cash, Bank Transfer, Local Payment)
- **Currency support** (CHF, EUR)

## 🔧 Technical Implementation

### **Email Service Functions**

```javascript
// New functions added to emailService.js
const sendOfflineUserConfirmation = async (bookingData);
const sendOfflineAdminNotification = async (bookingData);
const sendOfflineBookingEmails = async (bookingData);
```

### **Email Templates**

#### **Customer Confirmation Template**
- **Header**: "Offline Booking Confirmed!" with OFFLINE badge
- **Session Details**: Mentor, date, time, duration
- **Payment Info**: Method, amount, currency, status
- **Next Steps**: Contact timeline, session preparation
- **Branding**: Divine Mentors colors and styling

#### **Admin Notification Template**
- **Header**: "New Offline Booking Received!" with OFFLINE badge
- **Session Details**: Complete booking information
- **Customer Info**: Contact details and preferences
- **Payment Info**: Collection method and amount
- **Action Items**: Staff coordination requirements

### **Integration Points**

#### **1. Offline Booking Creation**
```javascript
// In createOfflineBooking controller
const emailResult = await sendOfflineBookingEmails(bookingData);
```

#### **2. Booking Updates**
```javascript
// In updateBooking controller - smart email selection
if (['cash', 'local_bank_transfer', 'local_payment'].includes(paymentMethod)) {
  emailResult = await sendOfflineBookingEmails(offlineBookingData);
} else {
  emailResult = await sendBookingEmails(bookingData, paymentDetails);
}
```

## 📋 Email Content Details

### **Customer Email Includes:**
- ✅ Booking confirmation with OFFLINE badge
- ✅ Mentor and session details
- ✅ Date and time information
- ✅ Session duration
- ✅ Payment method and amount
- ✅ Next steps and contact information
- ✅ Divine Mentors branding and styling

### **Admin Email Includes:**
- ✅ New offline booking notification
- ✅ Complete customer information
- ✅ Session and mentor details
- ✅ Payment collection details
- ✅ Action items for staff
- ✅ Visual distinction from online bookings

## 🚀 Usage Examples

### **Creating Offline Booking with Email**
```javascript
const offlineBookingData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  contact: '+41791234567',
  date: '2025-01-25',
  time: '14:00',
  mentorName: 'Swami Pratik',
  sessionDuration: '50 min',
  paymentAmount: 300,
  paymentCurrency: 'CHF',
  paymentMethod: 'cash'
};

const emailResult = await sendOfflineBookingEmails(offlineBookingData);
```

### **Creating Offline Booking without Email**
```javascript
const offlineBookingData = {
  name: 'Jane Smith',
  email: '', // No email provided
  contact: '+41799876543',
  // ... other fields
};

// System will only send admin notification
const emailResult = await sendOfflineBookingEmails(offlineBookingData);
```

## 🔍 Testing

### **Test File: `test-offline-email.js`**

Run the test file to verify email functionality:

```bash
cd divine_be
node test-offline-email.js
```

### **Test Scenarios:**
1. **With Email**: Tests customer + admin emails
2. **Without Email**: Tests admin-only notification
3. **Payment Methods**: Tests cash, bank transfer, local payment
4. **Error Handling**: Tests email failures

## 📧 Email Configuration

### **Gmail Settings**
- **Service**: Gmail
- **Account**: cfconline1310@gmail.com
- **Authentication**: App Password (GMAIL_APP_PASSWORD environment variable)

### **Email Templates**
- **Location**: `services/emailService.js`
- **Styling**: Inline CSS for email client compatibility
- **Branding**: Divine Mentors colors and logo placeholders

## 🎨 Email Styling

### **Color Scheme**
- **Primary**: #576F9F (Divine Mentors Blue)
- **Secondary**: #ff6b35 (Offline Badge Orange)
- **Success**: #28a745 (Green)
- **Warning**: #ff9800 (Orange)

### **Visual Elements**
- **Icons**: Emoji icons for better engagement
- **Badges**: OFFLINE badge for clear identification
- **Gradients**: Professional header gradients
- **Responsive**: Mobile-friendly email design

## 🔒 Error Handling

### **Email Failures**
- **Non-blocking**: Email failures don't affect booking creation
- **Logging**: All email attempts are logged
- **Fallback**: System continues even if emails fail
- **Retry**: Manual retry through admin interface

### **Validation**
- **Email format**: Validates email addresses before sending
- **Required fields**: Ensures necessary data is present
- **Payment method**: Validates payment method types

## 📊 Monitoring

### **Success Tracking**
- **Email status**: Included in API responses
- **Success rate**: Tracked in logs
- **Delivery confirmation**: Gmail delivery reports

### **Logging**
```javascript
console.log('Offline user confirmation email sent:', result.messageId);
console.log('Offline admin notification email sent:', result.messageId);
console.log('Offline booking email sending result:', emailResult);
```

## 🚀 Future Enhancements

### **Planned Features**
- **Email templates**: More customization options
- **Scheduling**: Delayed email sending
- **Attachments**: PDF confirmations
- **SMS integration**: Text message confirmations
- **Multi-language**: Support for different languages

### **Integration Possibilities**
- **Calendar invites**: iCal/Google Calendar integration
- **Payment reminders**: Automated follow-up emails
- **Session confirmations**: Pre-session reminders
- **Feedback collection**: Post-session surveys

## 📞 Support

### **Technical Issues**
- Check Gmail App Password configuration
- Verify email service connectivity
- Review server logs for error details

### **Email Delivery Issues**
- Check spam/junk folders
- Verify email address format
- Test with different email providers

---

**Last Updated**: January 2025  
**Version**: 1.0.0  
**Maintainer**: Divine Mentors Development Team
