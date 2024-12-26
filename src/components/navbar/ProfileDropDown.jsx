import {
  DoorOpen,
  LogIn,
  LogOut,
  User2,
} from "lucide-react/dist/cjs/lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const ProfileDropDown = (user) => {
  return (
    <div>
      {!user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild aria-label="User menu">
            <Button className="size-8 bg-white shadow-none border border-primary text-black rounded-full ">
              <User2 />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel asChild>
              <h2 className="">Welcome, {user?.username || "Buddy"}!</h2>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User2 />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild aria-label="User menu">
            <Button className="size-8 bg-white shadow-none border border-primary text-black rounded-full ">
              <User2 />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel asChild>
              <h2 className="">Assalamu Alaikum</h2>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <Link className="cursor-pointer hover:text-primary" href="/login">
              <DropdownMenuItem>
                <LogIn />
                Login
              </DropdownMenuItem>
            </Link>
            <Link className="cursor-pointer hover:text-primary" href="/signup">
              <DropdownMenuItem>
                <DoorOpen className="size-4" />
                Register
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default ProfileDropDown;
