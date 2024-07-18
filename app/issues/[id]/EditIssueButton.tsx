import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

function EditIssueButton({ issueId }: { issueId: number }) {
  return (
    <Link href={`/issues/${issueId}/edit`}>
      {" "}
      <Button>
        <Pencil2Icon></Pencil2Icon>Edit Issue
      </Button>
    </Link>
  );
}

export default EditIssueButton;
