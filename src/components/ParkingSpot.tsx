import { Car } from "lucide-react";
import { cn } from "@/lib/utils";

export type SpotStatus = "available" | "reserved" | "occupied";
export type SpotType = "standard" | "ev-charging" | "disabled";

export interface ParkingSpotData {
  id: string;
  status: SpotStatus;
  type: SpotType;
  row: number;
}

interface ParkingSpotProps {
  spot: ParkingSpotData;
  isSelected: boolean;
  onClick: () => void;
}

export const ParkingSpot = ({ spot, isSelected, onClick }: ParkingSpotProps) => {
  const getStatusColor = () => {
    switch (spot.status) {
      case "available":
        return "bg-[hsl(var(--parking-available))]";
      case "reserved":
        return "bg-[hsl(var(--parking-reserved))]";
      case "occupied":
        return "bg-[hsl(var(--parking-occupied))]";
    }
  };

  const getStatusText = () => {
    switch (spot.status) {
      case "available":
        return "Available";
      case "reserved":
        return "Reserved";
      case "occupied":
        return spot.type === "disabled" ? "Selected" : "Occupied";
    }
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-center justify-center w-12 h-16 border border-foreground/80 rounded-sm transition-all hover:scale-105 cursor-pointer",
        getStatusColor(),
        isSelected && "ring-2 ring-primary"
      )}
    >
      <Car className="w-4 h-4 text-foreground/70" />
      {spot.status !== "available" && (
        <span className="absolute bottom-0.5 text-[8px] font-medium text-foreground/80">
          {getStatusText()}
        </span>
      )}
    </button>
  );
};
