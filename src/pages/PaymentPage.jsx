import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartSystem';
import './PaymentPage.css';

const PaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState(state?.userInfo?.paymentMethod || '');
  const [transactionId, setTransactionId] = useState('');
  const [receipt, setReceipt] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef(null);

  const paymentAccounts = {
    'Bank Transfer': 'PK12-XXXX-XXXX-1234-5678-9012',
    'Easypaisa': '0300-1234567',
    'JazzCash': '0301-7654321',
    'Zindagi Wallet': 'ZW-456789123',
  };

  useEffect(() => {
    if (!state?.userInfo) {
      setError('No user information provided. Please complete the checkout form.');
      navigate('/checkout');
    } else {
      setPaymentMethod(state.userInfo.paymentMethod || '');
    }
  }, [state, navigate]);

  useEffect(() => {
    if (paymentStatus === 'Payment Verified') {
      setSuccess('Thank you! Your payment has been verified. We will contact you shortly via email or phone.');
      clearCart();
    }
  }, [paymentStatus, clearCart]);

  useEffect(() => {
    let interval;
    if (paymentData?._id) {
      interval = setInterval(() => checkPaymentStatus(paymentData._id), 5000);
    }
    return () => clearInterval(interval);
  }, [paymentData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!transactionId || !receipt) {
      setError('Transaction ID and receipt image are required');
      return;
    }
    if (!cartItems || !cartItems.length) {
      setError('Cart is empty');
      return;
    }
    if (!paymentMethod) {
      setError('Payment method is required');
      return;
    }

    const formattedCartItems = cartItems.map((item) => ({
      title: item.title || item.name,
      price: item.price || item.cost,
      quantity: item.quantity || item.amount,
      image: item.image || null,
    }));

    const isValidCartItems = formattedCartItems.every(
      (item) =>
        item.title &&
        typeof item.price === 'number' &&
        typeof item.quantity === 'number'
    );
    if (!isValidCartItems) {
      setError('Each cart item must have a title, price, and quantity');
      return;
    }

    const formData = new FormData();
    formData.append('userInfo', JSON.stringify(state.userInfo));
    formData.append('cartItems', JSON.stringify(formattedCartItems));
    formData.append('transactionId', transactionId);
    formData.append('paymentMethod', paymentMethod);
    if (receipt) formData.append('receipt', receipt);

    try {
      const response = await fetch('http://localhost:5000/api/payments', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to submit payment');
      }
      const data = await response.json();
      setPaymentData(data.payment);
      setSuccess('Payment submitted successfully! Awaiting admin verification. Download your receipt below.');
      setError('');
      setTransactionId('');
      setReceipt(null);
      setIsSubmitted(true);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      checkPaymentStatus(data.payment._id);
    } catch (err) {
      setError(err.message);
      setSuccess('');
    }
  };

  const checkPaymentStatus = async (paymentId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/payments/${paymentId}`);
      if (!response.ok) throw new Error('Failed to check payment status');
      const data = await response.json();
      setPaymentStatus(data.status);
    } catch (err) {
      setError('Error checking payment status: ' + err.message);
    }
  };

  if (!state?.userInfo) return null;

  return (
    <div className="payment-container container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-teal-600">Payment</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {success && <p className="text-green-500 text-center mb-4">{success}</p>}
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Payment Method:</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            disabled={isSubmitted}
            required
          >
            <option value="">Select Payment Method</option>
            {Object.keys(paymentAccounts).map((method) => (
              <option key={method} value={method}>{method}</option>
            ))}
          </select>
        </div>
        {paymentMethod && (
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Account Number:</label>
            <p className="text-gray-600">{paymentAccounts[paymentMethod]}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Transaction ID:</label>
            <input
              type="text"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              required
              disabled={isSubmitted}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Payment Receipt Image:</label>
            <input
              type="file"
              accept="image/jpeg,image/png"
              onChange={(e) => setReceipt(e.target.files[0])}
              required
              disabled={isSubmitted}
              className="w-full"
              ref={fileInputRef}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitted}
            className="bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition duration-300 w-full"
          >
            Submit Payment
          </button>
        </form>
        {paymentData && paymentData.receiptPdf && (
          <div className="text-center mt-6">
            <a
              href={`http://localhost:5000${paymentData.receiptPdf}`}
              download={`receipt_${paymentData.transactionId}.pdf`}
              className="inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Download Your Receipt
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;