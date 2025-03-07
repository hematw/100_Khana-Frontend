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
            className="min-w-full"
            isMultiline={true}
            items={facilities}
            value={field.value}
            placeholder="e.g. Secure doors"
            defaultSelectedKeys={field.value}
            selectionMode="multiple"
            variant="flat"
            size="sm"
            isInvalid={!!form.formState.errors.facilities}
            errorMessage={form.formState.errors.facilities?.message}
            onSelectionChange={(keys) => {
              const selectedValues = Array.from(keys).map((key) => String(key));
              form.setValue("facilities", selectedValues); // Update form state with array of strings
            }}
            renderValue={(items: SelectedItems<TFacility>) => {
              return (
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <Chip
                      key={item.key}
                      color="primary"
                      className="py-2 px-3 inline-flex h-fit"
                      startContent={
                        icons[item.data?.icon as keyof typeof icons]
                      }
                    >
                      <span>{item.data?.name}</span>
                    </Chip>
                  ))}
                </div>
              );
            }}
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
