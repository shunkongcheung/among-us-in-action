import { useRoute } from "@react-navigation/native";
import React, { memo } from "react";

import { Map } from "../../components";
import { useRoomContext } from "../../hooks";

import CharacterModal from "./CharacterModal";
import useMap from "./useMap";

const RoomMap: React.FC = () => {
  const room = useRoomContext();
  const { params } = useRoute();

  const [isCharacterModal, setIsCharacterModal] = React.useState(
    (params as any).isCharacterModal || false
  );
  const { region, markers } = useMap(room);

  if (!room) return <></>;

  return (
    <>
      <CharacterModal
        isOpen={isCharacterModal}
        isImposter={room?.isImposter || false}
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
