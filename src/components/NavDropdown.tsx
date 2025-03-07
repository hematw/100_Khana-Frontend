import { CircleUserRound, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";

export default function NavDropdown() {
  return (
    <Dropdown>
      <DropdownTrigger asChild>
        <Button radius="full" aria-label="User menu">
          <span className="bg-slate-500 rounded-full overflow-hidden text-white ring-slate-500 ring-2">
            <CircleUserRound size={28} />
          </span>
          <Menu />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Nav dropdown">
        <DropdownSection showDivider title="My Account">
          <DropdownItem key="profile">
            <Link to="./dashboard/profile">Profile</Link>
          </DropdownItem>
          <DropdownItem key="add-property">
            <Link to="./properties">Add Property</Link>
          </DropdownItem>
          <DropdownItem key="my-properties">
            <Link to="./dashboard/homes">My Properties</Link>
          </DropdownItem>
        </DropdownSection>
        <DropdownSection showDivider>
          <DropdownItem key="team">Team</DropdownItem>
        </DropdownSection>
        <DropdownItem key="support">Support</DropdownItem>
        <DropdownItem key="api">API</DropdownItem>
        <DropdownItem key="logout">Log out</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
