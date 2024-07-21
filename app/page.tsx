import React from "react";
import LatestIssues from "./LatestIssues";
import IssuesSummery from "./IssuesSummery";
import prisma from "@/prisma/client";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const close = await prisma.issue.count({ where: { status: "CLOSED" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const props = {
    open,
    inProgress,
    close,
  };
  return (
    <Grid gap={"5"} columns={{ initial: "1", md: "2" }}>
      <Flex direction={"column"} gap={"5"}>
        <IssuesSummery {...props}></IssuesSummery>
        <IssueChart {...props}></IssueChart>
      </Flex>
      <LatestIssues></LatestIssues>
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker -Dashboard",
  description: "View a summary of project issues",
};
