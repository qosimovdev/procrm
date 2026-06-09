import { Toaster } from "sonner";
import AppRouter from "./routes/AppRouter";
import AppModal from "./AppModal";

function App() {
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
