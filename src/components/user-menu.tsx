import { ChevronDown, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { initialsFromName } from "@/lib/utils";
import { Session } from "next-auth";
import Link from "next/link";

type UserMenuProps = {
  session: Session | null;
};

export function UserMenu({ session }: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="pl-2 pr-1">
          <span className="flex items-center gap-1">
            <Avatar className="h-6 w-6">
              <AvatarImage src={session?.user.image ?? ""} />
              <AvatarFallback>
                {initialsFromName(session?.user.name)}
              </AvatarFallback>
            </Avatar>
            <ChevronDown />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/account">
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Account
              </span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/api/auth/signout">
            <span className="flex items-center gap-2">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign Out</span>
            </span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
