"use client";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/app/Components";
import toast, { Toaster } from "react-hot-toast";

function AssigneeIssues({ issue }: { issue: Issue }) {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

  if (error) {
    return null;
  }
  if (isLoading) {
    return <Skeleton></Skeleton>;
  }
  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || "unassigned"}
        onValueChange={(userId) => {
          axios
            .put("/api/issues/" + issue.id, {
              assignedToUserId: userId === "unassigned" ? null : userId,
            })
            .then(() => {
              toast.success("Ok");
            })
            .catch(() => {
              toast.error("Please try again!");
            });
        }}
      >
        <Select.Trigger placeholder="Assign..."></Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster></Toaster>
    </>
  );
}

export default AssigneeIssues;
