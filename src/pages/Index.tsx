import { useState } from "react";
import { Car } from "lucide-react";
import { ParkingGrid } from "@/components/ParkingGrid";
import { SpotDetails } from "@/components/SpotDetails";
import { FilterBar } from "@/components/FilterBar";
import { ParkingSpotData, SpotStatus, SpotType } from "@/components/ParkingSpot";
import { toast } from "sonner";

// Generate initial parking spots data
const generateSpots = (): ParkingSpotData[] => {
  const spots: ParkingSpotData[] = [];
  const statuses: SpotStatus[] = ["available", "available", "available", "available", "available", "reserved", "occupied"];
  const types: SpotType[] = ["standard", "standard", "standard", "standard", "ev-charging", "disabled"];
  
  // Row 1 - 13 spots
  for (let i = 1; i <= 13; i++) {
    spots.push({
      id: `A${i}`,
      status: "available",
      type: "standard",
      row: 1
    });
  }
  
  // Row 2 - 13 spots with mixed statuses
  for (let i = 1; i <= 13; i++) {
    const status = i === 8 ? "reserved" : (i === 10 || i === 11 || i === 12 ? "occupied" : "available");
    const type: SpotType = i === 8 ? "ev-charging" : "standard";
    spots.push({
      id: `B${i}`,
      status,
      type,
      row: 2
    });
  }
  
  // Row 3 - 13 spots with mixed statuses
  for (let i = 1; i <= 13; i++) {
    const status = i === 8 || i === 9 ? "occupied" : "available";
    const type: SpotType = i === 4 ? "disabled" : "standard";
    spots.push({
      id: `C${i}`,
      status,
      type,
      row: 3
    });
  }
  
  // Row 4 - 13 spots
  for (let i = 1; i <= 13; i++) {
    spots.push({
      id: `D${i}`,
      status: "available",
      type: "standard",
      row: 4
    });
  }
  
  return spots;
};

const Index = () => {
  const [spots, setSpots] = useState<ParkingSpotData[]>(generateSpots());
  const [selectedSpotId, setSelectedSpotId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<"all" | SpotType>("all");

  const handleSpotClick = (spotId: string) => {
    setSelectedSpotId(spotId);
    
    // Cycle through statuses when clicking
    setSpots(prevSpots => 
      prevSpots.map(spot => {
        if (spot.id === spotId) {
          let newStatus: SpotStatus;
          if (spot.status === "available") {
            newStatus = "reserved";
            toast.success(`Spot ${spotId} reserved`);
          } else if (spot.status === "reserved") {
            newStatus = "occupied";
            toast.success(`Spot ${spotId} marked as occupied`);
          } else {
            newStatus = "available";
            toast.success(`Spot ${spotId} is now available`);
          }
          return { ...spot, status: newStatus };
        }
        return spot;
      })
    );
  };

  const selectedSpot = spots.find(s => s.id === selectedSpotId) || null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Car className="w-6 h-6" />
            <h1 className="text-2xl font-bold">Smart Parking</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <FilterBar activeFilter={filterType} onFilterChange={setFilterType} />
        </div>

        <div className="grid lg:grid-cols-[1fr,300px] gap-6">
          <div>
            <ParkingGrid
              spots={spots}
              selectedSpot={selectedSpotId}
              onSpotClick={handleSpotClick}
              filterType={filterType}
            />
          </div>
          
          <div>
            <SpotDetails spot={selectedSpot} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
