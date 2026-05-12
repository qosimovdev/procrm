import { useState } from "react";
import { FolderKanban, CheckCircle2, Users, Clock3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "../../../components/ui/card";
import { ChartAreaInteractive } from "../../../components/ui/charts/ChartAreaInteractive";
import { PendingDeadlines } from "../../../components/ui/charts/DeadlineChart";
import { TableActions } from "./TaskOverview";
import { PaginationDemo } from "@/components/layout/Pagination/Pagination";

function Dashboard() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const tasksOverview = [
    {
      id: 1,
      name: "Dashboard UI Design",
      project: "CRM Dashboard",
      assignee: "Alex Morgan",
      priority: "High",
      status: "In Progress",
      progress: 75,
      dueDate: "May 15, 2026",
    },
    {
      id: 2,
      name: "API Integration",
      project: "CRM Dashboard",
      assignee: "Emily Davis",
      priority: "Medium",
      status: "In Progress",
      progress: 50,
      dueDate: "May 20, 2026",
    },
    {
      id: 2,
      name: "API Integration",
      project: "CRM Dashboard",
      assignee: "Emily Davis",
      priority: "Medium",
      status: "In Progress",
      progress: 50,
      dueDate: "May 20, 2026",
    },

    {
      id: 3,
      name: "Mobile Responsive Fixes",
      project: "CRM Dashboard",
      assignee: "Michael Lee",
      priority: "Low",
      status: "Not Started",
      progress: 2,
      dueDate: "May 25, 2026",
    },
    {
      id: 4,
      name: "Mobile Responsive Fixes",
      project: "CRM Dashboard",
      assignee: "Michael Lee",
      priority: "Low",
      status: "Not Started",
      progress: 15,
      dueDate: "May 25, 2026",
    },
    {
      id: 4,
      name: "Mobile Responsive Fixes",
      project: "CRM Dashboard",
      assignee: "Michael Lee",
      priority: "Low",
      status: "Not Started",
      progress: 15,
      dueDate: "May 25, 2026",
    },
  ];
  const totalPages = Math.ceil(tasksOverview.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const currentTasks = tasksOverview.slice(
    startIndex,
    startIndex + itemsPerPage,
  );
  const chartData = [
    { date: "2026-04-01", completed: 10, inProgress: 5 },
    { date: "2026-04-02", completed: 15, inProgress: 7 },
    { date: "2026-04-03", completed: 18, inProgress: 6 },
    { date: "2026-04-04", completed: 22, inProgress: 8 },
    { date: "2026-04-19", completed: 28, inProgress: 10 },
    { date: "2026-04-20", completed: 30, inProgress: 12 },
    { date: "2026-04-21", completed: 35, inProgress: 9 },
    { date: "2026-04-22", completed: 40, inProgress: 11 },
    { date: "2026-05-08", completed: 48, inProgress: 14 },
  ];
  const deadlinesData = [
    {
      title: "CRM API Integration",
      dueDate: "2026-05-12",
    },
    {
      title: "Dashboard UI",
      dueDate: "2026-05-14",
    },
    {
      title: "Dashboard UI",
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
  const data = [
    {
      title: "Active Projects",
      count: 12,
      action: "View Projects",
      icon: FolderKanban,
      route: "/dashboard/active-projects",
      color: "bg-cyan-500/20 text-cyan-400",
    },
    {
      title: "Completed Tasks",
      count: 34,
      action: "View Tasks",
      icon: CheckCircle2,
      route: "/dashboard/completed-tasks",
      color: "bg-purple-500/20 text-purple-400",
    },
    {
      title: "Online Developers",
      count: 5,
      action: "View Online Developers",
      icon: Users,
      route: "/dashboard/online-developers",
      color: "bg-green-500/20 text-green-400",
    },
    {
      title: "Pending Deadlines",
      count: 6,
      action: "View Deadlines",
      icon: Clock3,
      route: "/dashboard/pending-deadlines",
      color: "bg-red-500/20 text-red-400",
    },
  ];

  const navigate = useNavigate();

  return (
    <section>
      <div className="my-4">
        <h1 className="text-3xl font-bold text-text-primary">Dashboard</h1>
        <p className="text-text-secondary mt-1">
          Welcome back, manage your projects efficiently.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {data.map((item, index) => {
          const Icon = item.icon;
          return (
            <Card
              key={index}
              className="
                glass-strong rounded-xl min-h-44 hover:border-purple-500/30 transition-all text-primary shadow-purple"
            >
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle className="text-xl text-text-primary font-medium">
                    {item.title}
                  </CardTitle>

                  <CardDescription className="text-4xl font-bold text-white mt-4">
                    {item.count}
                  </CardDescription>
                </div>
                <div
                  className={`
                    w-12 h-12 rounded-xl
                    flex items-center justify-center
                    ${item.color}
                  `}
                >
                  <Icon size={22} />
                </div>
              </CardHeader>
              <CardContent>
                <p
                  className="text-base text-text-primary-light mt-4 cursor-pointer hover:text-purple-300 transition"
                  onClick={() => navigate(item.route)}
                >
                  {item.action}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 my-5 mt-6">
        <div className=" lg:col-span-2 ">
          <ChartAreaInteractive chartData={chartData} />
        </div>
        <div className="lg:col-span-1">
          <PendingDeadlines deadlines={deadlinesData} />
        </div>
      </div>
      <div>
        <Card className="glass shadow-purple rounded-xl p-4 py-5">
          <CardTitle className="text-2xl text-text-primary ">
            Task Overview
          </CardTitle>
          <TableActions tasks={currentTasks} />
          <div className="flex items-center justify-between my-2">
            <div>
              <CardTitle className="hidden text-sm text-text-secondary font-medium ">
                Showing 1 to 5 of 25 tasks
              </CardTitle>
            </div>
            <div>
              <PaginationDemo
                page={page}
                setPage={setPage}
                totalPages={totalPages}
              />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

export default Dashboard;
