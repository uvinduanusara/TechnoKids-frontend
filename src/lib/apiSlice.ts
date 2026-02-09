import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000", // Your NestJS URL
    prepareHeaders: (headers, { endpoint }) => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      // Always send authorization header if token exists
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      // Only send role header for authenticated endpoints (not login/register)
      if (role && endpoint !== "login" && endpoint !== "register") {
        headers.set("role", role);
      }

      return headers;
    },
  }),
  tagTypes: ["Exams"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register", // Your NestJS register endpoint
        method: "POST",
        body: credentials,
      }),
    }),
    getCourses: builder.query({
      query: () => "/courses",
    }),
    createQuiz: builder.mutation({
      query: (quizData) => ({
        url: "/quizzes",
        method: "POST",
        body: quizData,
      }),
    }),
    getAllExams: builder.query({
      query: () => "/quizzes",
      providesTags: ["Exams"],
    }),
    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Exams"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetCoursesQuery,
  useCreateQuizMutation,
  useGetAllExamsQuery,
  useDeleteQuizMutation,
} = apiSlice;
