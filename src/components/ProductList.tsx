import React, { useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { Product } from "../types";
import { ProductCard } from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 150; // Amount to scroll in pixels
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full relative px-[20px] ">
      <button
        className="absolute left-0 top-[98px] z-10 rounded-full hover:bg-gray-200 transition"
        onClick={() => scroll("left")}
      >
        <ChevronLeft size={20} />
      </button>

      <AnimatePresence>
        <div
          ref={scrollRef}
          className="flex flex-nowrap gap-[25px] overflow-x-auto scrollbar-hidden "
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </AnimatePresence>

      <button
        className="absolute right-0 top-[98px] z-10 rounded-full hover:bg-gray-200 transition"
        onClick={() => scroll("right")}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
