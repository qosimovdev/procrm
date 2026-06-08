import { Toaster } from "sonner";
import AppRouter from "./routes/AppRouter";
import { AddProjectModal } from "./components/common/projects/AddProjectModal";
import AddMemberModal from "./components/common/Team/AddMemberModal";
import { useModalStore } from "@/stores/modalStore";

function App() {
  const { modalType, closeModal } = useModalStore();
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
      <AddProjectModal
        open={modalType === "create-project"}
        onOpenChange={closeModal}
      />
      <AddMemberModal
        open={modalType === "invite-member"}
        onOpenChange={closeModal}
      />
      {/* <AddTaskModal
        open={modalType === "create-task"}
        onOpenChange={closeModal}
      /> */}
    </>
  );
}

export default App;
