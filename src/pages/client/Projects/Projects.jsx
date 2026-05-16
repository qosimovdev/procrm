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
import { Plus } from "lucide-react";
import { getProjects } from "../../../api/projects.service";
function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const statusStyles = {
    "Not Started": "bg-gray-500/10 text-gray-400 border border-gray-500/20",
    Planning: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
    "In Progress": "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    "Under Review": "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
    Testing: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20",
    "On Hold": "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
    Blocked: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
    Completed: "bg-green-500/10 text-green-400 border border-green-500/20",
    Cancelled: "bg-red-500/10 text-red-400 border border-red-500/20",
    Archived: "bg-zinc-500/10 text-zinc-400 border border-zinc-500/20",
  };
  const progressColors = {
    Planning: "#a855f7",
    "In Progress": "#3b82f6",
    Completed: "#22c55e",
    Testing: "#6366f1",
    Blocked: "#f97316",
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
  if (loading) return <p className="text-4xl my-0 mx-auto">Loading Projects</p>;
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
        >
          <Plus className=" size-5" /> New Project
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 my-5 mt-6">
        {projects.map((project, index) => (
          <Card
            key={index}
            className="w-full glass-strong hover:border-purple-500/30 transition-all text-primary shadow-purple"
          >
            <CardHeader className="flex items-start gap-5 ">
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
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Badge
                  className={`${statusStyles[project.status]} text-sm font-medium p-2`}
                >
                  {project.status}
                </Badge>
              </div>
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

              {/* Budget */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Budget</span>

                <span className="font-medium text-text-primary">
                  ${project.budget.toLocaleString()}
                </span>
              </div>

              {/* Deadline */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Deadline</span>

                <span className="font-medium text-text-primary">
                  {project.deadline}
                </span>
              </div>

              {/* Progress Bar */}
              <ProgressLine progress={project.progress} />

              {/* Button */}
              <Button className="w-full btn-primary rounded-xl">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default Projects;
