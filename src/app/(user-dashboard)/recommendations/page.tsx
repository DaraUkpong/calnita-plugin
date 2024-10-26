"use client";

import { useAttention } from "@/components/BottomNav/AttentionContext";
import DropdownMenu from "@/components/DropdownMenu";
import FilterCarousel from "@/components/FilterCarousel";
import { ProductList } from "@/components/ProductList";
import ProfileReminderModal from "@/components/ProfileReminderModal";
import { generateMockRecommendations, getUniqueFilters } from "@/mock/mockdata";
import { Product } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { isProfileComplete } from "./utils";
import { useSession } from "next-auth/react";

const RecommendationsPage: React.FC = () => {
  const { data: session } = useSession();
  const questionnaireResponses = session?.user?.questionnaireResponses;
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showMenu, setShowMenu] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const mockData = generateMockRecommendations();
    setRecommendations(mockData);
  }, []);

  const uniqueFilters = getUniqueFilters(recommendations);

  const handleToggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const { setAttention } = useAttention();

  useEffect(() => {
    if (questionnaireResponses) {
      // Check if the profile is complete
      const profileComplete = isProfileComplete(questionnaireResponses);

      setIsModalOpen(!profileComplete); // Show modal if profile is incomplete
      setAttention("profile", !profileComplete); // Set attention flag
    } else {
      // If there's no questionnaire data, assume the profile is incomplete
      setIsModalOpen(true);
      setAttention("profile", true);
    }
  }, []);

  return (
    //total distance between the h1 texts and top of the frame is 78px(padding top of 19 + margin top of 59 on the h1 text div)
    //reason: when scrolling, it wont hit the top edge of the frame
    <>
      <div className="w-full h-full max-h-full flex flex-col px-[19px] pt-[19px] ">
        {/**mb 33 px is to separate the div with the header and icon from the stacks of based-on-mariam's-look-like divs */}
        <div className="flex flex-row mt-[59px] mb-[33px] ">
          {/**the totality of the spacing between the text and the frame is 40, i.e the main container padding of 19 + 21 padding on the h1 text */}
          <h1 className="md:text-3xl text-[30px] w-fit font-semibold text-[#222222] pl-[21px] ">
            🎉 Your Personalized Recommendations
          </h1>

          <div
            className="rounded-full relative cursor-pointer "
            onClick={() => setShowMenu((prev) => !prev)}
          >
            <Image
              src="https://res.cloudinary.com/df8kki6aw/image/upload/v1716378923/calnita/products/664dcfcf00a84d9a09e0810a/coverPhoto.jpg"
              alt="Product Cover Photo"
              width={50}
              height={50}
              className="md:h-16 w-auto h-auto rounded-full md:w-16 object-cover bg-gray-200"
            />
            <DropdownMenu
              showMenu={showMenu}
              onToggleMenu={() => setShowMenu((prev) => !prev)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto flex flex-col gap-8 pb-4 scrollbar-hidden ">
          {/**TODO: this is the based-on-mariam's-look-like style it and extract it as a component */}
          <div className="w-full bg-[#DBB9B91A] rounded-[20px] pb-[41px] ">
            <h2 className="md:text-xl text-[20px] font-semibold md:py-4 md:px-4 px-[21px] pt-[21px] ">
              Based on Your Preferrences
            </h2>
            <FilterCarousel
              filters={[
                ...uniqueFilters.categories,
                ...uniqueFilters.brands,
                ...uniqueFilters.ingredients,
              ]}
              selectedFilters={selectedFilters}
              onToggleFilter={handleToggleFilter}
            />
            <ProductList products={recommendations} />
          </div>

          {/* Example of a second preference-based div */}
          <div className="w-full bg-[#DBB9B91A] rounded-[20px] pb-[41px]">
            <h2 className="md:text-xl text-[20px] font-semibold md:py-4 md:px-4 px-[21px] pt-[21px]">
              Based on Your Concerns
            </h2>
            <ProductList products={recommendations.slice(0, 5)} />
          </div>

          {/* You can add more preference-based divs here */}
        </div>
      </div>
      <ProfileReminderModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default RecommendationsPage;
