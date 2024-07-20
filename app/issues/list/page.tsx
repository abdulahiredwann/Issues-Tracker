import { IssueStatus, Link } from "@/app/Components/";
import NavLink from "next/link";
import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import IssueAdd from "./IssueAdd";
import { object, string } from "zod";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue };
}
const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "" },
];

async function IssuesPage({ searchParams }: Props) {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status: status,
    },
    orderBy: orderBy,
  });

  return (
    <>
      <IssueAdd></IssueAdd>
      <div>
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              {columns.map((column) => (
                <Table.ColumnHeaderCell key={column.value}>
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
      </div>
    </>
  );
}
export const dynamic = "force-dynamic";
export default IssuesPage;
