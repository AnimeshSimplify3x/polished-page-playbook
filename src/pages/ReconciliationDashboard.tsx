import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import GlobalFilterBar from "@/components/GlobalFilterBar";
import { 
  Package, 
  Store, 
  FileText, 
  Clock, 
  CheckCircle,
  ArrowRight,
  TrendingUp,
  TrendingDown
} from "lucide-react";

const ReconciliationDashboard = () => {
  const navigate = useNavigate();

  const kpiCards = [
    {
      title: "Unmapped SKUs",
      value: 234,
      change: -12,
      changeLabel: "vs last month",
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-l-blue-500",
      path: "/sku-mapping",
    },
    {
      title: "Unmapped Outlets",
      value: 156,
      change: 8,
      changeLabel: "vs last month",
      icon: Store,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-l-purple-500",
      path: "/outlet-mapping",
    },
    {
      title: "Unmapped Licenses",
      value: 89,
      change: -5,
      changeLabel: "vs last month",
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-l-orange-500",
      path: "/license-mapping",
    },
    {
      title: "Pending Mappings",
      value: 479,
      change: -9,
      changeLabel: "vs last month",
      icon: Clock,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-l-amber-500",
      path: "/sku-mapping",
    },
    {
      title: "Outlet Approvals Pending",
      value: 23,
      change: 4,
      changeLabel: "new requests",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-l-green-500",
      path: "/outlet-approvals",
    },
  ];

  const recentActivity = [
    { action: "SKU Mapped", item: "Kingfisher Strong 650ml", user: "Rajesh K.", time: "2 min ago" },
    { action: "Outlet Created", item: "Star Wine Shop - Mumbai", user: "Priya S.", time: "15 min ago" },
    { action: "License Mapped", item: "L/MH/2024/12345", user: "Amit R.", time: "32 min ago" },
    { action: "Bulk Mapping", item: "45 SKUs mapped", user: "System", time: "1 hour ago" },
    { action: "Outlet Approved", item: "City Bar - Pune", user: "Admin", time: "2 hours ago" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <GlobalFilterBar />
      
      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reconciliation Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Overview of data reconciliation status and pending actions
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {kpiCards.map((kpi) => (
            <Card
              key={kpi.title}
              className={`cursor-pointer hover:shadow-md transition-all border-l-4 ${kpi.borderColor}`}
              onClick={() => navigate(kpi.path)}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
                    <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-bold text-foreground">{kpi.value.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground mt-1">{kpi.title}</p>
                </div>
                <div className="mt-3 flex items-center gap-1">
                  {kpi.change < 0 ? (
                    <TrendingDown className="w-4 h-4 text-green-600" />
                  ) : (
                    <TrendingUp className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-xs font-medium ${kpi.change < 0 ? "text-green-600" : "text-red-500"}`}>
                    {Math.abs(kpi.change)} {kpi.changeLabel}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Mapping Progress */}
          <Card className="col-span-2">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Mapping Progress by Category</h3>
              <div className="space-y-4">
                {[
                  { label: "SKU Mapping", mapped: 1245, total: 1479, color: "bg-blue-500" },
                  { label: "Outlet Mapping", mapped: 892, total: 1048, color: "bg-purple-500" },
                  { label: "License Mapping", mapped: 567, total: 656, color: "bg-orange-500" },
                ].map((item) => {
                  const percentage = Math.round((item.mapped / item.total) * 100);
                  return (
                    <div key={item.label} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{item.label}</span>
                        <span className="text-muted-foreground">
                          {item.mapped.toLocaleString()} / {item.total.toLocaleString()} ({percentage}%)
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full ${item.color} transition-all`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {activity.action}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {activity.item}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.user} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* State-wise Summary */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">State-wise Unmapped Summary</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">State</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Unmapped SKUs</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Unmapped Outlets</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Unmapped Licenses</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Total Pending</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { state: "Maharashtra", skus: 78, outlets: 45, licenses: 23, total: 146 },
                    { state: "Karnataka", skus: 56, outlets: 34, licenses: 18, total: 108 },
                    { state: "Tamil Nadu", skus: 45, outlets: 28, licenses: 15, total: 88 },
                    { state: "Gujarat", skus: 32, outlets: 25, licenses: 12, total: 69 },
                    { state: "Delhi", skus: 23, outlets: 24, licenses: 21, total: 68 },
                  ].map((row) => (
                    <tr key={row.state} className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4 font-medium">{row.state}</td>
                      <td className="text-right py-3 px-4">{row.skus}</td>
                      <td className="text-right py-3 px-4">{row.outlets}</td>
                      <td className="text-right py-3 px-4">{row.licenses}</td>
                      <td className="text-right py-3 px-4 font-semibold text-primary">{row.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReconciliationDashboard;
