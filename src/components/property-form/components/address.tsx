import { Input } from "@heroui/input";
import { IPropertyForm } from "..";
import { Controller, UseFormReturn } from "react-hook-form";
import axiosIns from "@/axios";
import { useQuery } from "@tanstack/react-query";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
// import { Combobox } from "@/components/ui/combo-box";

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
  const {
    isLoading: isLoadingCities,
    isError: isErrorCities,
    data: cities = [],
  } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
  });

  const {
    isLoading: isLoadingDistricts,
    isError: isErrorDistricts,
    data: districts = [],
  } = useQuery({
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
      <Controller
        control={form.control}
        name="city"
        render={({ field }) => (
          <Autocomplete
          label="City"
            value={field.value}
            items={cities.map((c) => ({ label: c.name, value: c.name }))}
            onChange={field.onChange}
            placeholder="Select a city"
          >
            {(item) => (
              <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
            )}
          </Autocomplete>
        )}
      />
      <Controller
        control={form.control}
        name="district"
        render={({ field }) => (
          <Autocomplete
            label="District"
            value={field.value}
            items={districts.map((d) => ({ label: d.name, value: d.name }))}
            onChange={field.onChange}
            placeholder="Select a district"
          >
            {(item) => (
              <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
            )}
          </Autocomplete>
        )}
      />
      <Controller
        control={form.control}
        name="road"
        render={({ field }) => (
          <Input
            label="Main Road"
            placeholder="eg: Shahr e Naw - Qala Fathullah"
            {...field}
          />
        )}
      />
      <Controller
        control={form.control}
        name="street" // ✅ Fixed duplicate field name
        render={({ field }) => (
          <Input label="Street" placeholder="eg: 4th street" {...field} />
        )}
      />
    </>
  );
}
export default Address;
