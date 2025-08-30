const axios = require('axios');

// Test editing a booking
const testEditBooking = async () => {
  try {
    console.log('📝 Testing Edit Booking Functionality\n');

    // First, let's get all bookings to find one to edit
    console.log('1. Fetching all bookings...');
    const getResponse = await axios.get('http://localhost:3001/api/bookings');
    const bookings = getResponse.data.data?.bookings || [];
    
    if (bookings.length === 0) {
      console.log('❌ No bookings found to edit. Please create a booking first.');
      return;
    }

    const bookingToEdit = bookings[0];
    console.log(`✅ Found booking to edit: ${bookingToEdit.name} (ID: ${bookingToEdit.id})`);

    // Test updating the booking
    console.log('\n2. Testing booking update...');
    const updateData = {
      name: `${bookingToEdit.name} (Updated)`,
      time: '15:00',
      message: 'This booking has been updated via API test',
      status: 'confirmed'
    };

    const updateResponse = await axios.put(`http://localhost:3001/api/bookings/${bookingToEdit.id}`, updateData);
    
    if (updateResponse.data.status === 'success') {
      console.log('✅ Booking updated successfully!');
      console.log('Updated data:', updateResponse.data.data);
    } else {
      console.log('❌ Failed to update booking:', updateResponse.data);
    }

    // Test updating with session duration
    console.log('\n3. Testing session duration update...');
    const sessionUpdateData = {
      sessionDuration: '50 min',
      mentorName: 'Swami Pratik'
    };

    const sessionUpdateResponse = await axios.put(`http://localhost:3001/api/bookings/${bookingToEdit.id}`, sessionUpdateData);
    
    if (sessionUpdateResponse.data.status === 'success') {
      console.log('✅ Session duration updated successfully!');
      console.log('Updated data:', sessionUpdateResponse.data.data);
    } else {
      console.log('❌ Failed to update session duration:', sessionUpdateResponse.data);
    }

    // Test updating payment method (changing from online to offline)
    console.log('\n4. Testing payment method update...');
    const paymentUpdateData = {
      paymentMethod: 'cash',
      paymentAmount: 200.00,
      paymentCurrency: 'CHF'
    };

    const paymentUpdateResponse = await axios.put(`http://localhost:3001/api/bookings/${bookingToEdit.id}`, paymentUpdateData);
    
    if (paymentUpdateResponse.data.status === 'success') {
      console.log('✅ Payment method updated successfully!');
      console.log('Updated data:', paymentUpdateResponse.data.data);
    } else {
      console.log('❌ Failed to update payment method:', paymentUpdateResponse.data);
    }

    // Verify the updated booking
    console.log('\n5. Verifying updated booking...');
    const verifyResponse = await axios.get(`http://localhost:3001/api/bookings/${bookingToEdit.id}`);
    const updatedBooking = verifyResponse.data.data;
    
    console.log('✅ Final booking state:');
    console.log(`   Name: ${updatedBooking.name}`);
    console.log(`   Time: ${updatedBooking.time}`);
    console.log(`   Message: ${updatedBooking.message}`);
    console.log(`   Status: ${updatedBooking.status}`);
    console.log(`   Session Duration: ${updatedBooking.demo1}`);
    console.log(`   Payment Method: ${updatedBooking.paymentMethod || 'N/A'}`);
    console.log(`   Payment Amount: ${updatedBooking.paymentAmount}`);
    console.log(`   Payment Currency: ${updatedBooking.paymentCurrency}`);

  } catch (error) {
    console.error('❌ Error testing edit booking:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Error:', error.response.data);
    } else {
      console.error('Network Error:', error.message);
    }
  }
};

// Test validation errors
const testEditValidation = async () => {
  try {
    console.log('\n🧪 Testing Edit Validation...');

    // Get a booking to test with
    const getResponse = await axios.get('http://localhost:3001/api/bookings');
    const bookings = getResponse.data.data?.bookings || [];
    
    if (bookings.length === 0) {
      console.log('❌ No bookings found to test validation.');
      return;
    }

    const bookingId = bookings[0].id;

    // Test invalid session duration
    console.log('\n1. Testing invalid session duration...');
    try {
      await axios.put(`http://localhost:3001/api/bookings/${bookingId}`, {
        sessionDuration: 'invalid'
      });
      console.log('❌ Should have failed with invalid session duration');
    } catch (error) {
      if (error.response?.status === 400) {
        console.log('✅ Correctly rejected invalid session duration');
        console.log('Error:', error.response.data.message);
      } else {
        console.log('❌ Unexpected error:', error.response?.data);
      }
    }

    // Test invalid payment amount
    console.log('\n2. Testing invalid payment amount...');
    try {
      await axios.put(`http://localhost:3001/api/bookings/${bookingId}`, {
        paymentAmount: -50
      });
      console.log('❌ Should have failed with negative payment amount');
    } catch (error) {
      if (error.response?.status === 400) {
        console.log('✅ Correctly rejected negative payment amount');
        console.log('Error:', error.response.data.message);
      } else {
        console.log('❌ Unexpected error:', error.response?.data);
      }
    }

    // Test invalid payment currency
    console.log('\n3. Testing invalid payment currency...');
    try {
      await axios.put(`http://localhost:3001/api/bookings/${bookingId}`, {
        paymentCurrency: 'USD'
      });
      console.log('❌ Should have failed with invalid currency');
    } catch (error) {
      if (error.response?.status === 400) {
        console.log('✅ Correctly rejected invalid currency');
        console.log('Error:', error.response.data.message);
      } else {
        console.log('❌ Unexpected error:', error.response?.data);
      }
    }

  } catch (error) {
    console.error('❌ Error testing validation:', error.message);
  }
};

// Run tests
const runTests = async () => {
  console.log('🚀 Starting Edit Booking Tests\n');
  
  await testEditBooking();
  await testEditValidation();
  
  console.log('\n✨ Edit Booking Tests Completed!');
  console.log('\n💡 You can now edit bookings from your dashboard!');
};

// Check if running directly
if (require.main === module) {
  runTests();
}

module.exports = { testEditBooking, testEditValidation };
