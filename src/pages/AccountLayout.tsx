// import { Navigate, Outlet } from "react-router-dom";
// import { AppSidebar } from "@/components/app-sidebar";

// export default function ProtectedPages() {
//   const token = localStorage.getItem("token");

//   // if (token) {
//   //   return <Navigate to={"/login"} />
//   // }

//   return (
//     <>
//       <AppSidebar />
//       <main className="min-h-[540px] p-4  grow">
//         {token ? <Outlet /> : <Navigate to={"/login"} />}
//       </main>
//     </>
//   );
// }

// import { Avatar, Button, Card, Input, Sidebar, li } from "@heroui/react";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Input } from "@heroui/input";
import { Camera, Phone, Lock, AtSign, User, Plus, Bookmark, LogOut, Pencil } from "lucide-react";
import { NavLink } from "react-router-dom";

// Sidebar Component
export const AccountSidebar = () => {
  return (
    <div className="w-72 p-4 border rounded-lg bg-white shadow-md space-y-4">
      <Card className="p-4 text-center">
        <Avatar className="w-16 h-16 mx-auto" />
        <p className="text-lg font-semibold">نام کاربر</p>
        <p className="text-sm text-gray-500">نوع فعالیت</p>
      </Card>
      <Card className="p-4 space-y-2">
        <li >
          <NavLink to="/account/edit" className="flex items-center justify-between p-2 text-gray-700 rounded-md">
            <span>ویرایش اطلاعات</span>
            <Pencil className="w-4 h-4 text-red-500" />
          </NavLink>
        </li>
        <li >
          <NavLink to="/account/new-ad" className="flex items-center p-2 text-gray-700 rounded-md">
            <Plus className="w-4 h-4 mr-2" /> ثبت آگهی جدید
          </NavLink>
        </li>
        <li >
          <NavLink to="/account/my-ads" className="flex items-center p-2 text-gray-700 rounded-md">
            <Bookmark className="w-4 h-4 mr-2" /> آگهی‌های من
          </NavLink>
        </li>
        <li >
          <NavLink to="/account/saved-ads" className="flex items-center p-2 text-gray-700 rounded-md">
            <Bookmark className="w-4 h-4 mr-2" /> آگهی‌های ذخیره‌شده
          </NavLink>
        </li>
        <Button variant="destructive" className="w-full mt-4 flex items-center">
          <LogOut className="w-4 h-4 mr-2" /> خروج
        </Button>
      </Card>
    </div>
  );
};

// Profile Form Component
export const ProfileForm = () => {
  return (
    <Card className="p-6 w-full max-w-3xl border rounded-lg shadow-md bg-white space-y-6">
      <h2 className="text-xl font-bold text-gray-800 text-right">ویرایش اطلاعات</h2>
      <div className="relative w-24 h-24 mx-auto">
        <Avatar className="w-24 h-24" />
        <button className="absolute bottom-1 right-1 bg-gray-200 p-1 rounded-full border">
          <Camera className="w-4 h-4 text-gray-600" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input placeholder="شماره موبایل خود را وارد کنید" icon={<Phone />} className="border rounded-lg p-3" />
        <Input placeholder="نام و نام خانوادگی خود را وارد کنید" icon={<User />} className="border rounded-lg p-3" />
        <Input placeholder="رمز عبور وارد کنید" type="password" icon={<Lock />} className="border rounded-lg p-3" />
        <Input placeholder="ایمیل خود را وارد کنید (اختیاری)" icon={<AtSign />} className="border rounded-lg p-3" />
      </div>
      <div className="flex justify-start space-x-4">
        <Button variant="destructive" className="px-6 py-3">ذخیره اطلاعات</Button>
        <Button variant="outline" className="border-red-500 text-red-500 px-6 py-3">انصراف</Button>
      </div>
    </Card>
  );
};

// Page Layout
const AccountPage = () => {
  return (
    <div className="flex gap-6 p-6 bg-gray-100 min-h-screen justify-center items-center">
      <AccountSidebar />
      <ProfileForm />
    </div>
  );
};

export default AccountPage;
