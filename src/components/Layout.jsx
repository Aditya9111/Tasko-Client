import { Box } from "@chakra-ui/layout";
import React from "react";
import { useSelector } from "react-redux";
import Header from "./Header";

export default function Layout({ children }) {
  const { boardDetails } = useSelector((state) => state.board);

  return (
    <Box
      display="flex"
      flexFlow="column"
      height="100vh"
      bg={boardDetails.backgroundColor || "gray.50"}
      bgGradient={`linear(to-r, teal.200, ${boardDetails.backgroundColor})`}
    >
      <Header />
      <Box height="100%" flex="1 1 auto" pt="20">
        {children}
      </Box>
    </Box>
  );
}
