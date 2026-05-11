import { FolderKanban, CheckCircle2, Users, Clock3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";

function Dashboard() {
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
      count: 3,
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
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
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
    </section>
  );
}

export default Dashboard;
