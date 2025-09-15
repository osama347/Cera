import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartSystem';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();

  return (
    <div className="cart-container">
      <style>
        {`
          .cart-container {
            max-width: 1200px;
            margin: 8rem auto;
            padding: 0 1rem;
          }

          .cart-title {
            font-size: 2.5rem;
            font-weight: 700;
            color: #44c2c7;
            margin-bottom: 2rem;
            text-align: center;
          }

          .cart-empty {
            text-align: center;
            font-size: 1.2rem;
            color: #555;
            padding: 2rem;
          }

          .cart-items {
            display: grid;
            gap: 1.5rem;
            margin-bottom: 2rem;
          }

          .cart-item {
            display: flex;
            align-items: center;
            background: white;
            border-radius: 10px;
            padding: 1.5rem;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
          }

          .cart-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(68, 194, 199, 0.2);
          }

          .cart-item-image {
            width: 100px;
            height: 100px;
            object-fit: contain;
            margin-right: 1.5rem;
          }

          .cart-item-details {
            flex: 1;
          }

          .cart-item-name {
            font-size: 1.3rem;
            font-weight: 600;
            color: #2a2a2a;
            margin-bottom: 0.5rem;
          }

          .cart-item-price {
            font-size: 1.1rem;
            color: #44c2c7;
            margin-bottom: 0.5rem;
          }

          .quantity-controls {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.5rem;
          }

          .quantity-btn {
            background: #44c2c7;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .quantity-btn:hover {
            background: #3aafb4;
          }

          .remove-btn {
            background: #ff4444;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .remove-btn:hover {
            background: #cc0000;
          }

          .cart-total {
            font-size: 1.5rem;
            font-weight: 600;
            color: #2a2a2a;
            text-align: right;
            margin: 2rem 0;
          }

          .checkout-btn {
            background: #44c2c7;
            color: white;
            border: none;
            padding: 1rem 2rem;
            border-radius: 50px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: block;
            margin: 0 auto;
          }

          .checkout-btn:hover {
            background: #3aafb4;
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(68, 194, 199, 0.3);
          }

          @media (max-width: 768px) {
            .cart-item {
              flex-direction: column;
              text-align: center;
            }

            .cart-item-image {
              margin-right: 0;
              margin-bottom: 1rem;
            }
          }
        `}
      </style>

      <h1 className="cart-title">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="cart-empty">Your cart is empty</div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                className="cart-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={item.image ? `http://localhost:5000${item.image}` : 'https://placehold.co/100x100'}
                  alt={item.name}
                  className="cart-item-image"
                  onError={(e) => console.error(`Failed to load cart item image: ${e.target.src}`)}
                />
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <div className="cart-item-price">Rs. {item.price} x {item.quantity}</div>
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="cart-total">
            Total: Rs. {getCartTotal()}
          </div>
          <motion.button
            className="checkout-btn"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </motion.button>
        </>
      )}
    </div>
  );
};

export default CartPage;