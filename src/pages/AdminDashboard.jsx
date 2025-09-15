import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = ({ onBlogAdded, onProductAdded }) => {
  const [blogs, setBlogs] = useState([]);
  const [products, setProducts] = useState([]);
  const [payments, setPayments] = useState([]);
  const [blogTitle, setBlogTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');
  const [productTitle, setProductTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const blogEditorRef = useRef(null);
  const productEditorRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to access the dashboard');
      navigate('/admin/login', { state: { from: '/admin/dashboard' } });
      return;
    }
    fetchBlogs();
    fetchProducts();
    fetchPayments();
  }, [navigate]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/blogs?_=' + new Date().getTime(), {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
      if (!response.ok) throw new Error(`Failed to fetch blogs: ${response.statusText}`);
      const data = await response.json();
      setBlogs(data);
    } catch (err) {
      setError('Failed to fetch blogs: ' + err.message);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products?_=' + new Date().getTime(), {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
      if (!response.ok) throw new Error(`Failed to fetch products: ${response.statusText}`);
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError('Failed to fetch products: ' + err.message);
    }
  };

  const fetchPayments = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/payments?_=' + new Date().getTime(), {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
      if (!response.ok) throw new Error(`Failed to fetch payments: ${response.statusText}`);
      const data = await response.json();
      setPayments(data);
    } catch (err) {
      setError('Failed to fetch payments: ' + err.message);
    }
  };

  const handleFormat = (command, editorRef, setContentFn, value = null) => {
    if (editorRef.current) {
      document.execCommand(command, false, value);
      editorRef.current.focus();
      setContentFn(editorRef.current.innerHTML);
    }
  };

  const handleAddLink = (editorRef, setContentFn) => {
    const url = prompt('Enter the URL:');
    if (url) {
      document.execCommand('createLink', false, url);
      editorRef.current.focus();
      setContentFn(editorRef.current.innerHTML);
    }
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to perform this action');
      navigate('/admin/login', { state: { from: '/admin/dashboard' } });
      return;
    }

    const formData = new FormData();
    formData.append('title', blogTitle);
    formData.append('content', content);
    formData.append('category', category);
    if (image) formData.append('image', image);

    try {
      const url = editingBlogId
        ? `http://localhost:5000/api/blogs/${editingBlogId}`
        : 'http://localhost:5000/api/blogs';
      const method = editingBlogId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) {
        const text = await response.text();
        console.error('Blog submit response:', text);
        try {
          const data = JSON.parse(text);
          setError(data.message || `Failed to save blog: ${response.statusText}`);
        } catch {
          setError(`Failed to save blog: ${response.statusText} (Non-JSON response)`);
        }
        return;
      }

      const data = await response.json();
      setBlogTitle('');
      setContent('');
      setCategory('General');
      setImage(null);
      setEditingBlogId(null);
      if (blogEditorRef.current) blogEditorRef.current.innerHTML = '';
      fetchBlogs();
      if (!editingBlogId && onBlogAdded) onBlogAdded();
    } catch (err) {
      console.error('Blog submit error:', err);
      setError('Server error: ' + err.message);
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to perform this action');
      navigate('/admin/login', { state: { from: '/admin/dashboard' } });
      return;
    }

    const formData = new FormData();
    formData.append('title', productTitle);
    formData.append('description', description);
    formData.append('price', parseFloat(price));
    if (image) formData.append('image', image);

    try {
      const url = editingProductId
        ? `http://localhost:5000/api/products/${editingProductId}`
        : 'http://localhost:5000/api/products';
      const method = editingProductId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) {
        const text = await response.text();
        console.error('Product submit response:', text);
        try {
          const data = JSON.parse(text);
          setError(data.message || `Failed to save product: ${response.statusText}`);
        } catch {
          setError(`Failed to save product: ${response.statusText} (Non-JSON response)`);
        }
        return;
      }

      const data = await response.json();
      setProductTitle('');
      setDescription('');
      setPrice('');
      setImage(null);
      setEditingProductId(null);
      if (productEditorRef.current) productEditorRef.current.innerHTML = '';
      fetchProducts();
      if (!editingProductId && onProductAdded) onProductAdded();
    } catch (err) {
      console.error('Product submit error:', err);
      setError('Server error: ' + err.message);
    }
  };

  const handleBlogEdit = (blog) => {
    setBlogTitle(blog.title);
    setContent(blog.content);
    setCategory(blog.category || 'General');
    setEditingBlogId(blog._id);
    setEditingProductId(null);
    setImage(null);
    if (blogEditorRef.current) blogEditorRef.current.innerHTML = blog.content;
  };

  const handleProductEdit = (product) => {
    setProductTitle(product.title);
    setDescription(product.description);
    setPrice(product.price.toString());
    setEditingProductId(product._id);
    setEditingBlogId(null);
    setImage(null);
    if (productEditorRef.current) productEditorRef.current.innerHTML = product.description;
  };

  const handleBlogDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to perform this action');
      navigate('/admin/login', { state: { from: '/admin/dashboard' } });
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        fetchBlogs();
      } else {
        const data = await response.json();
        setError(data.message || `Failed to delete blog: ${response.statusText}`);
      }
    } catch (err) {
      setError('Server error: ' + err.message);
    }
  };

  const handleProductDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to perform this action');
      navigate('/admin/login', { state: { from: '/admin/dashboard' } });
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        fetchProducts();
      } else {
        const data = await response.json();
        setError(data.message || `Failed to delete product: ${response.statusText}`);
      }
    } catch (err) {
      setError('Server error: ' + err.message);
    }
  };

  const handlePaymentUpdate = async (id, status) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to perform this action');
      navigate('/admin/login', { state: { from: '/admin/dashboard' } });
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/payments/${id}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        const data = await response.json();
        setError(data.message || `Failed to update payment: ${response.statusText}`);
        return;
      }
      fetchPayments();
    } catch (err) {
      console.error('Payment update error:', err);
      setError('Server error: ' + err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  const handleCancelEdit = () => {
    setEditingBlogId(null);
    setEditingProductId(null);
    setBlogTitle('');
    setContent('');
    setCategory('General');
    setProductTitle('');
    setDescription('');
    setPrice('');
    setImage(null);
    if (blogEditorRef.current) blogEditorRef.current.innerHTML = '';
    if (productEditorRef.current) productEditorRef.current.innerHTML = '';
  };

  return (
    <div className="admin-dashboard container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-teal-600">Admin Dashboard</h2>
      <button
        onClick={handleLogout}
        className="logout-btn bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 mb-6"
      >
        Logout
      </button>
      {error && <p className="error text-red-500 mb-4">{error}</p>}

      {/* Blog Management */}
      <h3 className="text-xl font-semibold mb-4">
        {editingBlogId ? 'Edit Blog' : 'Add New Blog'}
      </h3>
      <form
        onSubmit={handleBlogSubmit}
        encType="multipart/form-data"
        className="mb-8 bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Title:</label>
          <input
            type="text"
            value={blogTitle}
            onChange={(e) => setBlogTitle(e.target.value)}
            required
            disabled={editingProductId}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Content:</label>
          <div className="toolbar">
            <button
              type="button"
              className="toolbar-btn mini-btn"
              onClick={() => handleFormat('bold', blogEditorRef, setContent)}
              disabled={editingProductId}
              title="Bold"
            >
              B
            </button>
            <button
              type="button"
              className="toolbar-btn"
              onClick={() => handleFormat('formatBlock', blogEditorRef, setContent, 'P')}
              disabled={editingProductId}
              title="Paragraph"
            >
              Paragraph
            </button>
            <button
              type="button"
              className="toolbar-btn"
              onClick={() => handleFormat('insertUnorderedList', blogEditorRef, setContent)}
              disabled={editingProductId}
              title="Bullet List"
            >
              Bullet List
            </button>
            <button
              type="button"
              className="toolbar-btn"
              onClick={() => handleAddLink(blogEditorRef, setContent)}
              disabled={editingProductId}
              title="Add Link"
            >
              Add Link
            </button>
          </div>
          <div
            ref={blogEditorRef}
            className="editor"
            contentEditable={!editingProductId}
            onInput={(e) => setContent(e.currentTarget.innerHTML)}
            data-placeholder="Enter blog content..."
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={editingProductId}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Image (optional):</label>
          <input
            type="file"
            accept="image/jpeg,image/png"
            onChange={(e) => setImage(e.target.files[0])}
            disabled={editingProductId}
            className="w-full"
          />
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={editingProductId}
            className="bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition duration-300"
          >
            {editingBlogId ? 'Update Blog' : 'Add Blog'}
          </button>
          {(editingBlogId || editingProductId) && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <h3 className="text-xl font-semibold mb-4">All Blogs</h3>
      <table className="blog-table w-full mb-8">
        <thead>
          <tr>
            <th className="p-2">Title</th>
            <th className="p-2">Category</th>
            <th className="p-2">Created At</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog._id}>
              <td className="p-2">{blog.title}</td>
              <td className="p-2">{blog.category || 'General'}</td>
              <td className="p-2">{new Date(blog.createdAt).toLocaleString()}</td>
              <td className="p-2">
                <button
                  onClick={() => handleBlogEdit(blog)}
                  className="bg-blue-500 text-white py-1 px-2 rounded mr-2 hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleBlogDelete(blog._id)}
                  className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Product Management */}
      <h3 className="text-xl font-semibold mb-4">
        {editingProductId ? 'Edit Product' : 'Add New Product'}
      </h3>
      <form
        onSubmit={handleProductSubmit}
        encType="multipart/form-data"
        className="mb-8 bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Title:</label>
          <input
            type="text"
            value={productTitle}
            onChange={(e) => setProductTitle(e.target.value)}
            required
            disabled={editingBlogId}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Description:</label>
          <div className="toolbar">
            <button
              type="button"
              className="toolbar-btn mini-btn"
              onClick={() => handleFormat('bold', productEditorRef, setDescription)}
              disabled={editingBlogId}
              title="Bold"
            >
              B
            </button>
            <button
              type="button"
              className="toolbar-btn"
              onClick={() => handleFormat('formatBlock', productEditorRef, setDescription, 'P')}
              disabled={editingBlogId}
              title="Paragraph"
            >
              Paragraph
            </button>
            <button
              type="button"
              className="toolbar-btn"
              onClick={() => handleFormat('insertUnorderedList', productEditorRef, setDescription)}
              disabled={editingBlogId}
              title="Bullet List"
            >
              Bullet List
            </button>
            <button
              type="button"
              className="toolbar-btn"
              onClick={() => handleAddLink(productEditorRef, setDescription)}
              disabled={editingBlogId}
              title="Add Link"
            >
              Add Link
            </button>
          </div>
          <div
            ref={productEditorRef}
            className="editor"
            contentEditable={!editingBlogId}
            onInput={(e) => setDescription(e.currentTarget.innerHTML)}
            data-placeholder="Enter product description..."
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Price (Rs.):</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
            step="0.01"
            disabled={editingBlogId}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Image (optional):</label>
          <input
            type="file"
            accept="image/jpeg,image/png"
            onChange={(e) => setImage(e.target.files[0])}
            disabled={editingBlogId}
            className="w-full"
          />
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={editingBlogId}
            className="bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition duration-300"
          >
            {editingProductId ? 'Update Product' : 'Add Product'}
          </button>
          {(editingBlogId || editingProductId) && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <h3 className="text-xl font-semibold mb-4">All Products</h3>
      <table className="product-table w-full mb-8">
        <thead>
          <tr>
            <th className="p-2">Title</th>
            <th className="p-2">Description</th>
            <th className="p-2">Price</th>
            <th className="p-2">Created At</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="p-2">{product.title}</td>
              <td className="p-2">{product.description.substring(0, 50)}...</td>
              <td className="p-2">Rs. {product.price}</td>
              <td className="p-2">{new Date(product.createdAt).toLocaleString()}</td>
              <td className="p-2">
                <button
                  onClick={() => handleProductEdit(product)}
                  className="bg-blue-500 text-white py-1 px-2 rounded mr-2 hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleProductDelete(product._id)}
                  className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="text-xl font-semibold mb-4">Payment Submissions</h3>
      <table className="payment-table w-full mb-8">
        <thead>
          <tr>
            <th className="p-2">User Info</th>
            <th className="p-2">Cart Items</th>
            <th className="p-2">Payment Method</th>
            <th className="p-2">Transaction ID</th>
            <th className="p-2">Status</th>
            <th className="p-2">Created At</th>
            <th className="p-2">Transaction Image</th>
            <th className="p-2">Report Link</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment._id}>
              <td className="p-2">
                <div className="flex flex-col">
                  <span><strong>Name:</strong> {payment.userInfo.fullName}</span>
                  <span><strong>Email:</strong> {payment.userInfo.email}</span>
                  <span><strong>Phone:</strong> {payment.userInfo.phone}</span>
                  <span><strong>Address:</strong> {payment.userInfo.address}</span>
                </div>
              </td>
              <td className="p-2">
                <ul className="list-disc list-inside">
                  {payment.cartItems.map((item, index) => (
                    <li key={index}>
                      {item.title} - Rs. {item.price} x {item.quantity}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="p-2">{payment.userInfo.paymentMethod}</td>
              <td className="p-2">{payment.transactionId}</td>
              <td className="p-2">{payment.status}</td>
              <td className="p-2">{new Date(payment.createdAt).toLocaleString()}</td>
              <td className="p-2">
                {payment.receiptImage ? (
                  <a
                    href={`http://localhost:5000${payment.receiptImage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View Transaction Image
                  </a>
                ) : (
                  'N/A'
                )}
              </td>
              <td className="p-2">
                {payment.receiptPdf ? (
                  <a
                    href={`http://localhost:5000${payment.receiptPdf}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500 hover:underline"
                  >
                    View Report PDF
                  </a>
                ) : (
                  'N/A'
                )}
              </td>
              <td className="p-2">
                {payment.status === 'Pending' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handlePaymentUpdate(payment._id, 'Payment Verified')}
                      className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600"
                    >
                      Verify
                    </button>
                    <button
                      onClick={() => handlePaymentUpdate(payment._id, 'Rejected')}
                      className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;