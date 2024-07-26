/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from "../ui/card";
import { RoomsBooking } from "@/lib/types/booking/booking";
import CircularProgress from "./CircularPercentage";
import { formatRupiah } from "@/lib/utils";
interface Props {
  item: RoomsBooking;
}

const CardBooking = ({ item }: Props) => {
  return (
    <Card className="max-w-[240px] bg-[#F2F2F2]">
      <CardContent className="flex flex-col gap-2 p-3">
        <p>{item.roomName}</p>
        <div className="flex items-center gap-3 justify-between">
          <div>
            <p className="text-xs">Persentase Pemakaian</p>
            <p className="font-bold text-xl">
              {item.averageOccupancyPerMonth}%
            </p>
          </div>

          <CircularProgress
            percentage={Number(item.averageOccupancyPerMonth)}
          />
        </div>
        <div>
          <p className="text-xs">Nominal Konsumsi</p>
          <p className="font-bold text-xl">
            {formatRupiah(
              item.totalConsumption.reduce((sum, item) => {
                return sum + Number(item.totalPrice);
              }, 0)
            )}
          </p>
        </div>
        {item.totalConsumption.map((snack) => {
          return (
            <div className="grid grid-cols-2 gap-2 items-center">
              <p className="text-xs font-semibold">{snack.name}</p>
              <div className="">
                <p className="text-xs">{snack.totalPackage}</p>
                <div
                  className="bg-blue-400 h-2.5 rounded-full max-w-[100%]"
                  style={{ width: `${Number(snack.totalPackage) / 2}px` }}
                ></div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default CardBooking;
