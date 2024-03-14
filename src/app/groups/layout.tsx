import { SiteWrap } from "@/components/site-wrap";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteWrap>{children}</SiteWrap>;
}
