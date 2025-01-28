// import { FocusEventHandler, ReactNode, useState, useRef } from "react";
// import { FaChevronDown } from "react-icons/fa6";

// interface DropdownProps {
//   children: React.ReactNode;
//   buttonText?: string | ReactNode;
//   icon?: ReactNode;
//   className?: string;
// }

// export default function Dropdown({
//   children,
//   icon,
//   className,
//   buttonText,
// }: DropdownProps) {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // Handle blur event on dropdown and its items
//   const handleBlur: FocusEventHandler = (e) => {
//     if (!dropdownRef.current?.contains(e.relatedTarget as Node)) {
//       setIsOpen(false);
//     }
//   };

//   return (
//     <div className="relative inline-block text-left" ref={dropdownRef}>
//       <button
//         type="button"
//         className={`inline-flex w-full justify-center items-center gap-x-2 bg-white px-3 py-2 text-xl font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:shadow-md transition-all duration-200 ${className}`}
//         id="menu-button"
//         aria-expanded={isOpen}
//         aria-haspopup="true"
//         onClick={() => setIsOpen((prev) => !prev)}
//         onBlur={handleBlur}
//       >
//         {icon || <FaChevronDown />}
//         {buttonText}
//       </button>

//       {isOpen && (
//         <div
//           className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-red-400 ring-opacity-10 focus:outline-none"
//           role="menu"
//           onBlur={handleBlur}
//           tabIndex={0} // So it can receive focus
//         >
//           <div className="py-1" role="none">
//             {children}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Dropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Keyboard shortcuts
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Message</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>More...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            New Team
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>GitHub</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuItem disabled>API</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
