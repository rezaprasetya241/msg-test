import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";
import Logo from "../../assets/pln.svg";

const Navbar = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [username] = useState("John Doe");
  return (
    <div className="bg-gradient-to-r from-[#18A2BA] to-[#296377] flex items-center px-6 justify-between text-white py-2">
      <div className="flex items-center gap-5">
        <img src={Logo} alt="logo" />
        <h3 className="font-bold">iMeeting</h3>
      </div>
      <div className="flex items-center text-sm gap-3">
        <MdOutlineNotificationsNone className="w-[18px] h-[18px]" />
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>{username}</AvatarFallback>
        </Avatar>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex items-center gap-2">
              {username} <FiChevronDown className="mt-1" />
            </div>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
