import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IPropertyForm } from "../add-home";
import { UseFormReturn } from "react-hook-form";
import axiosIns from "@/axios";
import { useQuery } from "@tanstack/react-query";
import { Combobox } from "@/components/ui/combo-box";

type TDistrict = {
  name: string;
  _id: string;
};

type TCity = {
  name: string;
  _id: string;
};

async function getCities(): Promise<TCity[]> {
  const response = await axiosIns.get("/cities");
  return response.data.cities;
}

async function getDistricts(): Promise<TDistrict[]> {
  const response = await axiosIns.get("/districts");
  return response.data.districts;
}

function Address({ form }: { form: UseFormReturn<IPropertyForm> }) {
  const { isLoading: isLoadingCities, isError: isErrorCities, data: cities = [] } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
  });

  const { isLoading: isLoadingDistricts, isError: isErrorDistricts, data: districts = [] } = useQuery({
    queryKey: ["districts"],
    queryFn: getDistricts,
  });

  if (isErrorCities || isErrorDistricts) {
    return <h1>Something went wrong</h1>;
  }

  if (isLoadingCities || isLoadingDistricts) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <FormField
        control={form.control}
        name="city"
        render={({ field }) => (
          <FormItem className="col-span-1 flex flex-col">
            <FormLabel>City</FormLabel>
            <Combobox
              value={field.value}
              options={cities.map((c) => ({ label: c.name, value: c.name }))}
              onChange={field.onChange}
              placeholder="Select a city"
            />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="district"
        render={({ field }) => (
          <FormItem className="col-span-1 flex flex-col">
            <FormLabel>District</FormLabel>
            <Combobox
              value={field.value}
              options={districts.map((d) => ({ label: d.name, value: d.name }))}
              onChange={field.onChange}
              placeholder="Select a district"
            />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="road"
        render={({ field }) => (
          <FormItem className="col-span-1 flex flex-col">
            <FormLabel>Main Road</FormLabel>
            <FormControl>
              <Input
                placeholder="eg: Shahr e Naw - Qala Fathullah"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="street" // ✅ Fixed duplicate field name
        render={({ field }) => (
          <FormItem className="col-span-1 flex flex-col">
            <FormLabel>Street</FormLabel>
            <FormControl>
              <Input placeholder="eg: 4th street" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
export default Address;
