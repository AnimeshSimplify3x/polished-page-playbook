import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Eye, RotateCw, Download } from "lucide-react";
import { format } from "date-fns";

const ETLHistory = () => {
  const [date, setDate] = useState<Date>();

  const jobs = [
    { 
      jobId: "JOB-2025-089", 
      distributor: "ABC Beverages", 
      timestamp: "2025-11-25 09:30", 
      duration: "2m 15s",
      records: 1250, 
      errors: 0,
      status: "Success"
    },
    { 
      jobId: "JOB-2025-088", 
      distributor: "XYZ Distributors", 
      timestamp: "2025-11-25 09:00", 
      duration: "0m 45s",
      records: 0, 
      errors: 3,
      status: "Failed"
    },
    { 
      jobId: "JOB-2025-087", 
      distributor: "Premium Drinks Co", 
      timestamp: "2025-11-25 08:30", 
      duration: "1m 55s",
      records: 980, 
      errors: 0,
      status: "Success"
    },
    { 
      jobId: "JOB-2025-086", 
      distributor: "South Beverages Ltd", 
      timestamp: "2025-11-25 08:00", 
      duration: "3m 10s",
      records: 2150, 
      errors: 1,
      status: "Partial"
    },
    { 
      jobId: "JOB-2025-085", 
      distributor: "ABC Beverages", 
      timestamp: "2025-11-25 07:30", 
      duration: "2m 05s",
      records: 1100, 
      errors: 0,
      status: "Success"
    },
  ];

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      "Success": "bg-success text-white",
      "Failed": "bg-destructive text-white",
      "Partial": "bg-warning text-white",
      "Running": "bg-info text-white",
    };
    return <Badge className={colors[status] || ""}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Global ETL Job History</h1>
          <p className="text-muted-foreground">View and manage all ETL job executions across distributors</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export Report
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Distributor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Distributors</SelectItem>
                <SelectItem value="abc">ABC Beverages</SelectItem>
                <SelectItem value="xyz">XYZ Distributors</SelectItem>
                <SelectItem value="pdc">Premium Drinks Co</SelectItem>
                <SelectItem value="sbl">South Beverages Ltd</SelectItem>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
                <SelectItem value="running">Running</SelectItem>
              </SelectContent>
            </Select>

            <Button>Apply Filters</Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Job ID</TableHead>
                <TableHead className="font-semibold">Distributor</TableHead>
                <TableHead className="font-semibold">Timestamp</TableHead>
                <TableHead className="font-semibold">Duration</TableHead>
                <TableHead className="font-semibold">Records Processed</TableHead>
                <TableHead className="font-semibold">Errors</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job, index) => (
                <TableRow key={index} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{job.jobId}</TableCell>
                  <TableCell>{job.distributor}</TableCell>
                  <TableCell className="text-muted-foreground">{job.timestamp}</TableCell>
                  <TableCell>{job.duration}</TableCell>
                  <TableCell>{job.records.toLocaleString()}</TableCell>
                  <TableCell>
                    {job.errors > 0 ? (
                      <span className="text-destructive font-medium">{job.errors}</span>
                    ) : (
                      <span className="text-muted-foreground">{job.errors}</span>
                    )}
                  </TableCell>
                  <TableCell>{getStatusBadge(job.status)}</TableCell>
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
    </div>
  );
};

export default ETLHistory;
