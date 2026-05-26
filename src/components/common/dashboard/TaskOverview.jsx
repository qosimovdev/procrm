import { MoreHorizontalIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function TableActions({ tasks }) {
  const priorityStyles = {
    High: {
      bg: "rgba(239, 68, 68, 0.2)",
      text: "#ef4444",
    },
    Medium: {
      bg: "rgba(245, 158, 11, 0.2)",
      text: "#f59e0b",
    },
    Low: {
      bg: "rgba(34, 197, 94, 0.2)",
      text: "#22c55e",
    },
  };
  return (
    <div className="overflow-x-auto rounded-xl shadow-purple">
      <Table className="text-text-primary">
        <TableHeader className="glass ">
          <TableRow className="hover:bg-black/10">
            <TableHead className="text-text-primary font-bold text-lg">
              Tasks
            </TableHead>
            <TableHead className="text-text-primary font-bold text-lg">
              Projects
            </TableHead>
            <TableHead className="text-text-primary font-bold text-lg">
              Assignee
            </TableHead>
            <TableHead className="text-text-primary font-bold text-lg">
              Priority
            </TableHead>
            <TableHead className="text-text-primary font-bold text-lg">
              Status
            </TableHead>
            <TableHead className="text-text-primary font-bold text-lg">
              Progress
            </TableHead>
            <TableHead className="text-text-primary font-bold text-lg">
              Due Date
            </TableHead>
            <TableHead className="text-right text-text-primary font-bold text-lg">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {tasks.map((task, index) => (
            <TableRow
              key={index}
              className="hover:bg-white/5 transition text-base text-text-secondary"
            >
              <TableCell className="">{task.name}</TableCell>
              <TableCell>{task.project}</TableCell>
              <TableCell>{task.assignee}</TableCell>
              <TableCell>
                <span
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: priorityStyles[task.priority].bg,
                    color: priorityStyles[task.priority].text,
                  }}
                >
                  {task.priority}
                </span>
              </TableCell>
              <TableCell>
                <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs">
                  {task.status}
                </span>
              </TableCell>
              <TableCell>
                <div className="w-28 h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-purple-500 rounded-full"
                    style={{ width: `${task.progress}%` }}
                  />
                </div>
              </TableCell>
              <TableCell>{task.dueDate}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 rounded-xl hover:bg-white/10 hover:glass hover:shadow-purple hover:text-text-primary transition-all duration-300"
                    >
                      <MoreHorizontalIcon className="size-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="glass text-text-primary "
                  >
                    <DropdownMenuItem className="hover:bg-gradient-dark">
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-gradient-dark">
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
