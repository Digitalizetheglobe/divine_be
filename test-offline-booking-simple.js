const axios = require('axios');

// Test if server is running
const checkServerHealth = async () => {
  try {
    console.log('🔍 Checking if server is running...');
    const response = await axios.get('http://localhost:3001/health');
    console.log('✅ Server is running!');
    console.log('Server response:', response.data);
    return true;
  } catch (error) {
    console.error('❌ Server is not running or not accessible');
    console.error('Please start your server first with: npm start');
    return false;
  }
};

// Test offline booking creation
const testOfflineBooking = async () => {
  try {
    console.log('\n📝 Creating offline booking...');
    
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
      demo1: "Spiritual guidance needed",
      demo2: "Life purpose questions",
      demo3: "Meditation techniques",
      demo4: "",
      demo5: "",
      paymentAmount: 150.00,
      paymentCurrency: "CHF",
      paymentMethod: "cash"
    };

    const response = await axios.post('http://localhost:3001/api/bookings/offline', offlineBookingData);
    
    console.log('✅ Offline booking created successfully!');
    console.log('Booking ID:', response.data.data.id);
    console.log('Status:', response.data.data.status);
    console.log('Payment Status:', response.data.data.paymentStatus);
    
  } catch (error) {
    console.error('❌ Error creating offline booking:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Error:', error.response.data);
    } else {
      console.error('Network Error:', error.message);
    }
  }
};

// Test getting all bookings
const testGetAllBookings = async () => {
  try {
    console.log('\n📋 Fetching all bookings...');
    const response = await axios.get('http://localhost:3001/api/bookings');
    
    console.log('✅ Bookings retrieved successfully!');
    console.log('Total bookings:', response.data.data.total);
    console.log('Current page:', response.data.data.currentPage);
    
  } catch (error) {
    console.error('❌ Error fetching bookings:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Error:', error.response.data);
    } else {
      console.error('Network Error:', error.message);
    }
  }
};

// Run tests
const runTests = async () => {
  console.log('🧪 Testing Offline Booking Functionality\n');
  
  // First check if server is running
  const serverRunning = await checkServerHealth();
  
  if (!serverRunning) {
    console.log('\n💡 To start your server:');
    console.log('1. Open a new terminal window');
    console.log('2. Navigate to: cd "C:\\Users\\Ankush\\Desktop\\devine fe be\\divine_be"');
    console.log('3. Run: npm start');
    console.log('4. Wait for "Server is running on port 3001" message');
    console.log('5. Then run this test again');
    return;
  }
  
  // Run tests
  await testOfflineBooking();
  await testGetAllBookings();
  
  console.log('\n✨ Tests completed!');
  console.log('\n💡 You can now use the offline booking API in your dashboard!');
};

// Check if running directly
if (require.main === module) {
  runTests();
}

module.exports = { 
  checkServerHealth, 
  testOfflineBooking, 
  testGetAllBookings 
};
