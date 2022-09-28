import {
  Box,
  Flex,
  HStack,
  Center,
  Text,
  Progress,
  theme,
} from "@chakra-ui/react";
import { FaCheck, FaTrash, FaEdit } from "react-icons/fa";
import { useTask } from "../../providers/TaskProvider";

interface Task {
  id: string;
  description: string;
  is_complete: boolean;
}

interface CardProps {
  task: Task;
  onClick: (task: Task) => void;
}

export const Card = ({ task, onClick }: CardProps) => {
  const { deleteTask, completeTask } = useTask();

  return (
    <Box
      cursor={"pointer"}
      _hover={{ transform: "translateY(-7px)", borderColor: "gray.100" }}
      transition={"border 0.2s, ease 0s, transform 0.2s"}
      borderWidth={"1px"}
      borderColor={"gray.50"}
      boxShadow={"base"}
      padding="7"
      w={["80vw", "auto"]}
    >
      <Flex justify="space-between">
        <HStack spacing={"4"}>
          <Center
            as="button"
            w="30px"
            h="30px"
            borderWidth={"1px"}
            borderRadius={"5px"}
            borderColor={"gray.200"}
            bgColor={"white"}
            onClick={() => deleteTask(task.id)}
          >
            <FaTrash color={theme.colors.gray[300]} />
          </Center>

          <Center
            as="button"
            w="30px"
            h="30px"
            borderWidth={"1px"}
            borderRadius={"5px"}
            borderColor={"gray.200"}
            bgColor={"white"}
            onClick={() => completeTask(task.id)}
          >
            <FaCheck color="gray.200" />
          </Center>

          <Center
            as="button"
            w="30px"
            h="30px"
            borderWidth={"1px"}
            borderRadius={"5px"}
            borderColor={"gray.200"}
            bgColor={"white"}
            onClick={() => onClick(task)}
          >
            <FaEdit color="gray.200" />
          </Center>
        </HStack>
      </Flex>

      <Box w="100%" mt="4">
        <Text textDecoration={task.is_complete ? "line-through" : "auto"}>
          {task.description}
        </Text>
        <Progress
          colorScheme="purple"
          mt="2.5"
          value={task.is_complete ? 100 : 10}
        />
        <Text color="gray.200" mt="3"></Text>
      </Box>
    </Box>
  );
};
