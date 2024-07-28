import { Navbar } from "@/components/Navbar";
import { TableListPermition } from "@/sections/dashboard/user/TableListPermition";
import UserSettings from "@/sections/dashboard/user/UserSettings";
import { useState } from "react";

// import { useNavigate } from "react-router-dom";
const DashboardUser = () => {
  //   const navigate = useNavigate();
  const [tabPosition, setTabPosition] = useState<number>(1);

  return (
    <>
      <Navbar
        level={localStorage.getItem("level") || ""}
        email={localStorage.getItem("email") || ""}
        name={localStorage.getItem("name") || ""}
        tabPosition={tabPosition}
        setTabPosition={setTabPosition}
      />
      {tabPosition == 1 && <TableListPermition />}
      {tabPosition == 2 && <UserSettings />}
    </>
  );
};

export default DashboardUser;
