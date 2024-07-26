import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BreadcrumbItems } from "@/lib/types/breadcrum";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa6";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import CurrencyInput from "@/components/molecules/CurrencyInput";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { useKonsumsi, useRooms, useUnits } from "@/api/query/unit";
import { useEffect } from "react";

const listUrl: BreadcrumbItems[] = [
  {
    url: "/meeting",
    title: "Ruang Meeting",
  },
  {
    url: "/meeting/create",
    title: "Pesan Ruangan",
  },
];

const CreateMeetingPage = () => {
  const router = useNavigate();
  const formSchema = z.object({
    unit: z.string().optional(),
    room_name: z.string().optional(),
    capacity: z.number().optional(),
    meet_date: z.date(),
    meet_start: z.string().optional(),
    meet_end: z.string().optional(),
    total_participant: z.string().optional(),
    food_type: z.string().optional(),
    total_price: z.string().optional(),
  });
  const { data } = useUnits();
  const { data: dataRooms } = useRooms();
  const { data: dataKonsumsi } = useKonsumsi();

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const onSubmit = () => {
    console.log("submited");
  };

  const getFoodType = (meetStart: string) => {
    const hours = Number(meetStart);
    if (hours < 11) {
      form.setValue("food_type", "Snack Siang");
    } else if (hours >= 11 && hours < 14) {
      form.setValue("food_type", "Makan Siang");
    } else {
      form.setValue("food_type", "Snack Sore");
    }
  };

  const rooms = form.watch("room_name");
  const meet_start = form.watch("meet_start");
  const capacity = form.watch("capacity");
  const participants = form.watch("total_participant");
  useEffect(() => {
    if (rooms) {
      const index = dataRooms?.findIndex((item) => item.id === rooms);
      if (index !== -1 && index !== undefined) {
        form.setValue("capacity", dataRooms?.[index]?.capacity);
      }
    }
  }, [rooms]);
  useEffect(() => {
    if (meet_start) {
      getFoodType(meet_start);
    }
  }, [meet_start]);

  useEffect(() => {
    if (participants) {
      const index = dataKonsumsi?.findIndex(
        (item) => item.name === form.getValues("food_type")
      );
      if (index !== -1 && index !== undefined) {
        const sum =
          Number(dataKonsumsi?.[index]?.maxPrice) * Number(participants);
        form.setValue("total_price", String(sum));
      }
    }
  }, [participants]);
  return (
    <div>
      <div className="flex gap-4">
        <Button
          className="bg-main"
          onClick={() => {
            router(-1);
          }}
        >
          <FaChevronLeft className="w-2 h-3" />
        </Button>
        <div>
          <h3 className="text-2xl font-bold">Ruang Meeting</h3>
          <Breadcrumb>
            <BreadcrumbList>
              {listUrl.map((item, index) => {
                return (
                  <div key={index} className="flex items-center gap-1">
                    <BreadcrumbItem key={index}>
                      <BreadcrumbLink asChild>
                        <Link to={item.url}>{item.title}</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    {index + 1 < listUrl.length && <BreadcrumbSeparator />}
                  </div>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <Card className="w-full mt-8">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                <p className="font-semibold">Informasi Ruang Meeting</p>
                <div className="grid grid-cols-4 gap-5">
                  <div className="flex flex-col gap-2">
                    <FormField
                      control={form.control}
                      name="unit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Unit</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih unit" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {data?.map((item, key) => {
                                return (
                                  <SelectItem value={item.id} key={key}>
                                    {item.officeName}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <FormField
                      control={form.control}
                      name="room_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ruang Meeting</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih Ruang Meeting" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {dataRooms
                                ?.filter(
                                  (item) => item.officeId === form.watch("unit")
                                )
                                ?.map((item, key) => {
                                  return (
                                    <SelectItem value={item.id} key={key}>
                                      {item.roomName}
                                    </SelectItem>
                                  );
                                })}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-5">
                  <div className="flex flex-col gap-2">
                    <FormField
                      control={form.control}
                      name="capacity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Kapasitas</FormLabel>
                          <FormControl>
                            <Input placeholder="0" disabled {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full bg-[#EEEEEE] h-[2px] my-9 rounded-full" />
              <div className="flex flex-col gap-4">
                <p className="font-semibold">Informasi Rapat</p>

                <div className="grid grid-cols-4 gap-5">
                  <div className="flex flex-col gap-2">
                    <FormField
                      control={form.control}
                      name="meet_date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>
                            Tanggal Rapat<span className="text-red-500">*</span>
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {field.value ? (
                                    format(field.value, "dd MMMM yyyy")
                                  ) : (
                                    <span>Pilih Tanggal Rapat</span>
                                  )}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                disabled={(date: any) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <FormField
                      control={form.control}
                      name="meet_start"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Waktu Mulai</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih Waktu Mulai" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {hours?.map((hour, key) => {
                                return (
                                  <SelectItem value={String(hour)} key={key}>
                                    {hour}:00
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <FormField
                      control={form.control}
                      name="meet_end"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Waktu Selesai</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih Waktu Selesai" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {hours?.map((hour, key) => {
                                return (
                                  <SelectItem value={String(hour)} key={key}>
                                    {hour}:00
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-5">
                  <div className="flex flex-col gap-2">
                    <FormField
                      control={form.control}
                      name="total_participant"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Jumlah peserta</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Masukan jumlah peserta"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <FormField
                      control={form.control}
                      name="food_type"
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel className="text-base">
                              Jenis Konsumsi
                            </FormLabel>
                          </div>
                          {dataKonsumsi?.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="food_type"
                              render={({ field }) => {
                                const currentValue = field.value ?? "";
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(
                                          item.name
                                        )}
                                        onCheckedChange={(checked) => {
                                          const updatedValue = checked
                                            ? currentValue
                                            : false;

                                          field.onChange(updatedValue);
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                      {item.name}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-5">
                  <div className="flex flex-col gap-4">
                    <Label>Nominal Konsumsi</Label>
                    <div>
                      <CurrencyInput
                        disabled
                        value={form.watch("total_price")}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full bg-[#EEEEEE] h-[2px] my-9 rounded-full" />
              <div className="flex items-center justify-end gap-5">
                <Button
                  className="text-red-500"
                  variant="ghost"
                  onClick={() => {
                    router("/meeting");
                  }}
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  className="bg-main"
                  disabled={
                    !form.formState.isValid ||
                    Number(capacity) < Number(participants) ||
                    Number(form.watch("meet_start")) >
                      Number(form.watch("meet_end"))
                  }
                >
                  Simpan
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateMeetingPage;
