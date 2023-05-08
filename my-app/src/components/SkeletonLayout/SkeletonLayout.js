import React from "react";
import { SkeletonCircle, SkeletonText, Box } from "@chakra-ui/react";

export function SkeletonLayout() {
  return (
    <>
      <Box padding="6">
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="8" />
      </Box>
      <Box padding="6">
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="8" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="9" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="7" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="8" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="12" />
      </Box>
      <Box padding="6">
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="7" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="8" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="12" />
      </Box>
      <Box padding="6">
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="7" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="8" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="12" />
      </Box>
      <Box padding="6">
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="7" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="8" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="12" />
      </Box>
    </>
  );
}
