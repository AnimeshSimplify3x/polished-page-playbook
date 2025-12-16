import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ConfidenceBadgeProps {
  percentage: number;
  showPercentage?: boolean;
}

const ConfidenceBadge = ({ percentage, showPercentage = true }: ConfidenceBadgeProps) => {
  const getConfidenceLevel = (pct: number) => {
    if (pct >= 80) return { label: "High", className: "bg-green-100 text-green-700 border-green-200" };
    if (pct >= 50) return { label: "Medium", className: "bg-amber-100 text-amber-700 border-amber-200" };
    return { label: "Low", className: "bg-red-100 text-red-700 border-red-200" };
  };

  const { label, className } = getConfidenceLevel(percentage);

  return (
    <div className="flex items-center gap-2">
      {showPercentage && (
        <span className="text-sm font-medium text-muted-foreground">{percentage}%</span>
      )}
      <Badge variant="outline" className={cn("text-xs font-medium", className)}>
        {label}
      </Badge>
    </div>
  );
};

export default ConfidenceBadge;
