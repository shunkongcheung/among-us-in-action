import React, { memo } from "react";
import { Box, Center, Spinner } from "native-base";
import {
  requestForegroundPermissionsAsync,
  watchHeadingAsync,
} from "expo-location";
import MapView, { Marker } from "react-native-maps";

import { getCurrentLocation } from "../utils";
import { Alert } from "react-native";

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
  initialRegion?: Region;
  isCurrentRegion?: boolean;
  is3d?: boolean;
  isCampassed?: boolean;
  markers?: Array<MarkerProps>;
  onLongPress?: (location: Location) => any;
  onRegionChange: (region: Region | RegionCallback) => any;
}

const Map: React.FC<MapProps> = ({
  isCurrentRegion,
  isCampassed = false,
  is3d = false,
  initialRegion,
  markers = [],
  onLongPress,
  onRegionChange,
}) => {
  const [region, setRegion] = React.useState(initialRegion);
  const mapRef = React.useRef<MapView>(null);

  const onLongPressLocal = React.useCallback(
    ({ nativeEvent }) => {
      const { coordinate } = nativeEvent;
      if (!!onLongPress) onLongPress(coordinate);
    },
    [onLongPress]
  );

  React.useEffect(() => {}, [isCurrentRegion, onRegionChange]);

  React.useEffect(() => {
    const fetchCurrent = async () => {
      // get current location
      const region = await getCurrentLocation();

      // default map size
      setRegion({ ...region, latitudeDelta: 0.00922, longitudeDelta: 0.00421 });
    };

    (async () => {
      // if location should be set to current
      if (!!isCurrentRegion) fetchCurrent();

      // if is directed
      if (isCampassed) {
        watchHeadingAsync(({ magHeading }) => {
          if (mapRef.current) mapRef.current.setCamera({ heading: magHeading });
        });
      }
    })();
  }, [isCurrentRegion, isCampassed]);

  return (
    <Box flex={1}>
      {!!region ? (
        <MapView
          style={{ width: "100%", height: "100%" }}
          initialCamera={{
            altitude: 1094,
            pitch: is3d ? 55 : 0,
            heading: 0,
            center: region!,
            zoom: 1,
          }}
          onRegionChange={onRegionChange}
          onLongPress={onLongPressLocal}
          ref={mapRef}
          // ref={async (ref) => {
          //   (mapRef as any).current = ref;
          //   if (ref) {
          //     const camera = await ref.getCamera();
          //     setCamera(camera);
          //   }
          // }}
        >
          {markers.map((props, idx) => (
            <Marker key={`Marker-${idx}`} {...props} />
          ))}
        </MapView>
      ) : (
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
