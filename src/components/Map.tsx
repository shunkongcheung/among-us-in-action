import React, { memo } from "react";
import { Box, Center, Spinner } from "native-base";
import MapView, { Marker } from "react-native-maps";

import { getCurrentLocation } from "../utils";

export interface Location {
  latitude: number;
  longitude: number;
}

export interface Delta {
  latitudeDelta: number;
  longitudeDelta: number;
}

export type Region = Location & Delta;

type RegionCallback = (o: Region) => any;

export interface MarkerProps {
  coordinate: Location;
  description?: string;
  onPress?: () => any;
  title?: string;
}

interface MapProps {
  region: Region;
  isCurrentRegion?: boolean;
  markers?: Array<MarkerProps>;
  onLongPress?: (location: Location) => any;
  onRegionChange: (region: Region | RegionCallback) => any;
}

const Map: React.FC<MapProps> = ({
  isCurrentRegion,
  region,
  markers = [],
  onLongPress,
  onRegionChange,
}) => {
  const [ready, setReady] = React.useState(!isCurrentRegion);

  const onLongPressLocal = React.useCallback(
    ({ nativeEvent }) => {
      const { coordinate } = nativeEvent;
      if (!!onLongPress) onLongPress(coordinate);
    },
    [onLongPress]
  );

  React.useEffect(() => {
    const fetchCurrent = async () => {
      const region = await getCurrentLocation();
      onRegionChange((o: Region) => ({ ...o, ...region }));
      setReady(true);
    };

    if (!!isCurrentRegion) fetchCurrent();
  }, [isCurrentRegion, onRegionChange]);

  return (
    <Box flex={1}>
      <MapView
        style={{ width: "100%", height: "100%" }}
        region={region}
        onRegionChange={onRegionChange}
        onLongPress={onLongPressLocal}
      >
        {markers.map((props, idx) => (
          <Marker key={`Marker-${idx}`} {...props} />
        ))}
      </MapView>
      {!ready && (
        <Center
          position="absolute"
          left={0}
          right={0}
          top={0}
          bottom={0}
          backgroundColor="grey"
          opacity={0.4}
        >
          <Spinner />
        </Center>
      )}
    </Box>
  );
};

export default memo(Map);
