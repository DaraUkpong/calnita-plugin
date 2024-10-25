import { Product } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";

export function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div
      key={product.id}
      className="flex flex-col items-start justify-between w-[109px] h-[149px]"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-[109px] h-[92px] overflow-hidden relative ">
        {/*<Image
          src={product.image}
          alt={product.name}
          className="rounded-t-[10px] object-cover"
          //width={104}
          //height={92}
          fill
          sizes="109px"
        />*/}
        {/*eslint-disable-next-line @next/next/no-img-element*/}
        <img
          src={product.image}
          alt={product.name}
          className="rounded-t-[10px] object-cover w-full h-full"
        />
      </div>

      <div className="flex flex-col justify-between flex-1 ">
        <p className="text-[12px] leading-[16px] line-clamp-2">
          {product.name}
        </p>
        <p className="text-[16px] font-semibold">{product.price.toFixed(2)}</p>
      </div>
    </motion.div>
  );
}
