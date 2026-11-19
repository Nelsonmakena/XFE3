import CustomSheet from "@/components/inputs/sidepanel";
import { getAccountRoleList, newAccountRole } from "@/store/accounts";
import { getEmployeeRoleList, newEmployeeRole } from "@/store/employee";
import { type AppDispatch, type RootState } from "@/store/store";
import { NewAccountRoleINputs, NewEmployeeRoleINputs } from "@/utils/inputs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "@/components/ui/toast";
import { AvatarFormatter } from "@/utils/utils";

export default function EmployeeRoles() {
  const {
    employee: { employeeRoles },
    accounts: { accountRoles },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();

  const [EmployeeRoleData, setEmployeeRoleData] = useState({
    role_name: "",
    role_description: "",
  });
  const [accountRoleData, setAccountRoleData] = useState({
    role_name: "",
  });

  const [open, setOpen] = useState({
    openEmployeeRole: false,
    openAccountRole: false,
  });

  useEffect(() => {
    dispatch(getEmployeeRoleList());
    dispatch(getAccountRoleList());
  }, []);

  //adding a new employee role
  const addEmployeeRole = async () => {
    const results = await dispatch(newEmployeeRole(EmployeeRoleData));
    if (results.payload?.success) {
      toast.add({ type: "success", description: results.payload.message });
      setOpen((prev) => ({ ...prev, openEmployeeRole: false }));
      setEmployeeRoleData({
        role_name: "",
        role_description: "",
      });
    } else {
      toast.add({ type: "error", description: results.payload?.message });
      setOpen((prev) => ({ ...prev, openEmployeeRole: true }));
    }
  };

  //adding a new account role
  const addAccountRole = async () => {
    const results = await dispatch(newAccountRole(accountRoleData));
    if (results.payload?.success) {
      toast.add({ type: "success", description: results.payload.message });
      setOpen((prev) => ({ ...prev, openAccountRole: false }));
      setEmployeeRoleData({
        role_name: "",
        role_description: "",
      });
    } else {
      toast.add({ type: "error", description: results.payload?.message });
      setOpen((prev) => ({ ...prev, openAccountRole: true }));
    }
  };

  return (
    <section className="flex flex-col space-y-10">
      <div className="m-5">
        <p className="capitalize tracking-widest"> employee roles </p>
      </div>
      <div className="grid grid-cols-3 gap-5">
        <div className="flex items-center justify-center px-5">
          <CustomSheet
            title="new employee role"
            trigger={{ name: "new employee role" }}
            formFields={NewEmployeeRoleINputs}
            states={{
              open: open.openEmployeeRole,
              setOpen: (value) => {
                setOpen((prev) => ({ ...prev, openEmployeeRole: value }));
              },
              inputs: EmployeeRoleData,
            }}
            actions={{
              onFieldChange: setEmployeeRoleData,
              onSubmit: addEmployeeRole,
            }}
          />
        </div>
        {employeeRoles.map((role) => {
          return (
            <div
              key={role.role_id}
              className="rounded-md p-4 transition cursor-pointer shadow-sm bg-card"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-primary ">
                      {role.role_name}
                    </h3>

                    <p className="mt-0.5 text-xs">{role.role_description}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <h1 className="text-[12px] tracking-widest ">
                  Total employees
                  <span
                    className={`font-bold px-2 ${role.employeeCount > 0 ? "text-accent" : "text-destructive"}`}
                  >
                    {role.employeeCount}
                  </span>
                </h1>
              </div>
            </div>
          );
        })}
      </div>
      <div className="m-5">
        <p className="capitalize tracking-widest"> account roles </p>
      </div>
      <div className="grid grid-cols-3">
        <div className="flex items-center justify-center px-5">
          <CustomSheet
            title="new employee role"
            trigger={{ name: "new account role" }}
            formFields={NewAccountRoleINputs}
            states={{
              open: open.openAccountRole,
              setOpen: (value) => {
                setOpen((prev) => ({ ...prev, openAccountRole: value }));
              },
              inputs: accountRoleData,
            }}
            actions={{
              onFieldChange: setAccountRoleData,
              onSubmit: addAccountRole,
            }}
          />
        </div>
        {accountRoles.map((role) => {
          return (
            <div className="rounded-md p-4 transition cursor-pointer shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted/50 text-sm font-semibold">
                    <span className="text-primary">
                      {AvatarFormatter(role.role_name, "R")}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-primary ">
                      {role.role_name}
                    </h3>

                    <p className="mt-0.5 text-xs text-gray-500">
                      {role.account_role_id}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <h1 className="text-[12px] tracking-widest text-muted">
                  Total employees
                  <span
                    className={`font-bold px-2 ${role.employeeCount > 0 ? "text-accent" : "text-destructive"}`}
                  >
                    {/* {role.employeeCount} */}
                  </span>
                </h1>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
