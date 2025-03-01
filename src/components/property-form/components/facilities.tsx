import { IPropertyForm } from "..";
import { Controller, UseFormReturn } from "react-hook-form";
import axiosIns from "@/axios";
import { Select, SelectedItems, SelectItem } from "@heroui/select";
import { Chip } from "@heroui/chip";
import { Bath, GlassWater, Tv, WavesLadder } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

type TFacility = {
  _id: string;
  name: string;
  description: string;
  icon: string;
};

const icons = {
  Tv: <Tv />,
  WavesLadder: <WavesLadder />,
  GlassWater: <GlassWater />,
  Bath: <Bath />,
};

function Facilities({ form }: { form: UseFormReturn<IPropertyForm> }) {
  const {
    data: facilities,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["facilities"],
    queryFn: async (): Promise<TFacility[]> => {
      const { data } = await axiosIns.get("/facilities");
      console.log(data);
      return data.facilities;
    },
  });

  if (error) {
    console.log(error);
  }

  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <div className="col-span-4 justify-center">
      <Controller
        control={form.control}
        name="facilities"
        render={({ field }) => (
          <Select
            label="Facilities"
            classNames={{
              base: "max-w-xs",
              trigger: "min-h-12 py-2",
              label: "text-xs font-medium",
            }}
            className="min-w-full"
            isMultiline={true}
            items={facilities}
            {...field}
            placeholder="Secure doors"
            renderValue={(items: SelectedItems<TFacility>) => {
              return (
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <Chip
                      key={item.key}
                      startContent={icons[item.data?.icon]}
                      color="primary"
                      className="py-2 px-3 inline-flex h-fit"
                    >
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
    </div>
  );
}
export default Facilities;
