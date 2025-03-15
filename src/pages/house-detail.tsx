import axiosIns from "@/axios";
import { IPropertyForm } from "@/components/property-form";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import { useQuery } from "@tanstack/react-query";
import { Building, Car, Lamp, LayoutGrid, Ruler } from "lucide-react";
import { useParams } from "react-router-dom";
import icons from "@/lib/icons";

type IPropertyProps = IPropertyForm & {
  owner: {
    firstName: string;
    lastName: string;
    profile: string;
  };
};

function HouseDetail() {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["house", id],
    queryFn: async (): Promise<IPropertyProps> => {
      const res = await axiosIns.get(`/properties/${id}`);
      return res.data;
    },
    staleTime: 1000 * 60 * 3,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-screen-2xl md:px-8 mx-auto my-12 p-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
        <div className="md:col-span-2 md:row-span-2 min-w-full aspect-square">
          <img
            src={data.images[0]}
            alt="Main"
            className="w-full h-full shadow-md border object-cover rounded-lg aspect-square"
          />
        </div>

        {data.images.slice(1, 5).map((src, index) => (
          <div key={index} className="hidden md:block min-w-full aspect-square">
            <img
              src={src}
              alt={`Gallery ${index + 1}`}
              className="w-full h-full shadow-md border object-cover rounded-lg aspect-square"
            />
          </div>
        ))}

        <div className="absolute bottom-2 right-2">
          <Button
            startContent={<LayoutGrid />}
            variant="faded"
            radius="sm"
            color="primary"
          >
            Show all photos
          </Button>
        </div>
      </div>
      <div>
        <div className="mt-10 py-4">
          <h3 className="text-2xl font-bold">{`${data?.city.name}, ${data?.district.name}, ${data?.road}, ${data?.street}`}</h3>
        </div>
        <div className="grid grid-cols-2 gap-10">
          <div>
            <div className="flex gap-2 justify-around">
              <Card className="flex-1 flex items-center justify-center gap-2 p-4  border border-default-500">
                <p className="flex items-center font-medium gap-2">
                  <Building />
                  <span>Floor</span>
                </p>
                <p className="text-default-500">{`${data?.floor} of ${data?.totalFloors}`}</p>
              </Card>
              <Card className="flex-1 flex items-center justify-center gap-2 p-4  border border-default-500">
                <p className="flex items-center font-medium gap-2">
                  <Lamp />
                  <span>Bedrooms</span>
                </p>
                <p className="text-default-500">{`${data?.numOfBedRooms} rooms`}</p>
              </Card>
              <Card className="flex-1 flex items-center justify-center gap-2 p-4  border border-default-500">
                <p className="flex items-center font-medium gap-2">
                  <Ruler />
                  <span>Area</span>
                </p>
                <p className="text-default-500">
                  {`${data?.area} `}m<sup>2</sup>
                </p>
              </Card>
            </div>
            <Card className="p-2 mt-2 border border-default-500">
              <CardBody className="flex flex-row items-baseline gap-2">
                <span className="font-semibold text-2xl">{`${data?.price}`} AFN </span>
                <span className="text-default-500">
                  {`for ${data?.listingType}`}
                </span>
              </CardBody>
            </Card>
            <div className="mt-10">
              <h4 className="text-xl font-semibold mb-4">Facilities</h4>
              <ul className="space-y-2  text-default-500">
                {data?.facilities.map((facility, index) => (
                  <li key={facility._id} className="flex items-center gap-2">
                    {icons[facility.icon]}:<span>{facility.name}</span>
                  </li>
                ))}
                <li className="flex gap-2 items-center">
                  <Car />:<span>Free Parking</span>
                </li>
                <li className="flex gap-2 items-center">
                  <Car />:<span>Free Parking</span>
                </li>
                <li className="flex gap-2 items-center">
                  <Car />:<span>Free Parking</span>
                </li>
                <li className="flex gap-2 items-center">
                  <Car />:<span>Free Parking</span>
                </li>
                <li className="flex gap-2 items-center">
                  <Car />:<span>Free Parking</span>
                </li>
              </ul>
            </div>
            <div className="mt-10">
              <h4 className="text-xl font-semibold mb-4">More Descriptions</h4>
              <ul className="space-y-2 text-default-500">
                {data?.description.map((desc, index) => (
                  <li key={index} className="flex gap-2">
                    {desc}
                  </li>
                ))}
                <li className="flex gap-2">Front of Sunlight</li>
                <li className="flex gap-2">Large Window</li>
                <li className="flex gap-2">Big Room</li>
                <li className="flex gap-2">Nice View</li>
                <li className="flex gap-2">Green Area</li>
              </ul>
            </div>
          </div>
          <div>
            <Card className="flex flex-row items-center gap-2 p-4 border border-default-500">
              <div>
                <Avatar
                  // size=""
                  className="w-16 h-16"
                  src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                />
              </div>
              <div>
                <h4>{`${data?.owner.firstName} ${data?.owner.lastName}`}</h4>
                <p className="text-sm text-default-500">owner</p>
                <Button variant="solid" color="primary" size="sm">
                  Contact Info
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HouseDetail;
