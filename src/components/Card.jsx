import { Box, Text, useDisclosure, Badge } from "@chakra-ui/react";
import { Draggable } from "react-beautiful-dnd";
import format from "date-fns/format";
import React from "react";
import CardModal from "./CardModal";

export default function Card({ card, index }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  function getPriorityScheme(priority) {
    if (priority === "high") {
      return "orange";
    } else if (priority === "medium") {
      return "yellow";
    } else if (priority === "super") {
      return "red";
    } else {
      return "green";
    }
  }

  return (
    <>
      <Draggable
        key={card._id}
        draggableId={`${card._id}-${card.listId}`}
        index={index}
      >
        {(provided, snapshot) => (
          <Box
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            bg="white"
            borderRadius="sm"
            my="2"
          >
            <Box display="flex" justifyContent="space-between">
              <Badge
                ml="2"
                mt="1"
                colorScheme={getPriorityScheme(card.priority)}
              >
                {card.priority}
              </Badge>

              {card.dueDate && (
                <Badge mr="2" mt="1">
                  {format(new Date(card.dueDate), "MMM dd  HH:mm")}
                </Badge>
              )}
            </Box>
            <Text
              onClick={onOpen}
              _hover={{ backgroundColor: "gray.50", cursor: "pointer" }}
              p="2"
            >
              {card.title}
            </Text>
          </Box>
        )}
      </Draggable>
      <CardModal isOpen={isOpen} onClose={onClose} card={card} />
    </>
  );
}
