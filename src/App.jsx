import React, { useRef, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartSystem';
import TopBar from './components/TopBar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import ProductsPage from './pages/Products';
import ProductDetails from './components/Products/Products';
import ServicesPage from './pages/Services';
import TeamPage from './pages/TeamPage';
import BlogPage from './pages/BlogPage';
import BlogDetails from './components/Blog/BlogDetails';
import CartPage from './pages/CartPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ContactUs from './pages/contact_us';
import CheckoutPage from './pages/CheckoutPage';
import PaymentPage from './pages/PaymentPage';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const blogSectionRef = useRef(null);
  const productSectionRef = useRef(null);

  useEffect(() => {
    if (location.pathname === '/admin/dashboard' && !localStorage.getItem('token')) {
      navigate('/admin/login', { state: { from: location.pathname } });
    }
    if (location.pathname === '/admin') {
      navigate('/admin/login');
    }
  }, [location, navigate]);

  const handleBlogAdded = () => {
    if (blogSectionRef.current) {
      blogSectionRef.current();
    }
  };

  const handleProductAdded = () => {
    if (productSectionRef.current) {
      productSectionRef.current();
    }
  };

  return (
    <CartProvider>
      <div className="app">
        <TopBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/products" element={<ProductsPage onProductAdded={handleProductAdded} />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/ourteam" element={<TeamPage />} />
            <Route path="/blog" element={<BlogPage onBlogAdded={handleBlogAdded} />} />
            <Route path="/blog/:id" element={<BlogDetails />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard onBlogAdded={handleBlogAdded} onProductAdded={handleProductAdded} />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="*" element={<div className="text-center text-gray-500 mt-8">404: Page Not Found</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;