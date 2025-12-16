import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Store, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface CreateOutletModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: OutletFormData) => void;
  prefilledData?: Partial<OutletFormData>;
}

export interface OutletFormData {
  outletName: string;
  outletType: string;
  licenseNumber: string;
  city: string;
  state: string;
  area: string;
}

const outletTypes = ["Retail", "Bar", "Club", "Restaurant", "Hotel", "Others"];

const indianStates = [
  "Maharashtra", "Karnataka", "Tamil Nadu", "Gujarat", "Delhi",
  "West Bengal", "Rajasthan", "Uttar Pradesh", "Madhya Pradesh",
  "Andhra Pradesh", "Telangana", "Kerala", "Punjab", "Haryana",
];

const CreateOutletModal = ({
  open,
  onOpenChange,
  onSubmit,
  prefilledData,
}: CreateOutletModalProps) => {
  const [formData, setFormData] = useState<OutletFormData>({
    outletName: prefilledData?.outletName || "",
    outletType: prefilledData?.outletType || "",
    licenseNumber: prefilledData?.licenseNumber || "",
    city: prefilledData?.city || "",
    state: prefilledData?.state || "",
    area: prefilledData?.area || "",
  });

  const handleSubmit = () => {
    onSubmit(formData);
    onOpenChange(false);
  };

  const isValid = formData.outletName && formData.outletType && formData.city && formData.state;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Store className="w-5 h-5 text-primary" />
            </div>
            <div>
              <DialogTitle>Create New Outlet</DialogTitle>
              <DialogDescription>
                This will create a new outlet request pending approval
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Alert className="border-amber-200 bg-amber-50">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800 text-sm">
            New outlets require approval before they can be used for mapping.
          </AlertDescription>
        </Alert>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="outletName">Outlet Name *</Label>
            <Input
              id="outletName"
              value={formData.outletName}
              onChange={(e) => setFormData({ ...formData, outletName: e.target.value })}
              placeholder="Enter outlet name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="outletType">Outlet Type *</Label>
              <Select
                value={formData.outletType}
                onValueChange={(value) => setFormData({ ...formData, outletType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {outletTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="licenseNumber">License Number</Label>
              <Input
                id="licenseNumber"
                value={formData.licenseNumber}
                onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                placeholder="Optional"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="state">State *</Label>
              <Select
                value={formData.state}
                onValueChange={(value) => setFormData({ ...formData, state: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {indianStates.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="Enter city"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="area">Area / Locality</Label>
            <Input
              id="area"
              value={formData.area}
              onChange={(e) => setFormData({ ...formData, area: e.target.value })}
              placeholder="Enter area or locality"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!isValid}>
            Create & Submit for Approval
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOutletModal;
