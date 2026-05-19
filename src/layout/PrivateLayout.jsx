import Header from "@/components/layout/Header/Header";
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
// import AppRouter from "@/routes/AppRouter";
function PrivateLayout() {
  return (
    <>
      <div className="relative flex min-h-screen bg-bg">
        <div className="absolute inset-0 bg-glow-bottom pointer-events-none" />
        <div className="absolute inset-0 bg-glow-top pointer-events-none" />
        <Sidebar />
        <main className="main flex-1 p-6 px-7 relative z-10">
          <Header />
          <Outlet />
          {/* <AppRouter /> */}
        </main>
      </div>
    </>
  );
}

export default PrivateLayout;
