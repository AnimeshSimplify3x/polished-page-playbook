import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import GlobalFilterBar from "@/components/GlobalFilterBar";
import ConfirmationModal from "@/components/ConfirmationModal";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { 
  CheckCircle, 
  Search, 
  Eye, 
  Check, 
  X, 
  RotateCcw,
  Clock,
  User,
  Calendar,
  MapPin,
  FileText
} from "lucide-react";

type ApprovalStatus = "pending" | "approved" | "rejected" | "returned";

const mockData = [
  {
    id: "REQ-2024-001",
    outletName: "New Star Wine Shop",
    outletType: "Retail",
    city: "Mumbai",
    state: "Maharashtra",
    licenseNumbers: ["L/MH/2024/99901"],
    requestedBy: "Rajesh Kumar",
    requestedOn: "2024-12-10",
    status: "pending" as ApprovalStatus,
    currentLevel: "Level 1 - Ops",
    sourceScreen: "Outlet Mapping",
    linkedRecords: 3,
    area: "Andheri West",
    approvalTrail: [
      { level: "Submitted", approver: "Rajesh Kumar", action: "Created", date: "2024-12-10", remarks: "New outlet for Andheri area" },
    ],
  },
  {
    id: "REQ-2024-002",
    outletName: "Royal Club Lounge",
    outletType: "Club",
    city: "Pune",
    state: "Maharashtra",
    licenseNumbers: ["L/MH/2024/99902", "L/MH/2024/99903"],
    requestedBy: "Priya Sharma",
    requestedOn: "2024-12-09",
    status: "pending" as ApprovalStatus,
    currentLevel: "Level 2 - State Admin",
    sourceScreen: "License Mapping",
    linkedRecords: 5,
    area: "Koregaon Park",
    approvalTrail: [
      { level: "Submitted", approver: "Priya Sharma", action: "Created", date: "2024-12-09", remarks: "Premium club outlet" },
      { level: "Level 1 - Ops", approver: "Amit Singh", action: "Approved", date: "2024-12-10", remarks: "Verified details" },
    ],
  },
  {
    id: "REQ-2024-003",
    outletName: "City Wines Express",
    outletType: "Retail",
    city: "Bangalore",
    state: "Karnataka",
    licenseNumbers: ["L/KA/2024/88801"],
    requestedBy: "Vikram Rao",
    requestedOn: "2024-12-08",
    status: "approved" as ApprovalStatus,
    currentLevel: "Completed",
    sourceScreen: "Outlet Mapping",
    linkedRecords: 2,
    area: "Indiranagar",
    approvalTrail: [
      { level: "Submitted", approver: "Vikram Rao", action: "Created", date: "2024-12-08", remarks: "" },
      { level: "Level 1 - Ops", approver: "Sneha Patil", action: "Approved", date: "2024-12-09", remarks: "OK" },
      { level: "Level 2 - State Admin", approver: "Rakesh Gowda", action: "Approved", date: "2024-12-10", remarks: "Approved" },
    ],
  },
  {
    id: "REQ-2024-004",
    outletName: "Paradise Bar",
    outletType: "Bar",
    city: "Chennai",
    state: "Tamil Nadu",
    licenseNumbers: [],
    requestedBy: "Karthik M",
    requestedOn: "2024-12-07",
    status: "rejected" as ApprovalStatus,
    currentLevel: "Rejected",
    sourceScreen: "Outlet Mapping",
    linkedRecords: 1,
    area: "T. Nagar",
    approvalTrail: [
      { level: "Submitted", approver: "Karthik M", action: "Created", date: "2024-12-07", remarks: "" },
      { level: "Level 1 - Ops", approver: "Deepa Iyer", action: "Rejected", date: "2024-12-08", remarks: "Duplicate entry exists" },
    ],
  },
  {
    id: "REQ-2024-005",
    outletName: "Golden Eagle Premium",
    outletType: "Restaurant",
    city: "Hyderabad",
    state: "Telangana",
    licenseNumbers: ["L/TS/2024/77701"],
    requestedBy: "Suresh Reddy",
    requestedOn: "2024-12-06",
    status: "returned" as ApprovalStatus,
    currentLevel: "Level 1 - Ops",
    sourceScreen: "License Mapping",
    linkedRecords: 4,
    area: "Jubilee Hills",
    approvalTrail: [
      { level: "Submitted", approver: "Suresh Reddy", action: "Created", date: "2024-12-06", remarks: "" },
      { level: "Level 1 - Ops", approver: "Anita Rao", action: "Returned", date: "2024-12-07", remarks: "Please verify license number format" },
    ],
  },
];

