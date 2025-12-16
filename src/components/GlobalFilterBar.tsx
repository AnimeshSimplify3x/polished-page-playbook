import { Calendar, MapPin, X, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useGlobalFilters } from "@/contexts/GlobalFilterContext";

const months = [
  "January 2024", "February 2024", "March 2024", "April 2024",
  "May 2024", "June 2024", "July 2024", "August 2024",
  "September 2024", "October 2024", "November 2024", "December 2024",
];

const indianStates = [
  "Maharashtra", "Karnataka", "Tamil Nadu", "Gujarat", "Delhi",
  "West Bengal", "Rajasthan", "Uttar Pradesh", "Madhya Pradesh",
  "Andhra Pradesh", "Telangana", "Kerala", "Punjab", "Haryana",
];

const GlobalFilterBar = () => {
  const { filters, setMonth, setStates, removeState, clearFilters, hasActiveFilters } = useGlobalFilters();

  const handleStateToggle = (state: string, checked: boolean) => {
    if (checked) {
      setStates([...filters.states, state]);
    } else {
      removeState(state);
    }
  };

  return (
    <div className="bg-card border-b border-border">
      {/* Filter Controls */}
      <div className="px-6 py-3 flex items-center gap-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Filter className="w-4 h-4" />
          <span className="text-sm font-medium">Filters:</span>
        </div>

        {/* Month Selector */}
        <Select value={filters.month || ""} onValueChange={(val) => setMonth(val || null)}>
          <SelectTrigger className="w-[180px] h-9">
            <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Select Month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((month) => (
              <SelectItem key={month} value={month}>
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* State Multi-Select */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="h-9 min-w-[180px] justify-start">
              <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
              {filters.states.length > 0 ? (
                <span>{filters.states.length} State(s)</span>
              ) : (
                <span className="text-muted-foreground">Select States</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[280px] p-3" align="start">
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {indianStates.map((state) => (
                <div key={state} className="flex items-center space-x-2">
                  <Checkbox
                    id={state}
                    checked={filters.states.includes(state)}
                    onCheckedChange={(checked) => handleStateToggle(state, checked as boolean)}
                  />
                  <label
                    htmlFor={state}
                    className="text-sm font-medium leading-none cursor-pointer"
                  >
                    {state}
                  </label>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Clear Filters */}
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-muted-foreground hover:text-destructive"
          disabled={!hasActiveFilters}
        >
          <X className="w-4 h-4 mr-1" />
          Clear Filters
        </Button>
      </div>

      {/* Active Filter Pills */}
      {hasActiveFilters && (
        <div className="px-6 pb-3 flex items-center gap-2 flex-wrap">
          <span className="text-xs text-muted-foreground">Active:</span>
          {filters.month && (
            <Badge variant="secondary" className="gap-1 pr-1">
              {filters.month}
              <button
                onClick={() => setMonth(null)}
                className="ml-1 hover:bg-muted rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {filters.states.map((state) => (
            <Badge key={state} variant="secondary" className="gap-1 pr-1">
              {state}
              <button
                onClick={() => removeState(state)}
                className="ml-1 hover:bg-muted rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default GlobalFilterBar;
