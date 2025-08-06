const axios = require('axios');

const BASE_URL = 'http://localhost:3001/api/bookings';

// Test data
const testBooking = {
  name: "John Doe",
  date: "2024-01-15",
  time: "14:30",
  email: "john@example.com",
  contact: "+1234567890",
  message: "I need guidance on meditation and spiritual practices",
  mentorName: "Swami Pratik",
  address: "123 Main Street, Apartment 4B, Downtown Area",
  postalCode: "12345",
  city: "New York",
  demo1: "Test demo field 1",
  demo2: "Test demo field 2",
  demo3: "Test demo field 3",
  demo4: "Test demo field 4",
  demo5: "Test demo field 5"
};

async function testAPI() {
  console.log('🚀 Starting API Tests...\n');

  try {
    // Test 1: Health Check
    console.log('1. Testing Health Check...');
    const healthResponse = await axios.get('http://localhost:3001/health');
    console.log('✅ Health Check:', healthResponse.data);
    console.log('');

    // Test 2: Create Booking
    console.log('2. Testing Create Booking...');
    const createResponse = await axios.post(BASE_URL, testBooking);
    console.log('✅ Booking Created:', createResponse.data);
    const bookingId = createResponse.data.data.id;
    console.log('');

    // Test 3: Get All Bookings
    console.log('3. Testing Get All Bookings...');
    const getAllResponse = await axios.get(BASE_URL);
    console.log('✅ All Bookings:', getAllResponse.data);
    console.log('');

    // Test 4: Get Booking by ID
    console.log('4. Testing Get Booking by ID...');
    const getByIdResponse = await axios.get(`${BASE_URL}/${bookingId}`);
    console.log('✅ Booking by ID:', getByIdResponse.data);
    console.log('');

    // Test 5: Update Booking Status
    console.log('5. Testing Update Booking Status...');
    const updateStatusResponse = await axios.patch(`${BASE_URL}/${bookingId}/status`, {
      status: 'confirmed'
    });
    console.log('✅ Status Updated:', updateStatusResponse.data);
    console.log('');

    // Test 6: Get Bookings by Mentor
    console.log('6. Testing Get Bookings by Mentor...');
    const mentorResponse = await axios.get(`${BASE_URL}/mentor/Swami Pratik`);
    console.log('✅ Mentor Bookings:', mentorResponse.data);
    console.log('');

    // Test 7: Update Booking
    console.log('7. Testing Update Booking...');
    const updateResponse = await axios.put(`${BASE_URL}/${bookingId}`, {
      message: "Updated message: I need advanced meditation techniques"
    });
    console.log('✅ Booking Updated:', updateResponse.data);
    console.log('');

    // Test 8: Delete Booking
    console.log('8. Testing Delete Booking...');
    const deleteResponse = await axios.delete(`${BASE_URL}/${bookingId}`);
    console.log('✅ Booking Deleted:', deleteResponse.data);
    console.log('');

    console.log('🎉 All tests completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  testAPI();
}

module.exports = { testAPI }; 