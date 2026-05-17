import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
const Dashboard = lazy(() => import("../pages/client/Dashboard/Dashboard"));
const Projects = lazy(() => import("../pages/client/Projects/Projects"));
const ProjectDetails = lazy(
  () => import("../pages/client/Projects/ProjectDetails"),
);
const Tasks = lazy(() => import("../pages/client/Tasks"));
const Developers = lazy(() => import("../pages/client/Developers"));
const Setting = lazy(() => import("../pages/client/Setting"));
const Profile = lazy(() => import("../pages/client/Profile"));
function AppRouter() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Suspense>
    </>
  );
}

export default AppRouter;
