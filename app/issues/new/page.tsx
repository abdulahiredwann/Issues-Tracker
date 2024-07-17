"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";

function NewIssue() {
  return (
    <div className="max-w-lg space-y-3">
      <TextField.Root placeholder="Title "></TextField.Root>
      <TextArea placeholder="Reply to comment…" />
      <Button>Submit</Button>
    </div>
  );
}

export default NewIssue;
