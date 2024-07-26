export interface Period {
  createdAt: string;
  period: string;
  data: OfficeName[];
}

export interface OfficeName {
  officeName: string;
  detailSummary: RoomsBooking[];
}

export interface RoomsBooking {
  roomName: string;
  capacity: string;
  averageOccupancyPerMonth: string;
  totalConsumption: konsumsiTerpakai[];
}

export interface konsumsiTerpakai {
  name: string;
  totalPackage: string;
  totalPrice: string;
}
