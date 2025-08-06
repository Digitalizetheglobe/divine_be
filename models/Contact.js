const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Contact = sequelize.define('Contact', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fullName: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  phoneNumber: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  countryCode: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  package: {
    type: DataTypes.ENUM('seeker', 'disciple', 'divine'),
    allowNull: true
  },
  specialRequirements: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('new', 'contacted', 'converted', 'closed'),
    defaultValue: 'new',
    allowNull: false
  }
}, {
  tableName: 'contacts',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Contact; 