import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import IssueFormSkeloten from "./loading";
const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeloten></IssueFormSkeloten>,
});

interface Props {
  params: { id: string };
}
async function EditIssue({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) notFound();
  return <IssueForm issue={issue}></IssueForm>;
}

export default EditIssue;
