import { Badge } from "@/components/ui/badge";
import TaskCard from "./TaskCard";
import { Card, CardContent } from "@/components/ui/card";
import { useDroppable } from "@dnd-kit/core";
function KanbanColumn({ title, tasks }) {
  const statusMap = {
    Todo: "TODO",
    "In Progress": "IN_PROGRESS",
    Done: "DONE",
  };
  const { setNodeRef } = useDroppable({
    id: statusMap[title],
  });
  return (
    <Card ref={setNodeRef} className="h-fit min-h-[500px] glass shadow-purple">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div
              className={`size-3.5 rounded-full ${
                title === "Todo"
                  ? "bg-slate-500"
                  : title === "In Progress"
                    ? "bg-orange-500"
                    : "bg-green-500"
              }`}
            />
            <h3 className="font-semibold text-text-primary text-base">
              {title}
            </h3>
          </div>
          <Badge>{tasks.length}</Badge>
        </div>
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">
              No tasks found
            </div>
          ) : (
            tasks.map((task) => <TaskCard key={task.id} task={task} />)
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default KanbanColumn;
