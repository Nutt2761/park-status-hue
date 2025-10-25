import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ParkingSpotData } from "./ParkingSpot";

interface SpotDetailsProps {
  spot: ParkingSpotData | null;
}

export const SpotDetails = ({ spot }: SpotDetailsProps) => {
  if (!spot) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">Spot Details</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Select a parking spot to view details
        </CardContent>
      </Card>
    );
  }

  const getTypeLabel = () => {
    switch (spot.type) {
      case "standard":
        return "Standard Car";
      case "ev-charging":
        return "EV Charging";
      case "disabled":
        return "Disabled";
    }
  };

  const getStatusLabel = () => {
    switch (spot.status) {
      case "available":
        return "Available";
      case "reserved":
        return "Reserved";
      case "occupied":
        return "Occupied";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Spot Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-sm text-muted-foreground">Spot ID: {spot.id}</p>
          <p className="text-sm text-muted-foreground">Type: {getTypeLabel()}</p>
          <p className="text-sm text-muted-foreground">Row: {spot.row}</p>
          <p className="text-sm font-medium mt-2">Status: {getStatusLabel()}</p>
        </div>
        {spot.status === "available" && (
          <Button className="w-full bg-[hsl(217,91%,60%)] hover:bg-[hsl(217,91%,50%)]">
            Book Now
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
