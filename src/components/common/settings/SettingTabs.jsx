import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, BriefcaseBusiness, ShieldCog, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export function SettingTab() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentTab = location.pathname.includes("/profile")
    ? "myProfile"
    : location.pathname.includes("/work")
      ? "workInformation"
      : location.pathname.includes("/security")
        ? "security"
        : "activity";
  const tabClass =
    "text-text-secondary hover:text-text-primary data-[state=active]:text-primary-light mb-5 mr-5";
  return (
    <section>
      <div className="my-5">
        <h1 className="text-3xl text-text-primary font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your workspace and account preferences
        </p>
      </div>
      <Tabs value={currentTab} className="w-full">
        <TabsList
          variant="line"
          className="border-b border-border text-primary w-full justify-start"
        >
          <div className="">
            <TabsTrigger
              className={tabClass}
              value="myProfile"
              onClick={() => navigate("/settings/profile")}
            >
              <User />
              My Profile
            </TabsTrigger>
            <TabsTrigger
              className={tabClass}
              value="workInformation"
              onClick={() => navigate("/settings/work")}
            >
              <BriefcaseBusiness />
              Work Information
            </TabsTrigger>
            <TabsTrigger
              className={tabClass}
              value="security"
              onClick={() => navigate("/settings/security")}
            >
              <ShieldCog />
              Security
            </TabsTrigger>
            <TabsTrigger
              className={tabClass}
              value="activity"
              onClick={() => navigate("/settings/activity")}
            >
              <Activity />
              Activity
            </TabsTrigger>
          </div>
        </TabsList>
      </Tabs>
    </section>
  );
}
