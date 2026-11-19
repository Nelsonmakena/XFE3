import CommonNav from "@/components/Common/CommonNav";
import { AdminMenuItems } from "@/utils/menuitems";
import { Outlet } from "react-router";

export default function AdminIndex() {
  return (
    <main className="flex ">
      <div className="w-64 h-full sticky top-0  ">
        <CommonNav navItems={AdminMenuItems} isAdmin={true} />
      </div>
      <div className="flex-1 container-main mt-2.5 min-w-0">
        <Outlet />
      </div>
    </main>
  );
}
