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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Package, Search, Link2 } from "lucide-react";

const mockData = [
  {
    id: 1,
    secondaryCode: "KF-STR-650-01",
    secondaryName: "Kingfisher Strong Beer 650ml",
    brand: "Kingfisher",
    packSize: "650ml",
    distributor: "ABC Beverages Pvt Ltd",
    salesVolume: 12500,
    bestMatch: { code: "KF-STRONG-650", name: "Kingfisher Strong 650ml", similarity: 92 },
    options: [
      { code: "KF-STRONG-650", name: "Kingfisher Strong 650ml", similarity: 92 },
      { code: "KF-PREMIUM-650", name: "Kingfisher Premium 650ml", similarity: 78 },
      { code: "KF-ULTRA-650", name: "Kingfisher Ultra 650ml", similarity: 65 },
    ],
  },
  {
    id: 2,
    secondaryCode: "BW-MGNM-750",
    secondaryName: "Black & White Magnum 750ml",
    brand: "Black & White",
    packSize: "750ml",
    distributor: "XYZ Distributors",
    salesVolume: 8750,
    bestMatch: { code: "BW-MAG-750", name: "Black & White Magnum 750ml", similarity: 88 },
    options: [
      { code: "BW-MAG-750", name: "Black & White Magnum 750ml", similarity: 88 },
      { code: "BW-REG-750", name: "Black & White Regular 750ml", similarity: 72 },
    ],
  },
  {
    id: 3,
    secondaryCode: "HAY-WH-180",
    secondaryName: "Haywards 5000 Strong 180ml",
    brand: "Haywards",
    packSize: "180ml",
    distributor: "Metro Beverages",
    salesVolume: 25000,
    bestMatch: { code: "HW-5000-180", name: "Haywards 5000 180ml", similarity: 85 },
    options: [
      { code: "HW-5000-180", name: "Haywards 5000 180ml", similarity: 85 },
      { code: "HW-2000-180", name: "Haywards 2000 180ml", similarity: 60 },
    ],
  },
  {
    id: 4,
    secondaryCode: "TUB-STR-650",
    secondaryName: "Tuborg Strong 650ml Can",
    brand: "Tuborg",
    packSize: "650ml",
    distributor: "Eastern Distributors",
    salesVolume: 15200,
    bestMatch: { code: "TUB-STRNG-650", name: "Tuborg Strong 650ml", similarity: 94 },
    options: [
      { code: "TUB-STRNG-650", name: "Tuborg Strong 650ml", similarity: 94 },
      { code: "TUB-GOLD-650", name: "Tuborg Gold 650ml", similarity: 68 },
    ],
  },
  {
    id: 5,
    secondaryCode: "BUD-PREM-330",
    secondaryName: "Budweiser Premium 330ml",
    brand: "Budweiser",
    packSize: "330ml",
    distributor: "ABC Beverages Pvt Ltd",
    salesVolume: 9800,
    bestMatch: { code: "BUD-PR-330", name: "Budweiser Premium 330ml", similarity: 96 },
    options: [
      { code: "BUD-PR-330", name: "Budweiser Premium 330ml", similarity: 96 },
      { code: "BUD-MAG-330", name: "Budweiser Magnum 330ml", similarity: 71 },
    ],
  },
];

const SKUMapping = () => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectedMappings, setSelectedMappings] = useState<Record<number, string>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmModal, setConfirmModal] = useState<{
    open: boolean;
    type: "single" | "selected" | "all";
    itemId?: number;
  }>({ open: false, type: "single" });
  
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
    setSelectedMappings({ ...selectedMappings, [id]: value });
  };

  const handleConfirmMapping = () => {
    // In real app, this would call API
    setConfirmModal({ open: false, type: "single" });
  };

  return (
    <div className="min-h-screen bg-background">
      <GlobalFilterBar />
      
      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">SKU Mapping</h1>
            <p className="text-muted-foreground mt-1">
              Map secondary SKUs to primary SKU master
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Package className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Total unmapped:</span>
            <span className="font-semibold text-foreground">{totalItems} items</span>
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
                  placeholder="Search by SKU code, name, brand..."
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
                  <TableHead className="w-[140px]">Secondary SKU Code</TableHead>
                  <TableHead className="w-[220px]">Secondary SKU Name</TableHead>
                  <TableHead className="w-[120px]">Brand</TableHead>
                  <TableHead className="w-[80px]">Pack Size</TableHead>
                  <TableHead className="w-[180px]">Distributor</TableHead>
                  <TableHead className="w-[100px] text-right">Sales Volume</TableHead>
                  <TableHead className="w-[280px]">Primary SKU (Map To)</TableHead>
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
                    <TableCell className="font-mono text-sm">{item.secondaryCode}</TableCell>
                    <TableCell className="font-medium">{item.secondaryName}</TableCell>
                    <TableCell>{item.brand}</TableCell>
                    <TableCell>{item.packSize}</TableCell>
                    <TableCell className="text-muted-foreground">{item.distributor}</TableCell>
                    <TableCell className="text-right font-medium">
                      {item.salesVolume.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={selectedMappings[item.id] || item.bestMatch.code}
                        onValueChange={(value) => handleMappingChange(item.id, value)}
                      >
                        <SelectTrigger className="h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {item.options.map((option) => (
                            <SelectItem key={option.code} value={option.code}>
                              <div className="flex items-center justify-between gap-3 w-full">
                                <span>{option.name}</span>
                                <span className="text-xs text-muted-foreground">
                                  {option.similarity}%
                                </span>
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
            Showing 1-{Math.min(itemsPerPage, totalItems)} of {totalItems} items
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
                <PaginationLink href="#">3</PaginationLink>
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
        title="Confirm SKU Mapping"
        description={
          confirmModal.type === "single"
            ? "This will map the selected secondary SKU to the chosen primary SKU."
            : confirmModal.type === "selected"
            ? `This will map ${selectedItems.length} selected SKUs to their chosen primary SKUs.`
            : `This will map all ${totalItems} visible SKUs to their best matches.`
        }
        details={[
          { label: "Records affected", value: confirmModal.type === "single" ? 1 : confirmModal.type === "selected" ? selectedItems.length : totalItems },
          { label: "Action", value: "Map to Primary SKU" },
        ]}
        confirmText="Confirm Mapping"
        onConfirm={handleConfirmMapping}
      />
    </div>
  );
};

export default SKUMapping;
