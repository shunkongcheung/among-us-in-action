import React, { memo } from "react";

import { Map } from "../../components";
import { useRoomContext } from "../../hooks";

import useMap from "./useMap";

const RoomMap: React.FC = () => {
  const room = useRoomContext();
  const { region, markers } = useMap(room);

  if (!room) return <></>;

  return (
    <>
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
