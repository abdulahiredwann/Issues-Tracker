import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

function EditIssueButton() {
  return (
    <Link href={"/isssues"}>
      {" "}
      <Button>
        <Pencil2Icon></Pencil2Icon>Edit Issue
      </Button>
    </Link>
  );
}

export default EditIssueButton;
