import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Save, Eye, RotateCw } from "lucide-react";

const DistributorProfile = () => {
  const etlHistory = [
    { 
      jobId: "JOB-2025-001", 
      timestamp: "2025-11-25 09:30", 
      status: "Success", 
      records: 1250, 
      duration: "2m 15s", 
      errors: 0 
    },
    { 
      jobId: "JOB-2025-002", 
      timestamp: "2025-11-25 08:30", 
      status: "Failed", 
      records: 0, 
      duration: "0m 45s", 
      errors: 3 
    },
    { 
      jobId: "JOB-2025-003", 
      timestamp: "2025-11-25 07:30", 
      status: "Success", 
      records: 980, 
      duration: "1m 55s", 
      errors: 0 
    },
  ];

  const dataMappings = [
    { source: "customer_id", target: "distributor_customer_id", transformation: "Direct Map" },
    { source: "order_date", target: "transaction_date", transformation: "Date Format (YYYY-MM-DD)" },
    { source: "product_code", target: "sku_code", transformation: "Uppercase + Prefix" },
    { source: "quantity", target: "order_quantity", transformation: "Integer Conversion" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">ABC Beverages</h1>
          <p className="text-muted-foreground">Distributor Code: ABC001</p>
        </div>
        <Badge className="bg-success text-white">Active</Badge>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="etl-config">ETL Configuration</TabsTrigger>
          <TabsTrigger value="etl-history">ETL History</TabsTrigger>
          <TabsTrigger value="data-mapping">Data Mapping</TabsTrigger>
        </TabsList>

        {/* General Tab */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Information</CardTitle>
              <CardDescription>Basic distributor details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Distributor Name</Label>
                  <Input defaultValue="ABC Beverages" />
                </div>
                <div className="space-y-2">
                  <Label>Distributor Code</Label>
                  <Input defaultValue="ABC001" disabled />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Address</Label>
                  <Textarea defaultValue="123 Main Street, Bangalore, Karnataka 560001" rows={3} />
                </div>
                <div className="space-y-2">
                  <Label>Contact Person</Label>
                  <Input defaultValue="Rajesh Kumar" />
                </div>
                <div className="space-y-2">
                  <Label>Contact Email</Label>
                  <Input defaultValue="rajesh@abcbeverages.com" type="email" />
                </div>
                <div className="space-y-2">
                  <Label>Contact Phone</Label>
                  <Input defaultValue="+91 98765 43210" type="tel" />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select defaultValue="active">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <Button className="gap-2">
                  <Save className="w-4 h-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ETL Configuration Tab */}
        <TabsContent value="etl-config" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Database Settings</CardTitle>
              <CardDescription>Configure database connection parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Database Type</Label>
                  <Select defaultValue="postgresql">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="postgresql">PostgreSQL</SelectItem>
                      <SelectItem value="mysql">MySQL</SelectItem>
                      <SelectItem value="mssql">MS SQL Server</SelectItem>
                      <SelectItem value="oracle">Oracle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Host</Label>
                  <Input defaultValue="db.abcbeverages.com" />
                </div>
                <div className="space-y-2">
                  <Label>Port</Label>
                  <Input defaultValue="5432" />
                </div>
                <div className="space-y-2">
                  <Label>Database Name</Label>
                  <Input defaultValue="abc_sales_db" />
                </div>
                <div className="space-y-2">
                  <Label>Username</Label>
                  <Input defaultValue="etl_user" />
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input type="password" defaultValue="••••••••" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Scheduler Configuration</CardTitle>
              <CardDescription>Set up automated ETL job scheduling</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Scheduler Type</Label>
                  <Select defaultValue="interval">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="interval">Interval</SelectItem>
                      <SelectItem value="cron">Cron Expression</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Interval</Label>
                  <Input defaultValue="30" placeholder="Minutes" />
                </div>
                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select defaultValue="ist">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ist">IST (UTC+5:30)</SelectItem>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">EST (UTC-5)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <Button className="gap-2">
                  <Save className="w-4 h-4" />
                  Save Configuration
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ETL History Tab */}
        <TabsContent value="etl-history">
          <Card>
            <CardHeader>
              <CardTitle>ETL Job History</CardTitle>
              <CardDescription>View past ETL job executions and their results</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Job ID</TableHead>
                    <TableHead className="font-semibold">Timestamp</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Records Processed</TableHead>
                    <TableHead className="font-semibold">Duration</TableHead>
                    <TableHead className="font-semibold">Errors</TableHead>
                    <TableHead className="font-semibold text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {etlHistory.map((job, index) => (
                    <TableRow key={index} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{job.jobId}</TableCell>
                      <TableCell>{job.timestamp}</TableCell>
                      <TableCell>
                        <Badge className={job.status === "Success" ? "bg-success text-white" : "bg-destructive text-white"}>
                          {job.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{job.records.toLocaleString()}</TableCell>
                      <TableCell>{job.duration}</TableCell>
                      <TableCell>{job.errors}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="outline" size="sm" className="gap-1">
                            <Eye className="w-3 h-3" />
                            View Log
                          </Button>
                          {job.status === "Failed" && (
                            <Button variant="outline" size="sm" className="gap-1">
                              <RotateCw className="w-3 h-3" />
                              Retry
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data Mapping Tab */}
        <TabsContent value="data-mapping">
          <Card>
            <CardHeader>
              <CardTitle>Data Field Mapping</CardTitle>
              <CardDescription>Configure how source fields map to target fields with transformations</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Source Field</TableHead>
                    <TableHead className="font-semibold">Target Field</TableHead>
                    <TableHead className="font-semibold">Transformation</TableHead>
                    <TableHead className="font-semibold text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dataMappings.map((mapping, index) => (
                    <TableRow key={index} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{mapping.source}</TableCell>
                      <TableCell>{mapping.target}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{mapping.transformation}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          Preview
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DistributorProfile;
