import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Facilities from "./components/facilities";
import { z } from "zod";
import { Form } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import Rooms from "./components/rooms";
import FileUploadForm from "./components/file-upload";
import AreaAndPrice from "./components/type-and-price";
import { Card, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Address from "./components/address";

export interface IPropertyForm {
  owner: string;
  numOfLivingRooms: number;
  numOfBedRooms: number;
  numOfKitchens: number;
  numOfBaths: number;
  images: (string | File)[];
  price: number;
  area: string;
  category: string[];
  facilities: string[];
  listingType: string;
  city: string;
  district: string;
  road: string;
  street: string;
  longitude: string;
  latitude: string;
  floor: string;
  totalFloors: string;
}

const FormSchema = z.object({
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
  facilities: z.array(z.string()),
  // address
  city: z.string(),
  district: z.string(),
  road: z.string(),
  street: z.string(),

  longitude: z.string(),
  latitude: z.string(),
  floor: z.string(),
  totalFloors: z.string(),
});

function AddHome() {
  const [step, setStep] = useState(1);

  const TOTAL_STEPS = 5;
  const form = useForm<IPropertyForm>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      owner: "",
      numOfLivingRooms: 0,
      numOfBedRooms: 0,
      numOfKitchens: 0,
      numOfBaths: 0,
      images: [],
      price: 0,
      area: "",
      category: [],
      listingType: "",
      city: "",
      district: "",
      road: "",
      street: "",
      longitude: "",
      latitude: "",
      floor: "",
      totalFloors: "",
    },
  });

  const onSubmit: SubmitHandler<IPropertyForm> = (data: IPropertyForm) => {
    console.log(data);
    // reset();
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="p-6 w-full min-h-screen">
      <Card className="grid grid-cols-12 max-w-5xl mx-auto rounded-lg shadow-lg overflow-hidden max-h-screen">
        <div className="col-span-8 p-8 content-center">
          <CardTitle className="text-3xl font-bold mb-6">
            Add Your Home
          </CardTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div
                className="grid grid-cols-2 gap-x-4 gap-y-8 justify-between"
                key={step} // Use step as the key to trigger re-mounting
              >
                {step === 1 && <Address form={form} />}

                {step === 2 && <AreaAndPrice form={form} />}

                {step === 3 && <Rooms form={form} />}

                {step === 4 && <Facilities form={form} />}

                {step === 5 && <FileUploadForm form={form} />}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {/* {step > 1 && ( */}
                <Button type="button" onClick={prevStep} variant={"outline"}>
                  Back
                </Button>
                {/* )} */}
                {step < TOTAL_STEPS ? (
                  <Button
                    type="button"
                    onClick={() => {
                      nextStep();
                      form.trigger();
                    }}
                  >
                    Next
                  </Button>
                ) : (
                  <Button type="submit">Submit</Button>
                )}
              </div>
            </form>
          </Form>
        </div>
        <div className="col-span-4 max-h-screen">
          <img
            src="/Photo.png"
            alt=""
            className="w-full h-full object-center  "
          />
        </div>
      </Card>
    </div>
  );
}

export default AddHome;
