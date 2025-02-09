import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
// import Input from "../Input";
// import InputGroup from "../InputGroup";
// import { TbAirConditioning } from "react-icons/tb";
// import { PiElevatorLight } from "react-icons/pi";
// import { FaCarSide } from "react-icons/fa";
// import { IoTvOutline } from "react-icons/io5";
// import { FaSwimmingPool, FaWifi } from "react-icons/fa";
// import { FaBottleWater } from "react-icons/fa6";
// import GuardIcon from "../GuardIcon";
import BasicInfo from "./components/basic-info";
import { z } from "zod";
import { Form } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import Rooms from "./components/rooms";
import FileUploadForm from "./components/file-upload";
import AreaAndPrice from "./components/area-and-price";

export interface IPropertyForm {
  title: string,
  description: string,
  owner: string,
  numOfLivingRooms: number,
  numOfBedRooms: number,
  numOfKitchens: number,
  numOfBaths: number,
  images: (string | File)[],
  price: number,
  area: string,
  category: string[],
  facilities: string[],
  listingType: string,
  city: string,
  district: string,
  street: string,
  longitude: string,
  latitude: string
}

const FormSchema = z.object({
  title: z.string().nullable(),
  description: z.string(),
  category: z.array(z.string()),
  owner: z.string(),
  // rooms
  numOfLivingRooms: z.number(),
  numOfBedRooms: z.number(),
  numOfKitchens: z.number(),
  numOfBaths: z.number(),
  // images
  images: z.string(),
  // area and price
  area: z.string(),
  price: z.number(),
  listingType: z.array(z.string()),
  facilities: z.array(z.string()   ),
  // address
  city: z.string(),
  district: z.string(),
  street: z.string(),
  longitude: z.string(),
  latitude: z.string()
})


function AddHome() {
  const [step, setStep] = useState(1);

  const TOTAL_STEPS = 5;
  const form = useForm<IPropertyForm>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      description: '',
      owner: '',
      numOfLivingRooms: 0,
      numOfBedRooms: 0,
      numOfKitchens: 0,
      numOfBaths: 0,
      images: [],
      price: 0,
      area: '',
      category: [],
      listingType: '',
      city: '',
      district: '',
      street: '',
      longitude: '',
      latitude: '',
    }
  });

  const onSubmit: SubmitHandler<IPropertyForm> = (data: IPropertyForm) => {
    console.log(data);
    // reset();
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="p-6 w-full bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Add Your Home</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div
              className="space-y-6"
              key={step} // Use step as the key to trigger re-mounting
            >
              {step === 1 && (
                <BasicInfo form={form} />
              )}

              {step === 2 && (
                <Rooms form={form} />
              )}

              {step === 3 && (
                <FileUploadForm form={form} />
              )}

              {step === 4 && (
                <AreaAndPrice form={form} />
              )}


            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {/* {step > 1 && ( */}
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition-all duration-200"
                >
                  Back
                </button>
              {/* )} */}
              {step < TOTAL_STEPS ? (
                <button
                  type="button"
                  onClick={() => { nextStep(); form.trigger(); }}
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
        </Form>
      </div >
    </div >
  );
};

export default AddHome;