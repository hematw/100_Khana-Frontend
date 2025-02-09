import React from "react";
import { Camera } from "lucide-react";

interface ProfileImageProps {
  image: string;
  username: string;
  isOnEdit: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>; // Optional ref passed as a prop
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
      <div className="w-44 h-44 relative">
        <img
          src={image}
          alt={`${username}'s profile`}
          className="rounded-full overflow-hidden w-full h-full object-cover drop-shadow-2xl border-2 border-red-400"
        />
        {isOnEdit && (
          <div
            className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Camera className="text-white text-2xl" />
            <input
              type="file"
              accept=".png, .jpg, .jpeg, .gif"
              className="hidden"
              ref={fileInputRef} // Attach the ref to the input element here
              onChange={onChange} // Handle file input change
            />
          </div>
        )}
        {/* {isOnEdit && (
          <div>
            <label className="inline-flex justify-center items-center bg-black/50 text-white absolute bottom-0 right-0 w-10 h-10 rounded-full cursor-pointer">
              <span>
                <FaUpload />
              </span>
            </label>
            <label className="inline-flex justify-center items-center bg-black/50 text-white absolute bottom-0 left-0 w-10 h-10 rounded-full cursor-pointer">
              <span>
                <Camera />
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
        )} */}
      </div>
    </div>
  );
}
