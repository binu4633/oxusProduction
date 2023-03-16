import React,{useState} from 'react';

import ProductsMenu from './ProductsMenu';
import ProductCollection from './ProductCollection';
import Pagination from './Pagination';

function Products() {
  

  return (
    <div>
       <ProductsMenu />
       <ProductCollection />
       <Pagination />
    </div>
  )
}

export default Products
