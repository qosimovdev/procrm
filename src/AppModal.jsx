import { AddProjectModal } from "./components/common/projects/AddProjectModal";
// import AddTaskModal from "./components/common/tasks/AddTaskModal";
import AddMemberModal from "./components/common/Team/AddMemberModal";
import { useModalStore } from "@/stores/modalStore";

function AppModal({ id }) {
  const { modalType, closeModal } = useModalStore();

  return (
    <>
      <AddProjectModal
        open={modalType === "create-project"}
        onOpenChange={closeModal}
      />
      <AddMemberModal
        open={modalType === "invite-member"}
        onOpenChange={closeModal}
      />
    </>
  );
}

export default AppModal;
