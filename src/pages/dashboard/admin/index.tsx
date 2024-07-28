import { Navbar } from "@/components/Navbar";
import { TableListPermition } from "@/sections/dashboard/admin/TableListPermition";
import { TableUsers } from "@/sections/dashboard/admin/TableUsers";
import { useState } from "react";

// import { useNavigate } from "react-router-dom";
const DashboardAdmin = () => {
  //   const navigate = useNavigate();
  const [tabPosition, setTabPosition] = useState<number>(1);
  // console.log(level);
  return (
    <>
      <Navbar
        level={localStorage.getItem("level") || ""}
        email={localStorage.getItem("email") || ""}
        name={localStorage.getItem("name") || ""}
        tabPosition={tabPosition}
        setTabPosition={setTabPosition}
      />
      {tabPosition == 1 && <TableUsers />}
      {tabPosition == 2 && <TableListPermition />}
    </>
  );
};

export default DashboardAdmin;
