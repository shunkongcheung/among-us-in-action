import { useRoute } from "@react-navigation/native";
import React, { memo } from "react";

import { Map } from "../../components";
import { Task } from "../../constants";

import CharacterModal from "./CharacterModal";
import useMap from "./useMap";

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
  region: Region;
  isImposter: boolean;
}

const RoomMap: React.FC<RoomMapProps> = ({
  checkPoints,
  region,
  isImposter,
}) => {
  const { params } = useRoute();

  const [isCharacterModal, setIsCharacterModal] = React.useState(
    (params as any)?.isCharacterModal || false
  );
  const { markers } = useMap(checkPoints);

  return (
    <>
      <CharacterModal
        isOpen={isCharacterModal}
        isImposter={isImposter || false}
        handleClose={() => setIsCharacterModal(false)}
      />
      <Map
        initialRegion={region}
        markers={markers}
        is3d
        isCampassed
        isShowSelf
      />
    </>
  );
};

export default memo(RoomMap);
