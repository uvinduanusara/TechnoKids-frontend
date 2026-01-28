
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  trend: "up" | "down";
  sparklineColor?: string;
}

export function StatCard({
  title,
  value,
  change,
  trend,
  sparklineColor = "#22c55e",
}: StatCardProps) {
  const isPositive = trend === "up";

  return (
    <div className="bg-card border border-border rounded-xl p-5 flex-1 min-w-[200px]">
      <p className="text-sm text-muted-foreground mb-3">{title}</p>
      <div className="flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl font-bold text-foreground">{value}</span>
            <span
              className={cn(
                "flex items-center gap-0.5 text-sm font-medium",
                isPositive ? "text-emerald-500" : "text-red-500",
              )}
            >
              {isPositive ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {Math.abs(change)}%
            </span>
          </div>
          <p className="text-xs text-muted-foreground">compared to last week</p>
        </div>
        <svg width="60" height="30" viewBox="0 0 60 30" className="ml-4">
          <path
            d="M0 25 Q15 20, 25 22 T40 15 T60 5"
            fill="none"
            stroke={sparklineColor}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
