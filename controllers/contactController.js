const Contact = require('../models/Contact');

// Submit contact form
const submitContact = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, countryCode, package, specialRequirements } = req.body;

    // Create contact record
    const contact = await Contact.create({
      fullName: fullName || null,
      email: email || null,
      phoneNumber: phoneNumber || null,
      countryCode: countryCode || null,
      package: package || null,
      specialRequirements: specialRequirements || null
    });

    res.status(201).json({
      status: 'success',
      message: 'Contact form submitted successfully',
      data: {
        id: contact.id,
        fullName: contact.fullName,
        email: contact.email,
        package: contact.package,
        status: contact.status,
        createdAt: contact.created_at
      }
    });

  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to submit contact form',
      error: error.message
    });
  }
};

// Get all contacts (for admin purposes)
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll({
      order: [['created_at', 'DESC']]
    });

    res.status(200).json({
      status: 'success',
      data: contacts
    });

  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch contacts',
      error: error.message
    });
  }
};

// Get contact by ID
const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByPk(id);

    if (!contact) {
      return res.status(404).json({
        status: 'error',
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: contact
    });

  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch contact',
      error: error.message
    });
  }
};

// Update contact status
const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const contact = await Contact.findByPk(id);

    if (!contact) {
      return res.status(404).json({
        status: 'error',
        message: 'Contact not found'
      });
    }

    await contact.update({ status });

    res.status(200).json({
      status: 'success',
      message: 'Contact status updated successfully',
      data: contact
    });

  } catch (error) {
    console.error('Error updating contact status:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update contact status',
      error: error.message
    });
  }
};

// Delete contact
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByPk(id);

    if (!contact) {
      return res.status(404).json({
        status: 'error',
        message: 'Contact not found'
      });
    }

    await contact.destroy();

    res.status(200).json({
      status: 'success',
      message: 'Contact deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete contact',
      error: error.message
    });
  }
};

module.exports = {
  submitContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact
}; 