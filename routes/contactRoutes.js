const express = require('express');
const router = express.Router();
const {
  submitContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact
} = require('../controllers/contactController');

// Submit contact form
router.post('/submit', submitContact);

// Get all contacts (for admin purposes)
router.get('/', getAllContacts);

// Get contact by ID
router.get('/:id', getContactById);

// Update contact status
router.patch('/:id/status', updateContactStatus);

// Delete contact
router.delete('/:id', deleteContact);

module.exports = router; 