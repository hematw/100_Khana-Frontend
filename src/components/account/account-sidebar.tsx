import { Avatar } from "@heroui/avatar";
import { Card } from "@heroui/card";
import { Bookmark, LogOut, UserPen, CirclePlus, House } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Listbox, ListboxItem } from "@heroui/listbox";

export function AccountSidebar() {
  return (
    <div className="w-72 rounded-lg space-y-4">
      <Card className="p-4 text-center">
        <Avatar className="w-16 h-16 mx-auto" />
        <p className="text-lg font-semibold">Ahmad</p>
        <p className="text-sm text-gray-500">User</p>
      </Card>
      <Card className="p-4 space-y-2">
        <NavLink
          end
          to="/account"
          className={({ isActive }) =>
            `flex items-center p-2 gap-4 hover:bg-danger-100 hover:text-danger-500 rounded-lg transition duration-250 ${
              isActive ? "bg-danger-100 text-danger-500" : ""
            }`
          }
        >
          <UserPen size={16} />
          <span>Edit Profile</span>
        </NavLink>
        <NavLink
          end
          to="/properties"
          className={({ isActive }) =>
            `flex items-center p-2 gap-4 hover:bg-danger-100 hover:text-danger-500 rounded-lg transition duration-250 ${
              isActive ? "bg-danger-100 text-danger-500" : ""
            }`
          }
        >
          <CirclePlus size={16} />
          <span>Add Property</span>
        </NavLink>
        <NavLink
          end
          to="/account/my-houses"
          className={({ isActive }) =>
            `flex items-center p-2 gap-4 hover:bg-danger-100 hover:text-danger-500 rounded-lg transition duration-250 ${
              isActive ? "bg-danger-100 text-danger-500" : ""
            }`
          }
        >
          <House size={16} />
          <span>My Properties</span>
        </NavLink>
        <NavLink
          end
          to="/account/saved-ads"
          className={({ isActive }) =>
            `flex items-center p-2 gap-4 hover:bg-danger-100 hover:text-danger-500 rounded-lg transition duration-250 ${
              isActive ? "bg-danger-100 text-danger-500" : ""
            }`
          }
        >
          <Bookmark size={16} />
          <span>Saved Properties</span>
        </NavLink>
        <NavLink
          end
          to="/logout"
          className={({ isActive }) =>
            `flex items-center p-2 gap-4 hover:bg-danger-100 hover:text-danger-500 rounded-lg transition duration-250 ${
              isActive ? "bg-danger-100 text-danger-500" : ""
            }`
          }
        >
          <LogOut size={16} />
          <span>Logout</span>
        </NavLink>
      </Card>
    </div>
  );
}
