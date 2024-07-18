import IssueStatus from "@/app/Components/IssueStatus";
import prisma from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";

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
      </Box>
      <Box>
        <Link href={"/isssues"}>
          {" "}
          <Button>
            <Pencil2Icon></Pencil2Icon>Edit Issue
          </Button>
        </Link>
      </Box>
    </Grid>
  );
}

export default IssueDetails;
