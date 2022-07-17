import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Heading,
  Input,
  FormControl,
  FormLabel,
  useRadioGroup,
  HStack,
  useRadio,
  Box,
  Text,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { createBoard } from "../api";
import { getBoards } from "../redux/boardSlice";

function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        bg={props.value}
        borderWidth="3px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          borderColor: "black",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
}

export default function CreateBoardModal({ isOpen, onClose }) {
  const [boardData, setBoardData] = useState({});
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createBoard(boardData);
    if (response) {
      dispatch(getBoards());
      onClose();
    }
  };

  const options = [
    "#18978F",
    "#276749",
    "#086F83",
    "#37E2D5",
    "#A85CF9",
    "#395B64",
    "#590696",
  ];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "backgroundColor",
    defaultValue: "#C53030",
    onChange: (value) =>
      setBoardData((prev) => ({
        ...prev,
        backgroundColor: value,
      })),
  });
  const group = getRootProps();
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="white">
          <ModalHeader>
            <Heading size="sm" color="teal.500" textAlign="center">
              Create New Board
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl id="title" my="3">
                <FormLabel>Board Title:</FormLabel>
                <Input
                  placeholder="Enter board title"
                  onChange={(e) =>
                    setBoardData((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  name="title"
                  type="text"
                  bg="white"
                />
              </FormControl>
              {/* <FormControl id="backgroundColor" mt="6">
                <FormLabel>Background color</FormLabel>
                <Input
                  onChange={(e) =>
                    setBoardData((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  name="backgroundColor"
                  type="color"
                  bg="white"
                />
              </FormControl> */}
              <Text py="1">Background Color:</Text>
              <HStack {...group}>
                {options.map((value) => {
                  const radio = getRadioProps({ value });
                  return (
                    <RadioCard value={value} key={value} {...radio}>
                      {/* {value} */}
                    </RadioCard>
                  );
                })}
              </HStack>
              <Button
                type="submit"
                borderRadius="md"
                colorScheme="teal"
                mt="6"
                mb="3"
                disabled={
                  !boardData.title || boardData.title.trimStart().length === 0
                }
              >
                Create board
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
