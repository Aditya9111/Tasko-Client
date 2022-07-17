import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  IconButton,
  Box,
  Textarea,
  ModalFooter,
  Heading,
  Text,
  Select,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import format from "date-fns/format";

import { CloseIcon } from "@chakra-ui/icons";
import { deleteCard, updateCard } from "../api";
import { getBoards } from "../redux/boardSlice";
import { getList } from "../redux/listSlice";

export default function CardModal({ isOpen, onClose, card }) {
  const [showEditTitle, setShowEditTitle] = useState(false);
  const [showEditDesc, setShowEditDesc] = useState(false);
  const [showEditPriority, setShowEditPriority] = useState(false);
  const [showEditDate, setShowEditDate] = useState(false);
  const [title, setTitle] = useState(card.title);
  const [priority, setPriority] = useState(card.priority);
  const [dueDate, setDueDate] = useState(card.dueDate);
  const [description, setDescription] = useState(card.description || "");
  const dispatch = useDispatch();

  const handleUpdate = async () => {
    const response = await updateCard({
      id: card._id,
      title,
      description,
      priority,
      dueDate,
    });
    if (response) {
      dispatch(getBoards());
      onClose();
    }
  };

  async function handleDeleteCard() {
    try {
      const confirmation = window.confirm("Are you sure to delete this card?");
      if (!confirmation) return;
      const response = await deleteCard({
        boardId: card.boardId,
        listId: card.listId,
        id: card._id,
      });

      if (response) {
        dispatch(getList({ listId: card.listId, boardId: card.boardId }));
        onClose();
      }
    } catch (error) {
      console.log("Something went wrong.");
    }
  }

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="gray.50" pb="4" pt="2">
        <ModalHeader>
          {!showEditTitle && (
            <Heading
              color={"teal"}
              mt="3"
              p="2"
              borderRadius="sm"
              w="sm"
              _hover={{ cursor: "pointer", backgroundColor: "gray.100" }}
              size="md"
              fontWeight="semibold"
              onClick={() => setShowEditTitle(true)}
            >
              {card.title}
            </Heading>
          )}
          {showEditTitle && (
            <Box>
              <Input
                placeholder="Card Title"
                w="max-content"
                mr="6"
                bg="white"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Button
                onClick={() => handleUpdate()}
                borderRadius="md"
                colorScheme="teal"
                mr="2"
                disabled={title.trimStart().length === 0}
              >
                Save
              </Button>
              <IconButton
                onClick={() => setShowEditTitle(false)}
                borderRadius="sm"
                icon={<CloseIcon fontSize="xs" />}
              />
            </Box>
          )}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box display="flex" justifyContent="space-between">
            {!showEditPriority && (
              <Text
                flex="1"
                p="2"
                borderRadius="sm"
                w="sm"
                _hover={{ cursor: "pointer", backgroundColor: "gray.100" }}
                onClick={() => setShowEditPriority(true)}
              >
                {`Priority: ${card.priority}` || "Choose Priority"}
              </Text>
            )}
            {showEditPriority && (
              <Box flex="1">
                <Select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  placeholder="Select Priority"
                  mb="4"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="super">Super</option>
                </Select>
                <Button
                  onClick={() => handleUpdate()}
                  borderRadius="md"
                  colorScheme="teal"
                  mr="2"
                >
                  Save
                </Button>
                <IconButton
                  onClick={() => setShowEditPriority(false)}
                  borderRadius="sm"
                  icon={<CloseIcon fontSize="xs" />}
                />
              </Box>
            )}
            {!showEditDate && (
              <Text
                flex="1"
                p="2"
                borderRadius="sm"
                w="sm"
                _hover={{ cursor: "pointer", backgroundColor: "gray.100" }}
                onClick={() => setShowEditDate(true)}
              >
                {(card.dueDate &&
                  `Due On : ${format(
                    new Date(card.dueDate),
                    "MMM dd  HH:mm"
                  )}`) ||
                  "Due On"}
              </Text>
            )}
            {showEditDate && (
              <Box flex="1">
                <Input
                  type="datetime-local"
                  onChange={(e) => setDueDate(e.target.value)}
                  value={dueDate}
                  placeholder="Complete By"
                  bg="white"
                  mb="4"
                />
                <Button
                  onClick={() => handleUpdate()}
                  borderRadius="md"
                  colorScheme="teal"
                  mr="2"
                >
                  Save
                </Button>
                <IconButton
                  onClick={() => setShowEditDate(false)}
                  borderRadius="sm"
                  icon={<CloseIcon fontSize="xs" />}
                />
              </Box>
            )}
          </Box>

          {!showEditDesc && (
            <Text
              mt="4"
              p="2"
              borderRadius="sm"
              w="sm"
              _hover={{ cursor: "pointer", backgroundColor: "gray.100" }}
              onClick={() => setShowEditDesc(true)}
            >
              {card.description || "Card description goes here"}
            </Text>
          )}
          {showEditDesc && (
            <Box mt="4">
              <Textarea
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                placeholder="Card description"
                bg="white"
                mb="4"
              />
              <Button
                onClick={() => handleUpdate()}
                borderRadius="md"
                colorScheme="teal"
                mr="2"
              >
                Save
              </Button>
              <IconButton
                onClick={() => setShowEditDesc(false)}
                borderRadius="sm"
                icon={<CloseIcon fontSize="xs" />}
              />
            </Box>
          )}
        </ModalBody>
        <ModalFooter>
          <Box>
            <Text textAlign="left" fontSize="xs" p="2">
              *Edit title or desc by clicking on them.
            </Text>
          </Box>
          <Button size="sm" colorScheme="red" onClick={handleDeleteCard}>
            Delete Card
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
