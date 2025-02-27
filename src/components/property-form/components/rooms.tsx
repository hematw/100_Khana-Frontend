import { Input } from "@heroui/input";
import { IPropertyForm } from "..";
import { Controller, UseFormReturn } from "react-hook-form";

function Rooms({ form }: { form: UseFormReturn<IPropertyForm> }) {
  return (
    <>
      <Controller
        control={form.control}
        name="numOfLivingRooms"
        render={({ field }) => (
          <Input
            label="Living Rooms."
            placeholder="4"
            {...field}
            value={field.value.toString()}
          />
        )}
      />
      <Controller
        control={form.control}
        name="numOfBedRooms"
        render={({ field }) => (
          <Input
            label="Bed Rooms."
            placeholder="4"
            {...field}
            value={field.value.toString()}
          />
        )}
      />
      <Controller
        control={form.control}
        name="numOfBaths"
        render={({ field }) => (
          <Input
            label="Bathrooms."
            placeholder="2"
            {...field}
            value={field.value.toString()}
          />
        )}
      />
      <Controller
        control={form.control}
        name="numOfKitchens"
        render={({ field }) => (
          <Input
            label="Kitchens."
            placeholder="320m2"
            {...field}
            value={field.value.toString()}
          />
        )}
      />
      <Controller
        control={form.control}
        name="floor"
        render={({ field }) => (
          <Input label="Floor." placeholder="3" {...field} />
        )}
      />
      <Controller
        control={form.control}
        name="totalFloors"
        render={({ field }) => (
          <Input label="Total Floors." placeholder="5" {...field} />
        )}
      />
    </>
  );
}
export default Rooms;
