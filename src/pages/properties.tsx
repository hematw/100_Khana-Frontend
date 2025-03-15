import axiosIns from "@/axios";
import PropertyCard from "@/components/house-card";
import { IPropertyForm } from "@/components/property-form";
import { saveOrRemoveToWishlist } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";

type PropertyWithID = IPropertyForm & Record<"_id", string>;

function Properties() {
  const location = useLocation();
  console.log(location);

  const searchQuery = useQuery({
    queryKey: ["properties", location.search],
    queryFn: async () => {
      const res = await axiosIns.get(`/properties${location.search}`);
      return res.data;
    },
    // enabled: false,
  });

  if (searchQuery.isLoading) return <p>Loading...</p>;
  if (searchQuery.isError) console.log(searchQuery.error);
  return (
    <section className="max-w-screen-2xl mx-auto my-12 p-6">
      <div className="max-w-screen-2xl xl:mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-x-6 gap-y-10 place-items-center">
        {searchQuery.data?.properties.map((property: PropertyWithID) => (
          <Link to={`./properties/${property._id}`} key={property._id}>
            <PropertyCard
              address={`${property.city.name}, ${property.district.name}, ${property.road}, ${property.street}`}
              price={+property.price}
              listingType={property.listingType.join(", ")}
              images={property.images as string[]}
              className="border border-gray-300 dark:border-gray-600"
              onAddWishlist={() =>
                saveOrRemoveToWishlist<PropertyWithID>("bookmarks", property)
              }
            />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Properties;
