import { useMemo } from "react";
import { CheckPoint } from "../../types";

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
