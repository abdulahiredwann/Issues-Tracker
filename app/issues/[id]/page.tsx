import IssueStatus from "@/app/Components/IssueStatus";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";

interface Props {
  params: { id: string };
}
async function IssueDetails({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return (
    <div>
      <Heading>{issue?.title}</Heading>
      <Flex className="space-x-3" my="2">
        <IssueStatus status={issue.status}></IssueStatus>
        <Text>{issue?.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose">
        <Markdown>{issue?.description}</Markdown>
      </Card>
    </div>
  );
}

export default IssueDetails;
