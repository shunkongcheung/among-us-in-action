import React, { memo, ReactNode } from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import {
  AspectRatio,
  Box,
  Button,
  FormControl,
  Image,
  Input,
} from "native-base";

import { AppBar, PlayerIcon } from "../../components";
import { HATS, COLORS } from "../../constants";
import { getRandomName } from "../../utils";

import OptionModal from "./OptionModal";
import useRegister from "./useRegister";
import { useUserContext } from "../../hooks";

interface ModalState {
  fieldName: "hat" | "color";
  options: Array<{ children: ReactNode; value: any }>;
}

interface User {
  name: string;
  color: string;
  hat: string;
}

const Login: React.FC = () => {
  const { navigate } = useNavigation();
  const user = useUserContext();
  const register = useRegister();

  const { handleBlur, handleChange, handleSubmit, setFieldValue, values } =
    useFormik<User>({
      initialValues: {
        name: user?.name || getRandomName(),
        color: user?.color || "red",
        hat: user?.hat || HATS[0].name,
      },
      onSubmit: async (user: User) => {
        await register(user);
        navigate("Lobby");
      },
    });

  const [modalState, setModalState] = React.useState<ModalState>({
    fieldName: "hat",
    options: [],
  });

  React.useEffect(() => {
    // user load completed
    if (user.id !== -1) {
      setFieldValue("name", user.name);
      setFieldValue("color", user.color);
      setFieldValue("hat", user.hat);
    }
  }, [user, setFieldValue]);

  return (
    <>
      <OptionModal
        handleClose={() => setModalState({ fieldName: "hat", options: [] })}
        handleChange={(val: any) => setFieldValue(modalState.fieldName, val)}
        isOpen={!!modalState.options.length}
        options={modalState.options}
      />
      <AppBar>Among Us</AppBar>
      <Box flex={1} mx={3} my={5} px={2} pb={10}>
        <PlayerIcon color={values.color} hat={values.hat} size="sm" />
        <Box my="auto" height="50%" justifyContent="space-between">
          <FormControl>
            <FormControl.Label>Display name</FormControl.Label>
            <Input
              p={2}
              placeholder="Display name"
              onBlur={handleBlur("name")}
              onChangeText={handleChange("name")}
              value={values.name}
            />
          </FormControl>
          <FormControl mb={5}>
            <FormControl.Label>Hat</FormControl.Label>
            <TouchableOpacity
              onPress={() =>
                setModalState({
                  fieldName: "hat",
                  options: HATS.filter(
                    (itm) => itm.name !== "question-mark"
                  ).map(({ source, name }) => ({
                    value: name,
                    children: (
                      <AspectRatio ratio={1 / 1} height={5}>
                        <Image
                          size="xs"
                          rounded="md"
                          source={source}
                          alt="hat"
                        />
                      </AspectRatio>
                    ),
                  })),
                })
              }
            >
              <AspectRatio ratio={1 / 1} height={5}>
                <Image
                  size="xs"
                  rounded="md"
                  source={HATS.find((itm) => itm.name === values.hat)!.source}
                  alt={values.hat}
                />
              </AspectRatio>
            </TouchableOpacity>
          </FormControl>
          <FormControl>
            <FormControl.Label>Color</FormControl.Label>
            <TouchableOpacity
              onPress={() =>
                setModalState({
                  fieldName: "color",
                  options: COLORS.map((color) => ({
                    value: color,
                    children: (
                      <Box
                        width={10}
                        height={10}
                        borderRadius={4}
                        backgroundColor={color}
                      />
                    ),
                  })),
                })
              }
            >
              <Box
                width={10}
                height={10}
                borderRadius={4}
                backgroundColor={values.color}
              />
            </TouchableOpacity>
          </FormControl>
        </Box>
        <Box width="100%" mt="auto">
          <Button onPress={handleSubmit as any}>Let's Go!</Button>
        </Box>
      </Box>
    </>
  );
};

export default memo(Login);
