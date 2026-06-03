import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import Register from "@/pages/auth/Register";
import Login from "@/pages/auth/Login";
import ProtectedRoute from "./ProtectedRouter";
import PrivateLayout from "@/layout/PrivateLayout";
import WorkInformationSetting from "@/pages/client/Settings/WorkInformationSetting";
import SecuritySetting from "@/pages/client/Settings/SecuritySetting";
import ActivitySetting from "@/pages/client/Settings/ActivitySetting";

const Dashboard = lazy(() => import("../pages/client/Dashboard/Dashboard"));
const Projects = lazy(() => import("../pages/client/Projects/Projects"));
const ProjectDetails = lazy(
  () => import("../pages/client/Projects/ProjectDetails"),
);
const Tasks = lazy(() => import("../pages/client/Tasks"));
const Team = lazy(() => import("../pages/client/Team/Team"));
// const Setting = lazy(() => import("../pages/client/Settings/Setting"));
const Profile = lazy(() => import("../pages/client/Profile"));
const ProfileSetting = lazy(
  () => import("../pages/client/Settings/ProfileSetting"),
);
const SettingLayout = lazy(
  () => import("../pages/client/Settings/SettingLayout"),
);

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
            <Route path="/team" element={<Team />} />
            {/* Setting page */}
            <Route path="/settings" element={<SettingLayout />}>
              <Route index element={<Navigate to="profile" replace />} />
              <Route path="profile" element={<ProfileSetting />} />
              <Route path="work" element={<WorkInformationSetting />} />
              <Route path="security" element={<SecuritySetting />} />
              <Route path="activity" element={<ActivitySetting />} />
            </Route>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Suspense>
  );
}
