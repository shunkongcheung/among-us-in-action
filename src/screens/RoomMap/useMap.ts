import { useMemo } from "react";

interface CheckPoint {
  id: number;
  latitude: number;
  longitude: number;
}

function useMap(checkPoints: Array<CheckPoint>) {
  const markers = useMemo(() => {
    return checkPoints.map((itm) => ({
      id: itm.id,
      coordinate: {
        latitude: itm.latitude,
        longitude: itm.longitude,
      },
    }));
  }, [checkPoints]);

  return { markers };
}

export default useMap;
