import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

function EditIssueButton({ issueId }: { issueId: number }) {
  return (
    <Button>
      <Link
        href={`/issues/edit/${issueId}`}
        style={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <Pencil2Icon style={{ marginRight: "8px" }} />
        Edit Issue
      </Link>
    </Button>
  );
}

export default EditIssueButton;