const statusConfig: Record<ApprovalStatus, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-amber-100 text-amber-700 border-amber-200" },
  approved: { label: "Approved", className: "bg-green-100 text-green-700 border-green-200" },
  rejected: { label: "Rejected", className: "bg-red-100 text-red-700 border-red-200" },
  returned: { label: "Returned", className: "bg-blue-100 text-blue-700 border-blue-200" },
};

const OutletApprovals = () => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [detailsModal, setDetailsModal] = useState<{ open: boolean; item: typeof mockData[0] | null }>({
    open: false,
    item: null,
  });
  const [actionModal, setActionModal] = useState<{
    open: boolean;
    type: "approve" | "reject" | "return";
    item: typeof mockData[0] | null;
  }>({ open: false, type: "approve", item: null });
  const [remarks, setRemarks] = useState("");

  const itemsPerPage = 10;
  const filteredData = statusFilter === "all" 
    ? mockData 
    : mockData.filter((item) => item.status === statusFilter);
  const totalItems = filteredData.length;

  const handleAction = () => {
    console.log(`Action: ${actionModal.type}`, actionModal.item?.id, remarks);
    setActionModal({ open: false, type: "approve", item: null });
    setRemarks("");
  };

  return (
    <div className="min-h-screen bg-background">
      <GlobalFilterBar />
      
      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">New Outlet Approvals</h1>
            <p className="text-muted-foreground mt-1">
              Review and approve new outlet requests
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Pending approvals:</span>
            <span className="font-semibold text-foreground">
              {mockData.filter((i) => i.status === "pending").length}
            </span>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="returned">Returned for Clarification</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by request ID, outlet name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-[120px]">Request ID</TableHead>
                  <TableHead className="w-[180px]">Outlet Name</TableHead>
                  <TableHead className="w-[100px]">Type</TableHead>
                  <TableHead className="w-[120px]">City</TableHead>
                  <TableHead className="w-[120px]">State</TableHead>
                  <TableHead className="w-[140px]">License Numbers</TableHead>
                  <TableHead className="w-[130px]">Requested By</TableHead>
                  <TableHead className="w-[110px]">Requested On</TableHead>
                  <TableHead className="w-[100px]">Status</TableHead>
                  <TableHead className="w-[150px]">Current Level</TableHead>
                  <TableHead className="w-[130px]">Source</TableHead>
                  <TableHead className="w-[80px] text-center">Linked</TableHead>
                  <TableHead className="w-[180px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-mono text-sm font-medium">{item.id}</TableCell>
                    <TableCell className="font-medium">{item.outletName}</TableCell>
                    <TableCell>{item.outletType}</TableCell>
                    <TableCell>{item.city}</TableCell>
                    <TableCell>{item.state}</TableCell>
                    <TableCell className="font-mono text-xs">
                      {item.licenseNumbers.length > 0 
                        ? item.licenseNumbers.join(", ") 
                        : <span className="text-muted-foreground">—</span>
                      }
                    </TableCell>
                    <TableCell>{item.requestedBy}</TableCell>
                    <TableCell>{item.requestedOn}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusConfig[item.status].className}>
                        {statusConfig[item.status].label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{item.currentLevel}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{item.sourceScreen}</TableCell>
                    <TableCell className="text-center">{item.linkedRecords}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setDetailsModal({ open: true, item })}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {item.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-green-600 hover:text-green-700 hover:bg-green-50"
                              onClick={() => setActionModal({ open: true, type: "approve", item })}
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => setActionModal({ open: true, type: "reject", item })}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                              onClick={() => setActionModal({ open: true, type: "return", item })}
                            >
                              <RotateCcw className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing 1-{Math.min(itemsPerPage, totalItems)} of {totalItems} requests
          </p>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      {/* Details Modal */}
      <Dialog open={detailsModal.open} onOpenChange={(open) => setDetailsModal({ ...detailsModal, open })}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Approval Details - {detailsModal.item?.id}
            </DialogTitle>
            <DialogDescription>
              Complete information about this outlet approval request
            </DialogDescription>
          </DialogHeader>

          {detailsModal.item && (
            <div className="space-y-6">
              {/* Proposed Outlet Info */}
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground mb-3">PROPOSED OUTLET INFORMATION</h4>
                <div className="grid grid-cols-2 gap-4 bg-muted/30 p-4 rounded-lg">
                  <div>
                    <p className="text-xs text-muted-foreground">Outlet Name</p>
                    <p className="font-medium">{detailsModal.item.outletName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Type</p>
                    <p className="font-medium">{detailsModal.item.outletType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="font-medium">{detailsModal.item.area}, {detailsModal.item.city}, {detailsModal.item.state}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">License Numbers</p>
                    <p className="font-medium font-mono text-sm">
                      {detailsModal.item.licenseNumbers.length > 0 ? detailsModal.item.licenseNumbers.join(", ") : "—"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Source Data */}
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground mb-3">SOURCE SECONDARY DATA</h4>
                <div className="grid grid-cols-3 gap-4 bg-muted/30 p-4 rounded-lg">
                  <div>
                    <p className="text-xs text-muted-foreground">Source Screen</p>
                    <p className="font-medium">{detailsModal.item.sourceScreen}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Linked Records</p>
                    <p className="font-medium">{detailsModal.item.linkedRecords}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Status</p>
                    <Badge variant="outline" className={statusConfig[detailsModal.item.status].className}>
                      {statusConfig[detailsModal.item.status].label}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Approval Trail */}
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground mb-3">APPROVAL TRAIL</h4>
                <div className="space-y-3">
                  {detailsModal.item.approvalTrail.map((trail, index) => (
                    <div key={index} className="flex gap-4 p-3 border border-border rounded-lg">
                      <div className="flex-shrink-0">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          trail.action === "Approved" ? "bg-green-100 text-green-600" :
                          trail.action === "Rejected" ? "bg-red-100 text-red-600" :
                          trail.action === "Returned" ? "bg-blue-100 text-blue-600" :
                          "bg-muted text-muted-foreground"
                        }`}>
                          {trail.action === "Approved" ? <Check className="w-4 h-4" /> :
                           trail.action === "Rejected" ? <X className="w-4 h-4" /> :
                           trail.action === "Returned" ? <RotateCcw className="w-4 h-4" /> :
                           <Clock className="w-4 h-4" />}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm">{trail.level}</p>
                          <p className="text-xs text-muted-foreground">{trail.date}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <User className="w-3 h-3 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{trail.approver}</span>
                          <span className="text-xs px-2 py-0.5 bg-muted rounded">{trail.action}</span>
                        </div>
                        {trail.remarks && (
                          <p className="text-sm text-muted-foreground mt-2 italic">"{trail.remarks}"</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailsModal({ open: false, item: null })}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Action Modal */}
      <Dialog open={actionModal.open} onOpenChange={(open) => setActionModal({ ...actionModal, open })}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {actionModal.type === "approve" && "Approve Request"}
              {actionModal.type === "reject" && "Reject Request"}
              {actionModal.type === "return" && "Return for Clarification"}
            </DialogTitle>
            <DialogDescription>
              {actionModal.type === "approve" && "This will approve the outlet and make it available for mapping."}
              {actionModal.type === "reject" && "This will reject the outlet request. Please provide a reason."}
              {actionModal.type === "return" && "This will return the request to the submitter for clarification."}
            </DialogDescription>
          </DialogHeader>

          {actionModal.item && (
            <div className="space-y-4">
              <div className="bg-muted/30 p-3 rounded-lg">
                <p className="text-sm text-muted-foreground">Request ID</p>
                <p className="font-medium">{actionModal.item.id}</p>
                <p className="text-sm text-muted-foreground mt-2">Outlet</p>
                <p className="font-medium">{actionModal.item.outletName}</p>
              </div>

              {(actionModal.type === "reject" || actionModal.type === "return") && (
                <div className="space-y-2">
                  <Label htmlFor="remarks">
                    Remarks <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="remarks"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="Please provide reason..."
                    rows={3}
                  />
                </div>
              )}

              {actionModal.type === "approve" && (
                <div className="space-y-2">
                  <Label htmlFor="remarks">Remarks (Optional)</Label>
                  <Textarea
                    id="remarks"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="Add any notes..."
                    rows={2}
                  />
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setActionModal({ open: false, type: "approve", item: null })}>
              Cancel
            </Button>
            <Button
              onClick={handleAction}
              className={
                actionModal.type === "approve" ? "bg-green-600 hover:bg-green-700" :
                actionModal.type === "reject" ? "bg-destructive hover:bg-destructive/90" :
                ""
              }
              disabled={(actionModal.type === "reject" || actionModal.type === "return") && !remarks.trim()}
            >
              {actionModal.type === "approve" && "Approve"}
              {actionModal.type === "reject" && "Reject"}
              {actionModal.type === "return" && "Return for Clarification"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OutletApprovals;
