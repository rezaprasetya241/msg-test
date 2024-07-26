import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { BreadcrumbItems } from "@/lib/types/breadcrum";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

const listUrl: BreadcrumbItems[] = [
  {
    url: "/meeting",
    title: "Ruang Meeting",
  },
];
const MeetingPage = () => {
  const router = useNavigate();
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Ruang Meeting</h3>
          <Breadcrumb>
            <BreadcrumbList>
              {listUrl.map((item, index) => {
                return (
                  <>
                    <BreadcrumbItem key={index}>
                      <BreadcrumbLink asChild>
                        <Link to={item.url}>{item.title}</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    {index + 1 < listUrl.length && <BreadcrumbSeparator />}
                  </>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="">
          <Button
            className="bg-main text-sm flex gap-2 items-center font-semibold"
            onClick={() => {
              router("/meeting/create");
            }}
          >
            <FaPlus />
            Pesan Ruangan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MeetingPage;
