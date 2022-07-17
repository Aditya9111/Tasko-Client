import {
  Box,
  Heading,
  MenuButton,
  MenuList,
  MenuItem,
  Menu,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";

import { useParams } from "react-router";
import Cards from "./Cards";
import CreateCard from "./CreateCard";
import { FaEllipsisV } from "react-icons/fa";
import { IconButton } from "@chakra-ui/button";
import { deleteList } from "../api";
import { getList } from "../redux/listSlice";
import { useDispatch } from "react-redux";

export default function List({ list }) {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [cards, setCards] = useState([]);
  useEffect(() => {
    axios
      .get(`/api/cards?boardId=${id}&listId=${list._id}`)
      .then((response) => {
        setCards(response.data.response.cards);
      }, []);
  }, [id, list]);

  async function handleDeleteList() {
    try {
      const confirmation = window.confirm("Are you sure to delete this list?");
      if (!confirmation) {
        return;
      }
      const response = await deleteList({ boardId: id, id: list._id });
      if (response) {
        dispatch(getList({ listId: list._id, boardId: id }));
      }
    } catch (error) {}
  }

  return (
    <Droppable droppableId={`${list._id}`} cusotmProp={"hello world"}>
      {(provided, snapshot) => (
        <Box
          {...provided.droppableProps}
          ref={provided.innerRef}
          bg="teal.50"
          w="72"
          minW="72"
          px="2"
          py="3"
          borderRadius="md"
          shadow={"xl"}
          alignSelf="flex-start"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Heading textColor="gray.600" size="sm">
              {list.title}
            </Heading>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<FaEllipsisV />}
              />
              <MenuList>
                <MenuItem onClick={handleDeleteList}>Delete List</MenuItem>
              </MenuList>
            </Menu>
          </Box>
          <Cards cards={cards} />
          <CreateCard list={list} />
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  );
}
