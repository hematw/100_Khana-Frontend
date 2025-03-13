import PropertyCard from "../Card";
import { IPropertyForm } from "../property-form";
import { Link } from "react-router-dom";
import { useState } from "react";

type PropertyWithID = IPropertyForm & Record<"_id", string>;

function SavedHouses() {
const [houses, setHouses] = useState<PropertyWithID[]>(()=> {
    const savedData = localStorage.getItem("wishlist");
    return savedData ? JSON.parse(savedData) : [];
});


  return (
    <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {houses.length > 0 ? (
        houses.map((house: PropertyWithID) => (
          <PropertyCard
            key={house._id}
            address={` ${house.city.name}, ${house.district.name}, ${house.road}, ${house.street}`}
            price={Number(house.price)}
            listingType={house.listingType.join(", ")}
            images={house.images as string[]}
          />
        ))
      ) : (
        <div className="py-6 col-span-4">
          <div className=" text-center space-y-4">
            <div>
              <img
                src="/saved-houses.svg"
                alt="no houses"
                className="mx-auto max-w-72"
              />
            </div>
            <div>
              <h3 className="text-2xl font-semibold">You didn't save any houses</h3>
              <Link to="/new-property" className="text-danger-400 underline hover:no-underline">
                Find a place
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SavedHouses;
