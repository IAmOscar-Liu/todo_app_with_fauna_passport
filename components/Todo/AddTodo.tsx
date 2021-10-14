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
import { useUser } from "../../lib/hooks";
import { useAddTodoMutation, AllTodosQuery, AllTodosDocument } from "../../generated/graphql";


export const AddTodo = () => {
  const user  = useUser();
  
  const [title, setTitle] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [addTodo] = useAddTodoMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await addTodo({
      variables: {
        user_id: user.data._id,
        title,
        note,
      },
      update: (cache, { data }) => {
        const prevCache = cache.readQuery<AllTodosQuery>({
          query: AllTodosDocument,
        });
        const newCache = {
          ...prevCache,
          GetAllTodosSortedByCreatedAt: {
            ...prevCache.GetAllTodosSortedByCreatedAt,
            data: [
              data.addTodo,
              ...prevCache.GetAllTodosSortedByCreatedAt.data,
            ],
          },
        };
        cache.writeQuery<AllTodosQuery>({
          query: AllTodosDocument,
          data: newCache,
        });
      },
      onError: (error) => window.alert(error.message),
    });

    setLoading(false);
    setTitle("");
    setNote("");
  };

  return (
    <Accordion allowToggle mb="8" mt="2">
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Add Todo
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb="4">
          <form onSubmit={handleSubmit}>
            <Input
              value={title}
              placeholder="Add new title"
              my={4}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              value={note}
              placeholder="Add a new note"
              my={4}
              onChange={(e) => setNote(e.target.value)}
            />
            <Button
              bg="blue.500"
              color="white"
              type="submit"
              isLoading={loading}
              disabled={title === "" || note === ""}
            >
              Add Todo
            </Button>
          </form>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
