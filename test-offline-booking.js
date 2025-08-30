const axios = require('axios');

// Test offline booking creation
const testOfflineBooking = async () => {
  try {
    const offlineBookingData = {
      name: "John Doe",
      date: "2024-12-25",
      time: "14:00",
      email: "john.doe@example.com",
      contact: "+1234567890",
      message: "I would like to book a session for spiritual guidance",
      mentorName: "Swami Pratik",
      address: "123 Main Street",
      postalCode: "12345",
      city: "New York",
      sessionDuration: "50 min",
      paymentAmount: 150.00,
      paymentCurrency: "CHF",
      paymentMethod: "cash"
    };

    console.log('Creating offline booking...');
    const response = await axios.post('http://localhost:3001/api/bookings/offline', offlineBookingData);
    
    console.log('✅ Offline booking created successfully!');
    console.log('Response:', response.data);
    
  } catch (error) {
    console.error('❌ Error creating offline booking:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
};

// Test getting bookings by payment method
const testGetBookingsByPaymentMethod = async () => {
  try {
    console.log('\nFetching offline bookings...');
    const response = await axios.get('http://localhost:3001/api/bookings/payment-method?paymentMethod=offline');
    
    console.log('✅ Offline bookings retrieved successfully!');
    console.log('Total offline bookings:', response.data.data.total);
    console.log('Bookings:', response.data.data.bookings);
    
  } catch (error) {
    console.error('❌ Error fetching offline bookings:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
};

// Run tests
const runTests = async () => {
  console.log('🧪 Testing Offline Booking Functionality\n');
  
  await testOfflineBooking();
  await testGetBookingsByPaymentMethod();
  
  console.log('\n✨ Tests completed!');
};

// Check if running directly
if (require.main === module) {
  runTests();
}

module.exports = { testOfflineBooking, testGetBookingsByPaymentMethod };
