import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    fullName: 'Atif Ullah Khan',
    email: 'itxmeatif8@gmail.com',
    phone: '03369550129',
    address: 'jqduk wd',
    paymentMethod: 'Bank Transfer',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullName, email, phone, address, paymentMethod } = formData;
    if (!fullName || !email || !phone || !address || !paymentMethod) {
      setError('All fields are required');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Invalid email address');
      return;
    }
    if (!/^\d{10,15}$/.test(phone)) {
      setError('Invalid phone number (10-15 digits required)');
      return;
    }
    navigate('/payment', { state: { userInfo: formData } });
  };

  return (
    <div className="checkout-container container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Checkout</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Email Address:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Phone Number:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Shipping Address:</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            rows="4"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Payment Method:</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Select Payment Method</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Easypaisa">Easypaisa</option>
            <option value="JazzCash">JazzCash</option>
            <option value="Zindagi Wallet">Zindagi Wallet</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition duration-300 w-full"
        >
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;