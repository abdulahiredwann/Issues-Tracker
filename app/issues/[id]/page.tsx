import IssueStatus from "@/app/Components/IssueStatus";
import prisma from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import IssuesDetail from "./IssuesDetail";
import EditIssueButton from "./EditIssueButton";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssigneeIssues from "./AssigneeIssues";

interface Props {
  params: { id: string };
}
async function IssueDetails({ params }: Props) {
  const session = await getServerSession(authOptions);
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap={"5"}>
      <Box
        className="md:col-span-4
      "
      >
        <IssuesDetail issue={issue}></IssuesDetail>
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap={"4"}>
            <AssigneeIssues issue={issue}></AssigneeIssues>
            <EditIssueButton issueId={issue.id}></EditIssueButton>
            <DeleteIssueButton issueId={issue.id}></DeleteIssueButton>
          </Flex>
        </Box>
      )}
    </Grid>
  );
}

export default IssueDetails;
