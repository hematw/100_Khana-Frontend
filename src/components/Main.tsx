import { ArrowDown } from "lucide-react";
// import HomeCard from "../components/Card";
// import { MultiSelect } from "./multi-select";
import { useForm } from "react-hook-form";
// import { Input } from "./ui/input";
import { Input } from "@heroui/input";
import { Divider } from "@heroui/divider";
import ShadowedCard from "./cards/ShadowedCard";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Select, SelectedItems, SelectItem } from "@heroui/select";
import { Chip } from "@heroui/chip";
import { Form } from "@heroui/form";
import { Slider } from "@heroui/slider";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";

// const images = [
//   "/photos/1.jpg",
//   "/photos/2.jpg",
//   "/photos/3.jpg",
//   "/photos/4.jpg",
//   "/photos/5.jpg",
// ];

// const info = {
//   title: "Luxury Apartment",
//   address: "23 st, 12 district, Kabul",
//   price: 5000,
//   status: "Sell",
//   rating: 4.3,
//   images,
// };

interface SearchFormI {
  type: string;
  location: string;
  price: {
    min: number;
    max: number;
  };
}

type TListingType = { label: string; value: string };

const listingTypes: TListingType[] = [
  { label: "Rental", value: "rental" },
  { label: "Sale", value: "sale" },
  { label: "Mortgage", value: "mortgage" },
];

