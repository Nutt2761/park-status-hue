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
    <div className="flex gap-2 justify-center">
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
    <div className="flex flex-col gap-8 p-6 bg-background rounded-lg">
      {row1.length > 0 && renderRow(row1)}
      {row2.length > 0 && renderRow(row2)}
      
      {/* Main Drive Aisle */}
      {(row2.length > 0 || row3.length > 0) && (
        <div className="bg-[hsl(var(--aisle-bg))] text-white py-3 px-6 rounded text-center font-medium">
          Main Drive Aisle
        </div>
      )}
      
      {row3.length > 0 && renderRow(row3)}
      {row4.length > 0 && renderRow(row4)}
    </div>
  );
};
