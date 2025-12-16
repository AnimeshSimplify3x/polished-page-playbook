import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import GlobalFilterBar from "@/components/GlobalFilterBar";
import ConfidenceBadge from "@/components/ConfidenceBadge";
import ConfirmationModal from "@/components/ConfirmationModal";
import CreateOutletModal from "@/components/CreateOutletModal";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Store, Search, Link2, Plus } from "lucide-react";

const mockData = [
  {
    id: 1,
    secondaryName: "Star Wine & Beer Shop",
    distributor: "ABC Beverages Pvt Ltd",
    city: "Mumbai",
    state: "Maharashtra",
    licenseNumber: "L/MH/2024/12345",
    salesValue: 245000,
    bestMatch: { id: "OUT-001", name: "Star Wine Shop - Andheri", similarity: 88 },
    options: [
      { id: "OUT-001", name: "Star Wine Shop - Andheri", similarity: 88 },
      { id: "OUT-002", name: "Star Liquor Store - Bandra", similarity: 72 },
      { id: "CREATE_NEW", name: "Create New Outlet", similarity: 0 },
    ],
  },
  {
    id: 2,
    secondaryName: "Royal Bar & Restaurant",
    distributor: "XYZ Distributors",
    city: "Pune",
    state: "Maharashtra",
    licenseNumber: "L/MH/2024/67890",
    salesValue: 380000,
    bestMatch: { id: "OUT-015", name: "Royal Bar - Koregaon Park", similarity: 91 },
    options: [
      { id: "OUT-015", name: "Royal Bar - Koregaon Park", similarity: 91 },
      { id: "OUT-016", name: "Royal Restaurant & Bar", similarity: 82 },
      { id: "CREATE_NEW", name: "Create New Outlet", similarity: 0 },
    ],
  },
  {
    id: 3,
    secondaryName: "City Wines Retail",
    distributor: "Metro Beverages",
    city: "Bangalore",
    state: "Karnataka",
    licenseNumber: "L/KA/2024/11111",
    salesValue: 175000,
    bestMatch: { id: "OUT-045", name: "City Wines - Indiranagar", similarity: 76 },
    options: [
      { id: "OUT-045", name: "City Wines - Indiranagar", similarity: 76 },
      { id: "OUT-046", name: "City Wine Shop - Koramangala", similarity: 68 },
      { id: "CREATE_NEW", name: "Create New Outlet", similarity: 0 },
    ],
  },
  {
    id: 4,
    secondaryName: "Paradise Club Lounge",
    distributor: "Eastern Distributors",
    city: "Chennai",
    state: "Tamil Nadu",
    licenseNumber: "L/TN/2024/22222",
    salesValue: 520000,
    bestMatch: { id: "OUT-078", name: "Paradise Club - T. Nagar", similarity: 94 },
    options: [
      { id: "OUT-078", name: "Paradise Club - T. Nagar", similarity: 94 },
      { id: "OUT-079", name: "Paradise Lounge - Anna Nagar", similarity: 85 },
      { id: "CREATE_NEW", name: "Create New Outlet", similarity: 0 },
    ],
  },
  {
    id: 5,
    secondaryName: "Golden Eagle Wines",
    distributor: "ABC Beverages Pvt Ltd",
    city: "Hyderabad",
    state: "Telangana",
    licenseNumber: null,
    salesValue: 198000,
    bestMatch: { id: "OUT-102", name: "Golden Eagle - Jubilee Hills", similarity: 82 },
    options: [
      { id: "OUT-102", name: "Golden Eagle - Jubilee Hills", similarity: 82 },
      { id: "OUT-103", name: "Eagle Wines - Banjara Hills", similarity: 65 },
      { id: "CREATE_NEW", name: "Create New Outlet", similarity: 0 },
    ],
  },
];

