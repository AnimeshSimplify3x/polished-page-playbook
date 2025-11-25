import { Card, CardContent } from "@/components/ui/card";
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
import { Plus, Edit, Trash2 } from "lucide-react";

const TeamManagement = () => {
  const users = [
    { 
      name: "John Smith", 
      email: "john.smith@company.com", 
      lastLogin: "2025-11-25 10:30 AM",
      status: "Active",
      modules: ["Dashboard", "Distributor Mgmt", "ETL Logs"]
    },
    { 
      name: "Sarah Johnson", 
      email: "sarah.j@company.com", 
      lastLogin: "2025-11-25 09:15 AM",
      status: "Active",
      modules: ["Dashboard", "ETL Config", "Team Mgmt"]
    },
    { 
      name: "Mike Davis", 
      email: "mike.davis@company.com", 
      lastLogin: "2025-11-24 06:45 PM",
      status: "Inactive",
      modules: ["Dashboard", "ETL Logs"]
    },
    { 
      name: "Emily Wilson", 
      email: "emily.w@company.com", 
      lastLogin: "2025-11-25 08:20 AM",
      status: "Active",
      modules: ["Dashboard", "Distributor Mgmt", "ETL Config", "Global ETL History"]
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Team Management</h1>
          <p className="text-muted-foreground">Manage team members and their access permissions</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Team Member
        </Button>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Full Name</TableHead>
                <TableHead className="font-semibold">Email</TableHead>
                <TableHead className="font-semibold">Last Login</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Modules Assigned</TableHead>
                <TableHead className="font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={index} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="text-muted-foreground">{user.lastLogin}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {user.modules.map((module, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {module}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Edit className="w-3 h-3" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1 text-destructive hover:text-destructive">
                        <Trash2 className="w-3 h-3" />
                        Delete
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

export default TeamManagement;
