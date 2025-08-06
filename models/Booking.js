const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  time: {
    type: DataTypes.TIME,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  contact: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  mentorName: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  postalCode: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  city: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  demo1: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  demo2: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  demo3: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  demo4: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  demo5: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  // Payment fields
  paymentOrderID: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  paymentPayerID: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  paymentID: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  paymentAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  paymentCurrency: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  paymentStatus: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  paymentTimestamp: {
    type: DataTypes.DATE,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'cancelled', 'completed'),
    defaultValue: 'pending',
    allowNull: false
  }
}, {
  tableName: 'bookings',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Booking; 