export default function Main() {
  const form = useForm<SearchFormI>({
    defaultValues: {
      type: "",
      location: "",
      price: {
        min: 0,
        max: 0,
      },
    },
  });

  return (
    <>
      <section className="max-w-7xl xl:mx-auto mx-8 h-screen max-h-[686px] bg-[url(./landing-background.jpg)] bg-cover">
        <div className="relative h-full w-full flex items-center justify-center">
          <div className="h-full w-full bg-black/50 dark:block absolute top-0 left-0 hidden z-0"></div>
          <div className="space-y-4 z-10">
            <div className="relative   mx-6 max-w-5xl   sm:mx-10 text-stone-800 text-center ">
              <h1 className="text-2xl backdrop-blur-sm bg-gradient-to-b from-gray-50 to-transparent rounded-full border-2 border-gray-300/50 md:text-4xl md:px-10 py-6 font-semibold font-clash">
                Find Your Perfect Space with{" "}
                <span className=" text-red-500">100-Khana </span>
              </h1>
              <p className="w-full md:max-w-fit md:absolute -top-6 left-1/2 md:-translate-x-1/2 md:-rotate-3 border-3 border-gray-400/50 bg-gradient-to-b from-slate-500 to-gray-700 px-6 py-2 text-white rounded-full">
                Buy, Rent, or Mortgage—All in One Place!
              </p>
            </div>
            <Form {...form} className="mx-10">
              <div className="min-w-full items-center bg-white dark:bg-zinc-800 flex rounded-lg p-2 ">
                <div className="flex-1">
                  <Select
                    items={listingTypes}
                    label="Listing Type"
                    placeholder="Select listing type"
                    selectionMode="multiple"
                    size="lg"
                    radius="sm"
                    color="primary"
                    variant="faded"
                    renderValue={(items: SelectedItems<TListingType>) => {
                      return (
                        <div className="flex flex-wrap gap-2">
                          {items.map((item) => (
                            <Chip key={item.key}>{item.data?.value}</Chip>
                          ))}
                        </div>
                      );
                    }}
                  >
                    {(item) => (
                      <SelectItem key={item.value} textValue={item.value}>
                        <div className="flex gap-2 items-center">
                          <div className="flex flex-col">{item.value}</div>
                        </div>
                      </SelectItem>
                    )}
                  </Select>
                </div>
                <Divider
                  orientation="vertical"
                  className="z-30 h-12 mx-1 dark:bg-gray-600"
                />
                <div className="flex-1">
                  <Input
                    label="Location"
                    placeholder="Kabul..."
                    size="lg"
                    radius="sm"
                    color="primary"
                    variant="faded"
                  />
                </div>
                <Divider
                  orientation="vertical"
                  className="z-30 h-12 mx-1 dark:bg-gray-600"
                />
                <div className="flex-1">
                  <Dropdown>
                    <DropdownTrigger className="w-full  bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-md shadow-sm flex items-center ">
                      <Input
                        label="Price Range"
                        placeholder="5K - 10K..."
                        size="lg"
                        radius="sm"
                        color="primary"
                        variant="faded"
                      />
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem key={"abc"} className="grid gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">
                            Price ranges
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Choose max and min price for your House.
                          </p>
                        </div>
                        <Slider
                          defaultValue={[40000, 700000]}
                          minValue={0}
                          maxValue={1000000}
                          step={100}
                          label="Price Range"
                          size="lg"
                          formatOptions={{ style: "currency", currency: "AFN" }}
                          onChange={(value: number | number[]) => {
                            form.setValue("price", {
                              min: Array.isArray(value) ? value[0] : 0,
                              max: Array.isArray(value) ? value[1] : 0,
                            });
                          }}
                        />
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
                <Divider
                  orientation="vertical"
                  className="z-30 h-12 mx-1 dark:bg-gray-600"
                />
                <div className="content-center">
                  <Button
                    className="py-6"
                    radius="sm"
                    variant="solid"
                    color="primary"
                  >
                    Search
                  </Button>
                </div>
              </div>
            </Form>
          </div>

          <a
            href=""
            className="flex items-center text-white shadow-md absolute bottom-6 hover:scale-95 transition-all duration-150 left-1/2 -translate-x-1/2"
          >
            Explore More <ArrowDown />
          </a>
        </div>
        {/* {  <div className="w-full h-screen flex items-center justify-center bg-black/80 fixed top-0 left-0 z-50">} */}

        {/* {  </div>} */}
      </section>
      <section className="max-w-7xl mx-auto my-12 p-6">
        <h2 className="text-3xl text-center font-semibold py-6">
          How 100-Khana Helps You?
        </h2>
        <div className="flex justify-between items-stretch gap-6 flex-nowrap overflow-auto py-10">
          <ShadowedCard className="max-w-96 min-w-80">
            <CardBody className=" flex flex-col justify-center items-center text-center">
              <CardHeader className="flex justify-center">
                <img src="/For sale-bro.svg" height={200} width={200} alt="" />
              </CardHeader>
              <CardHeader className="text-lg font-semibold flex justify-center">
                <h3>Are You a Property Owner?</h3>
              </CardHeader>
              <CardFooter className="mt-2">
                <p>
                  If you have a property for sale or rent, 100-Khana is the best
                  place to showcase it. List your property for free and find the
                  right buyer or tenant in no time.
                </p>
              </CardFooter>
              <Button className="min-w-full mt-8 " color="primary">
                Post a Listing
              </Button>
            </CardBody>
          </ShadowedCard>
          <ShadowedCard className="max-w-96 min-w-80">
            <CardBody className=" flex flex-col justify-center items-center text-center">
              <CardHeader className="flex justify-center">
                <img
                  src="/House searching-amico.svg"
                  height={200}
                  width={200}
                  alt=""
                />
              </CardHeader>
              <CardHeader className="text-lg font-semibold flex justify-center">
                <h3>Find Your Ideal Home</h3>
              </CardHeader>
              <CardFooter className="mt-2">
                <p>
                  Looking to buy or rent a home? 100-Khana offers a wide range
                  of properties tailored to your needs. Use smart filters to
                  find your perfect home quickly and easily.
                </p>
              </CardFooter>
              <Button className="min-w-full mt-8 " color="primary">
                Browse Properties
              </Button>
            </CardBody>
          </ShadowedCard>
          <ShadowedCard className="max-w-96 min-w-80">
            <CardBody className=" flex flex-col justify-center items-center text-center">
              <CardHeader className="flex justify-center">
                <img
                  src="/Apartment rent-bro.svg"
                  height={200}
                  width={200}
                  alt=""
                />
              </CardHeader>
              <CardHeader className="text-lg font-semibold flex justify-center">
                <h3>Rent Out Your Property Faster</h3>
              </CardHeader>
              <CardFooter className="mt-2">
                <p>
                  With 100-Khana, renting out your property has never been
                  easier! Your listing will reach thousands of potential
                  tenants, increasing your chances of getting multiple
                  inquiries.
                </p>
              </CardFooter>
              <Button className="min-w-full mt-8 " color="primary">
                Rent Out Property
              </Button>
            </CardBody>
          </ShadowedCard>
        </div>
      </section>
      <section className="max-w-7xl mx-auto my-12 p-6">
        <h2 className="text-3xl text-center font-semibold mb-12">
          What type of property are you looking for on 100-Khana?
        </h2>
        <div className="flex justify-evenly gap-4 p-4 overflow-auto">
          <Card className="min-w-48 md:min-w-64 flex justify-center items-center flex-col overflow-hidden text-center">
            <img src="/villa.jpg" alt="" className="w-64" />
            <CardBody className="py-4 space-y-2 gap-2 flex-col items-start">
              <h4 className="text-2xl">2,394</h4>
              <p>Villas</p>
            </CardBody>
          </Card>
          <Card className="min-w-48 md:min-w-64 flex justify-center items-center flex-col overflow-hidden text-center">
            <img src="/residential.jpg" alt="" className="w-64" />
            <CardBody className="py-4 space-y-2 gap-2 flex-col items-start">
              <h4 className="text-2xl">13,902</h4>
              <p>Residential Houses</p>
            </CardBody>
          </Card>
          <Card className="min-w-48 md:min-w-64 flex justify-center items-center flex-col overflow-hidden text-center">
            <img src="/apartment.jpg" alt="" className="w-64" />
            <CardBody className="py-4 space-y-2 gap-2 flex-col items-start">
              <h4 className="text-2xl">8,521</h4>
              <p>Apartments</p>
            </CardBody>
          </Card>
          <Card className="min-w-48 md:min-w-64 flex justify-center items-center flex-col overflow-hidden text-center">
            <img src="/business-center.jpg" alt="" className="w-64" />
            <CardBody className="py-4 space-y-2 gap-2 flex-col items-start">
              <h4 className="text-2xl">6,200</h4>
              <p>Commercial & Office</p>
            </CardBody>
          </Card>
        </div>
      </section>
      <section className="max-w-7xl mx-auto my-12 p-6">
        <h2 className="text-3xl text-center font-semibold mb-12">
          Everyone gives you advice, but 100-Khana stays with you!
        </h2>
        <div className="flex justify-evenly gap-4 overflow-auto p-4">
          <Card className="min-w-48 md:min-w-64 flex justify-center items-center flex-col overflow-hidden text-center">
            <CardBody className="py-4 space-y-2 h-full flex flex-col justify-between">
              <img src="/Connected world-bro.svg" alt="" className="w-60" />
              <CardFooter className="text-center">
                Connect with trusted agents & property owners
              </CardFooter>
            </CardBody>
          </Card>
          <Card className="min-w-48 md:min-w-64 flex justify-center items-center flex-col overflow-hidden text-center">
            <CardBody className="py-4 space-y-2 h-full flex flex-col justify-between">
              <img src="/Houses-pana.svg" alt="" className="w-60" />
              <CardFooter className="text-center">
                Compare & explore hundreds of listings effortlessly
              </CardFooter>
            </CardBody>
          </Card>
          <Card className="min-w-48 md:min-w-64 flex justify-center items-center flex-col overflow-hidden text-center">
            <CardBody className="py-4 space-y-2 h-full flex flex-col justify-between">
              <img src="/Directions-bro.svg" alt="" className="w-60" />
              <CardFooter className="text-center">
                Buy or rent properties in top locations across the country
              </CardFooter>
            </CardBody>
          </Card>
        </div>
      </section>
      {/* <section className="max-w-[1480px] mx-auto my-28 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 place-items-center">
          {Array.from("12345678").map((_, index) => (
            <HomeCard {...info} className="min-w-[270px]" key={index} />
          ))}
        </div>
      </section> */}
    </>
  );
}
