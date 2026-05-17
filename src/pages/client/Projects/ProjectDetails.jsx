import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "@/api/projects.service";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ProjectBadge } from "@/components/projects/ProjectBadge";

function ProjectDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data: project,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["project", id],
    queryFn: () => getProjectById(id),
  });

  if (isLoading) {
    return <p className="text-text-secondary">Loading...</p>;
  }

  if (isError || !project) {
    return <p className="text-text-secondary">Project not found</p>;
  }

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
      <div>
        <div>
          <h1 className="text-3xl font-bold text-text-primary">
            {project.projectName}
          </h1>
          <p className="text-text-secondary">Client: {project.client}</p>
        </div>
        {/* status and priority */}
        <div></div>
      </div>

      <div className="glass-strong p-5 rounded-xl space-y-3">
        <p>{project.description}</p>

        <div className="flex gap-4 text-sm text-text-secondary">
          <ProjectBadge type="status" value={project.status} />
          <ProjectBadge type="priority" value={project.priority} />
        </div>

        <div className="flex gap-4 text-sm text-text-secondary">
          <span>Budget: {project.budget}</span>
          <span>Progress: {project.progress}%</span>
        </div>

        <p>Deadline: {project.deadline}</p>
      </div>
    </section>
  );
}

export default ProjectDetails;
