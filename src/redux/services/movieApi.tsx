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
      query: () => `/movie/popular`,
    }),
    getDiscoverMovie: builder.query({
      query: () => `/discover/movie`,
    }),
    getMovieByKeyword: builder.query({
      query: ({ keyword }) => `/search/movie?query=${keyword}`,
    }),
    getMovieDetail: builder.query({
      query: ({ movie_id }) => `/movie/${movie_id}`,
    }),
    getMovieNowPlaying: builder.query({
      query: () => `/movie/now_playing`,
    }),
    getMovieUpcoming: builder.query({
      query: () => `/movie/upcoming`,
    }),
    getMovieTopRated: builder.query({
      query: () => `/movie/top_rated`,
    }),
  }),
});

export const {
  useGetPopularMovieQuery,
  useGetDiscoverMovieQuery,
  useGetMovieByKeywordQuery,
  useGetMovieDetailQuery,
  useGetMovieNowPlayingQuery,
  useGetMovieUpcomingQuery,
  useGetMovieTopRatedQuery,
} = movieApi;
