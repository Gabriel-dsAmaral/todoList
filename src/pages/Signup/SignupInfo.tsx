import {
  Grid,
  Image,
  Heading,
  Text,
  VStack,
  Flex,
  Box,
  Center,
} from "@chakra-ui/react";
import { FaForward, FaClone } from "react-icons/fa";
import Logo from "../../assets/logo-secondary.svg";
import { theme } from "../../styles/theme";

export const SignupInfo = () => {
  return (
    <Grid
      w={["100%", "100%", "50%", "50%"]}
      paddingLeft={["10px", "10px", "150px"]}
    >
      <Image
        src={Logo}
        alt="doit"
        boxSize={["120px", "120px", "150px", "150px"]}
      />
      <VStack spacing="14" mt={["10px", "0"]}>
        <Flex w="100%">
          <Center w="50px" h="50px" borderRadius="5px" bg="white">
            <FaForward color={theme.colors.purple["800"]} size={25} />
          </Center>
          <Box ml="4">
            <Heading size="lg"> Agilidade </Heading>
            <Text>
              Agilize seus projetos com rapidez <br /> e muita performance
            </Text>
          </Box>
        </Flex>

        <Flex w="100%">
          <Center w="50px" h="50px" borderRadius="5px" bg="white">
            <FaClone color={theme.colors.purple["800"]} size={25} />
          </Center>
          <Box ml="4">
            <Heading size="lg"> Simplicidade </Heading>
            <Text>
              armazene seus projetos em uma <br /> interface altamente usual
            </Text>
          </Box>
        </Flex>
      </VStack>
    </Grid>
  );
};
