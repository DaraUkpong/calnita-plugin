// app/components/ProductList.tsx

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../types';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="w-full overflow-x-auto h-full">
      
      
     
      <AnimatePresence>
        <div className="flex flex-nowrap gap-3 md:p-4 p-2 h-full">
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="flex-shrink-0 flex flex-col items-start justify-between w-16 md:w-36 h-full"
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
                <h3 className="font-light md:text-xs text-[10px]">{product.name}</h3>
                <p className="md:text-base text-sm">${product.price.toFixed(2)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default ProductList;