"use client";
import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

function NewIssue() {
  return (
    <div className="max-w-lg space-y-3">
      <TextField.Root placeholder="Title "></TextField.Root>
      <SimpleMDE placeholder="Reply to comment…" />
      <Button>Submit</Button>
    </div>
  );
}

export default NewIssue;
