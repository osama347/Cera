import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BlogSection.css';

// Utility function to strip HTML tags and truncate text
const stripHtml = (html, maxLength) => {
  const div = document.createElement('div');
  div.innerHTML = html;
  const text = div.textContent || div.innerText || '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

const BlogSection = ({ onBlogAdded }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const blogResponse = await fetch('http://localhost:5000/api/blogs?_=' + new Date().getTime());
      if (!blogResponse.ok) throw new Error('Failed to fetch blogs');
      const blogData = await blogResponse.json();
      setBlogs(blogData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (onBlogAdded) {
      fetchData();
    }
  }, [onBlogAdded]);

  if (loading) return <div className="text-center text-gray-500">Loading blogs...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="blog-section container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Our Blogs</h2>
      <div className="blog-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="blog-card bg-white rounded-lg shadow-md overflow-hidden">
            {blog.image && (
              <img
                src={blog.image ? `http://localhost:5000${blog.image}` : 'https://via.placeholder.com/300x200'}
                alt={blog.title}
                className="blog-card-image w-full h-[200px] object-cover"
                onError={(e) => (e.target.src = 'https://via.placeholder.com/300x200')}
              />
            )}
            <div className="blog-card-content p-4">
              <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
              <p className="blog-card-date text-gray-500 mb-2">
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
              <p className="blog-card-excerpt text-gray-600 mb-4">
                {stripHtml(blog.content, 100)}
              </p>
              <Link
                to={`/blog/${blog._id}`}
                className="blog-card-link bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition duration-300"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSection;