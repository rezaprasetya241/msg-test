import { itemMenu } from "@/lib/types/sidebar-menu";
import { LuHome } from "react-icons/lu";
import { CiFileOn } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";

const listMenu: itemMenu[] = [
  {
    name: "Home",
    displayName: "Home",
    url: "/",
    icon: <LuHome />,
  },
  {
    name: "meeting_room",
    displayName: "Ruang Meeting",
    url: "/meeting",
    icon: <CiFileOn />,
  },
];
const Sidebar = () => {
  const location = useLocation();
  return (
    <div className="py-5 px-4 bg-white shadow-md min-h-screen">
      <div className="flex flex-col gap-3">
        {listMenu.map((item, key) => {
          return (
            <Link
              key={key}
              to={item.url}
              className={`${
                location.pathname === item.url
                  ? "text-white bg-main"
                  : "text-main"
              }
                p-3 rounded-lg text-[18px]`}
            >
              {item.icon}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
