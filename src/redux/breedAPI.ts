import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IBreed } from "./types";

export const BASEURL = "https://api.thedogapi.com/v1/breeds";

export const breedAPI = createApi({
  reducerPath: "noteAPI",
  baseQuery: fetchBaseQuery({ baseUrl: BASEURL }),
  tagTypes: ["Notes"],
  endpoints: (builder) => ({
    getAllBreed: builder.query<IBreed[], { nameParam: string }>({
      query: ({ nameParam }) => `${BASEURL}/search?name=${nameParam}`,
    }),
  }),
});

export const { useLazyGetAllBreedQuery } = breedAPI;
