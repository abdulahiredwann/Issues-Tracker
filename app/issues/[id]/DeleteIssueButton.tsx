"use client";
import { Issue } from "@prisma/client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function DeleteIssueButton({ issueId }: { issueId: number }) {
  const [error, setError] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/issues/${issueId}`);
      router.push("/issues");
      router.refresh();
    } catch (err) {
      setError(true);
    }
  };
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red">Delete Issue</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>

          <AlertDialog.Description>
            Are You sure? This Action can't be Undone
          </AlertDialog.Description>
          <Flex mt={"4"} gap={"4"}>
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>

            <AlertDialog.Action>
              <Button onClick={handleDelete} variant="solid" color="red">
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            <div>Something happen Wrong</div>{" "}
            <Button
              variant="soft"
              mt={"2"}
              color="gray"
              onClick={() => setError(false)}
            >
              Cancel
            </Button>
          </AlertDialog.Description>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
}

export default DeleteIssueButton;
