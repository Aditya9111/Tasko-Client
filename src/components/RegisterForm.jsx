import {
  Box,
  Input,
  Button,
  InputGroup,
  Link,
  InputRightElement,
  Text,
  Flex,
  HStack,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { registerUser } from "../redux/authSlice";
// Assets
import signInImage from "../assets/img/signInImage.jpg";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";

function RegisterForm({ setRegistered }) {
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("white", "gray.700");
  const bgIcons = useColorModeValue("teal.400", "rgba(255, 255, 255, 0.5)");

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const dispatch = useDispatch();
  const history = useHistory();
  const { status, isLoggedIn } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(registerData));
  };

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/");
    }
  }, [isLoggedIn, history]);
  return (
    <Flex
      direction="column"
      alignSelf="center"
      justifySelf="center"
      overflow="hidden"
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        mb="60px"
        mt="20px"
      >
        <Flex
          direction="column"
          w="445px"
          background="transparent"
          borderRadius="15px"
          p="40px"
          mx={{ base: "200px" }}
          bg={bgColor}
        >
          <Text
            fontSize="xl"
            color={titleColor}
            fontWeight="bold"
            textAlign="center"
            mb="22px"
          >
            Register
          </Text>
          <HStack spacing="15px" justify="center" mb="22px">
            <Flex
              justify="center"
              align="center"
              w="75px"
              h="75px"
              borderRadius="15px"
              border="1px solid lightgray"
              cursor="pointer"
              transition="all .25s ease"
              _hover={{ filter: "brightness(120%)", bg: bgIcons }}
            >
              <Link href="#">
                <Icon
                  as={FaFacebook}
                  w="30px"
                  h="30px"
                  _hover={{ filter: "brightness(120%)" }}
                />
              </Link>
            </Flex>
            <Flex
              justify="center"
              align="center"
              w="75px"
              h="75px"
              borderRadius="15px"
              border="1px solid lightgray"
              cursor="pointer"
              transition="all .25s ease"
              _hover={{ filter: "brightness(120%)", bg: bgIcons }}
            >
              <Link href="#">
                <Icon
                  as={FaApple}
                  w="30px"
                  h="30px"
                  _hover={{ filter: "brightness(120%)" }}
                />
              </Link>
            </Flex>
            <Flex
              justify="center"
              align="center"
              w="75px"
              h="75px"
              borderRadius="15px"
              border="1px solid lightgray"
              cursor="pointer"
              transition="all .25s ease"
              _hover={{ filter: "brightness(120%)", bg: bgIcons }}
            >
              <Link href="#">
                <Icon
                  as={FaGoogle}
                  w="30px"
                  h="30px"
                  _hover={{ filter: "brightness(120%)" }}
                />
              </Link>
            </Flex>
          </HStack>

          <form onSubmit={handleSubmit}>
            <Input
              onChange={(e) =>
                setRegisterData((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              name="name"
              type="text"
              placeholder="Enter full name"
              bg="gray.50"
              my="3"
            />
            <Input
              onChange={(e) =>
                setRegisterData((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              name="email"
              type="email"
              placeholder="Enter email"
              bg="gray.50"
              my="3"
            />

            <InputGroup bg="gray.50" my="3">
              <Input
                onChange={(e) =>
                  setRegisterData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                name="password"
                type={show ? "text" : "password"}
                placeholder="Password"
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={handleClick}
                  bg="gray.200"
                >
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>

            <Button
              fontSize="15px"
              type="submit"
              bg="teal.300"
              w="100%"
              h="45"
              mb="20px"
              my="3"
              color="white"
              mt="20px"
              _hover={{
                bg: "teal.200",
              }}
              _active={{
                bg: "teal.400",
              }}
              disabled={
                registerData.email.trimStart().length === 0 ||
                registerData.password.trimStart().length === 0 ||
                registerData.name.trimStart().length === 0
              }
              as="button"
            >
              {status === "loading" ? "Registering..." : "Register"}
            </Button>
          </form>

          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            maxW="100%"
            mt="0px"
          >
            <Text color={textColor} fontWeight="medium">
              Already have an account?
              <Link
                onClick={() => setRegistered(true)}
                color={titleColor}
                as="span"
                ms="5px"
                href="#"
                fontWeight="bold"
              >
                Sign In
              </Link>
            </Text>
          </Flex>
        </Flex>
        <Box
          display={{ base: "none", md: "block" }}
          overflowX="hidden"
          h="100%"
          w="40vw"
          position="absolute"
          right="0px"
        >
          <Box
            bgImage={signInImage}
            w="100%"
            h="100%"
            bgSize="cover"
            bgPosition="50%"
            position="absolute"
            borderBottomLeftRadius="20px"
          ></Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default RegisterForm;
