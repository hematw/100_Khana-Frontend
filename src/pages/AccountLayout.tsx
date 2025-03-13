import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth-context";
import { useEffect } from "react";
import { AccountSidebar } from "@/components/account/account-sidebar";
import { Card } from "@heroui/card";

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
    <div className="flex gap-6 p-6 bg-gray-100 justify-center items-start mt-24">
      <AccountSidebar />
      <Card className="w-[768px] bg-white">
        <Outlet />
      </Card>
    </div>
  );
}

export default AccountLayout;
