import { Button } from "@/components/ui/button";
import { Car, Zap, Accessibility, Grid3x3 } from "lucide-react";
import { SpotType } from "./ParkingSpot";

interface FilterBarProps {
  activeFilter: "all" | SpotType;
  onFilterChange: (filter: "all" | SpotType) => void;
}

export const FilterBar = ({ activeFilter, onFilterChange }: FilterBarProps) => {
  return (
    <div className="flex gap-2 items-center p-4 bg-card rounded-lg border">
      <Button
        variant={activeFilter === "all" ? "default" : "outline"}
        size="sm"
        onClick={() => onFilterChange("all")}
        className="gap-2"
      >
        <Grid3x3 className="w-4 h-4" />
        All
      </Button>
      <Button
        variant={activeFilter === "standard" ? "default" : "outline"}
        size="sm"
        onClick={() => onFilterChange("standard")}
        className="gap-2"
      >
        <Car className="w-4 h-4" />
        Standard
      </Button>
      <Button
        variant={activeFilter === "ev-charging" ? "default" : "outline"}
        size="sm"
        onClick={() => onFilterChange("ev-charging")}
        className="gap-2"
      >
        <Zap className="w-4 h-4" />
        EV Charging
      </Button>
      <Button
        variant={activeFilter === "disabled" ? "default" : "outline"}
        size="sm"
        onClick={() => onFilterChange("disabled")}
        className="gap-2"
      >
        <Accessibility className="w-4 h-4" />
        Disabled
      </Button>
    </div>
  );
};
