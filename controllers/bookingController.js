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

// Update booking
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

    await booking.update(req.body);

    res.status(200).json({
      status: 'success',
      message: 'Booking updated successfully',
      data: booking
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

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  updateBookingStatus,
  getBookingsByMentor
}; 