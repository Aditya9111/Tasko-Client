import { Flex, Box } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";

import CreateList from "./CreateList";
import List from "./List";
import { dndCard } from "../api";
import { getBoardDetails } from "../redux/boardSlice";
import { useParams } from "react-router";

export default function Lists() {
  const { lists, status } = useSelector((state) => state.list);
  const { id } = useParams();
  const dispatch = useDispatch();
  async function onDragEnd(result) {
    const draggableListId = result.draggableId.split("-")[1];
    const draggableCardId = result.draggableId.split("-")[0];
    const droppableListId = result.destination.droppableId;
    console.log(draggableCardId, draggableListId, droppableListId, id);

    try {
      if (droppableListId !== draggableListId) {
        const response = await dndCard({
          droppableListId,
          draggableListId,
          draggableCardId,
          boardId: id,
        });
        if (response) {
          dispatch(getBoardDetails(id));
        }
      }
    } catch (error) {
      console.log("something went wrong");
    }
  }

  return (
    <Flex gridGap="8" mb="10">
      {status === "loading" && <Box>Loading...</Box>}

      {status === "success" && (
        <DragDropContext onDragEnd={onDragEnd}>
          {lists.map((list, index) => (
            <List key={list._id} list={list} index={index} />
          ))}
        </DragDropContext>
      )}
      <CreateList />
    </Flex>
  );
}
