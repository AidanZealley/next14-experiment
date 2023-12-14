import { Button } from "@/components/ui/button";
import { UserMenu } from "./user-menu";
import Link from "next/link";
import { getServerAuthSession } from "@/server/auth";

export const AuthMenu = async () => {
  const session = await getServerAuthSession();

  return session ? (
    <UserMenu session={session} />
  ) : (
    <Button asChild variant="ghost">
      <Link href="/api/auth/signin">Sign In</Link>
    </Button>
  );
};
