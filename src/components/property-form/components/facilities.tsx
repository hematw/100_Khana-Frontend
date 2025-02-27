import { IPropertyForm } from "..";
import { Controller, UseFormReturn } from "react-hook-form";
import { useEffect, useState } from "react";
import axiosIns from "@/axios";
import { Select, SelectedItems, SelectItem } from "@heroui/select";
import { Chip } from "@heroui/chip";

type TFacility = {
  _id: string;
  name: string;
  description: string;
  icon: string;
};

function Facilities({ form }: { form: UseFormReturn<IPropertyForm> }) {
  const [facilities, setFacilities] = useState<TFacility[]>([]);

  useEffect(() => {
    async function fetchFacilities() {
      try {
        const { data } = await axiosIns.get("/facilities");
        console.log(data);
        setFacilities(data.facilities);
      } catch (error) {
        console.error(error);
      }
    }
    fetchFacilities();
  }, []);

  return (
    <>
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
            className="col-span-2"
            isMultiline={true}
            items={facilities}
            {...field}
            placeholder="Select property type"
            renderValue={(items: SelectedItems<TFacility>) => {
              return (
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <Chip key={item.key}>
                      
                      <span>{item.data?.name}</span>
                    </Chip>
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
    </>
  );
}
export default Facilities;
