import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../../../api/projects.api";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import ProgressLine, { ProgressCircle } from "@/components/ui/Progress";
import { Plus, SquareCheckIcon, CalendarDays } from "lucide-react";
import { AvatarGroups } from "@/components/layout/Avatar/AvatarGroup";
import { PaginationDemo } from "@/components/layout/Pagination/Pagination";
import { AddProjectModal } from "@/components/common/projects/AddProjectModal";
import { useNavigate } from "react-router-dom";
import { ProjectBadge } from "@/components/common/projects/ProjectBadge";
import ProjectCardSkeleton from "@/components/common/projects/ProjectCardSkelaton";
import { useModalStore } from "../../../stores/modalStore";

function Projects() {
  const [page, setPage] = useState(1);
  const { openModal, modalType, closeModal } = useModalStore();

  const {
    data: projects = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });
  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to load projects");
    }
  }, [error]);

  const navigate = useNavigate();
  const itemsPerPage = 8;
  const totalProjects = Math.ceil(projects.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const currentProject = projects.slice(startIndex, startIndex + itemsPerPage);

  const progressColors = {
    Planning: "#a855f7",
    "In Progress": "#3b82f6",
    Completed: "#22c55e",
    Testing: "#6366f1",
    Blocked: "#f97316",
  };

  if (isError) {
    return (
      <p className="text-text-danger text-xl">
        Something went wrong while loading projects
      </p>
    );
  }
  if (isLoading) return <ProjectCardSkeleton />;
  return (
    <section>
      <div className="flex items-center justify-between my-5">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Projects</h1>
          <p className="text-text-secondary">
            Manage your projects efficiently.
          </p>
        </div>
        <Button
          variant="default"
          className="btn-primary py-6 px-2 text-lg rounded-xl"
          onClick={() => openModal("create-project")}
        >
          <Plus className=" size-5" /> New Project
        </Button>
        <AddProjectModal
          open={modalType === "create-project"}
          onOpenChange={closeModal}
        />
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 my-5 mt-6">
        {currentProject.map((project) => (
          <Card
            key={project.id}
            className="w-full glass-strong hover:border-purple-500/30 transition-all text-primary shadow-purple flex flex-col justify-between"
          >
            <CardHeader>
              {/* Top badges */}
              <div className="flex justify-between items-center mb-3">
                <ProjectBadge type="status" value={project.status} />
                <ProjectBadge type="priority" value={project.priority} />
              </div>
              <div className="flex items-start gap-5 ">
                {/* Progress Circle */}
                <ProgressCircle
                  progress={project.progress}
                  bgColor={progressColors[project.status] || "#7F56D9"}
                />
                <div>
                  <CardTitle className="text-xl text-text-primary">
                    {project.projectName}
                  </CardTitle>
                  <CardDescription className="text-base text-text-secondary mb-2">
                    {project.client}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <CardDescription className="text-sm text-text-secondary ">
                {project.description}
              </CardDescription>
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    className="bg-white/5 text-text-secondary border border-white/10 text-sm font-medium"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Progress Bar */}
              <ProgressLine progress={project.progress} />

              {/* members, tasks, duedate */}
              <div className="flex items-center justify-between gap-1 text-base text-text-secondary">
                {/* <div className="flex items-center gap-1">
                  <span>
                    <Users size={18} />
                  </span>
                  <p>{project.teamMembers.length} Members</p>
                </div> */}
                <div className="flex items-top gap-1">
                  <span>
                    <SquareCheckIcon size={20} />
                  </span>
                  <p>
                    {`${project.tasksCompleted}/${project.totalTasks}`} Tasks
                  </p>
                </div>
                <div className="flex items-top gap-1">
                  <span>
                    <CalendarDays size={20} />
                  </span>
                  <p>Due {project.deadline}</p>
                </div>
              </div>
              <AvatarGroups />
              {/* Button */}
              <Button
                className="w-full p-4 btn-primary rounded-xl mt-2 opacity-10 hover:opacity-100"
                onClick={() => navigate(`/projects/${project.id}`)}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="w-full sticky bottom-0 z-50 glass-strong text-primary shadow-purple pl-3 pr-1 py-4 ">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <p className="text-sm text-text-secondary">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, projects.length)} of{" "}
            {projects.length} projects
          </p>
          <div className="">
            <PaginationDemo
              page={page}
              setPage={setPage}
              totalPages={totalProjects}
            />
          </div>
        </div>
      </Card>
    </section>
  );
}

export default Projects;
