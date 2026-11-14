import type { MenuItem } from "@/utils/menuitems";
import { useNavigate } from "react-router";
import SVG from "react-inlinesvg";
import Logo from "../../assets/logo.svg";
interface CommonNavProps {
  navItems: MenuItem[];
  isAdmin?: boolean;
}

export default function CommonNav({ navItems, isAdmin }: CommonNavProps) {
  const navigate = useNavigate();
  return (
    <section className="h-screen flex flex-col relative ">
      {/* logo */}
      <div
        className={`h-35 shrink-0  flex flex-col items-center  py-2  ${isAdmin ? "bg-secondary" : "bg-primary"}`}
      >
        <SVG src={Logo} width={40} height={40} className="text-amber-100 " />
        <h1 className="tracking-widest capitalize font-bold ">
          Greenfield Academy
        </h1>
      </div>
      {/* nav items */}
      <div className="flex-1 min-h-0 px-1 z-10 relative -mt-8 ">
        <div className="h-full rounded-t-2xl bg-card flex flex-col ">
          {navItems.map((item, index) => {
            return (
              <div key={index} className={`flex flex-col  justify-center `}>
                <div className="flex items-center px-4 mt-3 ">
                  <h1 className="text-gray-500 tracking-wider text-sm ">
                    {" "}
                    {item.label}{" "}
                  </h1>
                </div>
                <div className="flex flex-col gap-2 px-1.5">
                  {item.items.map((singleItem, index) => {
                    // const Icon = singleItem.icon;
                    return (
                      <div
                        key={index}
                        onClick={() => navigate(singleItem.path)}
                        className="h-12 rounded-md  flex items-center px-4   cursor-pointer"
                      >
                        <h1>{singleItem.name}</h1>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
