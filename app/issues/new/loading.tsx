import { Skeleton } from "@/app/Components";
import { Box } from "@radix-ui/themes";

function LoadingNewIssue() {
  return (
    <Box>
      <Skeleton></Skeleton>
      <Skeleton height={"20rem"}></Skeleton>
    </Box>
  );
}

export default LoadingNewIssue;
