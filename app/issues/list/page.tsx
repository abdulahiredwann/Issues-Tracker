import { IssueStatus, Link } from "@/app/Components/";
import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import IssueAdd from "./IssueAdd";
import { object, string } from "zod";
import { Status } from "@prisma/client";

interface Props {
  searchParams: { status: Status };
}
async function IssuesPage({ searchParams }: Props) {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status: status,
    },
  });

  return (
    <>
      <IssueAdd></IssueAdd>
      <div>
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Status
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Created
              </Table.ColumnHeaderCell>
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
