import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { initialsFromName } from "@/lib/utils";

type UserAvatarProps = {
  src?: string | null;
  name?: string | null;
  className?: string;
};

export const UserAvatar = ({ src, name, className }: UserAvatarProps) => {
  return (
    <Avatar className={className}>
      <AvatarImage src={src ?? ""} referrerPolicy="no-referrer" />
      <AvatarFallback>{initialsFromName(name ?? "??")}</AvatarFallback>
    </Avatar>
  );
};
