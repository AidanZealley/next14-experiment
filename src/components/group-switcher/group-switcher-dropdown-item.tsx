import { StatusOverlay } from "@/components/status-overlay";
import { UserAvatar } from "@/components/user-avatar";
import { Check } from "lucide-react";
import { api } from "@/trpc/react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

type GroupSwitcherDropdownItemProps = {
  groupId: string | null;
  image?: string | null;
  name?: string | null;
  isSelected?: boolean;
  closeHandler: () => void;
};

export const GroupSwitcherDropdownItem = ({
  groupId,
  image,
  name,
  isSelected,
  closeHandler,
}: GroupSwitcherDropdownItemProps) => {
  const utils = api.useUtils();
  const { mutate, isLoading, isError, error } =
    api.userConfig.switchGroup.useMutation({
      onSuccess() {
        utils.group.signedInUserGroups.invalidate();
        utils.user.signedInUser.invalidate();
        utils.post.infiniteAsc.invalidate();
        utils.post.infinite.invalidate();
        utils.post.latest.invalidate();
        closeHandler();
      },
    });

  const handleGroupClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (!groupId || isSelected) {
      return;
    }

    mutate({
      groupId,
    });
  };

  return (
    <StatusOverlay
      isLoading={isLoading}
      isRefetching={false}
      isError={isError}
      errors={[error]}
    >
      <DropdownMenuItem onClick={handleGroupClick}>
        <span className="grid w-full grid-cols-[auto_1fr_theme(spacing.4)] items-center gap-2">
          <UserAvatar src={image} name={name} className="h-6 w-6" />
          <span className="overflow-hidden text-ellipsis whitespace-nowrap text-left">
            {name}
          </span>
          {isSelected && <Check className="h-4 w-4 text-green-500" />}
        </span>
      </DropdownMenuItem>
    </StatusOverlay>
  );
};
