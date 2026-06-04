import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  GalleryVerticalEnd,
  // CheckSquare,
  Users,
  CalendarDays,
  Banknote,
  Wallet,
} from "lucide-react";
import { ProjectBadge } from "@/components/common/projects/ProjectBadge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ProgressCircle } from "@/components/ui/Progress";
import ProjectCardSkeleton from "@/components/common/projects/ProjectCardSkelaton";
import { useProject } from "../../../hooks/projects/useProject";

function ProjectDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: project, isLoading, isError } = useProject(id);

  if (isLoading) {
    return <ProjectCardSkeleton />;
  }
  if (isError || !project) {
    return <p className="text-text-secondary">Project not found</p>;
  }
  console.log(project.budgetTotal);

  const progressColors = {
    Planning: "#a855f7",
    "In Progress": "#3b82f6",
    Completed: "#22c55e",
    Testing: "#6366f1",
    Blocked: "#f97316",
  };
  // const completedTaskPercent = project.totalTasks
  //   ? Math.round((project.tasksCompleted / project.totalTasks) * 100)
  //   : 0;
  const budgetPercent = project.budgetTotal
    ? Math.round((project.budgetSpent / project.budgetTotal) * 100)
    : 0;
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };
  const statsCards = [
    {
      title: "Progress",
      value: `${project.progress}%`,
      subtitle: project.status,
      icon: (
        <ProgressCircle
          progress={project.progress}
          bgColor={progressColors[project.status]}
        />
      ),
    },

    // {
    //   title: "Tasks",
    //   value: `${project.tasksCompleted} / ${project.totalTasks}`,
    //   subtitle: `${completedTaskPercent}% Completed`,
    //   icon: (
    //     <div className="p-4 rounded-xl bg-blue-500/10 text-blue-400">
    //       <CheckSquare />
    //     </div>
    //   ),
    // },

    {
      title: "Team Members",
      value: project.members?.length || 0,
      subtitle: "Active members",
      icon: (
        <div className="p-4 rounded-xl bg-purple-500/10 text-purple-400">
          <Users />
        </div>
      ),
    },

    {
      title: "Deadline",
      value: new Date(project.deadline).toLocaleDateString() || "N/A",
      subtitle: "Project due date",
      icon: (
        <div className="p-4 rounded-xl bg-orange-500/10 text-orange-400">
          <CalendarDays />
        </div>
      ),
    },

    {
      title: "Budget",
      value: formatCurrency(project.budgetTotal),
      subtitle: "Total Budget",
      icon: (
        <div className="p-4 rounded-xl bg-green-500/10 text-green-400">
          <Wallet />
        </div>
      ),
    },

    {
      title: "Spent",
      value: formatCurrency(project.budgetSpent),
      subtitle: `${budgetPercent}% used`,
      icon: (
        <div className="p-4 rounded-xl bg-red-500/10 text-red-400">
          <Banknote />
        </div>
      ),
    },
  ];
  return (
    <section className="py-6 space-y-6">
      <div
        onClick={() => navigate("/projects")}
        className="flex items-center gap-2 text-text-secondary cursor-pointer"
      >
        <ArrowLeft />
        Back to Projects
      </div>
      {/* header */}
      <div className="flex items-top justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-text-primary">
            {project.projectName}
          </h1>
          <div className="flex items-center">
            <Badge className="flex items-center gap-2 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.25)] p-3 mr-3">
              <Building2 />
              {project.client}
            </Badge>
            <Badge className="flex items-center gap-2 bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.25)] p-3">
              <GalleryVerticalEnd />
              {project.category || "CRM"}
            </Badge>
          </div>
        </div>
        {/* status and priority */}
        <div className="flex gap-4 text-sm text-text-secondary">
          <ProjectBadge type="status" value={project.status} />
          <ProjectBadge type="priority" value={project.priority} />
        </div>
      </div>
      {/* top cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {statsCards.map((card, index) => (
          <Card
            key={index}
            className="glass-strong hover:border-purple-500/30 transition-all text-primary shadow-purple flex items-start justify-center"
          >
            <CardContent className="flex items-center gap-3">
              {card.icon}
              <div>
                <p className="text-text-secondary font-medium text-sm">
                  {card.title}
                </p>
                <h3 className="text-text-primary text-2xl">{card.value}</h3>
                <p className="text-text-secondary text-sm">{card.subtitle}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default ProjectDetails;
