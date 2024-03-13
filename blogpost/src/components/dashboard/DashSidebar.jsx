import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { Link } from "react-router-dom";

const DashSidebar = () => {
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlPrams = new URLSearchParams(location.search);
    const tabFromUrl = urlPrams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);


  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={"User"}
              labelColor="dark"
              className="cursor-pointer"
              onClick={() => setTab("profile")}
              as="div"
            >
              Prifile
            </Sidebar.Item>
          </Link>
          <Link to="/dashboard?tab=signout">
            <Sidebar.Item
              active={tab === "signout"}
              icon={HiArrowSmRight}
              className="cursor-pointer"
              onClick={() => setTab("signout")}
              as="div"
            >
              Sign Out
            </Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
