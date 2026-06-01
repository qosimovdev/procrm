import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  Settings,
} from "lucide-react";

function Sidebar() {
  const links = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Projects", icon: FolderKanban, path: "/projects" },
    { name: "Tasks", icon: CheckSquare, path: "/tasks" },
    { name: "Team", icon: Users, path: "/team" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <aside className="w-20 min-h-full glass-strong rounded-xl p-4 m-6 my-5 mr-0 shadow-purple md:w-56 lg:w-66">
      <h1 className="hidden md:block text-gradient text-2xl font-bold mb-8">
        ProCRM
      </h1>
      <h1 className="block md:hidden text-gradient text-2xl font-bold mb-8">
        PC
      </h1>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `
                flex items-center rounded-xl px-4 py-2 text-xl
                transition-colors duration-300 transform hover:scale-102
                ${
                  isActive
                    ? "bg-gradient-primary text-text-primary border border-border shadow-purple"
                    : "text-text-secondary hover:bg-primary/50 hover:text-white"
                }
              `
              }
            >
              <link.icon size={20} />
              <span className="ml-3 hidden md:block">{link.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
