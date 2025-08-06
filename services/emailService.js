const nodemailer = require('nodemailer');

// Create transporter for admin email
const adminTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'cfconline1310@gmail.com',
    // Use App Password instead of regular password
    // You need to generate an App Password from Google Account settings
    pass: process.env.GMAIL_APP_PASSWORD || 'omtatsat_72'
  }
});

// Create transporter for user emails (using admin account as sender)
const userTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'cfconline1310@gmail.com',
    // Use App Password instead of regular password
    pass: process.env.GMAIL_APP_PASSWORD || 'omtatsat_72'
  }
});

// Email templates
const emailTemplates = {
  userConfirmation: (bookingData, paymentDetails) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Booking Confirmation - Divine Mentors</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #576F9F 0%, #4A5F8A 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #576F9F; }
        .payment-details { background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        .highlight { color: #576F9F; font-weight: bold; }
        .success-icon { font-size: 48px; margin-bottom: 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="success-icon">🎉</div>
          <h1>Booking Confirmed!</h1>
          <p>Thank you for choosing Divine Mentors</p>
        </div>
        
        <div class="content">
          <h2>Dear ${bookingData.name},</h2>
          
          <p>Your spiritual session has been successfully booked and confirmed. We're excited to be part of your spiritual journey!</p>
          
          <div class="booking-details">
            <h3>📅 Booking Details</h3>
            <p><strong>Preferred Mentor:</strong> <span class="highlight">${bookingData.mentorName}</span></p>
            <p><strong>Preferred Date:</strong> <span class="highlight">${bookingData.date}</span></p>
            <p><strong>Preferred Time:</strong> <span class="highlight">${bookingData.time}</span></p>
            <p><strong>Session Type:</strong> <span class="highlight">Spiritual Guidance Session</span></p>
          </div>
          
          <div class="payment-details">
            <h3>💳 Payment Confirmation</h3>
            <p><strong>Payment ID:</strong> ${paymentDetails.paymentID}</p>
            <p><strong>Amount Paid:</strong> €${paymentDetails.amount}</p>
            <p><strong>Payment Status:</strong> <span style="color: #28a745; font-weight: bold;">✓ Confirmed</span></p>
            <p><strong>Transaction Date:</strong> ${new Date(paymentDetails.timestamp).toLocaleString()}</p>
          </div>
          
          <h3>📞 What's Next?</h3>
          <ul>
            <li>Our team will contact you within 24 hours to confirm your session details</li>
            <li>You'll receive a reminder 1 hour before your scheduled session</li>
            <li>Please ensure you're in a quiet, comfortable space for your session</li>
          </ul>
          
          <h3>📍 Contact Information</h3>
          <p><strong>Email:</strong> support@divinementors.com</p>
          <p><strong>WhatsApp:</strong> +1 (555) 123-4567</p>
          
          <div class="footer">
            <p>Thank you for trusting Divine Mentors with your spiritual journey.</p>
            <p>May your path be filled with wisdom and peace. 🙏</p>
            <hr style="margin: 20px 0;">
            <p><small>This is an automated email. Please do not reply to this message.</small></p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `,

  adminNotification: (bookingData, paymentDetails) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Booking - Divine Mentors</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #576F9F 0%, #4A5F8A 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #576F9F; }
        .payment-details { background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745; }
        .customer-info { background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #007bff; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        .highlight { color: #576F9F; font-weight: bold; }
        .new-booking-icon { font-size: 48px; margin-bottom: 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="new-booking-icon">📋</div>
          <h1>New Booking Received!</h1>
          <p>Divine Mentors - Admin Notification</p>
        </div>
        
        <div class="content">
          <h2>Hello Admin,</h2>
          
          <p>A new booking has been successfully completed and payment has been received.</p>
          
          <div class="booking-details">
            <h3>📅 Session Details</h3>
            <p><strong>Preferred Mentor:</strong> <span class="highlight">${bookingData.mentorName}</span></p>
            <p><strong>Preferred Date:</strong> <span class="highlight">${bookingData.date}</span></p>
            <p><strong>Preferred Time:</strong> <span class="highlight">${bookingData.time}</span></p>
            <p><strong>Session Type:</strong> <span class="highlight">Spiritual Guidance Session</span></p>
          </div>
          
          <div class="customer-info">
            <h3>👤 Customer Information</h3>
            <p><strong>Name:</strong> ${bookingData.name}</p>
            <p><strong>Email:</strong> ${bookingData.email}</p>
            <p><strong>Contact:</strong> ${bookingData.contact}</p>
            <p><strong>Address:</strong> ${bookingData.address}</p>
            <p><strong>City:</strong> ${bookingData.city}</p>
            <p><strong>Postal Code:</strong> ${bookingData.postalCode}</p>
            ${bookingData.message ? `<p><strong>Message:</strong> ${bookingData.message}</p>` : ''}
          </div>
          
          <div class="payment-details">
            <h3>💳 Payment Information</h3>
            <p><strong>Payment ID:</strong> ${paymentDetails.paymentID}</p>
            <p><strong>Order ID:</strong> ${paymentDetails.orderID}</p>
            <p><strong>Amount Received:</strong> €${paymentDetails.amount}</p>
            <p><strong>Payment Status:</strong> <span style="color: #28a745; font-weight: bold;">✓ Completed</span></p>
            <p><strong>Transaction Date:</strong> ${new Date(paymentDetails.timestamp).toLocaleString()}</p>
          </div>
          
          <h3>📋 Action Required</h3>
          <ul>
            <li>Contact the customer within 24 hours to confirm session details</li>
            <li>Coordinate with the assigned mentor (${bookingData.mentorName})</li>
            <li>Prepare for the session on ${bookingData.date} at ${bookingData.time}</li>
            <li>Send session reminder 1 hour before scheduled time</li>
          </ul>
          
          <div class="footer">
            <p>Booking ID: ${paymentDetails.orderID}</p>
            <p><small>This is an automated notification from Divine Mentors booking system.</small></p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
};

// Send email to user
const sendUserConfirmation = async (bookingData, paymentDetails) => {
  try {
    const mailOptions = {
      from: '"Divine Mentors" <cfconline1310@gmail.com>',
      to: bookingData.email,
      subject: '🎉 Booking Confirmed - Divine Mentors',
      html: emailTemplates.userConfirmation(bookingData, paymentDetails)
    };

    const result = await userTransporter.sendMail(mailOptions);
    console.log('User confirmation email sent:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending user confirmation email:', error);
    return { success: false, error: error.message };
  }
};

// Send email to admin
const sendAdminNotification = async (bookingData, paymentDetails) => {
  try {
    const mailOptions = {
      from: '"Divine Mentors Booking System" <cfconline1310@gmail.com>',
      to: 'cfconline1310@gmail.com',
      subject: `📋 New Booking - ${bookingData.name} with ${bookingData.mentorName}`,
      html: emailTemplates.adminNotification(bookingData, paymentDetails)
    };

    const result = await adminTransporter.sendMail(mailOptions);
    console.log('Admin notification email sent:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending admin notification email:', error);
    return { success: false, error: error.message };
  }
};

// Send both emails
const sendBookingEmails = async (bookingData, paymentDetails) => {
  try {
    // Send emails in parallel
    const [userResult, adminResult] = await Promise.all([
      sendUserConfirmation(bookingData, paymentDetails),
      sendAdminNotification(bookingData, paymentDetails)
    ]);

    return {
      userEmail: userResult,
      adminEmail: adminResult,
      success: userResult.success && adminResult.success
    };
  } catch (error) {
    console.error('Error sending booking emails:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

module.exports = {
  sendUserConfirmation,
  sendAdminNotification,
  sendBookingEmails
}; 