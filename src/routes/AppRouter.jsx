import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import Register from "@/pages/auth/Register";
import Login from "@/pages/auth/Login";
import ProtectedRoute from "./ProtectedRouter";
import PrivateLayout from "@/layout/PrivateLayout";

const Dashboard = lazy(() => import("../pages/client/Dashboard/Dashboard"));
const Projects = lazy(() => import("../pages/client/Projects/Projects"));
const ProjectDetails = lazy(
  () => import("../pages/client/Projects/ProjectDetails"),
);
const Tasks = lazy(() => import("../pages/client/Tasks"));
const Developers = lazy(() => import("../pages/client/Developers"));
const Setting = lazy(() => import("../pages/client/Setting"));
const Profile = lazy(() => import("../pages/client/Profile"));

export default function AppRouter() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* PUBLIC */}
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />

        {/* DEFAULT */}
        <Route path="/" element={<Navigate to="/auth/login" replace />} />

        {/* PROTECTED */}
        <Route element={<ProtectedRoute />}>
          <Route element={<PrivateLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/developers" element={<Developers />} />
            <Route path="/settings" element={<Setting />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Suspense>
  );
}
