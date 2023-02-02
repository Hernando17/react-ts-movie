import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MovieURL, MovieTOKEN } from "../";

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: MovieURL,
    prepareHeaders: (headers) => {
      if (MovieTOKEN) {
        headers.set("authorization", `Bearer ${MovieTOKEN}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPopularMovie: builder.query({
      query: (name) => `/movie/popular`,
    }),
    getMovieByKeyword: builder.query({
      query: ({ keyword }) => `/search/movie?query=${keyword}`,
    }),
  }),
});

export const { useGetPopularMovieQuery, useGetMovieByKeywordQuery } = movieApi;
