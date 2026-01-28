import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import DashboardLayout from './layouts/DashboardLayout';
// import Overview from './pages/Overview';

export default function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        
        {/* Protected Dashboard Route */}
        <Route path="/dashboard" element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />}>
          {/* <Route index element={<Overview />} /> */}
          <Route index element={<div>Exam List Page</div>} />
        </Route>

        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}