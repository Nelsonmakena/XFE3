import { Spinner } from "@/components/ui/spinner";
import { checkAuth } from "@/store/auth";
import type { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";

interface Props {
  children: React.ReactNode;
}

export default function Authenticated({ children }: Props) {
  const { isLoading, authenticated, user } = useSelector(
    (state: RootState) => state.auth,
  );
  const location = useLocation();
  //always checking auth status
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch, location.pathname]);

  const path = location.pathname;

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spinner className="size-6" />
      </div>
    );
  }
  const role = user?.role;

  if (!authenticated) {
    if (location.pathname.includes("/admin")) {
      return <Navigate to="/admin-login" />;
    }
    if (location.pathname.includes("/instructor")) {
      return <Navigate to="/login" />;
    }
  }

  //prevention back to login after youve been authenicated
  if (
    authenticated &&
    (path === "/login" ||
      path === "/admin-login" ||
      path === "/wk" ||
      path === "/sys")
  ) {
    if (role === "admin") return <Navigate to="/admin/home" replace />;
    if (role === "client") return <Navigate to="/client/dashboard" replace />;
  }

  //role based access controll

  if (role === "admin" && !path.startsWith("/admin")) {
    return <Navigate to="/admin/home" />;
  }

  if (role === "client" && !path.startsWith("/client")) {
    return <Navigate to="/client/dashboard" />;
  }

  return <>{children}</>;
}
