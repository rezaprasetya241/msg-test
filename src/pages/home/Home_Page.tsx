import { useBookings } from "@/api/query/booking";
import CardBooking from "@/components/molecules/CardBooking";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import ThunderImg from "../../assets/Generation.svg";

const HomePage = () => {
  const { data } = useBookings();
  const [periode, setPeriode] = useState<string>(data?.[0].period || "");

  const handleChange = (event: string) => {
    setPeriode(event);
  };
  return (
    <div>
      <div>
        <Label>Periode</Label>
        <Select value={periode} onValueChange={handleChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            {data?.map((item, key) => {
              return (
                <SelectItem value={item.period} key={key}>
                  {item.period}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <div className="mt-5">
        {data
          ?.filter((val) => val.period === periode)
          .map((item) => {
            return (
              <div className="flex gap-2 ">
                {item.data.map((val) => {
                  return (
                    <div>
                      <div className="flex items-center gap-3 text-[#4D4D4D] font-bold">
                        <img src={ThunderImg} alt="logo" />
                        {val.officeName}
                      </div>
                      <div className="flex flex-col gap-2">
                        {val.detailSummary.map((summary) => {
                          return <CardBooking item={summary} />;
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default HomePage;
