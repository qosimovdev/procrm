import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
function TaskCard({ task }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };
  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="glass cursor-grab hover:border-primary/50 hover:shadow-lg transition-all"
    >
      <CardContent className="p-4">
        <h3 className="font-semibold text-base mb-2 text-text-primary">
          {task.title}
        </h3>
        <p className="text-sm text-text-secondary line-clamp-2">
          {task.description}
        </p>
        <div className="flex items-center justify-between mt-4">
          <Badge variant={task.priority === "HIGH" ? "destructive" : "outline"}>
            {task.priority}
          </Badge>
          {task.deadline && (
            <div className="flex items-center gap-1 text-sm text-text-secondary">
              <CalendarDays className="size-4" />
              {new Date(task.deadline).toLocaleDateString("uz-UZ")}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default TaskCard;
