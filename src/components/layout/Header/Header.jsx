import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Search, User, Settings, LogOut, Bell } from "lucide-react";
import { NavLink } from "react-router-dom";
import useAuthStore from "@/stores/authStore";
import { useQueryClient } from "@tanstack/react-query";
import { Alert } from "../Alert/Alert";
import { useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const queryClient = useQueryClient();
  const handleLogout = () => {
    logout();
    queryClient.clear();
    navigate("/auth/login");
  };
  // console.log(user);

  const avatarSrc = user?.avatar
    ? `${import.meta.env.VITE_SERVER_URL}${user.avatar}`
    : "/default-avatar.png";
  return (
    <header className="sticky top-0 z-10 p-3 glass-strong rounded-xl shadow-purple ">
      <div className="flex items-center justify-between">
        {/* SEARCH */}
        <div className="relative w-96">
          <Search
            className="
              absolute left-3 top-1/2
              size-4 -translate-y-1/2
              text-slate-400
              z-10
            "
          />
          <Input
            placeholder="Search..."
            className="pl-10 glass-strong border text-white placeholder:text-slate-500 shadow-purple"
          />
        </div>
        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          {/* NOTIFICATION */}
          <Button
            size="lg"
            className="btn btn-primary py-5 px-3 glass-strong border border-white/10 shadow-purple cursor-pointer rounded-xl"
          >
            <Bell className="size-5" />
          </Button>
          {/* PROFILE DROPDOWN */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="cursor-pointer outline-none">
                <Avatar
                  size="lg"
                  className="glass-strong !rounded-full shadow-purple transition-all duration-300 hover:scale-105"
                >
                  <AvatarImage src={avatarSrc} alt={user?.fullName} />
                  <AvatarFallback>
                    {user?.fullName
                      ?.split(" ")
                      .map((item) => item[0])
                      .join("")
                      .slice(0, 2) || "IQ"}
                  </AvatarFallback>
                  <AvatarBadge className="bg-emerald-500" />
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-64 glass-strong border border-white/10"
            >
              {/* USER INFO */}
              <DropdownMenuLabel className="py-3">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={avatarSrc} alt={user?.fullName} />

                    <AvatarFallback>
                      {user?.fullName
                        ?.split(" ")
                        .map((item) => item[0])
                        .join("")
                        .slice(0, 2) || "IQ"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      {user?.fullName}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {user?.position || "Not yet entred"}
                    </p>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                asChild
                className="h-10 cursor-pointer text-text-secondary hover:bg-primary/50 hover:text-text-primary"
              >
                <NavLink to="/profile">
                  <User className="size-4" />
                  Profile
                </NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="h-10 cursor-pointer text-text-secondary hover:bg-primary/50 hover:text-text-primary"
              >
                <NavLink to="/settings">
                  <Settings className="size-4" />
                  Settings
                </NavLink>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                asChild
                variant="destructive"
                className="h-10 cursor-pointer hover:bg-destructive/50 text-destructive"
              >
                <Alert
                  alerTitle="Log out"
                  alertDesc="Are you sure?"
                  firstBtnText="Log Out"
                  firstBtnIcon={<LogOut />}
                  btnText="Log Out"
                  icon={<LogOut />}
                  handler={() => handleLogout()}
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

export default Header;
