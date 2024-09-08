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
    <div className="flex overflow-x-auto space-x-4 px-4">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onToggleFilter(filter)}
          className={`px-4 py-2 tracking-wide font-extralight whitespace-nowrap rounded-3xl  ${
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
