import { Heading, Box, Flex, Text } from "@chakra-ui/layout";
import React, { useEffect } from "react";
import Board from "../components/Board";
import { useDispatch, useSelector } from "react-redux";
import { getBoards, resetBoardDetails } from "../redux/boardSlice";

export default function Boards() {
  const { status, boards } = useSelector((state) => state.board);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);

  useEffect(() => {
    dispatch(resetBoardDetails());
  }, [dispatch]);
  return (
    <Box px="5">
      <Heading mb="6" textColor="gray.500" as="h2" size="lg">
        <Text
          bgGradient="linear(to-l, teal.100, teal.400)"
          bgClip="text"
          fontSize="2xl"
          fontWeight="extrabold"
        >
          Your Boards
        </Text>
      </Heading>
      {status === "loading" && <Box>Loading...</Box>}
      <Flex wrap="wrap" gridGap="8">
        {status === "success" &&
          boards.map((board) => <Board key={board._id} board={board} />)}
      </Flex>
    </Box>
  );
}
