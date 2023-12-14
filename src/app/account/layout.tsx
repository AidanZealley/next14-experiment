import { ProfileNav } from "./_components/profile-nav";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-8">
      <div className="grid gap-4 border-b border-slate-800 pb-3 pt-8">
        <h2 className="text-2xl font-bold">Account</h2>
        <ProfileNav />
      </div>
      <div>{children}</div>
    </div>
  );
}
