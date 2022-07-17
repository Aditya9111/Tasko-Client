import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginUser } from "../redux/authSlice";
// Chakra imports
import {
  Box,
  Flex,
  Button,
  Heading,
  Center,
  Input,
  Link,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
// Assets
import signInImage from "../assets/img/signInImage.jpg";

function SignIn({ setRegistered }) {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const dispatch = useDispatch();
  const history = useHistory();
  const { status, isLoggedIn } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(loginData));
  };
  const loginAsGuest = () => {
    setLoginData({ email: "aditya2@gmail.com", password: "aditya" });
    dispatch(loginUser({ email: "aditya2@gmail.com", password: "aditya" }));
  };
  useEffect(() => {
    if (isLoggedIn) {
      history.push("/");
    }
  }, [isLoggedIn, history]);

  // Chakra color mode
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");
  return (
    <Flex position="relative" mb="40px">
      <Flex
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w="100%"
        maxW="1044px"
        mx="auto"
        justifyContent="space-between"
        mb="30px"
        pt={{ sm: "100px", md: "0px" }}
      >
        <Flex
          alignItems="center"
          justifyContent="start"
          style={{ userSelect: "none" }}
          w={{ base: "100%", md: "50%", lg: "42%" }}
        >
          <Flex
            direction="column"
            w="100%"
            background="transparent"
            p="48px"
            mt={{ md: "150px", lg: "80px" }}
          >
            <Heading color={titleColor} fontSize="32px" mb="10px">
              Welcome Back
            </Heading>
            <Text
              mb="36px"
              ms="4px"
              color={textColor}
              fontWeight="bold"
              fontSize="14px"
            >
              Enter your email and password to sign in
            </Text>

            <form onSubmit={handleSubmit}>
              <Input
                name="email"
                type="email"
                onChange={(e) =>
                  setLoginData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                placeholder="Enter email"
                bg="gray.50"
                my="3"
              />

              <InputGroup bg="gray.50" my="3">
                <Input
                  name="password"
                  onChange={(e) =>
                    setLoginData((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
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
                fontSize="14px"
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
                  loginData.email.trimStart().length === 0 ||
                  loginData.password.trimStart().length === 0
                }
                as="button"
              >
                {status === "loading" ? "Logging in..." : "Login"}
              </Button>
              <Button
                onClick={loginAsGuest}
                fontSize="14px"
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
                as="button"
              >
                Login as guest
              </Button>
            </form>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              maxW="100%"
              mt="0px"
            >
              <Center my="3">
                <Text color={textColor} fontWeight="medium" mr="1">
                  Don't have an account?{" "}
                </Text>
                <Link
                  color={titleColor}
                  textDecoration={"none"}
                  as="span"
                  ms="5px"
                  fontWeight="bold"
                  onClick={() => setRegistered(false)}
                >
                  Register here.
                </Link>
              </Center>
            </Flex>
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

export default SignIn;
