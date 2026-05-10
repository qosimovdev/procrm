import { NavLink } from "react-router-dom";

function Sidebar() {
  const links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Projects", path: "/projects" },
    { name: "Tasks", path: "/tasks" },
    { name: "Developers", path: "/developers" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <aside className="w-66 min-h-full glass rounded-xl p-4 m-6 my-5 mr-0 shadow-purple">
      <h1 className="text-gradient text-2xl font-bold mb-8">ProCRM</h1>
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
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
