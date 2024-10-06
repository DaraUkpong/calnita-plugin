import React from "react";

interface FilterCarouselProps {
  filters: string[];
  selectedFilters: string[];
  onToggleFilter: (filter: string) => void;
}

const FilterCarousel: React.FC<FilterCarouselProps> = ({
  filters,
  selectedFilters,
  onToggleFilter,
}) => {
  return (
    <div className="flex overflow-x-auto space-x-4 md:px-4 px-2">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onToggleFilter(filter)}
          className={`md:px-4 md:py-2 px-2 py-0.5 tracking-wide font-extralight md:text-sm text-xs whitespace-nowrap rounded-3xl  ${
            selectedFilters.includes(filter)
              ? "bg-[#F92A63] text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterCarousel;
