import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { InvitesTableHeader } from "@/components/invites/invites-table";

type InvitesTableFallbackProps = {
  limit?: number;
};

export const InvitesTableFallback = ({
  limit = 5,
}: InvitesTableFallbackProps) => {
  return (
    <>
      <Table>
        <InvitesTableHeader />
        <TableBody>
          {[...Array(limit).keys()].map((_, index) => (
            <TableRow key={index}>
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
