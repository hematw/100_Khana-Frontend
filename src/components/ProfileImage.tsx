import React from "react";
import { FaCamera, FaUpload } from "react-icons/fa";

interface ProfileImageProps {
  image: string;
  username: string;
  isOnEdit: boolean;
  fileInputRef?: React.RefObject<HTMLInputElement>; // Optional ref passed as a prop
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProfileImage({
  image = "/profile-picture.png",
  username,
  isOnEdit,
  fileInputRef, // Accept the ref as a prop
  onChange,
}: ProfileImageProps) {
  return (
    <div>
      <div className="w-60 h-60 relative">
        <img
          src={image}
          alt={`${username}'s profile`}
          className="w-full h-full object-cover drop-shadow-2xl border-2 border-red-400 rounded-xl"
        />
        {isOnEdit && (
          <div>
            <label className="inline-flex justify-center items-center bg-black/50 text-white absolute bottom-0 right-0 w-10 h-10 rounded-ss-2xl rounded-ee-lg cursor-pointer">
              <span>
                <FaUpload />
              </span>
              <input
                type="file"
                accept=".png, .jpg, .jpeg, .gif"
                className="hidden"
                ref={fileInputRef} // Attach the ref to the input element here
                onChange={onChange} // Handle file input change
              />
            </label>
            <label className="inline-flex justify-center items-center bg-black/50 text-white absolute bottom-0 left-0 w-10 h-10 rounded-se-2xl rounded-es-lg cursor-pointer">
              <span>
                <FaCamera />
              </span>
              <input
                type="file"
                accept=".png, .jpg, .jpeg, .gif"
                capture="user"
                className="hidden"
                ref={fileInputRef} // Attach the ref here too, if necessary
                onChange={onChange}
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
