import { Badge } from "@/components/ui/badge";
import { Flag } from "lucide-react";

const styles = {
  status: {
    "Not Started": {
      badge:
        "bg-gray-500/10 text-gray-400 border border-gray-500/20 shadow-[0_0_20px_rgba(107,114,128,0.2)]",
      dot: "bg-gray-400",
    },
    Planning: {
      badge:
        "bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.25)]",
      dot: "bg-purple-400",
    },
    "In Progress": {
      badge:
        "bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.25)]",
      dot: "bg-blue-400",
    },
    Completed: {
      badge:
        "bg-green-500/10 text-green-400 border border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.25)]",
      dot: "bg-green-400",
    },
    Blocked: {
      badge:
        "bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-[0_0_20px_rgba(249,115,22,0.25)]",
      dot: "bg-orange-400",
    },
    Testing: {
      badge:
        "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.25)]",
      dot: "bg-indigo-400",
    },
  },

  priority: {
    High: {
      badge:
        "bg-red-500/10 text-red-400 border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.25)]",
      icon: "text-red-400",
    },
    Medium: {
      badge:
        "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 shadow-[0_0_20px_rgba(234,179,8,0.25)]",
      icon: "text-yellow-400",
    },
    Low: {
      badge:
        "bg-green-500/10 text-green-400 border border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.25)]",
      icon: "text-green-400",
    },
  },
};

export function ProjectBadge({ type, value }) {
  const currentStyle = styles?.[type]?.[value];

  if (!currentStyle) return null;

  if (type === "status") {
    return (
      <Badge variant="outline" className={`${currentStyle.badge} p-3 gap-2`}>
        <span
          className={`${currentStyle.dot} h-2 w-2 rounded-full animate-pulse`}
        />

        {value}
      </Badge>
    );
  }

  if (type === "priority") {
    return (
      <Badge variant="outline" className={`${currentStyle.badge} p-3 gap-2`}>
        <Flag size={14} className={currentStyle.icon} />

        {value}
      </Badge>
    );
  }
}
