import { IssueStatus } from "@/app/Components";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import NavLink from "next/link";
import { Issue, Status } from "@prisma/client";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
}
interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

function IssueTable({ searchParams, issues }: Props) {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <NavLink
                href={{
                  query: { ...searchParams, orderBy: column.value },
                }}
              >
                {" "}
                {column.label}
              </NavLink>
              {column.value === searchParams.orderBy && (
                <ArrowUpIcon className="inline"></ArrowUpIcon>
              )}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>

              <div className="blocked md:hidden">
                <IssueStatus status={issue.status}></IssueStatus>
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatus status={issue.status}></IssueStatus>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "" },
];

export const columnNames = columns.map((column) => column.value);

export default IssueTable;
