// app/components/ProductList.tsx

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../types';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="w-full overflow-x-auto">
      
      
     
      <AnimatePresence>
        <div className="flex flex-nowrap gap-3 p-4">
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="flex-shrink-0 flex flex-col items-start justify-between w-36 h-48"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[70%] rounded-xl object-cover"
              />
              <div className='h-1/4'>
                <h3 className="font-light text-xs">{product.name}</h3>
                <p className="text-base">${product.price.toFixed(2)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default ProductList;