import { Input } from "@heroui/input";
import { IPropertyForm } from "..";
import { Controller, UseFormReturn } from "react-hook-form";
import { useEffect, useState } from "react";
import axiosIns from "@/axios";
import { Select, SelectedItems, SelectItem } from "@heroui/select";
import { Chip } from "@heroui/chip";

type TCategory = {
  name: string;
  _id: string;
};

type TListingType = { label: string; value: string };

const listingTypes: TListingType[] = [
  { label: "Rental", value: "rental" },
  { label: "Sale", value: "sale" },
  { label: "Mortgage", value: "mortgage" },
];

function AreaAndPrice({ form }: { form: UseFormReturn<IPropertyForm> }) {
  const [categories, setCategories] = useState<TCategory[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data } = await axiosIns.get("/categories");
        console.log(data);
        setCategories(data.categories);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCategories();
  }, []);

  return (
    <>
      <Controller
        control={form.control}
        name="listingType"
        render={({ field }) => (
          <Select
            label="Listing Type"
            classNames={{
              base: "max-w-xs",
              trigger: "min-h-12 py-2",
              label: "text-xs font-medium",
            }}
            // isMultiline={true}
            items={listingTypes}
            {...field}
            placeholder="Select listing type"
            renderValue={(items: SelectedItems<TListingType>) => {
              return (
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <Chip key={item.key}>{item.data?.value}</Chip>
                  ))}
                </div>
              );
            }}
            selectionMode="multiple"
            variant="flat"
            size="sm"
          >
            {(item) => (
              <SelectItem key={item.value} textValue={item.value}>
                <div className="flex gap-2 items-center">
                  <div className="flex flex-col">{item.value}</div>
                </div>
              </SelectItem>
            )}
          </Select>
        )}
      />
      <Controller
        control={form.control}
        name="category"
        render={({ field }) => (
          <Select
            label="Property type"
            classNames={{
              base: "max-w-xs",
              trigger: "min-h-12 py-2",
              label: "text-xs font-medium",
            }}
            // isMultiline={true}
            items={categories}
            {...field}
            placeholder="Select property type"
            renderValue={(items: SelectedItems<TCategory>) => {
              return (
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <Chip key={item.key}>{item.data?.name}</Chip>
                  ))}
                </div>
              );
            }}
            selectionMode="multiple"
            variant="flat"
            size="sm"
          >
            {(item) => (
              <SelectItem key={item._id} textValue={item.name}>
                <div className="flex gap-2 items-center">
                  <div className="flex flex-col">{item.name}</div>
                </div>
              </SelectItem>
            )}
          </Select>
        )}
      />
      <Controller
        control={form.control}
        name="price"
        render={({ field }) => (
          <Input
            label="Price"
            placeholder="320"
            {...field}
            value={field.value.toString()}
          />
        )}
      />
    </>
  );
}
export default AreaAndPrice;

// {step === 2 && (
//     <>
//       {/* Description */}
//       <InputGroup label="Description" text="Description about your place.">
//         <div className="my-2">
//           <textarea
//             {...register("desc", { required: true })}
//             placeholder="Ex: Beautiful house with a big pool..."
//             className="w-full h-32 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-400 transition-all duration-200 resize-none"
//           />
//           {errors.desc && (
//             <p className="text-red-500 text-sm mt-1">Description is required.</p>
//           )}
//         </div>
//       </InputGroup>
//     </>
//   )}

//   {step === 3 && (
//     <>
//       {/* Facilities */}
//       <InputGroup
//         label="Facilities"
//         text="Choose your place's facilities and amenities. Click to select."
//       >
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4">
//           {[
//             { id: "tv", icon: <IoTvOutline />, label: "TV" },
//             { id: "ac", icon: <TbAirConditioning />, label: "AC" },
//             { id: "wifi", icon: <FaWifi />, label: "WiFi" },
//             { id: "water", icon: <FaBottleWater />, label: "Drinking Water" },
//             { id: "parking", icon: <FaCarSide />, label: "Parking" },
//             { id: "pool", icon: <FaSwimmingPool />, label: "Pool" },
//             { id: "elevator", icon: <PiElevatorLight />, label: "Elevator" },
//             { id: "guard", icon: <GuardIcon />, label: "Guard" },
//           ].map((facility) => (
//             <div
//               key={facility.id}
//               className="border-2 border-gray-300 rounded-lg p-3 flex items-center justify-center gap-2 cursor-pointer hover:border-red-400 transition-all duration-200"
//             >
//               <input
//                 type="checkbox"
//                 id={facility.id}
//                 {...register(facility.id)}
//                 className="hidden"
//               />
//               <label htmlFor={facility.id} className="flex items-center gap-2 cursor-pointer">
//                 <span className="text-xl">{facility.icon}</span>
//                 <span>{facility.label}</span>
//               </label>
//             </div>
//           ))}
//         </div>
//       </InputGroup>
//     </>
//   )}
