import { useMemo } from "react";
import { Room } from "../../types";

function useMap(room?: Room) {
  const region = useMemo(() => {
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

  const markers = useMemo(() => {
    if (!room) return [];
    return room.game.checkPoints.map((itm) => ({
      id: itm.id,
      coordinate: {
        latitude: itm.latitude,
        longitude: itm.longitude,
      },
    }));
  }, [room]);

  return { markers, region };
}

export default useMap;
