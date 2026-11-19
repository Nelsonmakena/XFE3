import { getAccountRoleList } from "@/store/accounts";
import { getEmployeeRoleList } from "@/store/employee";
import { type AppDispatch, type RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function EmployeeRoles() {
  const {
    employee: { employeeRoles },
    accounts: { accountRoles },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();
  console.log(employeeRoles);

  useEffect(() => {
    dispatch(getEmployeeRoleList());
    dispatch(getAccountRoleList());
  }, []);
  return (
    <section className="flex flex-col space-y-10">
      <div className="m-5">
        <p className="capitalize tracking-widest"> employee roles </p>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {employeeRoles.map((role) => {
          return (
            <div
              key={role.role_id}
              className="rounded-md p-4 transition cursor-pointer shadow-sm border"
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
                <h1 className="text-[12px] tracking-widest text-muted">
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
        {accountRoles.map((role) => {
          return (
            <div className="rounded-md p-4 transition cursor-pointer shadow-sm border">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-primary ">
                      {role.role_name}
                    </h3>

                    <p className="mt-0.5 text-xs text-gray-500">
                      {role.role_name}
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
