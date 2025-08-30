const Booking = require('../models/Booking');
const { validationResult } = require('express-validator');
const { sendBookingEmails } = require('../services/emailService');

// Create a new booking
const createBooking = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      name,
      date,
      time,
      email,
      contact,
      message,
      mentorName,
      address,
      postalCode,
      city,
      demo1,
      demo2,
      demo3,
      demo4,
      demo5,
      paymentDetails
    } = req.body;

    // Set booking status based on PayPal payment status
    const bookingStatus = paymentDetails?.status === 'COMPLETED' ? 'confirmed' : 'pending';

    const booking = await Booking.create({
      name,
      date,
      time,
      email,
      contact,
      message,
      mentorName,
      address,
      postalCode,
      city,
      demo1,
      demo2,
      demo3,
      demo4,
      demo5,
      // Payment information
      paymentOrderID: paymentDetails?.orderID || null,
      paymentPayerID: paymentDetails?.payerID || null,
      paymentID: paymentDetails?.paymentID || null,
      paymentAmount: paymentDetails?.amount || null,
      paymentCurrency: paymentDetails?.currency || null,
      paymentStatus: paymentDetails?.status || null,
      paymentTimestamp: paymentDetails?.timestamp || null,
      // Set status based on payment completion
      status: bookingStatus
    });

    // Send confirmation emails if payment is completed
    let emailResult = null;
    if (paymentDetails?.status === 'COMPLETED') {
      try {
        const bookingData = {
          name,
          date,
          time,
          email,
          contact,
          message,
          mentorName,
          address,
          postalCode,
          city
        };

        emailResult = await sendBookingEmails(bookingData, paymentDetails);
        console.log('Email sending result:', emailResult);
      } catch (emailError) {
        console.error('Error sending confirmation emails:', emailError);
        // Don't fail the booking creation if email fails
        emailResult = { success: false, error: emailError.message };
      }
    }

    res.status(201).json({
      status: 'success',
      message: 'Booking created successfully',
      data: booking,
      emailSent: emailResult?.success || false,
      emailDetails: emailResult
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create booking',
      error: error.message
    });
  }
};

// Create an offline/cash booking (for dashboard use)
const createOfflineBooking = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      name,
      date,
      time,
      email,
      contact,
      message,
      mentorName,
      address,
      postalCode,
      city,
      sessionDuration,
      paymentAmount,
      paymentCurrency,
      paymentMethod
    } = req.body;

    // Create offline booking with confirmed status
    const booking = await Booking.create({
      name,
      date,
      time,
      email,
      contact,
      message,
      mentorName,
      address,
      postalCode,
      city,
      demo1: sessionDuration, // Map sessionDuration to demo1 for database compatibility
      demo2: null,
      demo3: null,
      demo4: null,
      demo5: null,
      // Offline payment information
      paymentOrderID: null,
      paymentPayerID: null,
      paymentID: null,
      paymentAmount: paymentAmount,
      paymentCurrency: paymentCurrency,
      paymentStatus: 'COMPLETED', // Offline payments are considered completed
      paymentTimestamp: new Date(),
      // Set status as confirmed since payment is received
      status: 'confirmed'
    });

    // Send confirmation emails for offline bookings
    let emailResult = null;
    try {
      const bookingData = {
        name,
        date,
        time,
        email,
        contact,
        message,
        mentorName,
        address,
        postalCode,
        city,
        sessionDuration
      };

      const offlinePaymentDetails = {
        status: 'COMPLETED',
        amount: paymentAmount,
        currency: paymentCurrency,
        method: paymentMethod,
        timestamp: new Date()
      };

      emailResult = await sendBookingEmails(bookingData, offlinePaymentDetails);
      console.log('Offline booking email sending result:', emailResult);
    } catch (emailError) {
      console.error('Error sending confirmation emails for offline booking:', emailError);
      // Don't fail the booking creation if email fails
      emailResult = { success: false, error: emailError.message };
    }

    res.status(201).json({
      status: 'success',
      message: 'Offline booking created successfully',
      data: {
        ...booking.toJSON(),
        paymentMethod: paymentMethod
      },
      emailSent: emailResult?.success || false,
      emailDetails: emailResult
    });
  } catch (error) {
    console.error('Error creating offline booking:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create offline booking',
      error: error.message
    });
  }
};

// Get all bookings
const getAllBookings = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, mentorName } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {};
    if (status) whereClause.status = status;
    if (mentorName) whereClause.mentorName = { [require('sequelize').Op.like]: `%${mentorName}%` };

    const bookings = await Booking.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'DESC']]
    });

    res.status(200).json({
      status: 'success',
      message: 'Bookings retrieved successfully',
      data: {
        bookings: bookings.rows,
        total: bookings.count,
        currentPage: parseInt(page),
        totalPages: Math.ceil(bookings.count / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch bookings',
      error: error.message
    });
  }
};

// Get booking by ID
const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByPk(id);

    if (!booking) {
      return res.status(404).json({
        status: 'error',
        message: 'Booking not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Booking retrieved successfully',
      data: booking
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch booking',
      error: error.message
    });
  }
};

