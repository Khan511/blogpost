import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashUsers from "../components/dashboard/DashUsers";
import DashSidebar from "../components/dashboard/DashSidebar";
import DashProfile from "../components/dashboard/DashProfile";
import { DashPosts } from "../components/dashboard/DashPosts";
import DashComments from "../components/dashComments/DashComments";
import DashBoardComponente from "../components/dashBoardComponente/DashBoardComponente";


const Dashboard = () => {
  const locaiton = useLocation();
  const [tab, setTabe] = useState("");

  useEffect(() => {
    const urlPrams = new URLSearchParams(locaiton.search);
    const tabFromUrl = urlPrams.get("tab");

    if (tabFromUrl) {
      setTabe(tabFromUrl);
    }
  }, [locaiton.search]);

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* SideBar */}
      <div className="md:w-56">
        <DashSidebar />
      </div>

      {/* Profile */}
      {tab === "profile" && (
        <div className="mt-6 w-full">
          <DashProfile />
        </div>
      )}

      {tab === "posts" && (
        <div className="w-full">
          <DashPosts />
        </div>
      )}

      {tab === "users" && (
        <div className="w-full">
          <DashUsers />
        </div>
      )}

      {tab === "comments" && (
        <div className="w-full">
          <DashComments />
        </div>
      )}

      {tab === "dash" && (
        <div className="w-full">
          <DashBoardComponente />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
