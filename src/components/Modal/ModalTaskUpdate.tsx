import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Text,
  Center,
  ModalBody,
  VStack,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FaClipboard, FaTimes } from "react-icons/fa";
import { TextArea } from "../Form/TextArea";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTask } from "../../providers/TaskProvider";
import { theme } from "../../styles/theme";

interface Task {
  id: string;
  description: string;
  is_complete: boolean;
}

interface TaskData {
  description: string;
}

interface ModalTaskUpdateProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
}

const updateTaskSchema = yup.object().shape({
  description: yup
    .string()
    .required("Campo obrigatório")
    .max(100, "Máximo de 100 caracteres"),
});

export const ModalTaskUpdate = ({
  isOpen,
  onClose,
  task,
}: ModalTaskUpdateProps) => {
  const { updateTask } = useTask();

  const handleUpdateTask = (data: TaskData) => {
    updateTask({ description: data.description, TaskId: task.id }).then((res) =>
      onClose()
    );
  };

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<TaskData>({
    resolver: yupResolver(updateTaskSchema),
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        as="form"
        onSubmit={handleSubmit(handleUpdateTask)}
        padding="2"
        bg="white"
        color="gray.800"
      >
        <ModalHeader display="flex">
          <Center bg="purple.500" w="30px" borderRadius="5px">
            <FaClipboard color={theme.colors.white} />
          </Center>
          <Text fontWeight="bold" ml="2">
            Alterar descrição
          </Text>
          <Center
            onClick={onClose}
            as="button"
            ml="auto"
            w="32px"
            h="32px"
            bg="red.600"
            fontSize="lg"
            borderRadius="md"
          >
            <FaTimes color={theme.colors.white} />
          </Center>
        </ModalHeader>
        <ModalBody textAlign="center"></ModalBody>
        <VStack spacing={"5"} mt="4">
          <TextArea
            label="Descrição"
            error={errors.description}
            {...register("description")}
            placeholder="Digite a nova descrição"
          />
        </VStack>
        <ModalFooter flexDirection="column">
          <Button
            type="submit"
            bg="purple.500"
            color="white"
            w="100%"
            h="60px"
            _hover={{ bg: "purple.600" }}
          >
            Atualizar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
