import React from "react";
import LatestIssues from "./LatestIssues";
import IssuesSummery from "./IssuesSummery";
import prisma from "@/prisma/client";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const close = await prisma.issue.count({ where: { status: "CLOSED" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  return (
    <>
      <IssuesSummery
        open={open}
        close={close}
        inProgress={inProgress}
      ></IssuesSummery>
    </>
  );
}
