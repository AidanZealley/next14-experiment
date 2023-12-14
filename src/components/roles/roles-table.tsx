"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/trpc/react";
import { RoleActions } from "./role-actions";

export const RolesTable = () => {
  const {
    data: roles,
    isError,
    isRefetching,
    isInitialLoading,
  } = api.role.all.useQuery();

  return (
    <>
      {isError && <p>Error!</p>}
      {isInitialLoading && <p>Loading...</p>}
      {isRefetching && <p>Refreshing...</p>}
      <Table>
        <TableCaption>A list of user roles.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles?.map((role) => (
            <TableRow key={role.id}>
              <TableCell className="font-medium">{role.name}</TableCell>
              <TableCell className="text-right">
                <RoleActions roleId={role.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
