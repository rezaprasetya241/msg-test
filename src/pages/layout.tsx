import Navbar from "@/components/layout/navbar";
import Sidebar from "@/components/layout/sidebar";
import { Outlet } from "react-router-dom";

const DashboardPage = () => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="px-7 py-6 w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
};
export default DashboardPage;
