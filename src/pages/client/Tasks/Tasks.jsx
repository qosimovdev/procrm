import { EmptyCard } from "@/components/layout/Empty/Empty";
import { useModalStore } from "@/stores/modalStore";
import { ListTodo } from "lucide-react";

function Tasks() {
  const tasks = [];
  const { openModal } = useModalStore();
  if (tasks.length === 0) {
    return (
      <EmptyCard
        icon={<ListTodo />}
        title="No Tasks Yet"
        description="Create your first task to start tracking progress."
        actionText="Create Task"
        onAction={() => openModal("create-task")}
      />
    );
  }
  return <div>Tasks</div>;
}

export default Tasks;
