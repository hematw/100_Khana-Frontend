import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion"; // Import motion from framer-motion
import Input from "./Input";
import InputGroup from "./InputGroup";
import { TbAirConditioning } from "react-icons/tb";
import { PiElevatorLight } from "react-icons/pi";
import { FaCarSide } from "react-icons/fa";
import { IoTvOutline } from "react-icons/io5";
import { FaSwimmingPool, FaWifi } from "react-icons/fa";
import { FaBottleWater } from "react-icons/fa6";
import GuardIcon from "./GuardIcon";

const AddHome = () => {
  const [step, setStep] = useState(1);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
    reset();
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Add Your Home</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <motion.div
            key={step} // Use step as the key to trigger re-mounting
            initial={{ opacity: 0, x: -100 }} // Initial state for animation
            animate={{ opacity: 1, x: 0 }} // Target state for animation
            exit={{ opacity: 0, x: 100 }} // Exit state for animation
            transition={{ duration: 0.3 }} // Animation duration
          >
            {step === 1 && (
              <>
                {/* Title */}
                <InputGroup
                  label="Title"
                  text="Title for your place, should be short and catchy as advertisement."
                >
                  <Input
                    name="title"
                    label="Title"
                    register={register}
                    validation={{ required: true }}
                    placeholder="Enter a catchy title"
                  />
                </InputGroup>

                {/* Address */}
                <InputGroup
                  label="Address"
                  text="Address of your place, should be clear and easy to understand."
                >
                  <Input
                    name="address"
                    label="Address"
                    register={register}
                    validation={{ required: true }}
                    placeholder="Enter the full address"
                  />
                </InputGroup>
              </>
            )}

            {step === 2 && (
              <>
                {/* Description */}
                <InputGroup label="Description" text="Description about your place.">
                  <div className="my-2">
                    <textarea
                      {...register("desc", { required: true })}
                      placeholder="Ex: Beautiful house with a big pool..."
                      className="w-full h-32 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-400 transition-all duration-200 resize-none"
                    />
                    {errors.desc && (
                      <p className="text-red-500 text-sm mt-1">Description is required.</p>
                    )}
                  </div>
                </InputGroup>
              </>
            )}

            {step === 3 && (
              <>
                {/* Facilities */}
                <InputGroup
                  label="Facilities"
                  text="Choose your place's facilities and amenities. Click to select."
                >
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4">
                    {[
                      { id: "tv", icon: <IoTvOutline />, label: "TV" },
                      { id: "ac", icon: <TbAirConditioning />, label: "AC" },
                      { id: "wifi", icon: <FaWifi />, label: "WiFi" },
                      { id: "water", icon: <FaBottleWater />, label: "Drinking Water" },
                      { id: "parking", icon: <FaCarSide />, label: "Parking" },
                      { id: "pool", icon: <FaSwimmingPool />, label: "Pool" },
                      { id: "elevator", icon: <PiElevatorLight />, label: "Elevator" },
                      { id: "guard", icon: <GuardIcon />, label: "Guard" },
                    ].map((facility) => (
                      <div
                        key={facility.id}
                        className="border-2 border-gray-300 rounded-lg p-3 flex items-center justify-center gap-2 cursor-pointer hover:border-red-400 transition-all duration-200"
                      >
                        <input
                          type="checkbox"
                          id={facility.id}
                          {...register(facility.id)}
                          className="hidden"
                        />
                        <label htmlFor={facility.id} className="flex items-center gap-2 cursor-pointer">
                          <span className="text-xl">{facility.icon}</span>
                          <span>{facility.label}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </InputGroup>
              </>
            )}
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition-all duration-200"
              >
                Back
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all duration-200"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all duration-200"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHome;