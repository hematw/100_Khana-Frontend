import { Input } from "@heroui/input";
import { IPropertyForm } from "..";
import { Controller, UseFormReturn } from "react-hook-form";
import axiosIns from "@/axios";
import { useQuery } from "@tanstack/react-query";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Button } from "@heroui/button";
import { Pin } from "lucide-react";
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

  const getGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((loc) => {
        console.log(loc.coords);
        form.setValue("lng", loc.coords.longitude.toString());
        form.setValue("lat", loc.coords.latitude.toString());
      });
    }
  };

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
            items={cities}
            {...field}
            placeholder="e.g. Kabul..."
            onSelectionChange={(selectedCity) =>
              form.setValue("city", selectedCity?.toString() || "")
            }
          >
            {(item) => (
              <AutocompleteItem key={item._id}>{item.name}</AutocompleteItem>
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
            items={districts}
            {...field}
            placeholder="e.g. 12th district..."
            onSelectionChange={(selectedCity) =>
              form.setValue("district", selectedCity?.toString() || "")
            }
          >
            {(item) => (
              <AutocompleteItem key={item._id} textValue={item.name}>
                {item.name}
              </AutocompleteItem>
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
            placeholder="e.g. Shahr e Naw - Qala Fathullah"
            {...field}
          />
        )}
      />
      <Controller
        control={form.control}
        name="street" // ✅ Fixed duplicate field name
        render={({ field }) => (
          <Input label="Street" placeholder="e.g. 4th street" {...field} />
        )}
      />
      <Button
        onPress={getGeolocation}
        startContent={<Pin />}
        size="lg"
        color="primary"
        variant="solid"
      >
        Get current Location
      </Button>
    </>
  );
}
export default Address;
