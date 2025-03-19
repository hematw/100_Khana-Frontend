import axiosIns from "@/axios";
import PropertyCard from "@/components/house-card";
import { listingTypes } from "@/components/Main";
import { ISearchForm, IPropertyForm } from "@/types";
import { getCities, getCategories } from "@/api";
import { saveOrRemoveToWishlist } from "@/lib/utils";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { useQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { Link, useLocation, useSearchParams } from "react-router-dom";

type PropertyWithID = IPropertyForm & Record<"_id", string>;
type TAdvanceSearch = ISearchForm & {
  area?: string;
  category?: string[];
};

function Properties() {
  const location = useLocation();
  console.log(location);

  const form = useForm<TAdvanceSearch>({
    defaultValues: {
      listingType: [],
      city: "",
      min_price: "",
      max_price: "",
      area: "",
      category: [],
    },
  });

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["properties", location.search],
    queryFn: async () => {
      const res = await axiosIns.get(`/properties${location.search}`);
      return res.data;
    },
    // enabled: false,
  });

  const { data: cities = [], isLoading: isLoadingCities } = useQuery({
    queryKey: ["locations"],
    queryFn: getCities,
    // enabled: false,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    staleTime: 1000 * 60 * 3,
    queryFn: getCategories,
  });

  const [searchParams, setSearchParams] = useSearchParams();

  console.log(searchParams, "🆗🆗🆗");
  console.log(form.watch());

  if (isLoading) return <p>Loading...</p>;
  if (isError) console.log(error);
  return (
    <section className="max-w-screen-2xl mx-auto my-12 p-6">
      <div>
        <Form
          onSubmit={form.handleSubmit(() => {
            refetch();
          })}
          className="mx-10"
        >
          <div className="min-w-full items-center flex gap-2 rounded-sm p-2 ">
            <Controller
              control={form.control}
              name="city"
              render={({ field }) => (
                <Autocomplete
                  size="sm"
                  radius="sm"
                  color="primary"
                  variant="faded"
                  label="City"
                  items={cities}
                  {...field}
                  placeholder="e.g. Kabul..."
                  defaultSelectedKey={field.value}
                  onSelectionChange={(selectedCity) =>
                    form.setValue("city", selectedCity?.toString() || "")
                  }
                >
                  {(item) => (
                    <AutocompleteItem key={item._id}>
                      {item.name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              )}
            />
            <Select
              items={listingTypes}
              label="Listing Type"
              placeholder="Select listing type"
              selectionMode="multiple"
              size="sm"
              radius="sm"
              color="primary"
              variant="faded"
              onSelectionChange={(keys) => {
                const selectedValues = Array.from(keys).map((key) =>
                  String(key)
                );
                form.setValue("listingType", selectedValues);
              }}
            >
              {(item) => (
                <SelectItem key={item.value} textValue={item.value}>
                  <div className="flex gap-2 items-center">
                    <div className="flex flex-col">{item.value}</div>
                  </div>
                </SelectItem>
              )}
            </Select>
            <Select
              label="Price Range"
              placeholder="e.g. 5K - 10K..."
              size="sm"
              radius="sm"
              color="primary"
              variant="faded"
              items={[
                { label: "free - 1K", value: [0, 1000] },
                { label: "5K - 10K", value: [5000, 10000] },
                { label: "10K - 20K", value: [10000, 20000] },
                { label: "20K - 50K", value: [20000, 50000] },
                { label: "50K - 100K", value: [50000, 100000] },
                { label: "100K - 1M", value: [100000, 1000000] },
              ]}
              onChange={({ target: { value } }) => {
                console.log(value);
                const [minPrice, maxPrice] = value.split(",");
                form.setValue("min_price", minPrice || "");
                form.setValue("max_price", maxPrice || "");
              }}
            >
              {(item) => (
                <SelectItem key={item.value} textValue={item.label}>
                  <div className="flex gap-2 items-center">
                    <div className="flex flex-col">{item.label}</div>
                  </div>
                </SelectItem>
              )}
            </Select>
            <Select
              label="Property type"
              placeholder="e.g. Apartment"
              variant="faded"
              size="sm"
              radius="sm"
              color="primary"
              // isMultiline={true}
              items={categories}
              // defaultSelectedKeys={field.value}
              isInvalid={!!form.formState.errors.category}
              errorMessage={form.formState.errors.category?.message}
              onSelectionChange={(keys) => {
                const selectedValues = Array.from(keys).map((key) =>
                  String(key)
                );
                form.setValue("category", selectedValues);
              }}
              selectionMode="multiple"
            >
              {(item) => (
                <SelectItem key={item._id} textValue={item.name}>
                  <div className="flex gap-2 items-center">
                    <div className="flex flex-col">{item.name}</div>
                  </div>
                </SelectItem>
              )}
            </Select>
            <Input
              label="Area"
              placeholder="e.g. 100m2"
              type="number"
              size="sm"
              variant="faded"
              color="primary"
              radius="sm"
              min={0}
              classNames={{
                inputWrapper: "w-24",
                base: "w-24",
              }}
              {...form.register("area")}
            />
            <div className="content-center">
              <Button
                // type="submit"
                className="py-4"
                radius="sm"
                variant="solid"
                color="primary"
                onPress={() => {
                  const queryStrings = new URLSearchParams(
                    form.getValues()
                  ).toString();
                  console.log(queryStrings);
                  setSearchParams(queryStrings);
                  // refetch();
                }}
              >
                Search
              </Button>
            </div>
          </div>
        </Form>
      </div>
      <div className="max-w-screen-2xl xl:mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10 items-stretch place-items-center py-6">
        {data?.properties.length ? (
          data?.properties.map((property: PropertyWithID) => (
            <Link to={`/properties/${property._id}`} key={property._id}>
              <PropertyCard
                address={`${property.city.name}, ${property.district.name}, ${property.road}, ${property.street}`}
                price={+property.price}
                listingType={property.listingType.join(", ")}
                images={property.images as string[]}
                className="border border-gray-300 dark:border-gray-600 hover:shadow-xl hover:scale-[1.02] min-h-full justify-between"
                onAddWishlist={() =>
                  saveOrRemoveToWishlist<PropertyWithID>("bookmarks", property)
                }
              />
            </Link>
          ))
        ) : (
          <div className="col-span-full w-96">
            <img
              src="/House searching-amico.svg"
              alt="No Properties for this search"
              className="mx-auto"
            />
            <p className="text-center font-semibold font-clash text-2xl">
              We couldn't find any properties
            </p>
            <p className="text-center">Try a different search</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Properties;
