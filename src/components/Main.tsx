import { ArrowDown, ArrowRight } from "lucide-react";
import Card from "../components/Card";
import { Button } from "./ui/button";
import { FormField, FormItem, FormLabel } from "./ui/form";
import { MultiSelect } from "./multi-select";
import { useForm, } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import ShadowedCard from "./cards/ShadowedCard";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

const images = [
  "/photos/1.jpg",
  "/photos/2.jpg",
  "/photos/3.jpg",
  "/photos/4.jpg",
  "/photos/5.jpg",
];

const info = {
  title: "Luxury Apartment",
  address: "23 st, 12 district, Kabul",
  price: 5000,
  status: "Sell",
  rating: 4.3,
  images,
};

interface SearchFormI {
  type: string;
  location: string;
  minPrice: number;
  maxPrice: number
}

export default function Main() {
  const form = useForm<SearchFormI>({
    defaultValues: {
      type: "",
      location: "",
      minPrice: 0,
      maxPrice: 0,
    }
  })


  return (
    <>
      <section className="h-screen bg-[url(./landing-background.jpg)] bg-cover">
        <div className="relative h-full w-full flex items-center justify-center">
          <div className="h-full w-full bg-black/50 dark:block absolute top-0 left-0 hidden z-0"></div>
          <div className="space-y-4 z-10">
            <div className="relative backdrop-blur-sm  max-w-5xl  bg-gradient-to-b from-gray-50 to-transparent sm:mx-10 text-stone-800 text-center rounded-full border-2 border-gray-300/50">
              <h1 className="text-4xl px-10 py-6 font-semibold font-clash">
                Find Your Perfect Space with <span className=" text-red-500">100-Khana </span>
              </h1>
              <p className="absolute -top-6 left-1/2 -translate-x-1/2 -rotate-3 border-3 border-gray-400/50 bg-gradient-to-b from-slate-500 to-gray-700 px-6 py-2 text-white rounded-full">Buy, Rent, or Mortgage—All in One Place!</p>
            </div>
            <div className="bg-white dark:bg-zinc-800 rounded-x flex rounded-lg p-2 mx-10">
              <div className="">
                <Label className="ml-2 text-xs">Property</Label>
                <MultiSelect
                  value={123}
                  options={["Rental", "Sale", "Mortgage"].map(item => ({ label: item, value: item }))}
                  onValueChange={() => { }}
                  placeholder="Listing Type"
                  className="flex-1 border-none shadow-none -ml-2"
                />
              </div>
              <Separator orientation="vertical" className="z-30 h-16 mx-1 dark:bg-gray-600" />
              <div className="flex-1">
                <Label htmlFor="location" className="ml-3 text-xs">Location</Label>
                <Input id="location" placeholder="e.g. Kabul..." className="text-sm border-none shadow-none" />
              </div>
              <Separator orientation="vertical" className="z-30 h-16 mx-1 dark:bg-gray-600" />
              <div className="flex-1">
                <Popover>
                  <PopoverTrigger className="w-full">
                    <div className="flex flex-col items-start px-3">
                      <Label htmlFor="price" className="text-xs">Price Range</Label>
                      <p className="text-gray-500 mt-2 text-sm ">e.g. 5K - 10K...</p>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Price rages</h4>
                        <p className="text-sm text-muted-foreground">
                          Choose max and min price for your House.
                        </p>
                      </div>
                      <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="width">Min Price</Label>
                          <Input
                            placeholder="e.g. 5K - 10K..."
                            id="price"
                            defaultValue={form.getValues("minPrice")}
                            className="col-span-2 h-8"
                          />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="maxWidth">Max Price</Label>
                          <Input
                            id="maxWidth"
                            defaultValue={form.getValues("maxPrice")}
                            className="col-span-2 h-8"
                          />
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <Separator orientation="vertical" className="z-30 h-16 mx-1 dark:bg-gray-600" />
              <div className="content-center">
                <Button className="py-6">Search</Button>
              </div>
            </div>
          </div>


          <a href="" className="flex items-center text-white shadow-md absolute bottom-6 hover:scale-95 transition-all duration-150 left-1/2 -translate-x-1/2">Explore More <ArrowDown /></a>
        </div>
        {/* {  <div className="w-full h-screen flex items-center justify-center bg-black/80 fixed top-0 left-0 z-50">} */}

        {/* {  </div>} */}
      </section>
      <section className="max-w-7xl min-h-screen mx-auto my-8 p-6">
        <h2 className="text-3xl text-center font-semibold py-6">How 100-Khana Helps You?</h2>
        <div className="flex justify-between items-stretch gap-6 flex-nowrap overflow-auto py-10">
          <ShadowedCard className="max-w-96 min-w-80">
            <CardContent className=" flex flex-col justify-center items-center text-center">
              <CardHeader>
                <img src="/For sale-bro.svg" height={200} width={200} alt="" />
              </CardHeader>
              <CardTitle className="text-lg">
                <h3>Are You a Property Owner?</h3>
              </CardTitle>
              <CardDescription className="mt-2">
                <p>If you have a property for sale or rent, 100-Khana is the best place to showcase it. List your property for free and find the right buyer or tenant in no time.</p>
              </CardDescription>
              <Button className="min-w-full mt-8 ">Post a Listing</Button>
            </CardContent>
          </ShadowedCard>
          <ShadowedCard className="max-w-96 min-w-80">
            <CardContent className=" flex flex-col justify-center items-center text-center">
              <CardHeader>
                <img src="/House searching-amico.svg" height={200} width={200} alt="" />
              </CardHeader>
              <CardTitle className="text-lg">
                <h3>Find Your Ideal Home</h3>
              </CardTitle>
              <CardDescription className="mt-2">
                <p>Looking to buy or rent a home? 100-Khana offers a wide range of properties tailored to your needs. Use smart filters to find your perfect home quickly and easily.</p>
              </CardDescription>
              <Button className="min-w-full mt-8 ">Browse Properties</Button>
            </CardContent>
          </ShadowedCard>
          <ShadowedCard className="max-w-96 min-w-80">
            <CardContent className=" flex flex-col justify-center items-center text-center">
              <CardHeader>
                <img src="/Apartment rent-bro.svg" height={200} width={200} alt="" />
              </CardHeader>
              <CardTitle className="text-lg">
                <h3>Rent Out Your Property Faster</h3>
              </CardTitle>
              <CardDescription className="mt-2">
                <p>With 100-Khana, renting out your property has never been easier! Your listing will reach thousands of potential tenants, increasing your chances of getting multiple inquiries.</p>
              </CardDescription>
              <Button className="min-w-full mt-8 ">Rent Out Property</Button>
            </CardContent>
          </ShadowedCard>
        </div>
      </section>
      <section className="max-w-[1480px] min-h-screen mx-auto my-28 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 place-items-center">
          {Array.from("12345678").map((_, index) => (
            <Card {...info} className="min-w-[270px]" key={index} />
          ))}
        </div>
      </section>
    </>
  );
}
