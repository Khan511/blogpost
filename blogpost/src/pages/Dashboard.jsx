import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/dashboard/DashSidebar";
import DashProfile from "../components/dashboard/DashProfile";

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
    </div>
  );
};

export default Dashboard;
