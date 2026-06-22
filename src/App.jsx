import { Toaster } from "sonner";
import AppRouter from "./routes/AppRouter";
import AppModal from "./AppModal";
import useAuthStore from "./stores/authStore";
import AppLoader from "./components/common/loaders/AppLoader";
import { useAuthInit } from "./hooks/useAuthInit";

function App() {
  useAuthInit();
  const isInitializing = useAuthStore((state) => state.isInitializing);
  if (isInitializing) return <AppLoader />;
  return (
    <>
      <div className="">
        <AppRouter />
      </div>
      <Toaster
        position="top-right"
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
      <AppModal />
    </>
  );
}

export default App;
