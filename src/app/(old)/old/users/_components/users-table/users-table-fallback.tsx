import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { UsersTableHeader } from "@/components/users/users-table";

type UsersTableFallbackProps = {
  limit?: number;
};

export const UsersTableFallback = ({ limit = 5 }: UsersTableFallbackProps) => {
  return (
    <>
      <Table>
        <UsersTableHeader />
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
