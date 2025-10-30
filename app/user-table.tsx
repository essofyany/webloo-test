"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useEffect, useMemo, useState } from "react";
import { getUsers, User } from "./user.service";

const ItemsPerPage = 5;

export function UserTable() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<User[]>([]);

  const totalPages = useMemo(() => {
    return Math.ceil(users.length / ItemsPerPage);
  }, [users]);

  const totalItems = useMemo(() => {
    return users.length;
  }, [users]);

  const computedList = useMemo(() => {
    return users
      .filter((u) => u.name.includes(query) || u.username.includes(query))
      .slice(0, ItemsPerPage * page);
  }, [query, users, page]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  useEffect(() => {
    setQuery("");
  }, [page]);

  useEffect(() => {
    setPage(1);
  }, [query]);

  return (
    <div>
      <div>
        <input
          className="border border-gray-300 rounded-md px-2 py-1"
          value={query}
          placeholder="Search...."
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {/*Table*/}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>name</TableHead>
            <TableHead>username</TableHead>
            <TableHead>email</TableHead>
            <TableHead>phone</TableHead>
            <TableHead>website</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {computedList.map((u) => (
            <TableRow key={u.id}>
              <TableCell className="font-medium">{u.name}</TableCell>
              <TableCell className="font-medium">{u.username}</TableCell>
              <TableCell className="font-medium">{u.email}</TableCell>
              <TableCell className="font-medium">{u.phone}</TableCell>
              <TableCell className="font-medium">{u.website}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <Pagination>
            <PaginationContent>
              <PaginationItem
                onClick={() => setPage((prev) => (page > 0 ? prev - 1 : page))}
              >
                <PaginationPrevious href="#" />
              </PaginationItem>
              {/**/}
              {Array.from({ length: Math.ceil(totalItems / ItemsPerPage) }).map(
                (_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      onClick={() => setPage(i + 1)}
                      isActive={i === page - 1}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}
              {/**/}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setPage((prev) => (page >= totalPages ? page : page + 1))
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </TableFooter>
      </Table>
    </div>
  );
}
