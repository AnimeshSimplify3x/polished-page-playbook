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
import { FileText, Search, Link2, Plus } from "lucide-react";

const mockData = [
  {
    id: 1,
    licenseNumber: "L/MH/2024/54321",
    outletName: "Premium Wine House",
    distributor: "ABC Beverages Pvt Ltd",
    city: "Mumbai",
    state: "Maharashtra",
    salesValue: 325000,
    bestMatch: { id: "OUT-201", name: "Premium Wines - Worli", similarity: 85 },
    options: [
      { id: "OUT-201", name: "Premium Wines - Worli", similarity: 85 },
      { id: "OUT-202", name: "Premium Wine Store - Parel", similarity: 72 },
      { id: "CREATE_NEW", name: "Create New Outlet", similarity: 0 },
    ],
  },
  {
    id: 2,
    licenseNumber: "L/KA/2024/98765",
    outletName: "Garden City Spirits",
    distributor: "XYZ Distributors",
    city: "Bangalore",
    state: "Karnataka",
    salesValue: 278000,
    bestMatch: { id: "OUT-305", name: "Garden City Wines - MG Road", similarity: 90 },
    options: [
      { id: "OUT-305", name: "Garden City Wines - MG Road", similarity: 90 },
      { id: "OUT-306", name: "City Spirits - Koramangala", similarity: 68 },
      { id: "CREATE_NEW", name: "Create New Outlet", similarity: 0 },
    ],
  },
  {
    id: 3,
    licenseNumber: "L/TN/2024/45678",
    outletName: "Marina Bay Lounge",
    distributor: "Metro Beverages",
    city: "Chennai",
    state: "Tamil Nadu",
    salesValue: 456000,
    bestMatch: { id: "OUT-412", name: "Marina Lounge - ECR", similarity: 88 },
    options: [
      { id: "OUT-412", name: "Marina Lounge - ECR", similarity: 88 },
      { id: "OUT-413", name: "Bay View Bar - Besant Nagar", similarity: 75 },
      { id: "CREATE_NEW", name: "Create New Outlet", similarity: 0 },
    ],
  },
  {
    id: 4,
    licenseNumber: "L/GJ/2024/11122",
    outletName: "Sunset Club",
    distributor: "Eastern Distributors",
    city: "Ahmedabad",
    state: "Gujarat",
    salesValue: 189000,
    bestMatch: { id: "OUT-520", name: "Sunset Lounge - SG Highway", similarity: 82 },
    options: [
      { id: "OUT-520", name: "Sunset Lounge - SG Highway", similarity: 82 },
      { id: "OUT-521", name: "Club Sunset - Prahlad Nagar", similarity: 70 },
      { id: "CREATE_NEW", name: "Create New Outlet", similarity: 0 },
    ],
  },
  {
    id: 5,
    licenseNumber: "L/DL/2024/33344",
    outletName: "Capital Beverages",
    distributor: "ABC Beverages Pvt Ltd",
    city: "New Delhi",
    state: "Delhi",
    salesValue: 567000,
    bestMatch: { id: "OUT-615", name: "Capital Wines - Connaught Place", similarity: 92 },
    options: [
      { id: "OUT-615", name: "Capital Wines - Connaught Place", similarity: 92 },
      { id: "OUT-616", name: "Delhi Beverages - Karol Bagh", similarity: 65 },
      { id: "CREATE_NEW", name: "Create New Outlet", similarity: 0 },
    ],
  },
];

const LicenseMapping = () => {
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
            outletName: item.outletName,
            city: item.city,
            state: item.state,
            licenseNumber: item.licenseNumber,
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
            <h1 className="text-2xl font-bold text-foreground">License Mapping</h1>
            <p className="text-muted-foreground mt-1">
              Map license numbers to outlet master
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <FileText className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Total unmapped:</span>
            <span className="font-semibold text-foreground">{totalItems} licenses</span>
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
                  placeholder="Search by license number, outlet, city..."
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
                  <TableHead className="w-[160px]">License Number</TableHead>
                  <TableHead className="w-[200px]">Outlet Name (From Sales)</TableHead>
                  <TableHead className="w-[180px]">Distributor</TableHead>
                  <TableHead className="w-[120px]">City</TableHead>
                  <TableHead className="w-[120px]">State</TableHead>
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
                    <TableCell className="font-mono text-sm font-medium">{item.licenseNumber}</TableCell>
                    <TableCell>{item.outletName}</TableCell>
                    <TableCell className="text-muted-foreground">{item.distributor}</TableCell>
                    <TableCell>{item.city}</TableCell>
                    <TableCell>{item.state}</TableCell>
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
            Showing 1-{Math.min(itemsPerPage, totalItems)} of {totalItems} licenses
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
        title="Confirm License Mapping"
        description={
          confirmModal.type === "single"
            ? "This will map the selected license to the chosen outlet."
            : confirmModal.type === "selected"
            ? `This will map ${selectedItems.length} selected licenses to their chosen outlets.`
            : `This will map all ${totalItems} visible licenses to their best matches.`
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

export default LicenseMapping;
