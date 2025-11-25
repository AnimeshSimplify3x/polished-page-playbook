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
import { Search, Plus, Play, Pause, RotateCw, User } from "lucide-react";

const DistributorList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const distributors = [
    { 
      name: "ABC Beverages", 
      code: "ABC001", 
      status: "Active", 
      etlStatus: "Running", 
      lastSync: "2025-11-25 09:30 AM" 
    },
    { 
      name: "XYZ Distributors", 
      code: "XYZ002", 
      status: "Active", 
      etlStatus: "Paused", 
      lastSync: "2025-11-24 08:15 PM" 
    },
    { 
      name: "Premium Drinks Co", 
      code: "PDC003", 
      status: "Active", 
      etlStatus: "Failed", 
      lastSync: "2025-11-25 07:45 AM" 
    },
    { 
      name: "North Region Supply", 
      code: "NRS004", 
      status: "Inactive", 
      etlStatus: "Stopped", 
      lastSync: "2025-11-20 05:30 PM" 
    },
    { 
      name: "South Beverages Ltd", 
      code: "SBL005", 
      status: "Active", 
      etlStatus: "Running", 
      lastSync: "2025-11-25 10:00 AM" 
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      "Active": "default",
      "Inactive": "secondary",
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  const getETLStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      "Running": "bg-success text-white",
      "Paused": "bg-warning text-white",
      "Failed": "bg-destructive text-white",
      "Stopped": "bg-muted text-muted-foreground",
    };
    return <Badge className={colors[status] || ""}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Distributors</h1>
          <p className="text-muted-foreground">Manage all distributor connections and ETL processes</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Distributor
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search distributor name..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="ETL Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All ETL Status</SelectItem>
                <SelectItem value="running">Running</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="stopped">Stopped</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Distributor Name</TableHead>
                <TableHead className="font-semibold">Code</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">ETL Status</TableHead>
                <TableHead className="font-semibold">Last Sync Time</TableHead>
                <TableHead className="font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {distributors.map((distributor, index) => (
                <TableRow key={index} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{distributor.name}</TableCell>
                  <TableCell>{distributor.code}</TableCell>
                  <TableCell>{getStatusBadge(distributor.status)}</TableCell>
                  <TableCell>{getETLStatusBadge(distributor.etlStatus)}</TableCell>
                  <TableCell className="text-muted-foreground">{distributor.lastSync}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <RotateCw className="w-3 h-3" />
                        Retry
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1">
                        {distributor.etlStatus === "Paused" ? (
                          <>
                            <Play className="w-3 h-3" />
                            Resume
                          </>
                        ) : (
                          <>
                            <Pause className="w-3 h-3" />
                            Pause
                          </>
                        )}
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1">
                        <User className="w-3 h-3" />
                        Profile
                      </Button>
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

export default DistributorList;
