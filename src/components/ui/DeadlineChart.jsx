import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import {
  AlertTriangle,
  Clock3,
  CheckCircle2,
  CalendarDays,
} from "lucide-react";

export function PendingDeadlines() {
  const deadlines = [
    {
      title: "CRM API Integration",
      dueDate: "2026-05-12",
    },
    {
      title: "Dashboard UI",
      dueDate: "2026-05-12",
    },
    {
      title: "Mobile Responsive Fix",
      dueDate: "2026-05-13",
    },
    {
      title: "Auth System",
      dueDate: "2026-05-25",
    },
  ];

  const normalizeDate = (date) => {
    const normalized = new Date(date);
    normalized.setHours(0, 0, 0, 0);
    return normalized;
  };

  const getRemainingDays = (date) => {
    const today = normalizeDate(new Date());
    const target = normalizeDate(date);
    const diff = target.getTime() - today.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  const processedTasks = deadlines
    .map((task) => {
      const daysLeft = getRemainingDays(task.dueDate);

      let status = {
        label: "Normal",
        icon: CalendarDays,
        iconColor: "text-text-success",
        className: "bg-green-500/10 text-slate-300 border border-slate-500/20",
      };

      if (daysLeft <= 0) {
        status = {
          label: "Overdue",
          icon: AlertTriangle,
          iconColor: "text-text-danger",
          className: "bg-red-500/10 text-red-400 border border-red-500/20",
        };
      } else if (daysLeft <= 3) {
        status = {
          label: "Urgent",
          icon: Clock3,
          iconColor: "text-text-warning",
          className:
            "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
        };
      }
      return {
        ...task,
        daysLeft,
        status,
      };
    })
    // urgent first
    .sort((a, b) => a.daysLeft - b.daysLeft);

  return (
    <Card className="glass rounded-xl shadow-purple">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold text-text-primary">
            Pending Deadlines
          </CardTitle>

          <div className="flex items-center gap-2 rounded-xl bg-red-500/10 px-3 py-1 text-xs font-medium text-text-danger">
            <span className="h-2 w-2 rounded-full bg-text-danger animate-pulse" />
            {
              processedTasks.filter((task) => task.status.label !== "Normal")
                .length
            }{" "}
            urgent
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 overflow-y-auto h-80 ">
        {processedTasks.length > 0 ? (
          processedTasks.map((task) => {
            const StatusIcon = task.status.icon;
            const IconColor = task.status.iconColor;
            return (
              <div
                key={task.id}
                className="
                  group
                  flex items-center justify-between
                  rounded-xl
                  border border-white/10
                  glass
                  px-4 py-3
                  transition-all duration-300
                  hover:bg-white/5
                  hover:border-white/20
                "
              >
                <div className="flex items-start gap-3">
                  <div
                    className="
                      mt-0.5
                      rounded-xl
                      bg-white/5
                      p-2
                      text-text-primary
                    "
                  >
                    <StatusIcon className={IconColor} size={16} />
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-text-primary">
                      {task.title}
                    </h3>

                    <p className="mt-1 text-xs text-text-muted">
                      {task.daysLeft <= 0
                        ? `${Math.abs(task.daysLeft)} day${
                            Math.abs(task.daysLeft) > 1 ? "s" : ""
                          } overdue`
                        : task.daysLeft === 0
                          ? "Due today"
                          : `${task.daysLeft} day${
                              task.daysLeft > 1 ? "s" : ""
                            } remaining`}
                    </p>
                  </div>
                </div>

                <div
                  className={`
                    flex items-center gap-1.5
                    rounded-full
                    px-3 py-1
                    text-[10px]
                    font-semibold
                    uppercase tracking-wide
                    ${task.status.className}
                  `}
                >
                  <StatusIcon size={12} />
                  {task.status.label}
                </div>
              </div>
            );
          })
        ) : (
          <div
            className="
              flex flex-col items-center justify-center
              rounded-2xl
              border border-dashed border-white/10
              py-10 text-center
            "
          >
            <div className="rounded-full bg-emerald-500/10 p-3 text-emerald-400">
              <CheckCircle2 size={22} />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-white">
              All deadlines are under control
            </h3>

            <p className="mt-1 text-xs text-gray-400">
              No urgent or overdue tasks found.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
