import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000", // Your NestJS URL
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      if (role) {
        headers.set("role", role);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = apiSlice;
