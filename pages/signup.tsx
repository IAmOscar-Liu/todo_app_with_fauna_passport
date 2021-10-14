import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Input,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import Router from "next/router";
import { useUser } from "../lib/hooks";
import { withApollo } from "../utils/withApollo";

const Signup = () => {
  useUser({ redirectTo: "/", redirectIfFound: true });

  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      email,
      userName,
      password,
    };

    setLoading(true);

    try {
      await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then(async (res) => {
        if (res.status !== 200) {
          throw new Error(await res.text());
        }
      });

      await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: email,
          password,
        }),
      }).then(async (res) => {
        if (res.status === 200) {
          setLoading(false);
          Router.push("/");
        } else {
          throw new Error(await res.text());
        }
      });
    } catch (error) {
      console.error("An unexpected error happened: ", error);
      setLoading(false);
    }
  };

  return (
    <Accordion allowToggle mb="8" mt="2">
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Sign Up
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb="4">
          <form onSubmit={handleSubmit}>
            <Input
              value={userName}
              placeholder="Enter user name..."
              required={true}
              my={4}
              onChange={(e) => setUserName(e.target.value)}
            />
            <Input
              type="email"
              value={email}
              placeholder="Enter email..."
              required={true}
              my={4}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              value={password}
              placeholder="Enter password..."
              required={true}
              my={4}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              bg="blue.500"
              color="white"
              type="submit"
              isLoading={loading}
              disabled={email === "" || password === ""}
            >
              Sign up
            </Button>
          </form>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

// export default Signup;
export default withApollo({ ssr: false })(Signup);
