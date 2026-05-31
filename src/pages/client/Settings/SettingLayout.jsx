import { SettingTab } from "@/components/common/settings/SettingTabs";
import { Outlet } from "react-router-dom";

export default function SettingLayout() {
  return (
    <div>
      <SettingTab />
      <Outlet />
    </div>
  );
}
