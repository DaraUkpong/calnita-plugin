import React from "react";
import { useRouter } from "next/navigation";

interface ProfileReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileReminderModal: React.FC<ProfileReminderModalProps> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter();

  const handleGoToProfile = () => {
    onClose(); // Close the modal
    router.push("/profile"); // Navigate to profile page
  };

  if (!isOpen) return null; // If modal is not open, return null
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-[20px] p-6 max-w-md w-full shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          Let&apos;s Complete Your Beauty Profile 💄
        </h2>
        <p className="text-gray-600 mb-6">
          Finish setting up your beauty profile to unlock personalized
          recommendations just for you. It&apos;s quick and easy!
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded-[20px] hover:bg-gray-500"
          >
            Not Now
          </button>
          <button
            onClick={handleGoToProfile}
            className="px-4 py-2 bg-[#222222] text-white rounded-[20px] hover:bg-[#333333]"
          >
            Set Up Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileReminderModal;
