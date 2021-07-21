import React, { memo } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Button,
  Box,
  FormControl,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  ScrollView,
} from "native-base";

import { AppBar } from "../../components";
import { useFormik } from "formik";
import { getRandomName } from "../../utils";

const EditGameInfo: React.FC = () => {
  const { navigate } = useNavigation();

  const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      name: getRandomName(),
      maxParticipantCount: 4,
      totalTask: 20,
      durationMinute: 15,
      imposterCount: 1,
    },
    onSubmit: (formInfo) => {
      if (!formInfo.name) formInfo.name = getRandomName();
      navigate("EditCheckPoints", { formInfo });
    },
  });

  return (
    <>
      <AppBar isBackable>Edit Game Info.</AppBar>
      <ScrollView>
        <Box flex={1} mx={3} my={5} px={2} pb={10}>
          <Box my="auto" justifyContent="space-between">
            <FormControl mb={5}>
              <FormControl.Label>Name</FormControl.Label>
              <Input
                p={2}
                placeholder="Name"
                onChangeText={handleChange("name")}
                value={values.name}
              />
            </FormControl>
            <FormControl mb={5}>
              <FormControl.Label># Participants</FormControl.Label>
              <NumberInput
                p={2}
                value={values.maxParticipantCount as any}
                onChange={(val: any) =>
                  setFieldValue("maxParticipantCount", val || 0)
                }
                min={3}
              >
                <NumberInputField p={2} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl mb={5}>
              <FormControl.Label># Imposter(s)</FormControl.Label>
              <NumberInput
                // pl={2}
                value={values.imposterCount as any}
                onChange={(val: any) => setFieldValue("imposterCount", val)}
                min={1}
              >
                <NumberInputField p={2} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl mb={5}>
              <FormControl.Label>Duration (minute)</FormControl.Label>
              <NumberInput
                p={2}
                value={values.durationMinute as any}
                onChange={(val: any) => setFieldValue("durationMinute", val)}
                min={1}
              >
                <NumberInputField p={2} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl mb={5}>
              <FormControl.Label># Task(s)</FormControl.Label>
              <NumberInput
                p={2}
                value={values.totalTask as any}
                onChange={(val: any) => setFieldValue("totalTask", val)}
                min={2}
              >
                <NumberInputField p={2} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </Box>
          <Button mt={5} onPress={handleSubmit as any}>
            Next
          </Button>
        </Box>
      </ScrollView>
    </>
  );
};

export default memo(EditGameInfo);
