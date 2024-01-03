import {
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const GroupsTableHeader = () => {
  return (
    <>
      <TableCaption>A list of groups.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
    </>
  );
};
