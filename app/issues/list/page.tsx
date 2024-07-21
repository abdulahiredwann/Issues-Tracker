import Pagination from "@/app/Components/Pagination";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import IssueAdd from "./IssueAdd";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import { Flex } from "@radix-ui/themes";

interface Props {
  searchParams: IssueQuery;
}

async function IssuesPage({ searchParams }: Props) {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const where = { status };
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const issues = await prisma.issue.findMany({
    where,
    orderBy: orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction={"column"} gap={"2"}>
      <IssueAdd></IssueAdd>
      <IssueTable searchParams={searchParams} issues={issues}></IssueTable>
      <div>
        <Pagination
          pageSize={pageSize}
          currentPage={page}
          itemCount={issueCount}
        ></Pagination>
      </div>
    </Flex>
  );
}
export const dynamic = "force-dynamic";
export default IssuesPage;
