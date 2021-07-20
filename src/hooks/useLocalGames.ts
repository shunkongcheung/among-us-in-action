import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Game } from "../types";

const KEY_PREFIX = "@GAME";

const MAX_COUNT = 50;

const getAllKeys = async () => {
  const allKeys = await AsyncStorage.getAllKeys();
  const filtered = allKeys.filter((itm) => itm.startsWith(KEY_PREFIX));
  const sorted = filtered.sort();
  return sorted;
};

const houseKeep = async () => {
  const keys = await getAllKeys();
  if (keys.length < MAX_COUNT) return keys;

  const clearCount = keys.length - MAX_COUNT;
  const clearKeys = keys.slice(0, clearCount);
  await AsyncStorage.multiRemove(clearKeys);

  const remainKeys = keys.slice(clearCount);
  return remainKeys;
};

const getGames = async (keys: Array<string>) => {
  const items = await AsyncStorage.multiGet(keys);
  return items.map(([_, value]) => JSON.parse(value!) as Game);
};

function useLocalGames() {
  const [games, setGames] = useState<Array<Game>>([]);

  const storeGame = useCallback(
    async (game: Game) => {
      const key = `${KEY_PREFIX}_${game.id}`;
      const value = JSON.stringify(game);

      setGames((o) => [...o, game]);
      await AsyncStorage.setItem(key, value);
    },
    [setGames]
  );

  useEffect(() => {
    (async () => {
      const keys = await houseKeep();
      const games = await getGames(keys);
      setGames(games);
    })();
  }, [getGames, setGames]);

  return { games, storeGame };
}

export default useLocalGames;
