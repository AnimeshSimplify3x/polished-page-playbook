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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Eye, RotateCw, Download } from "lucide-react";
import { format } from "date-fns";

const ETLHistory = () => {
  const [date, setDate] = useState<Date>();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  const totalPages = Math.ceil(jobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedJobs = jobs.slice(startIndex, startIndex + itemsPerPage);

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
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="font-semibold w-[140px]">Job ID</TableHead>
                <TableHead className="font-semibold w-[200px]">Distributor</TableHead>
                <TableHead className="font-semibold w-[160px]">Timestamp</TableHead>
                <TableHead className="font-semibold w-[100px]">Duration</TableHead>
                <TableHead className="font-semibold w-[140px]">Records Processed</TableHead>
                <TableHead className="font-semibold w-[80px]">Errors</TableHead>
                <TableHead className="font-semibold w-[100px]">Status</TableHead>
                <TableHead className="font-semibold text-right w-[180px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedJobs.map((job, index) => (
                <TableRow key={index} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-mono text-sm text-muted-foreground">{job.jobId}</TableCell>
                  <TableCell className="font-medium">{job.distributor}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{job.timestamp}</TableCell>
                  <TableCell className="text-sm">{job.duration}</TableCell>
                  <TableCell className="font-medium">{job.records.toLocaleString()}</TableCell>
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
                      <Button variant="outline" size="sm" className="gap-1.5">
                        <Eye className="w-3.5 h-3.5" />
                        View Log
                      </Button>
                      {job.status === "Failed" && (
                        <Button variant="outline" size="sm" className="gap-1.5">
                          <RotateCw className="w-3.5 h-3.5" />
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
        
        {/* Pagination */}
        <div className="border-t p-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    onClick={() => setCurrentPage(i + 1)}
                    isActive={currentPage === i + 1}
                    className="cursor-pointer"
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </Card>
    </div>
  );
};

export default ETLHistory;
