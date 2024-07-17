import prisma from "@/prisma/client";
import { Button, Table } from "@radix-ui/themes";

import React from "react";
import IssueStatus from "../Components/IssueStatus";
import delay from "delay";
import IssueAdd from "./IssueAdd";
import Link from "../Components/Link";

async function IssuesPage() {
  await delay(2000);
  const issues = await prisma.issue.findMany();
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

export default IssuesPage;
