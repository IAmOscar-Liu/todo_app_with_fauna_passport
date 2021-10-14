import { Box, HStack, Text, useCheckbox } from "@chakra-ui/react";
import { FormEvent } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { DeleteTodo } from "../Todo/DeleteTodo";
import { CheckboxBox } from "./CheckboxBox";
import { useUser } from "../../lib/hooks";

interface Props {
  value: string;
  onChange: (e: FormEvent<any>) => void;
  id: string;
  title: string;
  note: string;
  user_id: String;
  completed: Boolean;
  created_at: string;
}

export const ButtonCheckbox = (props: Props) => {
  const {
    title,
    note,
    value,
    user_id,
    completed,
    created_at,
    ...rest
  } = props;
  const { getCheckboxProps, getInputProps, getLabelProps, state } = useCheckbox(
    rest
  );
  const user = useUser();
  const showUser = () => {
    // console.log(`userName: ${un}, userprofile name: ${user.name}`)
    if (user?.data._id === user_id) return "You";
    return user_id
  };

  return (
    <HStack
      spacing="4"
      borderWidth="2px"
      px="4"
      py="3"
      borderRadius="md"
      borderColor={user?.data._id === user_id ? "green" : "inherit"}
    >
      <label {...getLabelProps()}>
        <input {...getInputProps()} aria-labelledby={value} />
        {completed && <Text>Done!</Text>}
        {!completed && user && user?.data._id === user_id && (
          <CheckboxBox {...getCheckboxProps()} id={value}>
            <Box
              data-checked={state.isChecked ? "" : undefined}
              fontSize="2xl"
              _checked={{
                color: "blue.500",
              }}
              color="gray.300"
            >
              {state.isChecked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
            </Box>
          </CheckboxBox>
        )}
      </label>
      <Box flex="2" pl={2}>
        <Text pl={4} fontWeight="bold">
          {title}
        </Text>
        <Text pl={4} fontSize="sm">
          {note}
        </Text>
        <Text pl={4} fontSize="sm">
          From: {showUser()}
        </Text>
      </Box>
      <Box flex="1">
        <Text>Created At</Text>
        <Text>{new Date(created_at).toLocaleDateString()}</Text>
        <Text>{new Date(created_at).toLocaleTimeString()}</Text>
      </Box>
      {user && user?.data._id === user_id && (
        <DeleteTodo id={value} />
      )}
    </HStack>
  );
};
