import { useUser } from "../../providers/UserProvider";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Flex,
  Center,
  theme,
  Heading,
  Box,
  Text,
} from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import { useHistory } from "react-router-dom";

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Menu = ({ isOpen, onClose }: MenuProps) => {
  const history = useHistory();
  const { user, signOut } = useUser();

  const handleSighOut = () => {
    signOut();
    history.push("/");
  };

  return (
    <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay mt={["13vh", "8vh"]} />
      <DrawerContent ml="auto" mt="80px" w={["450px", "350px"]}>
        <DrawerHeader
          borderBottomWidth="1px"
          borderColor="gray.50"
          color="gray.400"
        >
          {user.user_name}
        </DrawerHeader>
        <DrawerBody>
          <Flex
            align="center"
            onClick={handleSighOut}
            _hover={{ cursor: "pointer" }}
          >
            <Center
              w="60px"
              h="60px"
              bg="red.600"
              fontSize="2xl"
              borderRadius="md"
            >
              <FiLogOut color={theme.colors.white} />
            </Center>
            <Box ml="4">
              <Heading as="h2" fontSize="lg">
                Sair da minha conta
              </Heading>
              <Text color="gray.300" fontSize="small"></Text>
            </Box>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
