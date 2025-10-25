import { ParkingSpot, ParkingSpotData, SpotType } from "./ParkingSpot";

interface ParkingGridProps {
  spots: ParkingSpotData[];
  selectedSpot: string | null;
  onSpotClick: (spotId: string) => void;
  filterType: "all" | SpotType;
}

export const ParkingGrid = ({ spots, selectedSpot, onSpotClick, filterType }: ParkingGridProps) => {
  const filteredSpots = filterType === "all" 
    ? spots 
    : spots.filter(spot => spot.type === filterType);

  const row1 = filteredSpots.filter(s => s.row === 1);
  const row2 = filteredSpots.filter(s => s.row === 2);
  const row3 = filteredSpots.filter(s => s.row === 3);
  const row4 = filteredSpots.filter(s => s.row === 4);

  const renderRow = (rowSpots: ParkingSpotData[]) => (
    <div className="flex gap-1 justify-center">
      {rowSpots.map((spot) => (
        <ParkingSpot
          key={spot.id}
          spot={spot}
          isSelected={selectedSpot === spot.id}
          onClick={() => onSpotClick(spot.id)}
        />
      ))}
    </div>
  );

  return (
    <div className="flex flex-col gap-2 p-4 bg-background rounded-lg">
      {/* Top Row */}
      {row1.length > 0 && renderRow(row1)}
      
      {/* Main Drive Aisle 1 */}
      {row1.length > 0 && (
        <div className="bg-[hsl(var(--aisle-bg))] text-white py-2 px-4 rounded text-center text-sm font-medium">
          Main Drive Aisle
        </div>
      )}
      
      {/* Middle Two Rows Close Together */}
      {row2.length > 0 && renderRow(row2)}
      {row3.length > 0 && (
        <div className="mt-0.5">
          {renderRow(row3)}
        </div>
      )}
      
      {/* Main Drive Aisle 2 */}
      {(row2.length > 0 || row3.length > 0) && (
        <div className="bg-[hsl(var(--aisle-bg))] text-white py-2 px-4 rounded text-center text-sm font-medium mt-1">
          Main Drive Aisle
        </div>
      )}
      
      {/* Bottom Row */}
      {row4.length > 0 && (
        <div className="mt-1">
          {renderRow(row4)}
        </div>
      )}
    </div>
  );
};
