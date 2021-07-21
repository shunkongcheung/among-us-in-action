import React, { memo } from "react";
import { Box, Image, Icon } from "native-base";
import { G, Path } from "react-native-svg";

import { HATS } from "../constants";

interface PlayerIconProps {
  hat: string;
  color: string;
  size?: "sm" | "md" | "lg";
}

const PlayerIcon: React.FC<PlayerIconProps> = ({ color, hat, size = "sm" }) => {
  const hatSource = React.useMemo(
    () => HATS.find((itm) => itm.name === hat)!.source,
    [hat]
  );

  const scaled = React.useMemo(() => {
    switch (size) {
      case "sm":
        return 60;
      case "md":
        return 100;
      case "lg":
        return 200;
    }
  }, [size]);

  const pt = React.useMemo(() => {
    switch (size) {
      case "sm":
        return "2%";
      case "md":
        return "4%";
      case "lg":
        return "10%";
    }
  }, [size]);

  const hatSize = React.useMemo(() => {
    switch (size) {
      case "sm":
        return "2xs";
      case "md":
        return "xs";
      case "lg":
        return "md";
    }
  }, [size]);

  return (
    <Box pt={pt} width={scaled} height={scaled * 1.15}>
      <Box width={scaled}>
        <Box position="absolute" left="35%" top="-20%" zIndex={1}>
          <Image source={hatSource} alt={`Hat ${hat}`} size={hatSize} />
        </Box>
        <Icon
          viewBox="0 0 512.000000 512.000000"
          width={scaled}
          height={scaled}
        >
          <G transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
            <Path
              fill={color}
              d="M2350 4751 c-63 -4 -135 -13 -160 -20 -249 -70 -462 -347 -560 -729 -6 -23 -22 -104 -35 -180 -29 -164 -41 -182 -128 -182 -72 0 -254 -43 -316 -75 -91 -45 -157 -129 -191 -240 -24 -77 -49 -1208 -31 -1385 24 -238 43 -305 113 -411 83 -124 213 -189 380 -189 80 0 91 -2 113 -24 28 -28 29 -34 49 -271 21 -231 21 -219 -6 -212 -32 9 -100 -8 -214 -54 -121 -48 -145 -70 -152 -137 -4 -44 -1 -52 27 -85 79 -90 346 -156 731 -182 253 -17 1087 -20 1395 -5 432 22 697 80 793 175 36 36 42 48 42 84 0 80 -99 155 -249 186 -42 9 -86 18 -99 21 l-23 5 19 32 c38 63 72 179 92 319 11 79 41 267 65 418 106 660 116 830 64 1095 -27 140 -27 213 -1 263 11 20 38 71 60 112 59 109 72 172 72 342 0 168 -17 245 -83 373 -32 63 -61 100 -137 175 -87 85 -102 106 -148 200 -140 291 -360 458 -732 558 -89 23 -112 25 -365 27 -148 2 -322 -1 -385 -4z m1010 -812 c333 -41 566 -190 614 -391 9 -40 -48 -101 -121 -128 -123 -46 -706 -88 -844 -61 -123 25 -222 95 -277 198 -16 32 -44 105 -62 162 -17 57 -34 110 -37 117 -6 15 17 22 222 64 247 51 350 59 505 39z m-494 -2669 c7 -14 17 -72 23 -130 5 -58 17 -125 26 -149 8 -24 14 -45 13 -46 -2 -2 -42 -5 -89 -7 l-85 -4 7 45 c4 25 8 102 8 172 1 137 6 152 56 147 20 -2 33 -11 41 -28z"
            />
          </G>
        </Icon>
      </Box>
    </Box>
  );
};

export default memo(PlayerIcon);
