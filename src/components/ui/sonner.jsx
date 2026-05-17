import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CheckmarkCircle02Icon,
  InformationCircleIcon,
  Alert02Icon,
  MultiplicationSignCircleIcon,
  Loading03Icon,
} from "@hugeicons/core-free-icons";
const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      icons={{
        success: (
          <HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-4" />
        ),
        info: <HugeiconsIcon icon={InformationCircleIcon} className="size-4" />,
        warning: <HugeiconsIcon icon={Alert02Icon} className="size-4" />,
        error: (
          <HugeiconsIcon
            icon={MultiplicationSignCircleIcon}
            className="size-4"
          />
        ),
        loading: (
          <HugeiconsIcon icon={Loading03Icon} className="size-4 animate-spin" />
        ),
      }}
      {...props}
    />
  );
};
export { Toaster };
