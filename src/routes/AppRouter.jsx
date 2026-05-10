import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/client/Dashboard";
import Projects from "../pages/client/Projects";
import Tasks from "../pages/client/Tasks";
import Developers from "../pages/client/Developers";
import Setting from "../pages/client/Setting";
import Profile from "../pages/client/Profile";
function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/developers" element={<Developers />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={"404 Not Found"} />
      </Routes>
    </>
  );
}

export default AppRouter;
