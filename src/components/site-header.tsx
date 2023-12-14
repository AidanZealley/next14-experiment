import { SiteLogo } from "@/components/site-logo";
import { SiteWrap } from "./site-wrap";
import { MainNav } from "./main-nav";
import { Separator } from "./ui/separator";
import { SecondaryNav } from "./secondary-nav";
import { AuthMenu } from "./auth-menu";

export const SiteHeader = () => {
  return (
    <SiteWrap>
      <div className="grid h-16 grid-cols-[1fr_auto] items-center gap-6">
        <SiteLogo />

        <div className="flex items-center gap-3">
          <MainNav />
          <Separator orientation="vertical" className="h-6" />
          <SecondaryNav>
            <AuthMenu />
          </SecondaryNav>
        </div>
      </div>
    </SiteWrap>
  );
};
