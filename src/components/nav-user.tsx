import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
} from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import { Separator } from "./ui/Divider";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Dropdown>
          <DropdownTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar
                className="h-8 w-8 rounded-lg"
                src={user.avatar}
                alt={user.name}
                fallback="CN"
              />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownTrigger>
          <DropdownMenu
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          >
            <DropdownItem key="avatar" className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar
                  className="h-8 w-8 rounded-lg"
                  src={user.avatar}
                  alt={user.name}
                  fallback="CN"
                />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownItem>
            <Divider />
            <Divider />
            <DropdownSection>
              <DropdownItem key="account">
                <BadgeCheck />
                Account
              </DropdownItem>
              <DropdownItem key="billing">
                <CreditCard />
                Billing
              </DropdownItem>
              <DropdownItem key="notifications">
                <Bell />
                Notifications
              </DropdownItem>
            </DropdownSection>
            <Divider />
            <DropdownItem key="logout">
              <LogOut />
              Log out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
