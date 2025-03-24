import axiosIns from "@/axios";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { useQuery } from "@tanstack/react-query";
import {
  Building,
  Calendar,
  Car,
  Eye,
  Forward,
  Heart,
  Lamp,
  LayoutGrid,
  Ruler,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import icons from "@/lib/icons";
import { IPropertyForm } from "@/types";
import MapComponent from "@/components/map";
import { Divider } from "@heroui/divider";
import { saveOrRemoveToWishlist } from "@/lib/utils";
import { addToast } from "@heroui/toast";
import PropertyCard from "@/components/house-card";
import { useEffect } from "react";

type IPropertyWithOwnerAndSimilars = IPropertyForm & {
  owner: {
    firstName: string;
    lastName: string;
    profile: string;
  };
  similarProperties: IPropertyForm[];
};

function HouseDetail() {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["house", id],
    queryFn: async (): Promise<IPropertyWithOwnerAndSimilars> => {
      const res = await axiosIns.get(`/properties/${id}`);
      return res.data;
    },
    staleTime: 1000 * 60 * 3,
  });

  useEffect(() => {
    const timeoutID = setTimeout(async () => {
      await axiosIns.put(`/properties/${id}/views`);
    }, 1000 * 60);
    return () => clearTimeout(timeoutID);
  }, [data]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="mx-auto md:px-8 max-w-screen-2xl zp-6">
      <div className="relative gap-4 grid grid-cols-2 md:grid-cols-4 grid-rows-2 p-12 h-[580px]">
        <div className="md:col-span-2 md:row-span-2 min-w-full">
          <img
            src={data?.images[0] as string}
            alt="Main"
            className="shadow-md border rounded-lg w-full h-full object-cover"
          />
        </div>

        {data?.images.slice(1, 5).map((src, index) => (
          <div key={index} className="hidden md:block min-w-full">
            <img
              src={src as string}
              alt={`Gallery ${index + 1}`}
              className="shadow-md border rounded-lg w-full h-full object-cover"
            />
          </div>
        ))}

        <div className="right-2 bottom-2 absolute">
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
          <div className="flex justify-center gap-2">
            <Button
              variant="solid"
              color="primary"
              size="sm"
              radius="sm"
              isIconOnly
              startContent={<Heart />}
              onPress={() => {
                saveOrRemoveToWishlist("bookmarks", data);
              }}
            />
            <Button
              variant="solid"
              color="primary"
              size="sm"
              radius="sm"
              isIconOnly
              startContent={<Forward />}
              onPress={() => {
                const shareUrl = window.location.href;
                if (navigator.share) {
                  navigator
                    .share({
                      title: `Property in ${data?.city.name} `,
                      text: `Check out this ${data?.listingType} property in ${data?.city.name}`,
                      url: shareUrl,
                    })
                    .catch((err) => console.log("Error sharing:", err));
                } else {
                  navigator.clipboard.writeText(shareUrl);
                  addToast({
                    title: "Link copied to clipboard!",
                    color: "success",
                  });
                }
              }}
            />
          </div>
          <h3 className="font-bold text-2xl">{`${data?.city.name}, ${data?.district.name}, ${data?.road}, ${data?.street}`}</h3>
        </div>
        <div className="gap-10 grid grid-cols-2">
          <div>
            <div className="flex justify-around gap-2">
              <Card className="flex flex-1 justify-center items-center gap-2 p-4 border border-default-300">
                <p className="flex items-center gap-2 font-medium">
                  <Building />
                  <span>Floor</span>
                </p>
                <p className="text-default-500">{`${data?.floor} of ${data?.totalFloors}`}</p>
              </Card>
              <Card className="flex flex-1 justify-center items-center gap-2 p-4 border border-default-300">
                <p className="flex items-center gap-2 font-medium">
                  <Lamp />
                  <span>Bedrooms</span>
                </p>
                <p className="text-default-500">{`${data?.numOfBedRooms} rooms`}</p>
              </Card>
              <Card className="flex flex-1 justify-center items-center gap-2 p-4 border border-default-300">
                <p className="flex items-center gap-2 font-medium">
                  <Ruler />
                  <span>Area</span>
                </p>
                <p className="text-default-500">
                  {`${data?.area} `}m<sup>2</sup>
                </p>
              </Card>
            </div>
            <Card className="mt-2 p-2 border border-default-300">
              <CardBody className="flex flex-row items-baseline gap-2">
                <span className="font-semibold text-2xl">
                  {`${data?.price}`} AFN{" "}
                </span>
                <span className="text-default-500">
                  {`for ${data?.listingType}`}
                </span>
              </CardBody>
            </Card>
            <div className="mt-10">
              <h4 className="mb-4 font-semibold text-xl">Facilities</h4>
              <ul className="space-y-2 text-default-500">
                {data?.facilities.map((facility, index) => (
                  <li key={facility._id} className="flex items-center gap-2">
                    {icons[facility.icon]}:<span>{facility.name}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10">
              <h4 className="mb-4 font-semibold text-xl">More Descriptions</h4>
              <ul className="space-y-2 text-default-500">
                {data?.description.map((desc, index) => (
                  <li key={index} className="flex gap-2 capitalize">
                    {desc}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10">
              <h4 className="mb-4 font-semibold text-xl">Location</h4>
              <div>
                <MapComponent
                  coordinates={[+data?.lat, +data?.lng]}
                />
              </div>
            </div>
            <div className="flex justify-between items-center gap-2 mt-10 h-5 text-xs">
              <p className="flex items-center gap-1">
                <Calendar size={16} /> Posted:{" "}
                {new Date(data?.createdAt).toDateString()}
              </p>
              <Divider orientation="vertical" />
              <p className="flex items-center gap-1">
                <Eye size={16} />
                {data?.views > 1000
                  ? `${(data?.views / 1000).toFixed(1)}k`
                  : data?.views}{"  "}
                Viewes
              </p>
              <Divider orientation="vertical" />
              <p className="flex items-center gap-1">
                <Heart size={16} />
                {data?.saved} times Saved
              </p>
            </div>
          </div>
          <div>
            <Card className="top-28 left-0 sticky flex flex-row gap-2 p-4 border border-default-300 max-w-72">
              <div>
                <Avatar
                  // size=""
                  className="w-16 h-16"
                  src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                />
              </div>
              <div>
                <h4>{`${data?.owner.firstName} ${data?.owner.lastName}`}</h4>
                <div className="mb-2 text-default-500 text-sm">
                  <p>owner</p>
                  <p>46 listed properties</p>
                </div>
                <Button variant="solid" color="primary" size="sm">
                  Contact Info
                </Button>
              </div>
            </Card>
          </div>
        </div>
        <Divider className="my-10" />
        <div>
          <h4 className="font-semibold text-2xl">Similar Properties</h4>
          <div className="justify-start items-stretch gap-x-6 gap-y-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:mx-auto py-6">
            {data?.similarProperties.map((property) => (
              <Link to={`/properties/${property._id}`} key={property._id}>
                <PropertyCard
                  key={property._id}
                  address={`${property.city.name}, ${property.district.name}, ${property.road}, ${property.street}`}
                  price={+property.price}
                  listingType={property.listingType.join(", ")}
                  images={property.images as string[]}
                  className="justify-between hover:shadow-xl border border-gray-300 dark:border-gray-600 min-h-full hover:scale-[1.02]"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HouseDetail;
