import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import ExamPage from "../src/pages/ExamsPage";
import { DashboardContent } from "./pages/dashboard-content";
import Register from "./pages/Register";
import CreateExam from "./pages/CreateExam";
import CoursesPage from "./pages/CoursesPage";
import { Toaster } from "@/components/ui/sonner";
// import Overview from './pages/Overview';

export default function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Protected Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />
          }
        >
          {/* <Route index element={<Overview />} /> */}
          <Route index element={<DashboardContent />} />
          <Route path="exams" element={<ExamPage />} />
          <Route path="studentregister" element={<Register />} />
          <Route path="exams/create" element={<CreateExam />} />
          <Route path="courses" element={<CoursesPage />} />
        </Route>

        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}
