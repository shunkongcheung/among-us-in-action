import React, { memo } from "react";
import { useRoute } from "@react-navigation/native";
import { Box } from "native-base";

import { Map } from "../../components";
import { Task } from "../../constants";

import CharacterModal from "./CharacterModal";
import InfoModal from "./InfoModal";
import RoomControls from "./RoomControls";
import useTasks from "./useTasks";
import useKillable from "./useKillable";

interface CheckPoint {
  id: number;
  latitude: number;
  longitude: number;
  task: Task;
}

interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface RoomMapProps {
  checkPoints: Array<CheckPoint>;
  isImposter: boolean;
  region: Region;
  roomId: number;
  survivers: Array<{ id: number }>;
}

const RoomMap: React.FC<RoomMapProps> = ({
  checkPoints,
  isImposter,
  region,
  roomId,
  survivers,
}) => {
  const { params } = useRoute();

  const [isCharacterModal, setIsCharacterModal] = React.useState(
    (params as any)?.isCharacterModal || false
  );
  const { task, markers } = useTasks(roomId, checkPoints);
  const makeKill = useKillable(roomId, survivers);

  return (
    <>
      <CharacterModal
        isOpen={isCharacterModal}
        isImposter={isImposter || false}
        handleClose={() => setIsCharacterModal(false)}
      />
      <InfoModal />
      <Map
        initialRegion={{
          ...region,
          latitudeDelta: 0.0000922,
          longitudeDelta: 0.0000421,
        }}
        markers={markers}
        is3d
        isCampassed
        isShowSelf
      />
      <Box position="absolute" right={5} top="40%" zIndex={1}>
        <RoomControls makeKill={makeKill} isImposter={isImposter} task={task} />
      </Box>
    </>
  );
};

export default memo(RoomMap);
