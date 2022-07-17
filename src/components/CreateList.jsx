import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, Textarea, IconButton, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createList } from "../api";
import { getLists } from "../redux/listSlice";

export default function CreateList() {
  const { id } = useParams();
  const [showAddButton, setShowAddButton] = useState(true);
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleClick = async () => {
    const response = await createList({ title, boardId: id });
    if (response) {
      dispatch(getLists(id));
      setShowAddButton(true);
    }
  };

  return (
    <Box
      bg="teal.50"
      w="72"
      minW="72"
      px="2"
      py="3"
      borderRadius="sm"
      alignSelf="flex-start"
    >
      {showAddButton && (
        <Button
          color={"white"}
          bg={"teal"}
          onClick={() => setShowAddButton(false)}
          w="full"
          fontSize="sm"
          leftIcon={<AddIcon />}
          _hover={{ bg: "teal.500" }}
        >
          Add another list
        </Button>
      )}
      {!showAddButton && (
        <Box>
          <Textarea
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            placeholder="Enter title for this list"
            bg="white"
            mb="2"
          />
          <Button
            onClick={handleClick}
            disabled={title.trimStart().length === 0}
            colorScheme="teal"
            borderRadius="md"
            mr="2"
          >
            Add
          </Button>
          <IconButton
            onClick={() => setShowAddButton(true)}
            borderRadius="sm"
            icon={<CloseIcon fontSize="xs" />}
          />
        </Box>
      )}
    </Box>
  );
}
