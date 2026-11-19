import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./components/Common/login.tsx";
import { lazy, Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import Authenticated from "./components/auth/auth.tsx";
import AdminLogin from "./components/Common/adminlogin.tsx";

///instructor imports

//admin imports
const AdminIndex = lazy(() => import("./admin/index"));
const AdminHome = lazy(() => import("./admin/pages/home.tsx"));
const AdminRoles = lazy(
  () => import("./admin/pages/employee/employeeroles.tsx"),
);

function App() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-screen flex items-center justify-center">
          <Spinner></Spinner>
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/instructor">
          <Route path="home" />
        </Route>

        <Route
          path="/admin"
          element={
            <Authenticated>
              <AdminIndex />
            </Authenticated>
          }
        >
          <Route path="home" element={<AdminHome />} />
          <Route path="management">
            <Route path="roles" element={<AdminRoles />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
