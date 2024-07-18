import { IssueStatus } from "@/app/Components";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import Markdown from "react-markdown";

function IssuesDetail({ issue }: { issue: Issue }) {
  return (
    <>
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
    </>
  );
}

export default IssuesDetail;
