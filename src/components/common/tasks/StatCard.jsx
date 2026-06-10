import { Card, CardContent } from "@/components/ui/card";

function StatCard({ title, value, icon: Icon }) {
  return (
    <Card className="glass-strong hover:scale-[1.01] hover:border-purple-500/30 shadow-purple transition-all">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-base text-text-primary">{title}</p>
            <h2 className="text-3xl font-bold mt-2 text-text-primary">
              {value}
            </h2>
          </div>
          {Icon && (
            <div className="p-3 rounded-xl bg-primary/10">
              <Icon className="size-5 text-primary" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default StatCard;
