import Header from "./components/layout/Header/Header";
import AppRouter from "./routes/AppRouter";
import Sidebar from "./components/layout/Sidebar/Sidebar";
import { Toaster } from "sonner";
function App() {
  return (
    <>
      <div className="relative flex min-h-screen bg-bg">
        <div className="absolute inset-0 bg-glow-bottom pointer-events-none" />
        <div className="absolute inset-0 bg-glow-top pointer-events-none" />
        <Sidebar />
        <main className="main flex-1 p-6 px-7 relative z-10">
          <Header />
          <AppRouter />
        </main>
      </div>
      <Toaster
        position="top-center"
        expand
        richColors
        toastOptions={{
          classNames: {
            title: "text-white",
            description: "text-slate-400",
            success: "!text-text-success",
            error: "!text-text-danger",
            warning: "!text-text-warning",
            info: "!text-text-primary",
          },
        }}
      />
    </>
  );
}

export default App;
