import CommonNav from "@/components/Common/CommonNav";
import { AdminMenuItems } from "@/utils/menuitems";
import { Outlet } from "react-router";

export default function AdminIndex() {
  return (
    <main className="flex ">
      <div className="w-64 h-full  ">
        <CommonNav navItems={AdminMenuItems} isAdmin={true} />
      </div>
      <div className="container-main mt-2.5">
        <Outlet />
      </div>
    </main>
  );
}
