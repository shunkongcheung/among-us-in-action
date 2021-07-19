import {
  uniqueNamesGenerator,
  adjectives,
  names,
} from "unique-names-generator";

const getRandomName = () => {
  return uniqueNamesGenerator({
    dictionaries: [adjectives, names],
    separator: " ",
  }).toLowerCase();
};

export default getRandomName;