// Update booking (for both online and offline bookings)
const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByPk(id);

    if (!booking) {
      return res.status(404).json({
        status: 'error',
        message: 'Booking not found'
      });
    }

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    // Prepare update data
    const updateData = { ...req.body };

    // Handle sessionDuration mapping for database compatibility
    if (updateData.sessionDuration) {
      updateData.demo1 = updateData.sessionDuration;
      delete updateData.sessionDuration;
    }

    // Handle payment method updates
    if (updateData.paymentMethod) {
      // If changing from online to offline payment, clear PayPal fields
      if (['cash', 'local_bank_transfer', 'local_payment'].includes(updateData.paymentMethod)) {
        updateData.paymentOrderID = null;
        updateData.paymentPayerID = null;
        updateData.paymentID = null;
        updateData.paymentStatus = 'COMPLETED';
        updateData.paymentTimestamp = new Date();
      }
      // If changing from offline to online payment, clear offline payment fields
      else if (updateData.paymentMethod === 'paypal') {
        updateData.paymentAmount = null;
        updateData.paymentCurrency = null;
        updateData.paymentStatus = 'PENDING';
        updateData.paymentTimestamp = null;
      }
    }

    // Update the booking
    await booking.update(updateData);

    // Send confirmation email if email or contact details changed
    let emailResult = null;
    if (updateData.email || updateData.contact || updateData.date || updateData.time || updateData.mentorName) {
      try {
        const updatedBooking = await Booking.findByPk(id);
        const bookingData = {
          name: updatedBooking.name,
          date: updatedBooking.date,
          time: updatedBooking.time,
          email: updatedBooking.email,
          contact: updatedBooking.contact,
          message: updatedBooking.message,
          mentorName: updatedBooking.mentorName,
          address: updatedBooking.address,
          postalCode: updatedBooking.postalCode,
          city: updatedBooking.city,
          sessionDuration: updatedBooking.demo1
        };

        const paymentDetails = {
          status: updatedBooking.paymentStatus,
          amount: updatedBooking.paymentAmount,
          currency: updatedBooking.paymentCurrency,
          method: updateData.paymentMethod || 'unknown',
          timestamp: updatedBooking.paymentTimestamp
        };

        emailResult = await sendBookingEmails(bookingData, paymentDetails);
        console.log('Update confirmation email result:', emailResult);
      } catch (emailError) {
        console.error('Error sending update confirmation email:', emailError);
        emailResult = { success: false, error: emailError.message };
      }
    }

    res.status(200).json({
      status: 'success',
      message: 'Booking updated successfully',
      data: {
        ...booking.toJSON(),
        sessionDuration: booking.demo1, // Map back to frontend format
        emailSent: emailResult?.success || false,
        emailDetails: emailResult
      }
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update booking',
      error: error.message
    });
  }
};

// Delete booking
const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByPk(id);

    if (!booking) {
      return res.status(404).json({
        status: 'error',
        message: 'Booking not found'
      });
    }

    await booking.destroy();

    res.status(200).json({
      status: 'success',
      message: 'Booking deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete booking',
      error: error.message
    });
  }
};

// Update booking status
const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const booking = await Booking.findByPk(id);

    if (!booking) {
      return res.status(404).json({
        status: 'error',
        message: 'Booking not found'
      });
    }

    const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid status. Must be one of: pending, confirmed, cancelled, completed'
      });
    }

    await booking.update({ status });

    res.status(200).json({
      status: 'success',
      message: 'Booking status updated successfully',
      data: booking
    });
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update booking status',
      error: error.message
    });
  }
};

// Get bookings by mentor
const getBookingsByMentor = async (req, res) => {
  try {
    const { mentorName } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const bookings = await Booking.findAndCountAll({
      where: {
        mentorName: { [require('sequelize').Op.like]: `%${mentorName}%` }
      },
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'DESC']]
    });

    res.status(200).json({
      status: 'success',
      message: 'Mentor bookings retrieved successfully',
      data: {
        bookings: bookings.rows,
        total: bookings.count,
        currentPage: parseInt(page),
        totalPages: Math.ceil(bookings.count / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching mentor bookings:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch mentor bookings',
      error: error.message
    });
  }
};

// Get bookings by payment method
const getBookingsByPaymentMethod = async (req, res) => {
  try {
    const { paymentMethod, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = {};
    
    if (paymentMethod === 'offline') {
      // Offline bookings have null PayPal fields but have payment amount
      whereClause = {
        paymentOrderID: null,
        paymentPayerID: null,
        paymentID: null,
        paymentAmount: { [require('sequelize').Op.ne]: null }
      };
    } else if (paymentMethod === 'online') {
      // Online bookings have PayPal fields
      whereClause = {
        paymentOrderID: { [require('sequelize').Op.ne]: null }
      };
    } else if (paymentMethod === 'cash') {
      // Cash payments (you can add a specific field for this if needed)
      whereClause = {
        paymentOrderID: null,
        paymentPayerID: null,
        paymentID: null,
        paymentAmount: { [require('sequelize').Op.ne]: null }
      };
    }

    const bookings = await Booking.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'DESC']]
    });

    res.status(200).json({
      status: 'success',
      message: `Bookings with ${paymentMethod} payment method retrieved successfully`,
      data: {
        bookings: bookings.rows,
        total: bookings.count,
        currentPage: parseInt(page),
        totalPages: Math.ceil(bookings.count / limit),
        paymentMethod: paymentMethod
      }
    });
  } catch (error) {
    console.error('Error fetching bookings by payment method:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch bookings by payment method',
      error: error.message
    });
  }
};

module.exports = {
  createBooking,
  createOfflineBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  updateBookingStatus,
  getBookingsByMentor,
  getBookingsByPaymentMethod
}; 