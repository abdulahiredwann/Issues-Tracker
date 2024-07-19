import { Box } from "@radix-ui/themes";
import React from "react";
import { Skeleton } from "@/app/Components/";

function IssueFormSkeloten() {
  return (
    <Box className="max-w-xl">
      <Skeleton height={"2rem"}></Skeleton>
      <Skeleton height={"20rem"}></Skeleton>
    </Box>
  );
}

export default IssueFormSkeloten;
