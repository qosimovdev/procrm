import { useEffect, useMemo, useState } from "react";
import { useTasks } from "@/hooks/tasks/useTasks";
import { Input } from "@/components/ui/input";
import {
  CircleCheckBig,
  ClipboardList,
  Clock3,
  FolderCode,
  ListTodo,
  Search,
} from "lucide-react";
import StatCard from "@/components/common/tasks/StatCard";
import KanbanColumn from "@/components/common/tasks/KanbanColumn";
import { CustomSelect } from "@/components/common/projects/ProjectSelect";
import { DndContext, DragOverlay, closestCorners } from "@dnd-kit/core";
import { useUpdateTaskStatus } from "@/hooks/tasks/useUpdateTaskStatus";
import TaskCard from "@/components/common/tasks/TaskCard";
import { EmptyCard } from "@/components/layout/Empty/Empty";
import { useModalStore } from "@/stores/modalStore";
function Tasks() {
  const { data, isLoading } = useTasks();
  const { mutate: updateTaskStatus } = useUpdateTaskStatus();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [boardTasks, setBoardTasks] = useState([]);
  const [activeTask, setActiveTask] = useState(null);
  const { openModal } = useModalStore();

  useEffect(() => {
    if (data?.tasks) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setBoardTasks(data.tasks);
    }
  }, [data?.tasks]);

  const tasks = data?.tasks ?? [];
  const filteredTasks = useMemo(() => {
    return boardTasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description?.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = status === "ALL" || task.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [boardTasks, search, status]);
  const todoTasks = filteredTasks.filter((task) => task.status === "TODO");
  const inProgressTasks = filteredTasks.filter(
    (task) => task.status === "IN_PROGRESS",
  );
  const doneTasks = filteredTasks.filter((task) => task.status === "DONE");
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const handleDragEnd = ({ active, over }) => {
    if (!over) return;
    const id = active.id;
    const newStatus = over.id;
    setBoardTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task,
      ),
    );
    updateTaskStatus(
      { id, status: newStatus },
      {
        onError: () => {
          setBoardTasks(data.tasks);
        },
      },
    );
  };

  if (tasks.length === 0) {
    return (
      <EmptyCard
        icon={<FolderCode />}
        title="No Tasks Yet"
        description="Create your first project to start tracking tasks, budgets, deadlines, and team progress."
        actionText="Create Task"
        onAction={() => openModal("create-task")}
      />
    );
  }
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between my-5">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Tasks</h1>
          <p className="text-text-secondary">
            {tasks.length} tasks across all projects
          </p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="Total" value={tasks.length} icon={ClipboardList} />
        <StatCard title="Todo" value={todoTasks.length} icon={ListTodo} />
        <StatCard
          title="In Progress"
          value={inProgressTasks.length}
          icon={Clock3}
        />
        <StatCard title="Done" value={doneTasks.length} icon={CircleCheckBig} />
      </div>
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-4 h-4 w-4 text-text-primary z-50" />
          <Input
            placeholder="Search task..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 glass-strong shadow-purple"
          />
        </div>
        <div className="w-full md:w-56">
          <CustomSelect
            value={status}
            onChange={setStatus}
            placeholder="Filter Status"
            options={[
              { label: "All", value: "ALL" },
              { label: "Todo", value: "TODO" },
              { label: "In Progress", value: "IN_PROGRESS" },
              { label: "Done", value: "DONE" },
            ]}
          />
        </div>
      </div>
      <DndContext
        collisionDetection={closestCorners}
        onDragStart={({ active }) => {
          const task = boardTasks.find((t) => t.id === active.id);
          setActiveTask(task);
        }}
        onDragEnd={(event) => {
          handleDragEnd(event);
          setActiveTask(null);
        }}
        onDragCancel={() => setActiveTask(null)}
      >
        <div className="grid gap-5 lg:grid-cols-3">
          <KanbanColumn id="TODO" title="Todo" tasks={todoTasks} />
          <KanbanColumn
            id="IN_PROGRESS"
            title="In Progress"
            tasks={inProgressTasks}
          />
          <KanbanColumn id="DONE" title="Done" tasks={doneTasks} />
        </div>
        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>
    </section>
  );
}

export default Tasks;
