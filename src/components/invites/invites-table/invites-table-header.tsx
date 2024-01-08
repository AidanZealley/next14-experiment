import {
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const InvitesTableHeader = () => {
  return (
    <>
      <TableCaption>A list of invites.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Group</TableHead>
          <TableHead>Invited By</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
    </>
  );
};
