import Link from "next/link";
import { SiteWrap } from "@/components/site-wrap";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export const NotSignedIn = () => {
  return (
    <SiteWrap>
      <div className="grid h-full min-h-0 place-items-center">
        <Alert className="max-w-xl">
          <div className="grid gap-6">
            <div className="grid gap-3">
              <h2 className="text-2xl font-extrabold">Not signed in</h2>
              <p>You need to be signed in to view this page.</p>
            </div>
            <Button asChild>
              <Link href="/api/auth/signin">Sign In</Link>
            </Button>
          </div>
        </Alert>
      </div>
    </SiteWrap>
  );
};
