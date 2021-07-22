interface Location {
  latitude: number;
  longitude: number;
}

function getMeter(loc1: Location, loc2: Location) {
  if (loc1.latitude == loc2.latitude && loc1.latitude == loc2.latitude)
    return 0;

  const radlat1 = (Math.PI * loc1.latitude) / 180;
  const radlat2 = (Math.PI * loc2.latitude) / 180;

  const theta = loc1.longitude - loc2.longitude;
  const radtheta = (Math.PI * theta) / 180;

  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) dist = 1;

  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;

  return Math.abs(dist * 1.609344 * 1000);
}

export default getMeter;
