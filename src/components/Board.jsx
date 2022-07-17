import { Heading, Icon, Flex } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/button";
import { Link } from "react-router-dom";
import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { updateBoard } from "../api";
import { useDispatch } from "react-redux";

import { getBoards } from "../redux/boardSlice";

export default function Board({ board }) {
  const dispatch = useDispatch();
  const handleUpdate = async (e, star) => {
    e.preventDefault();
    const response = await updateBoard({ id: board._id, isStarred: star });
    if (response) {
      dispatch(getBoards());
    }
  };

  function capitalizeFirstLetter(s) {
    return s[0].toUpperCase() + s.slice(1);
  }
  return (
    <Link to={`/boards/${board._id}`}>
      <Flex
        bg={"white"}
        w="64"
        boxShadow="md"
        h="40"
        p="4"
        position="relative"
        borderRadius="15px"
        border="1px solid lightgray"
        cursor="pointer"
        transition="all .25s ease"
        _hover={{ filter: "brightness(120%)", boxShadow: "inner" }}
      >
        <Heading textColor="white" size="md" color={board.backgroundColor}>
          {capitalizeFirstLetter(board.title)}
        </Heading>
        {board.isStarred ? (
          <IconButton
            onClick={(e) => handleUpdate(e, false)}
            m={1}
            position="absolute"
            bottom="0"
            right="0"
            bg={"transparent"}
            borderRadius="sm"
          >
            <Icon as={FaStar} color="grey.700" />
          </IconButton>
        ) : (
          <IconButton
            onClick={(e) => handleUpdate(e, true)}
            m={1}
            position="absolute"
            bottom="0"
            right="0"
            bg={"transparent"}
            borderRadius="sm"
          >
            <Icon as={FaRegStar} color="grey.700" />
          </IconButton>
        )}
      </Flex>
    </Link>
  );
}
