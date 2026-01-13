import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Jobs from "./pages/User/Jobs";
import MyApplications from "./pages/User/MyApplications";
import MyFavourites from "./pages/User/MyFavourites";

import AdminJobs from "./pages/Admin/AdminJobs";
import JobForm from "./pages/Admin/JobForm";
import Applicants from "./pages/Admin/Applicants";

export default function App(){
  return(
    <AuthProvider>
      <BrowserRouter>
        <Navbar/>

        <Routes>
          {/* Public */}
          <Route path="/" element={<Jobs/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>

          {/* Candidate */}
          <Route
            path="/applications"
            element={
              <ProtectedRoute role="candidate">
                <MyApplications/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/favourites"
            element={
              <ProtectedRoute role="candidate">
                <MyFavourites/>
              </ProtectedRoute>
            }
          />

          {/* Admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminJobs/>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/create"
            element={
              <ProtectedRoute role="admin">
                <JobForm/>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/jobs/:jobId"
            element={
              <ProtectedRoute role="admin">
                <Applicants/>
              </ProtectedRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
