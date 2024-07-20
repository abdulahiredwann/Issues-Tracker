"use client";
import { Select } from "@radix-ui/themes";
import React from "react";

function AssigneeIssues() {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..."></Select.Trigger>
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="1">Abdulahi Redwan</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

export default AssigneeIssues;
