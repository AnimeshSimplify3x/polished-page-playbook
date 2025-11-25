import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Store, Package, MapPin, DollarSign, AlertCircle } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const stats = [
    { 
      icon: Store, 
      label: "Total Distributors", 
      value: "24",
      color: "primary"
    },
    { 
      icon: Package, 
      label: "Active ETL", 
      value: "18",
      color: "info"
    },
    { 
      icon: AlertCircle, 
      label: "Paused ETL", 
      value: "6",
      color: "secondary"
    },
    { 
      icon: DollarSign, 
      label: "Recent Failures", 
      value: "3",
      color: "accent"
    },
  ];

  const weeklyData = [
    { week: "Week 1", units: 800 },
    { week: "Week 2", units: 1500 },
    { week: "Week 3", units: 1800 },
    { week: "Week 4", units: 2400 },
  ];

  const monthlyData = [
    { month: "Apr", value: 18 },
    { month: "May", value: 25 },
    { month: "Jun", value: 22 },
    { month: "Jul", value: 32 },
    { month: "Aug", value: 38 },
  ];

  const yearlyData = [
    { year: "2020", KTK: 5, MHA: 8, GA: 12 },
    { year: "2021", KTK: 15, MHA: 18, GA: 22 },
    { year: "2022", KTK: 25, MHA: 28, GA: 15 },
    { year: "2023", KTK: 32, MHA: 25, GA: 38 },
    { year: "2024", KTK: 42, MHA: 48, GA: 45 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your ETL system performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl bg-${stat.color} bg-opacity-10`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Sales */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Weekly Sales</CardTitle>
            <CardDescription>
              Karnataka Region<br />
              Budweiser Magnum<br />
              April 25
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }}
                />
                <Bar dataKey="units" fill="hsl(var(--chart-1))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Growth */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Monthly Growth</CardTitle>
            <CardDescription>
              Pondicherry Region<br />
              Budweiser Premium<br />
              April-August 25
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--chart-2))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--chart-2))", r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* YoY Growth */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>YoY Growth</CardTitle>
            <CardDescription>
              KTK/MHA/GA Region<br />
              Corona<br />
              2020-25
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={yearlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="KTK" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                <Line type="monotone" dataKey="MHA" stroke="hsl(var(--chart-3))" strokeWidth={2} />
                <Line type="monotone" dataKey="GA" stroke="hsl(var(--info))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
