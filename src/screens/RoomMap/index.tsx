import React, { memo } from "react";
import { Map } from "../../components";
import { useRoomContext } from "../../hooks";

const RoomMap: React.FC = () => {
  const room = useRoomContext();

  const region = React.useMemo(() => {
    if (!room)
      return {
        latitude: -1,
        longitude: -1,
        latitudeDelta: -1,
        longitudeDelta: -1,
      };
    const { game } = room;
    return {
      latitude: game.latitude,
      longitude: game.longitude,
      latitudeDelta: game.latitudeDelta,
      longitudeDelta: game.longitudeDelta,
    };
  }, [room]);

  const markers = React.useMemo(() => {
    if (!room) return [];
    return room.game.checkPoints.map((itm) => ({
      id: itm.id,
      coordinate: {
        latitude: itm.latitude,
        longitude: itm.longitude,
      },
    }));
  }, [room]);

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
