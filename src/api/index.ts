import axiosIns from "@/axios";

export async function getCities(): Promise<TCity[]> {
  const response = await axiosIns.get("/cities");
  return response.data.cities;
}

export async function getCategories(): Promise<TCategory[]> {
  const { data } = await axiosIns.get("/categories");
  return data.categories;
}
