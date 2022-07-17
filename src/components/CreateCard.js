import { IconButton, Button, Box, Textarea } from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { createCard } from "../api";
import { getList } from "../redux/listSlice";
export default function CreateCard({ list }) {
  const [showAddButton, setShowAddButton] = useState(true);
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();
  const handleClick = async () => {
    const response = await createCard({ title, boardId: id, listId: list._id });
    if (response) {
      dispatch(getList({ boardId: id, listId: list._id }));
      setShowAddButton(true);
    }
  };
  return (
    <Box>
      {showAddButton && (
        <Button
          onClick={() => setShowAddButton(false)}
          w="full"
          fontSize="sm"
          leftIcon={<AddIcon />}
          background={"teal"}
          color={"white"}
          _hover={{ bg: "teal.500" }}
        >
          Add a card
        </Button>
      )}
      {!showAddButton && (
        <Box>
          <Textarea
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title for this card"
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
