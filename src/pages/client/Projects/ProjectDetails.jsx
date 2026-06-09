import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  GalleryVerticalEnd,
  Users,
  CalendarDays,
  Banknote,
  Wallet,
  CheckSquare,
  Flag,
  CircleDot,
} from "lucide-react";
import { ProjectBadge } from "@/components/common/projects/ProjectBadge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ProgressCircle } from "@/components/ui/Progress";
import ProjectCardSkeleton from "@/components/common/projects/ProjectCardSkelaton";
import { useProject } from "../../../hooks/projects/useProject";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/stores/modalStore";
import AddTaskModal from "@/components/common/tasks/AddTaskModal";
import ReadMore from "@/components/layout/Readmore/ReadMore";
import { FieldSeparator } from "@/components/ui/field";

function ProjectDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: project, isLoading, isError } = useProject(id);
  const { openModal } = useModalStore();
  const { modalType, closeModal } = useModalStore();

  if (isLoading) {
    return <ProjectCardSkeleton />;
  }
  if (isError || !project) {
    return <p className="text-text-secondary">Project not found</p>;
  }
  const progressColors = {
    Planning: "#a855f7",
    "In Progress": "#3b82f6",
    Completed: "#22c55e",
    Testing: "#6366f1",
    Blocked: "#f97316",
  };

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
  const totalTasks = project.tasks?.length || 0;

  const tasksCompleted =
    project.tasks?.filter((task) => task.status === "DONE").length || 0;

  const completedTaskPercent =
    totalTasks > 0 ? Math.round((tasksCompleted / totalTasks) * 100) : 0;

  const progress =
    totalTasks > 0 ? Math.round((tasksCompleted / totalTasks) * 100) : 0;

  const statsCards = [
    {
      title: "Progress",
      value: `${progress}%`,
      subtitle: project.status,
      icon: (
        <ProgressCircle
          progress={progress}
          bgColor={progressColors[project.status]}
        />
      ),
    },

    {
      title: "Tasks",
      value: `${tasksCompleted} / ${totalTasks}`,
      subtitle: `${completedTaskPercent}% Completed`,
      icon: (
        <div className="p-4 rounded-xl bg-blue-500/10 text-blue-400">
          <CheckSquare />
        </div>
      ),
    },

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
      value: new Date(project.deadline).toLocaleDateString("uz-UZ") || "N/A",
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
  const badges = [
    {
      icon: <CalendarDays />,
      title: "Start Date",
      value: new Date(project.startDate).toLocaleDateString("uz-UZ"),
    },
    {
      icon: <CalendarDays />,
      title: "Due Date",
      value: new Date(project.deadline).toLocaleDateString("uz-UZ"),
    },
    {
      icon: <GalleryVerticalEnd />,
      title: "Category",
      value: project.category,
    },
    {
      icon: <Building2 />,
      title: "Client",
      value: project.client,
    },
  ];
  const tagColors = {
    React: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    "Node.js": "bg-green-500/10 text-green-400 border-green-500/20",
    SocketIO: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    PostgreSQL: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  };
  const getAvatarUrl = (avatar) =>
    avatar
      ? `${import.meta.env.VITE_SERVER_URL}${avatar}`
      : "/default-avatar.jpg";
  return (
    <section className="space-y-6 py-6">
      <div className="flex items-center justify-between">
        {/* BTNS */}
        <Button
          variant="outline"
          onClick={() => navigate("/projects")}
          className="glass p-5 rounded-xl text-text-primary text-base cursor-pointer"
        >
          <ArrowLeft className="mr-1 size-5" />
          Back to Projects
        </Button>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="glass p-5 rounded-xl text-text-primary text-base cursor-pointer"
          >
            Edit Project
          </Button>
          <Button
            onClick={() => openModal("create-task")}
            className="btn-primary p-5 text-base rounded-xl"
          >
            Create Task
          </Button>
        </div>
      </div>

      {/* HERO */}
      <Card className="glass-strong overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col items-start gap-8 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-col gap-6 lg:flex-row w-full">
              <div className="h-56 w-full max-w-xs overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600">
                {project.thumbnail ? (
                  <img
                    src={project.thumbnail}
                    alt={project.projectName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <GalleryVerticalEnd className="size-16 text-text-primary" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0 w-full">
                <div className="mb-3 flex flex-wrap gap-3">
                  <ProjectBadge type="status" value={project.status} />
                  <ProjectBadge type="priority" value={project.priority} />
                </div>
                <h1 className="text-4xl text-text-primary font-bold">
                  {project.projectName}
                </h1>
                <div className="mt-2 max-w-3xl text-text-secondary">
                  <ReadMore text={project.description} />
                </div>
                {/* <p className="mt-2 max-w-3xl text-text-secondary line-clamp-3">
                  {project.description}
                </p> */}

                {/* Badges */}
                <div className="mt-3 grid grid-cols-2 xl:grid-cols-4 gap-4 w-fit">
                  {badges.map((badge, index) => (
                    <div
                      key={index}
                      className="glass flex items-center gap-3 rounded-xl py-3 px-2 w-full"
                    >
                      <div className="shrink-0 text-text-primary">
                        {badge.icon}
                      </div>

                      <div>
                        <p className="text-xs text-text-secondary whitespace-nowrap">
                          {badge.title}
                        </p>
                        <p className="text-sm font-medium text-text-primary whitespace-nowrap">
                          {badge.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags?.map((tag) => (
                    <Badge
                      key={tag}
                      className={`
        rounded-full
        border
        px-3
        py-1
        font-medium
        ${
          tagColors[tag] ||
          "bg-purple-500/10 text-purple-400 border-purple-500/20"
        }
      `}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            {/* Head circle progress */}
            <div className="hidden 2xl:flex flex-col items-center">
              <ProgressCircle
                progress={progress}
                bgColor={progressColors[project.status]}
              />
              <h3 className="mt-4 text-4xl text-text-primary font-bold">
                {progress}%
              </h3>
              <p className="text-text-secondary">Overall Progress</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* STATS */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-6">
        {statsCards.map((card, index) => (
          <Card key={index} className="glass-strong">
            <CardContent className="flex items-center justify-between px-4 py-2">
              <div>
                <p className="text-sm text-text-secondary">{card.title}</p>
                <h3 className="mt-1 text-2xl text-text-primary font-bold">
                  {card.value}
                </h3>
                <p className="mt-1 text-sm text-text-secondary">
                  {card.subtitle}
                </p>
              </div>
              {card.icon}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CONTENT */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* ABOUT */}
        <Card className="glass-strong">
          <CardContent className="p-4">
            <h3 className="text-text-primary text-2xl font-semibold">
              About Project
            </h3>
            <FieldSeparator className="my-2" />
            <p className="text-text-secondary text-lg max-h-50 overflow-y-auto">
              {project.description}
            </p>
            <div className="mt-6 space-y-4">
              <div className="flex justify-between items-center">
                <p className="flex items-center gap-2 text-base text-text-secondary">
                  <Building2 className="size-4" />
                  Client
                </p>
                <Badge className="text-text-primary bg-gray-500/10 border border-gray-500/20 shadow-[0_0_20px_rgba(107,114,128,0.2)] p-3 text-sm">
                  {project.client}
                </Badge>
              </div>
              <FieldSeparator className="mb-2" />
              <div className="flex justify-between items-center">
                <p className="flex items-center gap-2 text-base text-text-secondary">
                  <Flag className="size-4" />
                  Priority
                </p>
                <ProjectBadge type="priority" value={project.priority} />
              </div>
              <FieldSeparator className="mb-2" />

              <div className="flex justify-between items-center">
                <p className="flex items-center gap-2 text-base text-text-secondary">
                  <CircleDot className="size-4" />
                  Status
                </p>
                <ProjectBadge type="status" value={project.status} />
              </div>
              <FieldSeparator className="mb-2" />

              <div className="flex justify-between items-center">
                <p className="flex items-center gap-2 text-base text-text-secondary">
                  <Banknote className="size-4" />
                  Budget
                </p>
                <Badge className="bg-green-500/10 text-green-300 border border-green-600/20 shadow-[0_0_20px_rgba(34,197,94,0.25)] p-3 text-sm">
                  {formatCurrency(project.budgetTotal)}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* MEMBERS */}
        <Card className="glass-strong">
          <CardContent className="p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-2xl text-text-primary font-semibold">
                Team Members ({project.members?.length || 0})
              </h3>
            </div>
            <FieldSeparator className="my-2" />

            <div className="space-y-3 max-h-80 overflow-y-auto">
              {project.members?.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 transition-all hover:bg-white/10"
                >
                  <img
                    src={getAvatarUrl(member.avatar)}
                    alt={member.fullName}
                    className="size-12 rounded-full object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-base font-medium text-text-primary">
                      {member.fullName}
                    </p>
                    <p className="truncate text-sm text-text-secondary">
                      {member.position || "Team Member"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* TASKS */}
        <Card className="glass-strong">
          <CardContent className="p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-2xl font-semibold text-text-primary">
                Recent Tasks ({project.tasks.length || 0})
              </h3>
            </div>
            <FieldSeparator className="my-2" />

            {project.tasks?.length ? (
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {project.tasks.slice(0, 5).map((task) => (
                  <div
                    key={task.id}
                    className="rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:bg-white/10"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-medium text-base text-text-primary">
                          {task.title}
                        </h3>
                        {task.description && (
                          <p className="mt-1 line-clamp-2 text-sm text-text-secondary">
                            {task.description}
                          </p>
                        )}
                      </div>
                      <Badge className="p-3">{task.status}</Badge>
                    </div>

                    <div className="mt-3 flex items-center gap-2 text-xs text-text-secondary">
                      <span className="text-text-primary text-sm">
                        Priority: {task.priority}
                      </span>
                      {task.deadline && (
                        <>
                          <span>•</span>
                          <span className="text-text-primary text-sm">
                            Due:{" "}
                            {new Date(task.deadline).toLocaleDateString(
                              "uz-UZ",
                            )}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-white/10">
                <p className="text-text-secondary">No tasks found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ACTIVITY */}
      <Card className="glass-strong">
        <CardContent className="p-4">
          <h3 className="mb-6 text-2xl text-text-primary font-semibold">
            Project Activity
          </h3>

          <div className="space-y-4">
            <div className="rounded-xl border border-white/10 p-4">
              Project created
            </div>

            <div className="rounded-xl border border-white/10 p-4">
              Team members joined
            </div>

            <div className="rounded-xl border border-white/10 p-4">
              Tasks assigned
            </div>
          </div>
        </CardContent>
        <AddTaskModal
          open={modalType === "create-task"}
          onOpenChange={closeModal}
          projectId={id}
        />
      </Card>
    </section>
  );
}

export default ProjectDetails;