const OutletMapping = () => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectedMappings, setSelectedMappings] = useState<Record<number, string>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmModal, setConfirmModal] = useState<{
    open: boolean;
    type: "single" | "selected" | "all";
    itemId?: number;
  }>({ open: false, type: "single" });
  const [createOutletModal, setCreateOutletModal] = useState<{
    open: boolean;
    prefilledData?: { outletName: string; city: string; state: string; licenseNumber?: string };
  }>({ open: false });

  const itemsPerPage = 10;
  const totalItems = mockData.length;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(mockData.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    }
  };

  const handleMappingChange = (id: number, value: string) => {
    if (value === "CREATE_NEW") {
      const item = mockData.find((i) => i.id === id);
      if (item) {
        setCreateOutletModal({
          open: true,
          prefilledData: {
            outletName: item.secondaryName,
            city: item.city,
            state: item.state,
            licenseNumber: item.licenseNumber || undefined,
          },
        });
      }
    } else {
      setSelectedMappings({ ...selectedMappings, [id]: value });
    }
  };

  const handleConfirmMapping = () => {
    setConfirmModal({ open: false, type: "single" });
  };

  const handleCreateOutlet = (data: any) => {
    console.log("Creating outlet:", data);
    setCreateOutletModal({ open: false });
  };

  return (
    <div className="min-h-screen bg-background">
      <GlobalFilterBar />
      
      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Outlet Mapping</h1>
            <p className="text-muted-foreground mt-1">
              Map secondary outlets to outlet master or create new outlets
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Store className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Total unmapped:</span>
            <span className="font-semibold text-foreground">{totalItems} outlets</span>
          </div>
        </div>

        {/* Action Bar */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedItems.length === mockData.length}
                    onCheckedChange={handleSelectAll}
                  />
                  <span className="text-sm font-medium">Select All</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={selectedItems.length === 0}
                  onClick={() => setConfirmModal({ open: true, type: "selected" })}
                >
                  <Link2 className="w-4 h-4 mr-2" />
                  Map Selected ({selectedItems.length})
                </Button>
                <Button
                  size="sm"
                  onClick={() => setConfirmModal({ open: true, type: "all" })}
                >
                  <Link2 className="w-4 h-4 mr-2" />
                  Map All
                </Button>
              </div>
              <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by outlet name, city, license..."
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
                  <TableHead className="w-12"></TableHead>
                  <TableHead className="w-[200px]">Secondary Outlet Name</TableHead>
                  <TableHead className="w-[180px]">Distributor</TableHead>
                  <TableHead className="w-[120px]">City</TableHead>
                  <TableHead className="w-[120px]">State</TableHead>
                  <TableHead className="w-[150px]">License Number</TableHead>
                  <TableHead className="w-[120px] text-right">Sales Value (₹)</TableHead>
                  <TableHead className="w-[260px]">Outlet Master (Map To)</TableHead>
                  <TableHead className="w-[120px]">Best Match</TableHead>
                  <TableHead className="w-[100px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockData.map((item) => (
                  <TableRow key={item.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell>
                      <Checkbox
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={(checked) => handleSelectItem(item.id, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{item.secondaryName}</TableCell>
                    <TableCell className="text-muted-foreground">{item.distributor}</TableCell>
                    <TableCell>{item.city}</TableCell>
                    <TableCell>{item.state}</TableCell>
                    <TableCell className="font-mono text-sm">
                      {item.licenseNumber || <span className="text-muted-foreground">—</span>}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ₹{item.salesValue.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={selectedMappings[item.id] || item.bestMatch.id}
                        onValueChange={(value) => handleMappingChange(item.id, value)}
                      >
                        <SelectTrigger className="h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {item.options.map((option) => (
                            <SelectItem key={option.id} value={option.id}>
                              <div className="flex items-center gap-2">
                                {option.id === "CREATE_NEW" ? (
                                  <>
                                    <Plus className="w-4 h-4 text-primary" />
                                    <span className="text-primary font-medium">{option.name}</span>
                                  </>
                                ) : (
                                  <>
                                    <span>{option.name}</span>
                                    <span className="text-xs text-muted-foreground">
                                      {option.similarity}%
                                    </span>
                                  </>
                                )}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <ConfidenceBadge percentage={item.bestMatch.similarity} />
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setConfirmModal({ open: true, type: "single", itemId: item.id })}
                      >
                        Map
                      </Button>
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
            Showing 1-{Math.min(itemsPerPage, totalItems)} of {totalItems} outlets
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
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        open={confirmModal.open}
        onOpenChange={(open) => setConfirmModal({ ...confirmModal, open })}
        title="Confirm Outlet Mapping"
        description={
          confirmModal.type === "single"
            ? "This will map the selected secondary outlet to the chosen outlet master."
            : confirmModal.type === "selected"
            ? `This will map ${selectedItems.length} selected outlets to their chosen outlet masters.`
            : `This will map all ${totalItems} visible outlets to their best matches.`
        }
        details={[
          { label: "Records affected", value: confirmModal.type === "single" ? 1 : confirmModal.type === "selected" ? selectedItems.length : totalItems },
          { label: "Action", value: "Map to Outlet Master" },
        ]}
        confirmText="Confirm Mapping"
        onConfirm={handleConfirmMapping}
      />

      {/* Create Outlet Modal */}
      <CreateOutletModal
        open={createOutletModal.open}
        onOpenChange={(open) => setCreateOutletModal({ ...createOutletModal, open })}
        onSubmit={handleCreateOutlet}
        prefilledData={createOutletModal.prefilledData}
      />
    </div>
  );
};

export default OutletMapping;
