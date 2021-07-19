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

import { AppBar } from "../../components";
import { getRandomName } from "../../utils";
import { User } from "../../types";

import OptionModal from "./OptionModal";
import useUserContext from "../../useUserContext";

interface ModalState {
  fieldName: "hat" | "color";
  options: Array<{ children: ReactNode; value: any }>;
}

const HATS = [
  {
    name: "birthday",
    source: require("../../../assets/hats/hat-birthday.png"),
  },
  { name: "cap", source: require("../../../assets/hats/hat-cap.png") },
  { name: "cook", source: require("../../../assets/hats/hat-cook.png") },
  { name: "crown", source: require("../../../assets/hats/hat-crown.png") },
  { name: "grey", source: require("../../../assets/hats/hat-grey.png") },
  { name: "lady", source: require("../../../assets/hats/hat-lady.png") },
  {
    name: "magician",
    source: require("../../../assets/hats/hat-magician.png"),
  },
  { name: "magician", source: require("../../../assets/hats/hat-maxico.png") },
  { name: "pirate", source: require("../../../assets/hats/hat-pirate.png") },
  { name: "police", source: require("../../../assets/hats/hat-police.png") },
  { name: "red", source: require("../../../assets/hats/hat-red.png") },
  { name: "winter", source: require("../../../assets/hats/hat-winter.png") },
  { name: "witch", source: require("../../../assets/hats/hat-witch.png") },
  { name: "worker", source: require("../../../assets/hats/hat-worker.png") },
];

const COLORS = [
  "red",
  "blue",
  "indigo",
  "orange",
  "purple",
  "pink",
  "yellow",
  "green",
];

const Login: React.FC = () => {
  const { setUser } = useUserContext();
  const { navigate } = useNavigation();
  const { handleBlur, handleChange, handleSubmit, setFieldValue, values } =
    useFormik({
      initialValues: {
        displayName: getRandomName(),
        color: "red",
        hat: HATS[0],
      },
      onSubmit: (user: User) => {
        setUser(user);
        navigate("EditGameInfo");
      },
    });

  const [modalState, setModalState] = React.useState<ModalState>({
    fieldName: "hat",
    options: [],
  });

  return (
    <>
      <OptionModal
        handleClose={() => setModalState({ fieldName: "hat", options: [] })}
        handleChange={(val: any) => setFieldValue(modalState.fieldName, val)}
        isOpen={!!modalState.options.length}
        options={modalState.options}
      />
      <AppBar>Among Us</AppBar>
      <Box flex={1} mx={3} my={5} px={10} pb={10}>
        <Box my="auto" height="50%" justifyContent="space-between">
          <FormControl>
            <FormControl.Label>Display name</FormControl.Label>
            <Input
              p={2}
              placeholder="Display name"
              onBlur={handleBlur("displayName")}
              onChangeText={handleChange("displayName")}
              value={values.displayName}
            />
          </FormControl>
          <FormControl mb={5}>
            <FormControl.Label>Hat</FormControl.Label>
            <TouchableOpacity
              onPress={() =>
                setModalState({
                  fieldName: "hat",
                  options: HATS.map(({ source, name }) => ({
                    value: { source, name },
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
                  source={values.hat.source}
                  alt={values.hat.name}
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
