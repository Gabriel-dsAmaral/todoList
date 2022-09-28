import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import { ModalCreateTask } from "../Modal/ModalCreateTask";

export const CreateButton = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <ModalCreateTask isOpen={isOpen} onClose={onClose} />
      <Flex
        mt="6"
        w="100%"
        paddingX={["4", "8"]}
        paddingY="2"
        paddingBottom="6"
        borderBottomWidth="1px"
        borderColor="gray.50"
        flexDir={["column", "column", "row", "row"]}
      >
        <Button
          bg="purple.500"
          color="white"
          paddingX="16"
          ml={["0", "0", "4"]}
          h="60px"
          borderRadius="8px"
          onClick={onOpen}
          _hover={{ bg: "purple.600" }}
          mt={["4", "4", "0"]}
        >
          Adicionar uma nova tarefa
        </Button>
      </Flex>
    </>
  );
};
