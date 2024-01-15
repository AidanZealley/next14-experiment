import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { GroupsTableHeader } from "@/components/groups/groups-table";

type GroupsTableFallbackProps = {
  limit?: number;
};

export const GroupsTableFallback = ({
  limit = 5,
}: GroupsTableFallbackProps) => {
  return (
    <>
      <Table>
        <GroupsTableHeader />
        <TableBody>
          {[...Array(limit).keys()].map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-6 w-6 rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-32" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-48" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24 rounded-xl" />
              </TableCell>
              <TableCell className="text-right"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
