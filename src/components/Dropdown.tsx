import { CircleUserRound, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";


export default function NavDropdown() {
  return (
    <Dropdown>
      <DropdownTrigger asChild>
        <Button
          className="rounded-3xl"
        >
          <span className="bg-slate-500 rounded-full overflow-hidden text-white ring-slate-500 ring-2">
            <CircleUserRound size={28} />
          </span>
          <Menu />
        </Button>
      </DropdownTrigger>
      <DropdownMenu className="absolute -right-10 w-56 overflow-hidden">
        <p>My Account</p>
        <Divider />
        <DropdownSection>
          <Link to="./dashboard/profile">
            <DropdownItem key="profile" className="cursor-pointer">
              Profile
            </DropdownItem>
          </Link>
          <Link to="./properties">
            <DropdownItem key="add-property" className="cursor-pointer">
              Add Property
            </DropdownItem>
          </Link>
          <Link to="./dashboard/homes">
            <DropdownItem key="my-properties" className="cursor-pointer">
              My Properties
            </DropdownItem>
          </Link>
        </DropdownSection>
        <Divider />
        <DropdownSection>
          <DropdownItem key="team">Team</DropdownItem>
        </DropdownSection>
        <Divider />
        <DropdownItem key="support">Support</DropdownItem>
        <DropdownItem key="api">API</DropdownItem>
        <Divider />
        <DropdownItem key="logout">
          Log out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown >
  )
}
