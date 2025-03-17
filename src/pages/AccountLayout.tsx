import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth-context";
import { useEffect } from "react";
import { AccountSidebar } from "@/components/account/account-sidebar";

function AccountLayout() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      const previousPage = location.state?.from || "/";
      navigate(previousPage, { replace: true });
    }
  }, [isLoggedIn, navigate, location]);

  if (!isLoggedIn) return null;

  return (
    <div className="flex gap-6 p-6 justify-center items-start">
      <AccountSidebar />
      <div className="w-[768px] ">
        <Outlet />
      </div>
    </div>
  );
}

export default AccountLayout;
