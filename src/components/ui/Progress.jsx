import { ChartSpline, TrendingUp } from "lucide-react";

function ProgressLine({ progress, bgColor }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs">
        <span className="text-text-secondary">Progress</span>
        <span className="text-text-primary">{progress}%</span>
      </div>

      <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${progress}%`,
            backgroundColor: bgColor || "#7F56D9",
          }}
        />
      </div>
    </div>
  );
}

export default ProgressLine;

export const ProgressCircle = ({ progress, bgColor }) => {
  return (
    <div
      className="relative w-24 h-24 rounded-full flex items-center justify-center"
      style={{
        background: `conic-gradient(
          ${bgColor || "#7F56D9"} ${progress * 3.6}deg,
          rgba(255,255,255,0.08) 0deg
        )`,
      }}
    >
      {/* Inner circle */}
      <div className="w-20 h-20 rounded-full bg-[#0f172a] flex items-center justify-center">
        <TrendingUp style={{ color: bgColor || "#7F56D9" }} size={30} />
      </div>
    </div>
  );
};
