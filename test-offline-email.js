const axios = require('axios');

// Test offline booking email functionality
const testOfflineBookingEmail = async () => {
  try {
    console.log('🧪 Testing Offline Booking Email Functionality...\n');

    // Test data for offline booking
    const offlineBookingData = {
      name: 'John Doe',
      email: 'aswarprasad2000@gmail.com',
      contact: '+41791234567',
      date: '2025-01-25',
      time: '14:00',
      mentorName: 'Swami Pratik',
      message: 'Looking forward to my spiritual session',
      address: 'Bahnhofstrasse 1',
      postalCode: '8001',
      city: 'Zurich',
      sessionDuration: '50 min',
      paymentAmount: 300,
      paymentCurrency: 'CHF',
      paymentMethod: 'cash'
    };

    console.log('📧 Creating offline booking with email...');
    console.log('📋 Booking Data:', JSON.stringify(offlineBookingData, null, 2));

    const response = await axios.post('http://localhost:3001/api/bookings/offline', offlineBookingData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 201) {
      console.log('✅ Offline booking created successfully!');
      console.log('📊 Response:', JSON.stringify(response.data, null, 2));
      
      if (response.data.emailSent) {
        console.log('📧 ✅ Emails sent successfully!');
        console.log('📧 Email Details:', JSON.stringify(response.data.emailDetails, null, 2));
      } else {
        console.log('⚠️ Email sending failed or partially failed');
        console.log('📧 Email Details:', JSON.stringify(response.data.emailDetails, null, 2));
      }
    } else {
      console.log('❌ Failed to create offline booking');
      console.log('📊 Response:', response.data);
    }

  } catch (error) {
    console.error('❌ Error testing offline booking email:', error.message);
    
    if (error.response) {
      console.error('📊 Error Response:', error.response.data);
      console.error('📊 Status Code:', error.response.status);
    }
  }
};

// Test offline booking without email
const testOfflineBookingNoEmail = async () => {
  try {
    console.log('\n🧪 Testing Offline Booking Without Email...\n');

    // Test data for offline booking without email
    const offlineBookingDataNoEmail = {
      name: 'Jane Smith',
      email: '', // No email provided
      contact: '+41799876543',
      date: '2025-01-26',
      time: '15:00',
      mentorName: 'Acharya Shyam Chetan',
      message: 'Spiritual guidance session',
      address: 'Rue du Mont-Blanc 15',
      postalCode: '1201',
      city: 'Geneva',
      sessionDuration: '50 min',
      paymentAmount: 150,
      paymentCurrency: 'CHF',
      paymentMethod: 'local_bank_transfer'
    };

    console.log('📧 Creating offline booking without email...');
    console.log('📋 Booking Data:', JSON.stringify(offlineBookingDataNoEmail, null, 2));

    const response = await axios.post('http://localhost:3001/api/bookings/offline', offlineBookingDataNoEmail, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 201) {
      console.log('✅ Offline booking created successfully!');
      console.log('📊 Response:', JSON.stringify(response.data, null, 2));
      
      if (response.data.emailSent) {
        console.log('📧 ✅ Emails sent successfully!');
        console.log('📧 Email Details:', JSON.stringify(response.data.emailDetails, null, 2));
      } else {
        console.log('⚠️ Email sending failed or partially failed');
        console.log('📧 Email Details:', JSON.stringify(response.data.emailDetails, null, 2));
      }
    } else {
      console.log('❌ Failed to create offline booking');
      console.log('📊 Response:', response.data);
    }

  } catch (error) {
    console.error('❌ Error testing offline booking without email:', error.message);
    
    if (error.response) {
      console.error('📊 Error Response:', error.response.data);
      console.error('📊 Status Code:', error.response.status);
    }
  }
};

// Test different payment methods
const testDifferentPaymentMethods = async () => {
  try {
    console.log('\n🧪 Testing Different Payment Methods...\n');

    const paymentMethods = [
      { method: 'cash', label: 'Cash' },
      { method: 'local_bank_transfer', label: 'Local Bank Transfer' },
      { method: 'local_payment', label: 'Local Payment' }
    ];

    for (const paymentMethod of paymentMethods) {
      console.log(`📧 Testing ${paymentMethod.label} payment method...`);
      
      const testData = {
        name: `Test User ${paymentMethod.label}`,
        email: `test.${paymentMethod.method}@example.com`,
        contact: '+41790000000',
        date: '2025-01-27',
        time: '16:00',
        mentorName: 'Naga Baba',
        message: `Test booking with ${paymentMethod.label}`,
        address: 'Test Street 123',
        postalCode: '9999',
        city: 'Test City',
        sessionDuration: '25 min',
        paymentAmount: 175,
        paymentCurrency: 'CHF',
        paymentMethod: paymentMethod.method
      };

      try {
        const response = await axios.post('http://localhost:3001/api/bookings/offline', testData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 201) {
          console.log(`✅ ${paymentMethod.label} booking created successfully!`);
          console.log(`📧 Email Status: ${response.data.emailSent ? 'Sent' : 'Failed'}`);
        }
      } catch (error) {
        console.log(`❌ ${paymentMethod.label} booking failed:`, error.response?.data?.message || error.message);
      }
    }

  } catch (error) {
    console.error('❌ Error testing different payment methods:', error.message);
  }
};

// Main test function
const runTests = async () => {
  console.log('🚀 Starting Offline Booking Email Tests...\n');
  
  // Check if server is running
  try {
    await axios.get('http://localhost:3001/health');
    console.log('✅ Server is running\n');
  } catch (error) {
    console.log('❌ Server is not running. Please start the server first with: npm start\n');
    return;
  }

  await testOfflineBookingEmail();
  await testOfflineBookingNoEmail();
  await testDifferentPaymentMethods();

  console.log('\n🎉 All tests completed!');
};

// Run tests
runTests();
