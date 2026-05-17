import { useEffect, useState } from "react";
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
import { Flag, Plus, SquareCheckIcon, CalendarDays } from "lucide-react";
import { getProjects } from "../../../api/projects.service";
import { AvatarGroups } from "@/components/layout/Avatar/AvatarGroup";
import { PaginationDemo } from "@/components/layout/Pagination/Pagination";
import { AddProjectModal } from "@/components/projects/AddProjectModal";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const itemsPerPage = 8;
  const totalProjects = Math.ceil(projects.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const currentProject = projects.slice(startIndex, startIndex + itemsPerPage);
  const statusStyles = {
    "Not Started":
      "bg-gray-500/10 text-gray-400 border border-gray-500/20 shadow-[0_0_20px_rgba(107,114,128,0.2)]",

    Planning:
      "bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.25)]",

    "In Progress":
      "bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.25)]",

    "Under Review":
      "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.25)]",

    Testing:
      "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.25)]",

    "On Hold":
      "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 shadow-[0_0_20px_rgba(234,179,8,0.25)]",

    Blocked:
      "bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-[0_0_20px_rgba(249,115,22,0.25)]",

    Completed:
      "bg-green-500/10 text-green-400 border border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.25)]",

    Cancelled:
      "bg-red-500/10 text-red-400 border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.25)]",

    Archived:
      "bg-zinc-500/10 text-zinc-400 border border-zinc-500/20 shadow-[0_0_20px_rgba(161,161,170,0.2)]",
  };
  const progressColors = {
    Planning: "#a855f7",
    "In Progress": "#3b82f6",
    Completed: "#22c55e",
    Testing: "#6366f1",
    Blocked: "#f97316",
  };
  const priorityStyles = {
    High: `
    bg-red-500/10
    text-red-400
    border border-red-500/20
    shadow-[0_0_20px_rgba(239,68,68,0.25)]
  `,

    Medium: `
    bg-yellow-500/10
    text-yellow-400
    border border-yellow-500/20
    shadow-[0_0_20px_rgba(234,179,8,0.25)]
  `,

    Low: `
    bg-green-500/10
    text-green-400
    border border-green-500/20
    shadow-[0_0_20px_rgba(34,197,94,0.25)]
  `,
  };
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projects = await getProjects();
        setProjects(projects);
        console.log(projects);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);
  if (loading)
    return (
      <p className="text-4xl my-5 mx-2 text-text-primary">Loading Projects</p>
    );
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
          onClick={() => setAddModalOpen(true)}
        >
          <Plus className=" size-5" /> New Project
        </Button>
        <AddProjectModal open={addModalOpen} onOpenChange={setAddModalOpen} />
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 my-5 mt-6">
        {currentProject.map((project, index) => (
          <Card
            key={index}
            className="w-full glass-strong hover:border-purple-500/30 transition-all text-primary shadow-purple flex flex-col justify-between"
          >
            <CardHeader>
              {/* Top badges */}
              <div className="flex justify-between items-center mb-3">
                <Badge
                  variant="outline"
                  className={`${statusStyles[project.status]} text-sm font-medium p-3`}
                >
                  <span
                    className={`${statusStyles[project.status].split(" ")[0]} h-2 w-2 mr-1 rounded-full  animate-pulse`}
                  />

                  {project.status}
                </Badge>
                <Badge
                  variant="outline"
                  className={`${priorityStyles[project.priority]} text-sm font-medium p-3`}
                >
                  <span>
                    <Flag size={15} />
                  </span>
                  {project.priority}
                </Badge>
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
              <Button className="w-full p-4 btn-primary rounded-xl mt-2 ">
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
