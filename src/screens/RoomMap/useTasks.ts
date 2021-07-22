import { useCallback, useEffect, useMemo, useState } from "react";
import { gql, useMutation } from "@apollo/client";

import { Task } from "../../constants";
import { useUserContext } from "../../hooks";
import getMeter from "./getMeter";

interface Location {
  latitude: number;
  longitude: number;
}

interface CheckPoint extends Location {
  id: number;
  task: Task;
}

interface Marker {
  id: number;
  coordinate: Location;
  task: Task;
}

const COMPLETE_TASK = gql`
  mutation CompleteTask($roomId: Float!) {
    completeTask(roomId: $roomId) {
      id
    }
  }
`;

function useTasks(roomId: number, checkPoints: Array<CheckPoint>) {
  const [markers, setMarkers] = useState<Array<Marker>>([]);
  const [completeTask] = useMutation(COMPLETE_TASK);
  const { latitude, longitude } = useUserContext();

  const refresh = useCallback(() => {
    const half = Math.ceil(checkPoints.length / 2);
    const skip = Math.ceil(Math.random() * half);
    const take = Math.ceil(Math.random() * half) + 3;

    const markers = checkPoints.slice(skip, skip + take).map((itm) => ({
      id: itm.id,
      coordinate: {
        latitude: itm.latitude,
        longitude: itm.longitude,
      },
      task: itm.task,
    }));
    setMarkers(markers);
  }, [checkPoints, setMarkers]);

  const finishTask = useCallback(
    (id: number) => {
      setMarkers((o) => o.filter((itm) => itm.id !== id));
      completeTask({ variables: { roomId } });
    },
    [completeTask, setMarkers, roomId]
  );

  const task = useMemo<Task | undefined>(() => {
    const MIN_DIST = 50;
    const userLoc = { latitude, longitude };

    const marker = markers.find(
      ({ coordinate }) => getMeter(coordinate, userLoc) < MIN_DIST
    );
    return marker?.task;
  }, [latitude, longitude, markers]);

  useEffect(() => {
    // checkpoints are given. no more outstanding task
    if (!markers.length && !!checkPoints.length) refresh();
  }, [refresh]);

  return { finishTask, markers, refresh, task };
}

export default useTasks;
