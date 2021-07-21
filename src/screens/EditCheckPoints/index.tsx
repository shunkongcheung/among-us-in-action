import { useNavigation, useRoute } from "@react-navigation/native";
import React, { memo } from "react";
import uuid from "react-native-uuid";

import { AppBar, Map } from "../../components";
import { Location } from "../../components/Map";
import { Task } from "../../constants";
import useSubmit from "./useSubmit";

interface CheckPoint {
  latitude: number;
  longitude: number;
  task: Task;
}

interface FormInfo {
  name: string;
  maxParticipantCount: number;
  totalTask: number;
  durationMinute: number;
  imposterCount: number;
}

interface Markers {
  [x: string]: CheckPoint;
}

const getRandomTask = (): Task => {
  const tasks = Object.values(Task);
  const len = tasks.length;
  return tasks[Math.floor(Math.random() * len)];
};

const EditCheckPoints: React.FC = () => {
  const { params } = useRoute();
  const { formInfo } = params as { formInfo: FormInfo };

  const { navigate } = useNavigation();

  const [region, setRegion] = React.useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.00922,
    longitudeDelta: 0.00421,
  });
  const [markers, setMarkers] = React.useState<Markers>({});

  const submit = useSubmit();

  const onLongPress = React.useCallback(
    (location: Location) =>
      setMarkers((o) => ({
        ...o,
        [uuid.v4() as string]: { id: -1, ...location, task: getRandomTask() },
      })),
    [setMarkers]
  );

  const onNext = React.useCallback(async () => {
    const checkPoints = Object.values(markers);

    navigate("Room", { screen: "RoomInfo" });
    await submit({ ...formInfo, ...region, checkPoints });
  }, [markers, formInfo, region, submit, navigate]);

  const renderMarkers = React.useMemo(
    () =>
      Object.entries(markers).map(([id, coordinate]) => ({
        coordinate,
        onPress: () =>
          setMarkers((o) => {
            const newMarkers = JSON.parse(JSON.stringify(o));
            delete newMarkers[id];
            return newMarkers;
          }),
      })),
    [markers, setMarkers]
  );

  return (
    <>
      <AppBar isBackable goNext={onNext}>
        Select Area
      </AppBar>
      <Map
        onRegionChange={setRegion}
        isCurrentRegion
        onLongPress={onLongPress}
        markers={renderMarkers}
      />
    </>
  );
};

export default memo(EditCheckPoints);
