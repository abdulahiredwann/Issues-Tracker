import { Skeleton } from "@/app/Components";
import { Box, Card, Flex } from "@radix-ui/themes";

function LoadingDetail() {
  return (
    <Box className="max-w-xl">
      <Skeleton></Skeleton>

      <Flex className="space-x-3" my="2">
        <Skeleton width={"5rem"}></Skeleton>
        <Skeleton width={"8rem"}></Skeleton>
      </Flex>
      <Card className="prose" mt="4">
        <Skeleton></Skeleton>
      </Card>
    </Box>
  );
}

export default LoadingDetail;
