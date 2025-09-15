import React from 'react';
import BlogBanner from '../components/Blog/BlogBanner';
import BlogSection from '../components/Blog/BlogSection';

const BlogPage = ({ onBlogAdded }) => {
  return (
    <>
      <BlogBanner />
      <BlogSection onBlogAdded={onBlogAdded} />
    </>
  );
};

export default BlogPage;