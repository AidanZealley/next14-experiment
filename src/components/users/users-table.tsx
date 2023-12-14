"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { initialsFromName } from "@/lib/utils";
import { api } from "@/trpc/react";

export const UsersTable = () => {
  const {
    data: users,
    isError,
    isRefetching,
    isInitialLoading,
  } = api.user.all.useQuery();

  return (
    <>
      {isError && <p>Error!</p>}
      {isInitialLoading && <p>Loading...</p>}
      {isRefetching && <p>Refreshing...</p>}
      <Table>
        <TableCaption>A list of registered users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Avatar className="h-6 w-6">
                  <AvatarImage src={user.image ?? ""} />
                  <AvatarFallback>{initialsFromName(user.name)}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="text-right">actions</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
