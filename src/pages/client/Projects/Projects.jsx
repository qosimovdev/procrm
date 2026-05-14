import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";

function Projects() {
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
  const projectsData = [
    {
      id: 1,
      projectName: "Project Alpha",
      client: "Acme Corp",
      description: "A cutting-edge project management tool.",
      status: "In Progress",
      priority: "High",
      progress: 68,
      budget: 45000,
      spent: 29000,
      startDate: "2026-10-01",
      deadline: "2026-12-31",
      tags: ["React", "Node.js", "UI/UX"],
      teamMembers: [
        {
          id: 1,
          name: "Alice Johnson",
          role: "Project Manager",
          avatar: "/avatars/alice.png",
        },
        {
          id: 2,
          name: "Bob Smith",
          role: "Developer",
          avatar: "/avatars/bob.png",
        },
      ],
      tasks: [
        {
          name: "Design Landing Page",
          description: "Create responsive landing page UI",
          assignee: "Charlie Brown",
          status: "In Progress",
          priority: "Medium",
          progress: 60,
          dueDate: "2026-11-30",
          comments: 12,
          attachments: 4,
        },
      ],
      activity: [
        {
          id: 1,
          user: "Alice Johnson",
          action: "Updated project status",
          time: "2 hours ago",
        },
      ],
    },
    {
      id: 1,
      projectName: "Project Alpha",
      client: "Acme Corp",
      description: "A cutting-edge project management tool.",
      status: "Planning",
      priority: "High",
      progress: 8,
      budget: 45000,
      spent: 29000,
      startDate: "2026-10-01",
      deadline: "2026-12-31",
      tags: ["React", "Node.js", "UI/UX"],
      teamMembers: [
        {
          id: 1,
          name: "Alice Johnson",
          role: "Project Manager",
          avatar: "/avatars/alice.png",
        },
        {
          id: 2,
          name: "Bob Smith",
          role: "Developer",
          avatar: "/avatars/bob.png",
        },
      ],
      tasks: [
        {
          name: "Design Landing Page",
          description: "Create responsive landing page UI",
          assignee: "Charlie Brown",
          status: "In Progress",
          priority: "Medium",
          progress: 60,
          dueDate: "2026-11-30",
          comments: 12,
          attachments: 4,
        },
      ],
      activity: [
        {
          id: 1,
          user: "Alice Johnson",
          action: "Updated project status",
          time: "2 hours ago",
        },
      ],
    },
    {
      id: 2,
      projectName: "Nova CRM System",
      client: "TechVision LLC",
      description:
        "Modern CRM platform for managing sales and customer relationships.",
      status: "In Progress",
      priority: "Medium",
      progress: 56,
      budget: 78000,
      spent: 42000,
      startDate: "2026-09-15",
      deadline: "2027-01-20",
      tags: ["Vue.js", "Laravel", "TailwindCSS"],
      teamMembers: [
        {
          id: 3,
          name: "Emma Wilson",
          role: "UI/UX Designer",
          avatar: "/avatars/emma.png",
        },
        {
          id: 4,
          name: "Daniel Lee",
          role: "Backend Developer",
          avatar: "/avatars/daniel.png",
        },
      ],
      tasks: [
        {
          name: "CRM Dashboard",
          description: "Develop analytics dashboard with charts",
          assignee: "Emma Wilson",
          status: "Review",
          priority: "High",
          progress: 85,
          dueDate: "2026-12-05",
          comments: 18,
          attachments: 6,
        },
      ],
      activity: [
        {
          id: 2,
          user: "Daniel Lee",
          action: "Completed API integration",
          time: "5 hours ago",
        },
      ],
    },
    {
      id: 3,
      projectName: "E-Commerce Platform",
      client: "Global Store",
      description:
        "Scalable online shopping platform with payment integration.",
      status: "Development",
      priority: "High",
      progress: 72,
      budget: 120000,
      spent: 86000,
      startDate: "2026-08-10",
      deadline: "2027-02-15",
      tags: ["Next.js", "Stripe", "MongoDB"],
      teamMembers: [
        {
          id: 5,
          name: "Sophia Martinez",
          role: "Frontend Developer",
          avatar: "/avatars/sophia.png",
        },
        {
          id: 6,
          name: "James Anderson",
          role: "DevOps Engineer",
          avatar: "/avatars/james.png",
        },
      ],
      tasks: [
        {
          name: "Payment Gateway Integration",
          description: "Integrate Stripe payment system",
          assignee: "James Anderson",
          status: "In Progress",
          priority: "Critical",
          progress: 70,
          dueDate: "2026-12-18",
          comments: 24,
          attachments: 8,
        },
      ],
      activity: [
        {
          id: 3,
          user: "Sophia Martinez",
          action: "Updated frontend components",
          time: "1 day ago",
        },
      ],
    },
  ];
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
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-4 my-5 mt-6">
        {projectsData.map((project, index) => (
          <Card
            key={index}
            className="w-full glass-strong hover:border-purple-500/30 transition-all text-primary shadow-purple"
          >
            <CardHeader className="flex items-start gap-5 ">
              <div
                className="relative w-24 h-24 rounded-full flex items-center justify-center"
                style={{
                  background: `conic-gradient(
                  #8b5cf6 ${project.progress * 3.6}deg,
                   rgba(255,255,255,0.08) 0deg
                  )`,
                }}
              >
                {/* Inner circle */}
                <div className="w-20 h-20 rounded-full bg-[#0f172a] flex items-center justify-center">
                  <h3 className="text-white font-semibold text-lg">
                    {project.progress}%
                  </h3>
                </div>
              </div>
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
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-text-secondary">Progress</span>
                  <span className="text-text-primary">{project.progress}%</span>
                </div>

                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-primary rounded-full"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

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
