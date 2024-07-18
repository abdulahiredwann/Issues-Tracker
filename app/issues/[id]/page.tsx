import IssueStatus from "@/app/Components/IssueStatus";
import prisma from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import IssuesDetail from "./IssuesDetail";
import EditIssueButton from "./EditIssueButton";

interface Props {
  params: { id: string };
}
async function IssueDetails({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap={"3"}>
      <Box>
        <IssuesDetail issue={issue}></IssuesDetail>
      </Box>
      <Box>
        <EditIssueButton issueId={issue.id}></EditIssueButton>
      </Box>
    </Grid>
  );
}

export default IssueDetails;
