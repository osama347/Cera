import React from 'react';
import ProductsBanner from '../components/Products/ProductsBanner';
import Mossent from '../components/Products/Mossent';

const ProductsPage = ({ onProductAdded }) => {
  return (
    <>
      <ProductsBanner />
      <Mossent onProductAdded={onProductAdded} />
    </>
  );
};

export default ProductsPage;