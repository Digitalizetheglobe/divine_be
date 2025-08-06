const { sendBookingEmails } = require('./services/emailService');

// Test email function
const testEmail = async () => {
  console.log('🧪 Testing email service...');
  
  const testBookingData = {
    name: 'Test User',
    date: '2025-08-07',
    time: '16:00',
    email: 'aswarprasad2000@gmail.com', // Your test email
    contact: '7020727854',
    message: 'This is a test booking',
    mentorName: 'Acharya Shyam Chetan',
    address: 'Test Address',
    postalCode: '12345',
    city: 'Test City'
  };

  const testPaymentDetails = {
    orderID: 'TEST_ORDER_123',
    payerID: 'TEST_PAYER_456',
    paymentID: 'TEST_PAYMENT_789',
    amount: '1.00',
    currency: 'EUR',
    status: 'COMPLETED',
    timestamp: new Date().toISOString()
  };

  try {
    console.log('📧 Sending test emails...');
    const result = await sendBookingEmails(testBookingData, testPaymentDetails);
    
    console.log('📊 Email Test Results:');
    console.log('Overall Success:', result.success);
    console.log('User Email:', result.userEmail.success ? '✅ Sent' : '❌ Failed');
    console.log('Admin Email:', result.adminEmail.success ? '✅ Sent' : '❌ Failed');
    
    if (!result.success) {
      console.log('\n❌ Email Errors:');
      if (result.userEmail.error) {
        console.log('User Email Error:', result.userEmail.error);
      }
      if (result.adminEmail.error) {
        console.log('Admin Email Error:', result.adminEmail.error);
      }
    } else {
      console.log('\n✅ All emails sent successfully!');
    }
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
};

// Run the test
testEmail(); 