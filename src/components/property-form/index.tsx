import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Facilities from "./components/facilities";
import { z } from "zod";
import { Form } from "@heroui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import Rooms from "./components/rooms";
import FileUploadForm from "./components/file-upload";
import AreaAndPrice from "./components/type-and-price";
import { Card, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import Address from "./components/address";
import OtherDescription from "./components/other-details";
import axiosIns from "@/axios";
import Confetti from "react-confetti";
import {
  Building,
  Gem,
  Images,
  MapPinHouse,
  ScrollText,
  WavesLadder,
} from "lucide-react";

export interface IPropertyForm {
  numOfLivingRooms: string;
  numOfBedRooms: string;
  numOfKitchens: string;
  numOfBaths: string;
  images: (string | File)[];
  price: string;
  area: string;
  category: string[];
  facilities: string[];
  listingType: string[];
  city: string;
  district: string;
  road: string;
  street: string;
  lng: string;
  lat: string;
  floor: string;
  totalFloors: string;
  description: string[];
}

const FormSchema = z.object({
  category: z.array(z.string()),
  // rooms
  numOfLivingRooms: z.string(),
  numOfBedRooms: z.string(),
  numOfKitchens: z.string(),
  numOfBaths: z.string(),
  // images
  images: z.array(z.instanceof(File)),
  // area and price
  area: z.string(),
  price: z.string(),
  listingType: z.array(z.string()),
  facilities: z.array(z.string()),
  // address
  city: z.string(),
  district: z.string(),
  road: z.string(),
  street: z.string(),

  lng: z.string(),
  lat: z.string(),
  floor: z.string(),
  totalFloors: z.string(),
  description: z.array(z.string()),
});

const icons = [
  <MapPinHouse size={16} />,
  <Gem size={16} />,
  <Building size={16} />,
  <WavesLadder size={16} />,
  <ScrollText size={16} />,
  <Images size={16} />,
];

function AddHome() {
  const [step, setStep] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);

  const TOTAL_STEPS = 6;
  const form = useForm<IPropertyForm>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      numOfLivingRooms: "",
      numOfBedRooms: "",
      numOfKitchens: "",
      numOfBaths: "",
      images: [],
      price: "",
      area: "",
      category: [],
      facilities: [],
      listingType: [],
      city: "",
      district: "",
      road: "",
      street: "",
      lng: "",
      lat: "",
      floor: "",
      totalFloors: "",
      description: [],
    },
  });

  console.log("Errors", form.formState.errors);
  console.log("data", form.watch());

  // const onSubmit: SubmitHandler<IPropertyForm> = async (data: IPropertyForm) => {
  //   console.log(data);
  //   try {
  //     const formData = new FormData();
  //     const entries = Object.entries(data)
  //     entries.forEach(entry=> {
  //       formData.append(entry[0], entry[1])
  //     })
  //     await axiosIns.post("/properties", formData, {headers: {"Content-Type": "multipart/form-data"}});
  //     // form.reset();
  //   } catch (error) {
  //     console.error(error)
  //   }
  // };

  const onSubmit: SubmitHandler<IPropertyForm> = async (
    data: IPropertyForm
  ) => {
    console.log(data);
    try {
      const formData = new FormData();

      // Append non-file fields
      Object.entries(data).forEach(([key, value]) => {
        if (key === "images") {
          // Append each file individually
          data.images.forEach((file) => {
            formData.append(`images`, file);
          });
        } else if (Array.isArray(value)) {
          // Append each item in the array individually
          value.forEach((item) => {
            formData.append(key, item);
          });
        } else {
          // Append non-array fields
          formData.append(key, value);
        }
      });

      // Send the form data to the server
      await axiosIns.post("/properties", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Let the browser set this automatically
        },
      });
      setShowConfetti(true);
      // Reset the form after successful submission
      // form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="p-6 w-full">
      <Card className="grid grid-cols-12 max-w-5xl mx-auto rounded-lg shadow-lg overflow-hidden min-h-[80vh]">
        <div className="md:col-span-8 col-span-12 p-8 content-center max-h-screen">
          {showConfetti ? (
            <Confetti />
          ) : (
            <>
              <CardHeader className="text-3xl font-bold ">
                Add Your Home
              </CardHeader>
              <div className="px-6">
                <div className="w-full relative py-12 items-center flex justify-between">
                  <div className="w-full h-2  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-200">
                    <div>
                      <div
                        className="h-2 bg-danger-500 transition-all duration-500"
                        style={{
                          width: `${(100 / (TOTAL_STEPS - 1)) * (step - 1)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
                    <Button
                      isIconOnly
                      size="sm"
                      key={index}
                      onPress={()=> setStep(index + 1)}
                      className={`z-10 step w-6 h-6 rounded-full flex items-center justify-center ${
                        step >= index + 1
                          ? "bg-danger-500 text-white"
                          : "bg-gray-200 text-danger-500"
                      }`}
                    >
                      {icons[index]}
                    </Button>
                  ))}
                </div>
              </div>
              <Form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full items-stretch"
              >
                {/* <form onSubmit={form.handleSubmit(onSubmit)}> */}
                <div
                  className="grid grid-cols-2 gap-x-4 gap-y-8 justify-between"
                  key={step} // Use step as the key to trigger re-mounting
                >
                  {step === 1 && <Address form={form} />}

                  {step === 2 && <AreaAndPrice form={form} />}

                  {step === 3 && <Rooms form={form} />}

                  {step === 4 && <Facilities form={form} />}

                  {step === 5 && <OtherDescription form={form} />}

                  {step === 6 && <FileUploadForm form={form} />}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  {/* {step > 1 && ( */}
                  <Button
                    size="lg"
                    type="button"
                    onPress={prevStep}
                    variant={"bordered"}
                  >
                    Back
                  </Button>
                  {/* )} */}
                  {step < TOTAL_STEPS ? (
                    <Button
                      size="lg"
                      type="button"
                      onPress={() => {
                        nextStep();
                        // form.trigger();
                      }}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button size="lg" type="submit" color="danger">
                      Submit
                    </Button>
                  )}
                </div>
                {/* </form> */}
              </Form>
            </>
          )}
        </div>
        <div className="col-span-4 md:flex items-center justify-center hidden">
          <img
            src="/Photo.png"
            alt=""
            className="w-full h-full object-center"
          />
        </div>
      </Card>
    </div>
  );
}

export default AddHome;
