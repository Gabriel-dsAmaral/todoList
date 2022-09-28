import { Flex, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { SignupInfo } from "./SignupInfo";
import { SignupForm } from "./SignupForm";
import { GoBackButton } from "./GoBackButton";
import { ModalSuccess } from "../../components/Modal/ModalSuccess";
import { ModalError } from "../../components/Modal/ModalError";
import { useHistory } from "react-router-dom";
import { useUser } from "../../providers/UserProvider";

const signupSchema = yup.object().shape({
  user_name: yup.string().required("username obrigatório"),
  email: yup.string().required("Email obrigatório").email("Email inválido"),
  password: yup.string().required("Senha obrigatória"),
  confirm_password: yup
    .string()
    .required("Confirmação de senha obrigatória")
    .oneOf([yup.ref("password")], "Senhas diferentes"),
});

interface SignUpData {
  email: string;
  password: string;
  user_name: string;
}

export const Signup = () => {
  const [loading, setLoading] = useState(false);

  const { sigNup } = useUser();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<SignUpData>({ resolver: yupResolver(signupSchema) });

  const {
    isOpen: isModalSuccessOpen,
    onOpen: onModalSuccessOpen,
    onClose: onModalSuccessClose,
  } = useDisclosure();
  const {
    isOpen: isModalErrorOpen,
    onOpen: onModalErrorOpen,
    onClose: onModalErrorClose,
  } = useDisclosure();

  const handleSignup = ({ user_name, email, password }: SignUpData) => {
    setLoading(true);
    sigNup({ email, user_name, password })
      .then((response) => {
        setLoading(false);
        onModalSuccessOpen();
      })
      .catch((err) => {
        setLoading(false);
        onModalErrorOpen();
      });
  };

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  const history = useHistory();

  return (
    <>
      <ModalSuccess
        buttonMessage="Ir para o login agora"
        message="Seu cadastro deu super certo, <b> suas listas </b>"
        onClick={() => history.push("/")}
        secondaryText="Você já pode começar criando <b> suas listas </b> de tarefas agora mesmo..."
        isOpen={isModalSuccessOpen}
        onClose={onModalSuccessClose}
      />
      <ModalError
        error="Email já está em uso"
        isOpen={isModalErrorOpen}
        onClose={onModalErrorClose}
        secondatyText="Você já pode tentar novamente, <b>clicando</b> no botão acima ou
        aguarde alguns minutos..."
      />
      <Flex
        alignItems="center"
        justifyContent="center"
        color="white"
        padding={["10px 15px", "10px 15px", "0px", "0px"]}
        height={["auto", "auto", "100vh", "100vh"]}
        bgGradient={[
          "linear(to-b,purple.800 65%,white 35%)",
          "linear(to-b,purple.800 65%,white 35%)",
          "linear(to-l,purple.800 65%,white 35%)",
          "linear(to-l,purple.800 65%,white 35%)",
        ]}
      >
        <Flex
          w={["100%", "100%", "90%", "65%"]}
          justifyContent="center"
          flexDirection={["column", "column", "row", "row"]}
        >
          {isWideVersion ? (
            <>
              <GoBackButton top="75" left="24" />
              <SignupForm
                errors={errors}
                handleSignup={handleSubmit(handleSignup)}
                loading={loading}
                register={register}
              />
              <SignupInfo />
            </>
          ) : (
            <>
              <GoBackButton top="10" left="75vw" />
              <SignupInfo />
              <SignupForm
                errors={errors}
                handleSignup={handleSubmit(handleSignup)}
                loading={loading}
                register={register}
              />
            </>
          )}
        </Flex>
      </Flex>
    </>
  );
};
